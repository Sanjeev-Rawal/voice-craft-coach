
import { Home, Mic, User, BarChart4, BookOpen, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Practice", href: "/practice", icon: Mic },
  { name: "Progress", href: "/progress", icon: BarChart4 },
  { name: "Lessons", href: "/lessons", icon: BookOpen },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const location = useLocation();
  
  return (
    <div className="flex h-screen flex-col justify-between border-r bg-white">
      <div className="px-4 py-6">
        <div className="flex items-center gap-2 mb-10 px-2">
          <Mic className="h-8 w-8 text-voicecraft-primary" />
          <span className="text-xl font-heading font-semibold">VoiceCraft</span>
        </div>
        
        <nav className="space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                location.pathname === item.href
                  ? "bg-voicecraft-primary/10 text-voicecraft-primary"
                  : "text-gray-700 hover:bg-voicecraft-primary/5 hover:text-voicecraft-primary"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="p-4">
        <div className="rounded-md bg-voicecraft-primary/5 p-3">
          <h3 className="text-sm font-medium text-voicecraft-primary">Need Help?</h3>
          <p className="mt-1 text-xs text-gray-600">
            Check our documentation or contact support for assistance.
          </p>
          <button className="mt-2 text-xs font-medium text-voicecraft-primary hover:underline">
            View Documentation
          </button>
        </div>
      </div>
    </div>
  );
}
