import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  BarChart3,
  Settings,
  LogOut,
  Boxes,
} from "lucide-react";
import api from "../services/api";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get("/auth/profile")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch user profile:", err);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navItems = [
    {
      label: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      label: "Products",
      path: "/products",
      icon: Package,
    },
    {
      label: "Analytics",
      path: "/analytics",
      icon: BarChart3,
    },
    {
      label: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <aside className="w-72 bg-card border-r border-border h-full flex flex-col justify-between p-6">
      <div className="space-y-6">
        <div className="flex items-center gap-2 px-2">
          <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
            <Boxes className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-violet-600 bg-clip-text text-transparent">
            InventoryFlow
          </span>
        </div>

        <Separator />

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-sm ${
                  isActive
                    ? "bg-primary text-primary-foreground font-medium shadow-sm shadow-primary/20"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Icon
                  size={18}
                  className={`transition-transform duration-200 group-hover:scale-105 ${
                    isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                  }`}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="space-y-4">
        <Separator />
        
        {/* User profile section */}
        <div className="flex items-center gap-3 px-2 py-1">
          <Avatar className="h-10 w-10 border border-border">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {user ? getInitials(user.name) : "A"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">
              {user ? user.name : "Admin User"}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user ? user.email : "admin@inventory.com"}
            </p>
          </div>
        </div>

        {/* Logout button */}
        <Button
          variant="outline"
          className="w-full justify-start gap-3 rounded-xl text-red-600 border-red-100 hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-all duration-200"
          onClick={handleLogout}
        >
          <LogOut size={16} />
          <span>Logout</span>
        </Button>
      </div>
    </aside>
  );
}

export default Sidebar;