import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Settings as SettingsIcon, Shield, Bell, Globe, Database, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Settings() {
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your configuration has been updated successfully.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Configure system preferences and network settings</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* System Configuration */}
        <Card className="bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="w-5 h-5 text-primary" />
              System Configuration
            </CardTitle>
            <CardDescription>General system settings and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hostname">Hostname</Label>
              <Input id="hostname" defaultValue="netcontrol.local" className="mono" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="domain">Domain</Label>
              <Input id="domain" defaultValue="example.com" className="mono" />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto Updates</Label>
                <div className="text-sm text-muted-foreground">Automatically install system updates</div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>SSH Access</Label>
                <div className="text-sm text-muted-foreground">Enable remote SSH connections</div>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Network Settings */}
        <Card className="bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-accent" />
              Network Settings
            </CardTitle>
            <CardDescription>Configure network and DNS settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dns1">Primary DNS</Label>
              <Input id="dns1" defaultValue="8.8.8.8" className="mono" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dns2">Secondary DNS</Label>
              <Input id="dns2" defaultValue="8.8.4.4" className="mono" />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>IPv6</Label>
                <div className="text-sm text-muted-foreground">Enable IPv6 support</div>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>DHCP Server</Label>
                <div className="text-sm text-muted-foreground">Enable built-in DHCP server</div>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-warning" />
              Security Settings
            </CardTitle>
            <CardDescription>Firewall and security configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Firewall</Label>
                <div className="text-sm text-muted-foreground">Enable packet filtering</div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="default" className="bg-success/20 text-success border-success/30">
                  Active
                </Badge>
                <Switch defaultChecked />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Intrusion Detection</Label>
                <div className="text-sm text-muted-foreground">Monitor for suspicious activity</div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Port Scan Detection</Label>
                <div className="text-sm text-muted-foreground">Alert on port scanning attempts</div>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="timeout">Session Timeout (minutes)</Label>
              <Input id="timeout" type="number" defaultValue="30" className="mono" />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Notifications
            </CardTitle>
            <CardDescription>Configure alert preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>System Alerts</Label>
                <div className="text-sm text-muted-foreground">Critical system notifications</div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Network Events</Label>
                <div className="text-sm text-muted-foreground">Interface up/down notifications</div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Security Alerts</Label>
                <div className="text-sm text-muted-foreground">Failed login attempts and threats</div>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="email">Alert Email</Label>
              <Input id="email" type="email" placeholder="admin@example.com" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="gap-2">
          <Save className="w-4 h-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}
