import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/StatCard";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, HardDrive, Network, AlertTriangle, Cpu, Zap, Wifi } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const uptimeData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  uptime: 99.5 + Math.random() * 0.5,
}));

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Network control panel overview</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Cpu className="w-4 h-4" />
            System Logs
          </Button>
          <Button className="gap-2">
            <Zap className="w-4 h-4" />
            Quick Actions
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="CPU Usage"
          value="42%"
          icon={Cpu}
          trend={{ value: 5, positive: false }}
          status="success"
        />
        <StatCard
          title="Memory Usage"
          value="6.2 GB"
          icon={Activity}
          trend={{ value: 12, positive: true }}
          status="warning"
        />
        <StatCard
          title="Network Traffic"
          value="1.2 GB/s"
          icon={Network}
          trend={{ value: 8, positive: true }}
          status="info"
        />
        <StatCard
          title="Active Connections"
          value="1,453"
          icon={Wifi}
          trend={{ value: 3, positive: true }}
          status="success"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Uptime Chart */}
        <Card className="bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-success" />
              System Uptime (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={uptimeData}>
                <defs>
                  <linearGradient id="uptimeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
                <YAxis domain={[99, 100]} stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="uptime"
                  stroke="hsl(var(--success))"
                  fill="url(#uptimeGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Storage Usage */}
        <Card className="bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-accent" />
              Storage Usage
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Root Partition (/)</span>
                <span className="text-sm text-muted-foreground mono">124 GB / 256 GB</span>
              </div>
              <Progress value={48} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Home Partition (/home)</span>
                <span className="text-sm text-muted-foreground mono">89 GB / 512 GB</span>
              </div>
              <Progress value={17} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Backup Partition (/backup)</span>
                <span className="text-sm text-muted-foreground mono">456 GB / 1 TB</span>
              </div>
              <Progress value={44.5} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts and Network Stats */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-warning" />
              System Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { level: "warning", message: "High memory usage detected on VM-03", time: "2 min ago" },
              { level: "info", message: "Firewall rules updated successfully", time: "15 min ago" },
              { level: "success", message: "Backup completed for all VMs", time: "1 hour ago" },
            ].map((alert, i) => (
              <div
                key={i}
                className="p-3 rounded-lg bg-background/50 border border-border/50 flex items-start gap-3 hover:border-primary/30 transition-colors"
              >
                <div
                  className={`w-2 h-2 rounded-full mt-1.5 status-pulse ${
                    alert.level === "warning"
                      ? "bg-warning"
                      : alert.level === "success"
                      ? "bg-success"
                      : "bg-primary"
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm">{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="w-4 h-4 text-primary" />
              Network Interfaces
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: "eth0", status: "up", ip: "192.168.1.100", traffic: "↓ 125 MB/s ↑ 78 MB/s" },
              { name: "eth1", status: "up", ip: "10.0.0.1", traffic: "↓ 42 MB/s ↑ 23 MB/s" },
              { name: "wlan0", status: "down", ip: "N/A", traffic: "N/A" },
            ].map((iface, i) => (
              <div
                key={i}
                className="p-3 rounded-lg bg-background/50 border border-border/50 flex items-center justify-between hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${iface.status === "up" ? "bg-success status-pulse" : "bg-muted"}`} />
                  <div>
                    <div className="font-medium mono text-sm">{iface.name}</div>
                    <div className="text-xs text-muted-foreground">{iface.ip}</div>
                  </div>
                </div>
                <Badge variant={iface.status === "up" ? "default" : "secondary"} className="mono text-xs">
                  {iface.traffic}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
