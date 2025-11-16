import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Server, Play, Square, RotateCw, Activity, Clock, Cpu } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const services = [
  { name: "nginx", status: "running", uptime: "5d 14h", cpu: "2.3%", memory: "45 MB", autoStart: true },
  { name: "postgresql", status: "running", uptime: "5d 14h", cpu: "8.1%", memory: "512 MB", autoStart: true },
  { name: "redis", status: "running", uptime: "5d 14h", cpu: "1.2%", memory: "128 MB", autoStart: true },
  { name: "docker", status: "running", uptime: "5d 14h", cpu: "5.4%", memory: "256 MB", autoStart: true },
  { name: "ssh", status: "running", uptime: "5d 14h", cpu: "0.1%", memory: "8 MB", autoStart: true },
  { name: "firewall", status: "running", uptime: "5d 14h", cpu: "0.5%", memory: "32 MB", autoStart: true },
  { name: "vpn", status: "stopped", uptime: "N/A", cpu: "0%", memory: "0 MB", autoStart: false },
];

export default function Services() {
  const [serviceStatus, setServiceStatus] = useState<Record<string, string>>(
    Object.fromEntries(services.map((s) => [s.name, s.status]))
  );

  const handleAction = (serviceName: string, action: string) => {
    toast({
      title: `Service ${action}`,
      description: `${serviceName} is being ${action}ed...`,
    });
    
    setTimeout(() => {
      if (action === "stop") {
        setServiceStatus((prev) => ({ ...prev, [serviceName]: "stopped" }));
      } else if (action === "start" || action === "restart") {
        setServiceStatus((prev) => ({ ...prev, [serviceName]: "running" }));
      }
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Services</h1>
        <p className="text-muted-foreground">Manage system services and daemons</p>
      </div>

      {/* Services Grid */}
      <div className="grid gap-4">
        {services.map((service) => (
          <Card
            key={service.name}
            className={`bg-card/50 backdrop-blur transition-all ${
              serviceStatus[service.name] === "running" ? "border-success/20" : "border-muted"
            }`}
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="p-3 rounded-lg bg-background/50 border border-border">
                    <Server
                      className={`w-6 h-6 ${
                        serviceStatus[service.name] === "running" ? "text-success" : "text-muted-foreground"
                      }`}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold mono">{service.name}</h3>
                      <Badge
                        variant={serviceStatus[service.name] === "running" ? "default" : "secondary"}
                        className={
                          serviceStatus[service.name] === "running"
                            ? "bg-success/20 text-success border-success/30"
                            : ""
                        }
                      >
                        {serviceStatus[service.name].toUpperCase()}
                      </Badge>
                      {service.autoStart && (
                        <Badge variant="outline" className="text-xs">
                          Auto-start
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-6 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span className="mono">{service.uptime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Cpu className="w-4 h-4" />
                        <span className="mono">{service.cpu}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Activity className="w-4 h-4" />
                        <span className="mono">{service.memory}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  {serviceStatus[service.name] === "running" ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => handleAction(service.name, "restart")}
                      >
                        <RotateCw className="w-4 h-4" />
                        Restart
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 text-destructive hover:text-destructive"
                        onClick={() => handleAction(service.name, "stop")}
                      >
                        <Square className="w-4 h-4" />
                        Stop
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 text-success hover:text-success"
                      onClick={() => handleAction(service.name, "start")}
                    >
                      <Play className="w-4 h-4" />
                      Start
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
