import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Activity, Cpu, HardDrive, Network, Thermometer, Zap } from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const cpuData = Array.from({ length: 20 }, (_, i) => ({
  time: `${i}s`,
  usage: Math.random() * 30 + 40,
}));

const networkData = Array.from({ length: 20 }, (_, i) => ({
  time: `${i}s`,
  in: Math.random() * 100 + 50,
  out: Math.random() * 80 + 30,
}));

const processes = [
  { name: "nginx", cpu: 12.5, memory: 245, status: "running" },
  { name: "postgres", cpu: 8.3, memory: 512, status: "running" },
  { name: "redis", cpu: 3.2, memory: 128, status: "running" },
  { name: "node", cpu: 15.7, memory: 342, status: "running" },
  { name: "docker", cpu: 5.1, memory: 186, status: "running" },
];

export default function SystemMonitor() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">System Monitor</h1>
        <p className="text-muted-foreground">Real-time system performance and resource monitoring</p>
      </div>

      {/* Resource Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-primary/20 bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
            <Cpu className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mono">67.3%</div>
            <Progress value={67.3} className="mt-2 h-2" />
            <p className="text-xs text-muted-foreground mt-2">8 cores @ 3.2 GHz</p>
          </CardContent>
        </Card>

        <Card className="border-accent/20 bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Memory</CardTitle>
            <HardDrive className="w-4 h-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mono">12.4 GB</div>
            <Progress value={77.5} className="mt-2 h-2" />
            <p className="text-xs text-muted-foreground mt-2">77.5% of 16 GB</p>
          </CardContent>
        </Card>

        <Card className="border-warning/20 bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Temperature</CardTitle>
            <Thermometer className="w-4 h-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mono">54°C</div>
            <Progress value={54} className="mt-2 h-2" />
            <p className="text-xs text-muted-foreground mt-2">Normal operating range</p>
          </CardContent>
        </Card>

        <Card className="border-success/20 bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Network I/O</CardTitle>
            <Network className="w-4 h-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mono">125 MB/s</div>
            <div className="flex gap-2 mt-2 text-xs">
              <span className="text-success">↓ 78 MB/s</span>
              <span className="text-primary">↑ 47 MB/s</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-primary" />
              CPU Usage History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={cpuData}>
                <defs>
                  <linearGradient id="cpuGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="usage"
                  stroke="hsl(var(--primary))"
                  fill="url(#cpuGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="w-4 h-4 text-success" />
              Network Traffic
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={networkData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="in"
                  stroke="hsl(var(--success))"
                  strokeWidth={2}
                  dot={false}
                  name="Incoming"
                />
                <Line
                  type="monotone"
                  dataKey="out"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                  name="Outgoing"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Process List */}
      <Card className="bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            Top Processes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {processes.map((process) => (
              <div
                key={process.name}
                className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Zap className="w-4 h-4 text-success" />
                  <span className="font-medium mono">{process.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {process.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-right">
                    <div className="text-muted-foreground text-xs">CPU</div>
                    <div className="font-mono text-primary">{process.cpu}%</div>
                  </div>
                  <div className="text-right">
                    <div className="text-muted-foreground text-xs">Memory</div>
                    <div className="font-mono text-accent">{process.memory} MB</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
