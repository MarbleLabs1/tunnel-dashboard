import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { 
  Container, 
  Play, 
  Square, 
  RotateCw, 
  Trash2, 
  HardDrive,
  Network,
  FileText,
  Search,
  Download
} from "lucide-react";

export default function Docker() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - in production, this would come from Docker API
  const containers = [
    { id: "c1", name: "nginx-proxy", image: "nginx:latest", status: "running", cpu: "2.5%", memory: "128MB", uptime: "2d 3h" },
    { id: "c2", name: "postgres-db", image: "postgres:15", status: "running", cpu: "5.2%", memory: "512MB", uptime: "5d 12h" },
    { id: "c3", name: "redis-cache", image: "redis:alpine", status: "running", cpu: "0.8%", memory: "64MB", uptime: "5d 12h" },
    { id: "c4", name: "app-backend", image: "node:18", status: "stopped", cpu: "0%", memory: "0MB", uptime: "-" },
  ];

  const images = [
    { id: "i1", name: "nginx", tag: "latest", size: "142MB", created: "2 days ago" },
    { id: "i2", name: "postgres", tag: "15", size: "379MB", created: "5 days ago" },
    { id: "i3", name: "redis", tag: "alpine", size: "32MB", created: "5 days ago" },
    { id: "i4", name: "node", tag: "18", size: "998MB", created: "1 week ago" },
  ];

  const volumes = [
    { id: "v1", name: "postgres_data", driver: "local", mountpoint: "/var/lib/docker/volumes/postgres_data", size: "2.3GB" },
    { id: "v2", name: "nginx_config", driver: "local", mountpoint: "/var/lib/docker/volumes/nginx_config", size: "4.2MB" },
    { id: "v3", name: "app_uploads", driver: "local", mountpoint: "/var/lib/docker/volumes/app_uploads", size: "156MB" },
  ];

  const networks = [
    { id: "n1", name: "bridge", driver: "bridge", scope: "local", containers: 3 },
    { id: "n2", name: "app_network", driver: "bridge", scope: "local", containers: 2 },
    { id: "n3", name: "host", driver: "host", scope: "local", containers: 0 },
  ];

  const handleContainerAction = (action: string, containerName: string) => {
    toast({
      title: `Container ${action}`,
      description: `${containerName} ${action} successfully`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "bg-success/20 text-success border-success/30";
      case "stopped":
        return "bg-muted text-muted-foreground border-border";
      default:
        return "bg-warning/20 text-warning border-warning/30";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Docker Management</h2>
          <p className="text-muted-foreground">Manage containers, images, volumes, and networks</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Pull Image
          </Button>
          <Button>
            <Play className="mr-2 h-4 w-4" />
            Run Container
          </Button>
        </div>
      </div>

      <Tabs defaultValue="containers" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
          <TabsTrigger value="containers">Containers</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="volumes">Volumes</TabsTrigger>
          <TabsTrigger value="networks">Networks</TabsTrigger>
        </TabsList>

        <TabsContent value="containers" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Containers</CardTitle>
                  <CardDescription>Manage and monitor Docker containers</CardDescription>
                </div>
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search containers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <div className="space-y-4">
                  {containers.map((container) => (
                    <Card key={container.id} className="border-border/50">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <Container className="h-5 w-5 text-primary mt-1" />
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <p className="font-semibold font-mono">{container.name}</p>
                                <Badge className={getStatusColor(container.status)} variant="outline">
                                  {container.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground font-mono">{container.image}</p>
                              <div className="flex gap-4 text-xs text-muted-foreground mt-2">
                                <span>CPU: <span className="text-foreground font-mono">{container.cpu}</span></span>
                                <span>Memory: <span className="text-foreground font-mono">{container.memory}</span></span>
                                <span>Uptime: <span className="text-foreground font-mono">{container.uptime}</span></span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {container.status === "running" ? (
                              <>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleContainerAction("restarted", container.name)}
                                >
                                  <RotateCw className="h-3 w-3" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleContainerAction("stopped", container.name)}
                                >
                                  <Square className="h-3 w-3" />
                                </Button>
                              </>
                            ) : (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleContainerAction("started", container.name)}
                              >
                                <Play className="h-3 w-3" />
                              </Button>
                            )}
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleContainerAction("logs opened for", container.name)}
                            >
                              <FileText className="h-3 w-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleContainerAction("removed", container.name)}
                            >
                              <Trash2 className="h-3 w-3 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Docker Images</CardTitle>
              <CardDescription>Available Docker images on the system</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <div className="space-y-4">
                  {images.map((image) => (
                    <Card key={image.id} className="border-border/50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <HardDrive className="h-5 w-5 text-accent" />
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-semibold font-mono">{image.name}:{image.tag}</p>
                                <Badge variant="outline" className="font-mono text-xs">{image.size}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">Created {image.created}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Play className="h-3 w-3 mr-1" />
                              Run
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-3 w-3 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="volumes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Docker Volumes</CardTitle>
              <CardDescription>Persistent storage volumes</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <div className="space-y-4">
                  {volumes.map((volume) => (
                    <Card key={volume.id} className="border-border/50">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <HardDrive className="h-5 w-5 text-primary mt-1" />
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-semibold font-mono">{volume.name}</p>
                                <Badge variant="outline" className="font-mono text-xs">{volume.size}</Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">Driver: {volume.driver}</p>
                              <p className="text-xs text-muted-foreground font-mono">{volume.mountpoint}</p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-3 w-3 text-destructive" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="networks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Docker Networks</CardTitle>
              <CardDescription>Container network configurations</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <div className="space-y-4">
                  {networks.map((network) => (
                    <Card key={network.id} className="border-border/50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Network className="h-5 w-5 text-accent" />
                            <div>
                              <p className="font-semibold font-mono">{network.name}</p>
                              <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                                <span>Driver: {network.driver}</span>
                                <span>Scope: {network.scope}</span>
                                <span>Containers: {network.containers}</span>
                              </div>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-3 w-3 text-destructive" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
