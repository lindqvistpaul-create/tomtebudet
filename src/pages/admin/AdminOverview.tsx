import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Users, UserCheck, Calendar, TrendingUp, CalendarDays, Clock, AlertCircle, ClipboardCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

interface Stats {
  totalSantas: number;
  pendingSantas: number;
  approvedSantas: number;
  rejectedSantas: number;
  totalCustomers: number;
  activeBookings: number;
  upcomingBookings: number;
  totalRevenue: number;
}

const AdminOverview = () => {
  const [stats, setStats] = useState<Stats>({
    totalSantas: 0,
    pendingSantas: 0,
    approvedSantas: 0,
    rejectedSantas: 0,
    totalCustomers: 0,
    activeBookings: 0,
    upcomingBookings: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch santa applications with status
        const { data: santaApps } = await supabase
          .from("santa_applications")
          .select("status");

        const pendingSantas = santaApps?.filter(a => a.status === "pending").length || 0;
        const approvedSantas = santaApps?.filter(a => a.status === "approved").length || 0;
        const rejectedSantas = santaApps?.filter(a => a.status === "rejected").length || 0;
        const totalSantas = santaApps?.length || 0;

        // Fetch customers count
        const { count: customersCount } = await supabase
          .from("user_roles")
          .select("*", { count: "exact", head: true })
          .eq("role", "customer");

        // Fetch active bookings
        const { count: activeCount } = await supabase
          .from("bookings")
          .select("*", { count: "exact", head: true })
          .eq("status", "upcoming");

        // Fetch bookings for next 7 days
        const today = new Date();
        const nextWeek = new Date(today);
        nextWeek.setDate(nextWeek.getDate() + 7);

        const { count: upcomingCount } = await supabase
          .from("bookings")
          .select("*", { count: "exact", head: true })
          .gte("date", today.toISOString().split("T")[0])
          .lte("date", nextWeek.toISOString().split("T")[0]);

        // Fetch total revenue
        const { data: revenueData } = await supabase
          .from("bookings")
          .select("total_price")
          .eq("status", "completed");

        const totalRevenue = revenueData?.reduce((sum, b) => sum + (b.total_price || 0), 0) || 0;

        setStats({
          totalSantas,
          pendingSantas,
          approvedSantas,
          rejectedSantas,
          totalCustomers: customersCount || 0,
          activeBookings: activeCount || 0,
          upcomingBookings: upcomingCount || 0,
          totalRevenue,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Väntar på granskning",
      value: stats.pendingSantas,
      icon: Clock,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "Godkända tomtar",
      value: stats.approvedSantas,
      icon: UserCheck,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Avvisade ansökningar",
      value: stats.rejectedSantas,
      icon: AlertCircle,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
    {
      title: "Registrerade kunder",
      value: stats.totalCustomers,
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Aktiva bokningar",
      value: stats.activeBookings,
      icon: Calendar,
      color: "text-berry",
      bgColor: "bg-berry/10",
    },
    {
      title: "Total omsättning",
      value: `${stats.totalRevenue.toLocaleString("sv-SE")} kr`,
      icon: TrendingUp,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl text-snow">Översikt</h1>
        <p className="text-snow/60 mt-1">Välkommen till Tomtebudets adminpanel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.title} className="bg-card border-snow/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-serif font-bold text-foreground">
                {loading ? "..." : stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="bg-card border-snow/10">
        <CardHeader>
          <CardTitle className="font-serif text-foreground">Snabbåtgärder</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/admin/granskning" className="p-4 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors">
            <ClipboardCheck className="w-6 h-6 text-accent mb-2" />
            <h3 className="font-medium text-foreground">Granska tomtansökningar</h3>
            <p className="text-sm text-muted-foreground">
              {stats.pendingSantas > 0 
                ? `${stats.pendingSantas} väntar på granskning` 
                : "Inga väntande ansökningar"}
            </p>
          </Link>
          <Link to="/admin/bokningar" className="p-4 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors">
            <Calendar className="w-6 h-6 text-primary mb-2" />
            <h3 className="font-medium text-foreground">Se alla bokningar</h3>
            <p className="text-sm text-muted-foreground">Hantera aktiva bokningar</p>
          </Link>
          <Link to="/admin/avbokningar" className="p-4 rounded-lg bg-berry/10 hover:bg-berry/20 transition-colors">
            <Calendar className="w-6 h-6 text-berry mb-2" />
            <h3 className="font-medium text-foreground">Hantera avbokningar</h3>
            <p className="text-sm text-muted-foreground">Se dispyter och avbokningar</p>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOverview;
