import { useEffect, useState } from "react";
import { Bell, UserCheck, Calendar, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { sv } from "date-fns/locale";
import { Link } from "react-router-dom";

interface Notification {
  id: string;
  type: "santa_application" | "new_booking";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link: string;
}

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    fetchNotifications();
    
    // Set up realtime subscription for new applications
    const applicationsChannel = supabase
      .channel('admin-santa-applications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'santa_applications',
        },
        (payload) => {
          addNotification({
            id: `app-${payload.new.id}`,
            type: "santa_application",
            title: "Ny tomteansökan",
            message: "En ny ansökan har skickats in för granskning",
            timestamp: new Date().toISOString(),
            read: false,
            link: "/admin/tomtar",
          });
        }
      )
      .subscribe();

    // Set up realtime subscription for new bookings
    const bookingsChannel = supabase
      .channel('admin-bookings')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'bookings',
        },
        (payload) => {
          addNotification({
            id: `booking-${payload.new.id}`,
            type: "new_booking",
            title: "Ny bokning",
            message: `Ny bokning skapad för ${payload.new.santa_name}`,
            timestamp: new Date().toISOString(),
            read: false,
            link: "/admin/bokningar",
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(applicationsChannel);
      supabase.removeChannel(bookingsChannel);
    };
  }, []);

  const fetchNotifications = async () => {
    try {
      // Fetch pending santa applications (both 'pending' and 'pending_review' status)
      const { data: pendingApps } = await supabase
        .from("santa_applications")
        .select("id, created_at, status")
        .in("status", ["pending", "pending_review"])
        .order("created_at", { ascending: false })
        .limit(10);

      // Fetch recent bookings (last 24 hours)
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      const { data: recentBookings } = await supabase
        .from("bookings")
        .select("id, created_at, santa_name")
        .gte("created_at", yesterday.toISOString())
        .order("created_at", { ascending: false })
        .limit(5);

      const notifs: Notification[] = [];

      // Add pending applications as notifications
      pendingApps?.forEach(app => {
        notifs.push({
          id: `app-${app.id}`,
          type: "santa_application",
          title: "Tomteansökan väntar",
          message: "En ansökan väntar på granskning",
          timestamp: app.created_at,
          read: false,
          link: "/admin/tomtar",
        });
      });

      // Add recent bookings as notifications
      recentBookings?.forEach(booking => {
        notifs.push({
          id: `booking-${booking.id}`,
          type: "new_booking",
          title: "Ny bokning",
          message: `Bokning med ${booking.santa_name}`,
          timestamp: booking.created_at,
          read: false,
          link: "/admin/bokningar",
        });
      });

      // Sort by timestamp
      notifs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

      setNotifications(notifs);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const addNotification = (notification: Notification) => {
    setNotifications(prev => [notification, ...prev].slice(0, 20));
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-snow/70 hover:text-snow hover:bg-snow/5"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-berry text-white text-xs"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        align="end" 
        className="w-80 p-0 bg-card border-snow/10"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-snow/10">
          <h3 className="font-serif text-foreground font-medium">Notifikationer</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              <Check className="w-3 h-3 mr-1" />
              Markera alla som lästa
            </Button>
          )}
        </div>

        {/* Notifications List */}
        <div className="max-h-80 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-muted-foreground text-sm">
              Laddar...
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground text-sm">
              <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
              Inga notifikationer
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`relative p-4 border-b border-snow/5 hover:bg-snow/5 transition-colors ${
                  !notification.read ? "bg-accent/5" : ""
                }`}
              >
                <Link
                  to={notification.link}
                  onClick={() => {
                    markAsRead(notification.id);
                    setOpen(false);
                  }}
                  className="flex items-start gap-3"
                >
                  <div className={`p-2 rounded-lg flex-shrink-0 ${
                    notification.type === "santa_application" 
                      ? "bg-accent/20" 
                      : "bg-primary/20"
                  }`}>
                    {notification.type === "santa_application" ? (
                      <UserCheck className={`w-4 h-4 ${
                        notification.type === "santa_application" 
                          ? "text-accent" 
                          : "text-primary"
                      }`} />
                    ) : (
                      <Calendar className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm text-foreground truncate">
                        {notification.title}
                      </p>
                      {!notification.read && (
                        <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground/70 mt-1">
                      {formatDistanceToNow(new Date(notification.timestamp), { 
                        addSuffix: true, 
                        locale: sv 
                      })}
                    </p>
                  </div>
                </Link>
                <button
                  onClick={() => clearNotification(notification.id)}
                  className="absolute top-2 right-2 p-1 text-muted-foreground/50 hover:text-muted-foreground rounded transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="p-3 border-t border-snow/10">
            <Link
              to="/admin/bokningar"
              onClick={() => setOpen(false)}
              className="block text-center text-sm text-accent hover:text-accent/80 transition-colors"
            >
              Visa alla bokningar
            </Link>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default AdminNotifications;
