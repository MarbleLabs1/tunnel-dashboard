import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Edit, ArrowRightLeft } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const PortForwarding = () => {
  const { toast } = useToast();
  const [rules, setRules] = useState([
    { id: 1, name: "Web Server", protocol: "TCP", extPort: "80", intIP: "192.168.1.100", intPort: "80", enabled: true },
    { id: 2, name: "SSH", protocol: "TCP", extPort: "22", intIP: "192.168.1.101", intPort: "22", enabled: true },
    { id: 3, name: "FTP", protocol: "TCP", extPort: "21", intIP: "192.168.1.102", intPort: "21", enabled: false },
  ]);

  const toggleRule = (id: number) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    ));
    toast({
      title: "Rule updated",
      description: "Port forwarding rule has been toggled",
    });
  };

  const deleteRule = (id: number) => {
    setRules(rules.filter(rule => rule.id !== id));
    toast({
      title: "Rule deleted",
      description: "Port forwarding rule has been removed",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Port Forwarding</h1>
          <p className="text-muted-foreground">Manage port forwarding rules and NAT configuration</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Rule
        </Button>
      </div>

      <Card className="p-6 animate-fade-in">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <ArrowRightLeft className="w-5 h-5 text-primary" />
          Create New Rule
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="rule-name">Rule Name</Label>
            <Input id="rule-name" placeholder="e.g., Web Server" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="protocol">Protocol</Label>
            <Select defaultValue="tcp">
              <SelectTrigger id="protocol">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tcp">TCP</SelectItem>
                <SelectItem value="udp">UDP</SelectItem>
                <SelectItem value="both">TCP/UDP</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ext-port">External Port</Label>
            <Input id="ext-port" placeholder="80" type="number" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="int-ip">Internal IP</Label>
            <Input id="int-ip" placeholder="192.168.1.100" className="mono" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="int-port">Internal Port</Label>
            <Input id="int-port" placeholder="80" type="number" />
          </div>
          <div className="flex items-end">
            <Button className="w-full">Create Rule</Button>
          </div>
        </div>
      </Card>

      <Card className="p-6 animate-fade-in">
        <h3 className="text-lg font-semibold mb-4">Active Rules</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Protocol</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">External Port</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Internal IP</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Internal Port</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rules.map((rule) => (
                <tr key={rule.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                  <td className="py-3 px-4 font-medium">{rule.name}</td>
                  <td className="py-3 px-4 mono text-sm">{rule.protocol}</td>
                  <td className="py-3 px-4 mono text-sm">{rule.extPort}</td>
                  <td className="py-3 px-4 mono text-sm">{rule.intIP}</td>
                  <td className="py-3 px-4 mono text-sm">{rule.intPort}</td>
                  <td className="py-3 px-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleRule(rule.id)}
                      className={rule.enabled ? "text-success" : "text-muted-foreground"}
                    >
                      {rule.enabled ? "Enabled" : "Disabled"}
                    </Button>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteRule(rule.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
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

export default PortForwarding;
