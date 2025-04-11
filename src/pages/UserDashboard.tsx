
import React from 'react';
import PageLayout from '@/components/Layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import StatCard from '@/components/Dashboard/StatCard';
import ApplicationsList from '@/components/Dashboard/ApplicationsList';

// Mock application data is now in ApplicationsList component

const UserDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  
  // These counts would ideally come from an API in a real implementation
  const totalApplications = 5;
  const pendingCount = 2;
  const interviewCount = 1;

  return (
    <PageLayout>
      <div className="py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
            <p className="text-gray-600">Welcome back, {currentUser?.name || 'User'}!</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard 
              title="Total Applications" 
              description="All job applications" 
              value={totalApplications} 
            />
            
            <StatCard 
              title="In Progress" 
              description="Applications under review" 
              value={pendingCount} 
            />
            
            <StatCard 
              title="Interviews" 
              description="Upcoming interviews" 
              value={interviewCount} 
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">My Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <ApplicationsList />
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default UserDashboard;
