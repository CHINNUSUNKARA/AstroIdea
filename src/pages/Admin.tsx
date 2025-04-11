import React, { useEffect, useState } from 'react';
import PageLayout from '@/components/Layout/PageLayout';
import AdminSidebar from '@/components/Admin/AdminSidebar';
import { CircleDashed } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import UserManagement from '@/components/Admin/UserManagement';
import JobsManagement from '@/components/Admin/JobsManagement';
import ApplicationsManagement from '@/components/Admin/ApplicationsManagement';
import AdminSettings from '@/components/Admin/AdminSettings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navigate } from 'react-router-dom';
import { userApi, jobApi } from '../services/api';

const AdminDashboard = ({
  totalUsers,
  totalJobs,
  totalApplications,
}: {
  totalUsers: number;
  totalJobs: number;
  totalApplications: number;
}) => (
  <div className="flex flex-col space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="rounded-lg border bg-card text-card-foreground shadow p-4">
        <h3 className="font-medium">Total Users</h3>
        <div className="mt-2 text-2xl font-bold">{totalUsers}</div>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow p-4">
        <h3 className="font-medium">Total Jobs</h3>
        <div className="mt-2 text-2xl font-bold">{totalJobs}</div>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow p-4">
        <h3 className="font-medium">Total Applications</h3>
        <div className="mt-2 text-2xl font-bold">{totalApplications}</div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="rounded-lg border bg-card text-card-foreground shadow p-4">
        <h3 className="font-medium">Recent Activity</h3>
        <ul className="mt-2 space-y-2 text-sm">
          <li>User John Doe submitted a new application</li>
          <li>New job posting for Frontend Developer</li>
          <li>User Jane Smith updated their profile</li>
        </ul>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow p-4">
        <h3 className="font-medium">System Status</h3>
        <div className="mt-2 flex items-center">
          <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
          <span>All systems operational</span>
        </div>
      </div>
    </div>
  </div>
);

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { isAuthenticated, userRole, hasPermission, loading } = useAuth();
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalApplications, setTotalApplications] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        let page = 1;
        const limit = 100;
        let allUsers: any[] = [];
        let hasMore = true;

        while (hasMore) {
          const response = await userApi.getAll(page, limit);
          const users = response?.users || [];

          allUsers = [...allUsers, ...users];
          hasMore = users.length === limit;
          page++;
        }

        const filteredUsers = allUsers.filter(user => user.role === 'User');
        setTotalUsers(filteredUsers.length);

        const jobs = await jobApi.getAll();
        setTotalJobs(jobs.length);

        // Placeholder: replace with real applications API
        const applications = [];
        setTotalApplications(applications.length);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return null; // Wait until auth context resolves
  if (userRole === 'User') return <Navigate to="/dashboard" />;

  return (
    <PageLayout>
      <div className="flex h-[calc(100vh-64px)]">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex-1 overflow-y-auto p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-4 hidden">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="jobs">Jobs</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-4">
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <AdminDashboard
                totalUsers={totalUsers}
                totalJobs={totalJobs}
                totalApplications={totalApplications}
              />
            </TabsContent>

            <TabsContent value="users" className="space-y-4">
              <h1 className="text-2xl font-bold">User Management</h1>
              <UserManagement />
            </TabsContent>

            <TabsContent value="jobs" className="space-y-4">
              <h1 className="text-2xl font-bold">Jobs Management</h1>
              <JobsManagement />
            </TabsContent>

            <TabsContent value="applications" className="space-y-4">
              <h1 className="text-2xl font-bold">Applications Management</h1>
              <ApplicationsManagement />
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <h1 className="text-2xl font-bold">Admin Settings</h1>
              {hasPermission('settings') ? (
                <AdminSettings />
              ) : (
                <div className="flex flex-col items-center justify-center p-8">
                  <CircleDashed className="h-12 w-12 text-muted-foreground mb-4" />
                  <h2 className="text-xl font-medium">Access Restricted</h2>
                  <p className="text-muted-foreground text-center mt-2">
                    You don't have permission to access this section.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
};

export default Admin;
