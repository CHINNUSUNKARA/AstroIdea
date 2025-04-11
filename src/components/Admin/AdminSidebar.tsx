
import React from 'react';
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Briefcase, FileText, Users, Settings, ShieldCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, setActiveTab }) => {
  const { hasPermission, userRole } = useAuth();

  // Define sidebar items with permission checks
  const sidebarItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: LayoutDashboard, 
      visible: hasPermission('dashboard')
    },
    { 
      id: 'jobs', 
      label: 'Jobs', 
      icon: Briefcase, 
      visible: hasPermission('jobs')
    },
    { 
      id: 'applications', 
      label: 'Applications', 
      icon: FileText, 
      visible: hasPermission('applications')
    },
    { 
      id: 'users', 
      label: 'Users', 
      icon: Users, 
      visible: hasPermission('users')
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: Settings, 
      visible: hasPermission('settings')
    },
  ];

  // Filter sidebar items based on permissions
  const visibleItems = sidebarItems.filter(item => item.visible);

  return (
    <aside className="w-64 border-r min-h-screen bg-slate-50 p-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-primary">Admin Portal</h2>
        <p className="text-xs text-muted-foreground flex items-center">
          <ShieldCheck className="h-3 w-3 mr-1" />
          <span>{userRole?.charAt(0).toUpperCase() + userRole?.slice(1)} Role</span>
        </p>
      </div>
      
      <nav className="space-y-2">
        {visibleItems.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "default" : "ghost"}
            className={`w-full justify-start ${
              activeTab === item.id ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab(item.id)}
          >
            <item.icon className="mr-2 h-5 w-5" />
            {item.label}
          </Button>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
