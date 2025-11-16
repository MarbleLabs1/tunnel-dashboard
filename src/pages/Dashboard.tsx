import { StatCard } from "@/components/StatCard";
import { Card } from "@/components/ui/card";
import { Activity, Cpu, HardDrive, Network, Wifi, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">System Dashboard</h1>
        <p className="text-muted-foreground">Monitor your network and system resources</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 animate-fade-in">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-primary" />
            Storage Usage
          </h3>
          <div className="space-y-4">
            {[
              { name: "System", used: 45, total: 100, color: "bg-primary" },
              { name: "Data", used: 78, total: 500, color: "bg-success" },
              { name: "Backups", used: 120, total: 200, color: "bg-warning" },
            ].map((disk) => (
              <div key={disk.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{disk.name}</span>
                  <span className="mono text-foreground">
                    {disk.used} GB / {disk.total} GB
                  </span>
                </div>
                <Progress value={(disk.used / disk.total) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 animate-fade-in">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-warning" />
            System Alerts
          </h3>
          <div className="space-y-3">
            {[
              { level: "warning", message: "High memory usage detected on VM-03", time: "2 min ago" },
              { level: "info", message: "Firewall rules updated successfully", time: "15 min ago" },
              { level: "success", message: "Backup completed for all VMs", time: "1 hour ago" },
            ].map((alert, i) => (
              <div
                key={i}
                className="p-3 rounded-lg bg-secondary border border-border flex items-start gap-3"
              >
                <div
                  className={`w-2 h-2 rounded-full mt-1.5 ${
                    alert.level === "warning"
                      ? "bg-warning"
                      : alert.level === "success"
                      ? "bg-success"
                      : "bg-primary"
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm text-foreground">{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6 animate-fade-in">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Network className="w-5 h-5 text-primary" />
          Network Interfaces
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Interface</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">IP Address</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Speed</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">RX/TX</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "WAN", status: "Up", ip: "203.0.113.45", speed: "1 Gbps", rx: "1.2 GB", tx: "850 MB" },
                { name: "LAN", status: "Up", ip: "192.168.1.1", speed: "1 Gbps", rx: "3.4 GB", tx: "2.1 GB" },
                { name: "DMZ", status: "Up", ip: "10.0.0.1", speed: "100 Mbps", rx: "450 MB", tx: "320 MB" },
                { name: "GUEST", status: "Down", ip: "172.16.0.1", speed: "-", rx: "-", tx: "-" },
              ].map((iface, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                  <td className="py-3 px-4 font-medium mono text-sm">{iface.name}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs ${
                        iface.status === "Up"
                          ? "bg-success/20 text-success"
                          : "bg-destructive/20 text-destructive"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${iface.status === "Up" ? "bg-success" : "bg-destructive"}`} />
                      {iface.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 mono text-sm">{iface.ip}</td>
                  <td className="py-3 px-4 mono text-sm">{iface.speed}</td>
                  <td className="py-3 px-4 mono text-sm">
                    <div className="text-success">↓ {iface.rx}</div>
                    <div className="text-primary">↑ {iface.tx}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
