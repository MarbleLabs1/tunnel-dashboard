import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Network, Activity, TrendingUp, TrendingDown, Settings, RefreshCw } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

const interfaces = [
  {
    name: "eth0",
    status: "up",
    ip: "192.168.1.100",
    mac: "00:1B:63:84:45:E6",
    speed: "1000 Mbps",
    duplex: "Full",
    rxBytes: "45.2 GB",
    txBytes: "23.8 GB",
    rxPackets: "3.2M",
    txPackets: "2.1M",
    usage: 67,
  },
  {
    name: "eth1",
    status: "up",
    ip: "10.0.0.1",
    mac: "00:1B:63:84:45:E7",
    speed: "1000 Mbps",
    duplex: "Full",
    rxBytes: "12.5 GB",
    txBytes: "8.3 GB",
    rxPackets: "890K",
    txPackets: "654K",
    usage: 34,
  },
  {
    name: "wlan0",
    status: "down",
    ip: "N/A",
    mac: "00:1B:63:84:45:E8",
    speed: "N/A",
    duplex: "N/A",
    rxBytes: "0 B",
    txBytes: "0 B",
    rxPackets: "0",
    txPackets: "0",
    usage: 0,
  },
];

export default function NetworkInterfaces() {
  const [activeInterfaces, setActiveInterfaces] = useState<Record<string, boolean>>({
    eth0: true,
    eth1: true,
    wlan0: false,
  });

  const toggleInterface = (name: string) => {
    setActiveInterfaces((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Network Interfaces</h1>
          <p className="text-muted-foreground">Manage and monitor network interface configurations</p>
        </div>
        <Button className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Button>
      </div>

      {/* Interface Cards */}
      <div className="grid gap-6">
        {interfaces.map((iface) => (
          <Card
            key={iface.name}
            className={`bg-card/50 backdrop-blur transition-all ${
              iface.status === "up" ? "border-success/30" : "border-muted"
            }`}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3">
                  <Network className={`w-5 h-5 ${iface.status === "up" ? "text-success" : "text-muted-foreground"}`} />
                  <span className="mono text-xl">{iface.name}</span>
                  <Badge variant={iface.status === "up" ? "default" : "secondary"} className="ml-2">
                    {iface.status.toUpperCase()}
                  </Badge>
                </CardTitle>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Enabled</span>
                    <Switch
                      checked={activeInterfaces[iface.name]}
                      onCheckedChange={() => toggleInterface(iface.name)}
                    />
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Settings className="w-4 h-4" />
                    Configure
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Connection Info */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-muted-foreground">Connection</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">IP Address</span>
                      <span className="text-sm font-mono">{iface.ip}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">MAC Address</span>
                      <span className="text-sm font-mono">{iface.mac}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Speed</span>
                      <span className="text-sm font-mono">{iface.speed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Duplex</span>
                      <span className="text-sm font-mono">{iface.duplex}</span>
                    </div>
                  </div>
                </div>

                {/* RX Stats */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-success" />
                    Received
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Bytes</span>
                      <span className="text-sm font-mono text-success">{iface.rxBytes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Packets</span>
                      <span className="text-sm font-mono text-success">{iface.rxPackets}</span>
                    </div>
                  </div>
                </div>

                {/* TX Stats */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    Transmitted
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Bytes</span>
                      <span className="text-sm font-mono text-primary">{iface.txBytes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Packets</span>
                      <span className="text-sm font-mono text-primary">{iface.txPackets}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Usage Bar */}
              {iface.status === "up" && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      Current Usage
                    </span>
                    <span className="text-sm font-mono text-primary">{iface.usage}%</span>
                  </div>
                  <Progress value={iface.usage} className="h-2" />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
