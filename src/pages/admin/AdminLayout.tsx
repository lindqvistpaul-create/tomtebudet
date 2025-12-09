import { ReactNode, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  UserCheck, 
  AlertTriangle, 
  Settings,
  Menu,
  X,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import Logo from "@/components/Logo";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/admin", label: "Översikt", icon: LayoutDashboard, end: true },
  { path: "/admin/bokningar", label: "Bokningar", icon: Calendar },
  { path: "/admin/tomtar", label: "Tomtar", icon: UserCheck },
  { path: "/admin/kunder", label: "Kunder", icon: Users },
  { path: "/admin/avbokningar", label: "Avbokningar & dispyter", icon: AlertTriangle },
  { path: "/admin/installningar", label: "Inställningar", icon: Settings },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { signOut } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-primary flex">
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden text-snow hover:bg-snow/10"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-40 w-64 bg-primary border-r border-snow/10 transform transition-transform duration-200 ease-in-out lg:translate-x-0 flex flex-col",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-snow/10">
          <Logo variant="horizontal" className="h-8" />
          <p className="text-snow/50 text-xs mt-2 uppercase tracking-wider">Adminpanel</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-snow/70 hover:bg-snow/5 hover:text-snow"
                )
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Sign out button */}
        <div className="p-4 border-t border-snow/10">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-snow/70 hover:text-snow hover:bg-snow/5"
            onClick={() => signOut()}
          >
            <LogOut className="w-5 h-5" />
            Logga ut
          </Button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 lg:ml-0 min-h-screen">
        <div className="p-4 lg:p-8 pt-16 lg:pt-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
