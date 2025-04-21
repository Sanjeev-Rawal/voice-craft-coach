
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatCard({ title, value, icon, trend, className }: StatCardProps) {
  return (
    <div className={cn("card-stats", className)}>
      <div className="flex justify-between items-start">
        <div>
          <p className="stat-label">{title}</p>
          <p className="stat-value">{value}</p>
          
          {trend && (
            <div className="flex items-center mt-1">
              <span
                className={cn(
                  "text-xs font-medium",
                  trend.isPositive ? "text-voicecraft-success" : "text-voicecraft-error"
                )}
              >
                {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-muted-foreground ml-1">vs last week</span>
            </div>
          )}
        </div>
        
        {icon && (
          <div className="rounded-full bg-voicecraft-primary/10 p-2">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
