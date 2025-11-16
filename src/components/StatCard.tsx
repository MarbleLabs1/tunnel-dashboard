import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    positive: boolean;
  };
  status?: "success" | "warning" | "error" | "info";
}

export function StatCard({ title, value, icon: Icon, trend, status = "info" }: StatCardProps) {
  const statusColors = {
    success: "text-success",
    warning: "text-warning",
    error: "text-destructive",
    info: "text-primary",
  };

  return (
    <Card className="p-6 hover:border-primary/50 transition-colors animate-fade-in">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold mono">{value}</p>
          {trend && (
            <p className={cn("text-xs", trend.positive ? "text-success" : "text-destructive")}>
              {trend.positive ? "↑" : "↓"} {Math.abs(trend.value)}% from last hour
            </p>
          )}
        </div>
        <div className={cn("p-3 rounded-lg bg-secondary", statusColors[status])}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </Card>
  );
}
