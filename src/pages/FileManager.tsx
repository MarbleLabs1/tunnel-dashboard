import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import {
  Folder,
  File,
  ChevronRight,
  Home,
  Upload,
  Download,
  Trash2,
  Edit,
  Copy,
  Search,
  FileText,
  FolderOpen,
  Settings
} from "lucide-react";

interface FileItem {
  id: string;
  name: string;
  type: "file" | "directory";
  size?: string;
  modified: string;
  permissions?: string;
  content?: string;
}

export default function FileManager() {
  const [currentPath, setCurrentPath] = useState("/var/www/html");
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock file system - in production, this would come from backend API
  const files: FileItem[] = [
    { id: "d1", name: "docker", type: "directory", modified: "2024-01-15 14:30", permissions: "drwxr-xr-x" },
    { id: "d2", name: "nginx", type: "directory", modified: "2024-01-14 09:22", permissions: "drwxr-xr-x" },
    { id: "d3", name: "config", type: "directory", modified: "2024-01-13 16:45", permissions: "drwxr-xr-x" },
    { id: "f1", name: "docker-compose.yml", type: "file", size: "2.4 KB", modified: "2024-01-15 14:30", permissions: "-rw-r--r--", content: `version: '3.8'

services:
  nginx:
    image: nginx:latest
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/conf.d:/etc/nginx/conf.d
      - ./nginx/ssl:/etc/nginx/ssl
    restart: unless-stopped

  postgres:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: secure_password
      POSTGRES_DB: myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:` },
    { id: "f2", name: "nginx.conf", type: "file", size: "1.8 KB", modified: "2024-01-14 09:22", permissions: "-rw-r--r--", content: `server {
    listen 80;
    server_name example.com;
    
    location / {
        proxy_pass http://backend:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}` },
    { id: "f3", name: ".env", type: "file", size: "512 B", modified: "2024-01-13 16:45", permissions: "-rw-------", content: `DATABASE_URL=postgresql://user:pass@localhost:5432/db
API_KEY=your_api_key_here
NODE_ENV=production` },
    { id: "f4", name: "README.md", type: "file", size: "3.2 KB", modified: "2024-01-12 11:15", permissions: "-rw-r--r--", content: `# Server Documentation

This is the main server configuration directory.

## Structure
- /docker - Docker configurations
- /nginx - Nginx web server configs
- /config - Application configurations` },
  ];

  const handleFileClick = (file: FileItem) => {
    if (file.type === "directory") {
      setCurrentPath(`${currentPath}/${file.name}`);
      setSelectedFile(null);
    } else {
      setSelectedFile(file);
    }
  };

  const handleFileAction = (action: string, fileName: string) => {
    toast({
      title: `File ${action}`,
      description: `${fileName} ${action} successfully`,
    });
  };

  const pathSegments = currentPath.split("/").filter(Boolean);

  const getFileIcon = (file: FileItem) => {
    if (file.type === "directory") {
      return <Folder className="h-5 w-5 text-accent" />;
    }
    if (file.name.endsWith(".yml") || file.name.endsWith(".yaml") || file.name.endsWith(".conf") || file.name.endsWith(".env")) {
      return <Settings className="h-5 w-5 text-primary" />;
    }
    return <FileText className="h-5 w-5 text-muted-foreground" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">File Manager</h2>
          <p className="text-muted-foreground">Browse and manage server files</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
          <Button>
            <FolderOpen className="mr-2 h-4 w-4" />
            New Folder
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => setCurrentPath("/")}
                  className="h-8 px-2"
                >
                  <Home className="h-4 w-4" />
                </Button>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                {pathSegments.map((segment, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setCurrentPath("/" + pathSegments.slice(0, index + 1).join("/"))}
                      className="h-8 px-2 font-mono"
                    >
                      {segment}
                    </Button>
                    {index < pathSegments.length - 1 && (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                ))}
              </div>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search files..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              <div className="space-y-1">
                {files.map((file) => (
                  <div
                    key={file.id}
                    onClick={() => handleFileClick(file)}
                    className={`flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-accent/50 cursor-pointer transition-colors ${
                      selectedFile?.id === file.id ? "bg-accent/50" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      {getFileIcon(file)}
                      <div className="flex-1">
                        <p className="font-mono text-sm font-medium">{file.name}</p>
                        <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                          <span>{file.permissions}</span>
                          <span>{file.modified}</span>
                          {file.size && <span>{file.size}</span>}
                        </div>
                      </div>
                    </div>
                    {file.type === "file" && (
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFileAction("downloaded", file.name);
                          }}
                        >
                          <Download className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFileAction("copied", file.name);
                          }}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFileAction("deleted", file.name);
                          }}
                        >
                          <Trash2 className="h-3 w-3 text-destructive" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>File Preview</CardTitle>
            <CardDescription>
              {selectedFile ? selectedFile.name : "Select a file to preview"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedFile ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  {getFileIcon(selectedFile)}
                  <div className="flex-1">
                    <p className="font-mono text-sm font-medium">{selectedFile.name}</p>
                    <p className="text-xs text-muted-foreground">{selectedFile.size}</p>
                  </div>
                </div>
                
                <Separator />

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Modified:</span>
                    <span className="font-mono">{selectedFile.modified}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Permissions:</span>
                    <span className="font-mono">{selectedFile.permissions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Size:</span>
                    <span className="font-mono">{selectedFile.size}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <p className="text-sm font-medium">Content Preview</p>
                  <ScrollArea className="h-[350px] w-full rounded-md border border-border/50 bg-muted/30">
                    <pre className="p-4 text-xs font-mono">
                      <code>{selectedFile.content || "Binary file - preview not available"}</code>
                    </pre>
                  </ScrollArea>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    <Edit className="mr-2 h-3 w-3" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Download className="mr-2 h-3 w-3" />
                    Download
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[500px] text-muted-foreground">
                <div className="text-center">
                  <File className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No file selected</p>
                  <p className="text-xs mt-2">Click on a file to preview its contents</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
