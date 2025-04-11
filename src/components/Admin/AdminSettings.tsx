
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

// Mock data for roles
const rolesData = [
  { id: 1, role: 'Super Admin', description: 'Full system access and control', users: 2 },
  { id: 2, role: 'HR', description: 'Access to job postings and applications', users: 5 },
  { id: 3, role: 'Recruiter', description: 'Limited access to job applications', users: 8 },
  { id: 4, role: 'User', description: 'Apply to jobs and manage own profile', users: 42 }
];

// Mock permissions
const mockPermissions = [
  { id: 'jobs_view', name: 'View Jobs', description: 'Can view all job listings' },
  { id: 'jobs_create', name: 'Create Jobs', description: 'Can create new job listings' },
  { id: 'jobs_edit', name: 'Edit Jobs', description: 'Can edit existing job listings' },
  { id: 'jobs_delete', name: 'Delete Jobs', description: 'Can delete job listings' },
  { id: 'apps_view', name: 'View Applications', description: 'Can view all applications' },
  { id: 'apps_process', name: 'Process Applications', description: 'Can process applications' },
  { id: 'users_view', name: 'View Users', description: 'Can view all users' },
  { id: 'users_edit', name: 'Edit Users', description: 'Can edit user information' },
  { id: 'settings', name: 'Manage Settings', description: 'Can change system settings' },
];

// Default permissions map by role
const defaultRolePermissions = {
  'Super Admin': mockPermissions.map(p => p.id),
  'HR': ['jobs_view', 'jobs_create', 'jobs_edit', 'apps_view', 'apps_process'],
  'Recruiter': ['jobs_view', 'apps_view', 'apps_process'],
  'User': []
};

const EmailConfigCard: React.FC<{ title: string; description: string }> = ({ title, description }) => {
  const [enabled, setEnabled] = useState(false);
  
  const handleSave = () => {
    toast.success(`${title} settings saved successfully!`);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id={`${title.toLowerCase().replace(/\s/g, '-')}-enabled`} 
                   checked={enabled}
                   onCheckedChange={setEnabled} />
            <Label htmlFor={`${title.toLowerCase().replace(/\s/g, '-')}-enabled`}>
              Enable notifications
            </Label>
          </div>
          
          {enabled && (
            <div className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor={`${title.toLowerCase().replace(/\s/g, '-')}-recipients`}>
                  Recipients (comma separated emails)
                </Label>
                <Input 
                  id={`${title.toLowerCase().replace(/\s/g, '-')}-recipients`} 
                  placeholder="admin@example.com, hr@example.com" 
                />
              </div>
              
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor={`${title.toLowerCase().replace(/\s/g, '-')}-template`}>
                  Email Template
                </Label>
                <textarea 
                  id={`${title.toLowerCase().replace(/\s/g, '-')}-template`} 
                  placeholder="Hello {{name}}, a new {{event}} has occurred."
                  className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              
              <Button onClick={handleSave}>Save Configuration</Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const RoleManagement = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedRolePermissions, setSelectedRolePermissions] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const handleEditPermissions = (role: string) => {
    setSelectedRole(role);
    setSelectedRolePermissions([...defaultRolePermissions[role as keyof typeof defaultRolePermissions]]);
    setDialogOpen(true);
  };
  
  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (checked) {
      setSelectedRolePermissions([...selectedRolePermissions, permissionId]);
    } else {
      setSelectedRolePermissions(selectedRolePermissions.filter(id => id !== permissionId));
    }
  };
  
  const handleSavePermissions = () => {
    toast.success(`Permissions updated for ${selectedRole} role`);
    setDialogOpen(false);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Role Management</CardTitle>
        <CardDescription>Configure access levels and permissions for different roles.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rolesData.map((role) => (
              <TableRow key={role.id}>
                <TableCell>
                  <div className="font-medium">{role.role}</div>
                </TableCell>
                <TableCell>{role.description}</TableCell>
                <TableCell>
                  <Badge variant="outline">{role.users}</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={() => handleEditPermissions(role.role)}>
                    Edit Permissions
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit {selectedRole} Permissions</DialogTitle>
              <DialogDescription>
                Choose which actions this role is allowed to perform.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 max-h-[50vh] overflow-y-auto">
              {mockPermissions.map((permission) => (
                <div key={permission.id} className="flex items-start space-x-2">
                  <Checkbox 
                    id={permission.id} 
                    checked={selectedRolePermissions.includes(permission.id)}
                    onCheckedChange={(checked) => handlePermissionChange(permission.id, checked === true)} 
                  />
                  <div className="grid gap-0.5">
                    <Label htmlFor={permission.id} className="text-sm font-medium">
                      {permission.name}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {permission.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSavePermissions}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

const AdminSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Platform Settings</h2>
        <p className="text-muted-foreground">
          Configure system settings and manage access to the platform.
        </p>
      </div>
      
      <Tabs defaultValue="notifications">
        <TabsList>
          <TabsTrigger value="notifications">Email Notifications</TabsTrigger>
          <TabsTrigger value="roles">Role Management</TabsTrigger>
        </TabsList>
        
        <TabsContent value="notifications" className="space-y-4 mt-4">
          <h3 className="text-lg font-medium">Email Notifications</h3>
          <p className="text-muted-foreground mb-4">Configure system email notification settings.</p>
          
          <div className="grid gap-6 md:grid-cols-2">
            <EmailConfigCard 
              title="New Application Alerts" 
              description="Notify admins when new applications are received"
            />
            <EmailConfigCard 
              title="User Registration Alerts" 
              description="Notify admins when new users register"
            />
            <EmailConfigCard 
              title="Job Posting Expiration" 
              description="Send reminders when job postings are about to expire"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="roles" className="space-y-4 mt-4">
          <h3 className="text-lg font-medium">Role Management</h3>
          <p className="text-muted-foreground mb-4">
            Configure the permissions for each role in the system.
          </p>
          
          <RoleManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
