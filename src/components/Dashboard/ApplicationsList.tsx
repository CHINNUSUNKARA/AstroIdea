
import React, { useState } from 'react';
import { Card } from '../ui/card';
import ApplicationCard from './ApplicationCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock application data for user dashboard
const mockUserApplications = [
  {
    id: '1',
    jobTitle: 'Frontend Developer',
    company: 'Google Inc.',
    appliedDate: '2025-03-15',
    status: 'pending',
    jobDescription: 'Create responsive web applications using React and modern JavaScript.',
    location: 'New York, USA'
  },
  {
    id: '2',
    jobTitle: 'UI/UX Designer',
    company: 'Apple',
    appliedDate: '2025-03-10',
    status: 'approved',
    jobDescription: 'Design user interfaces for innovative products that define the future of technology.',
    location: 'Cupertino, CA'
  },
  {
    id: '3',
    jobTitle: 'Backend Engineer',
    company: 'Microsoft',
    appliedDate: '2025-02-28',
    status: 'rejected',
    jobDescription: 'Develop robust backend systems using Node.js, Python, and cloud technologies.',
    location: 'Seattle, WA'
  },
  {
    id: '4',
    jobTitle: 'Product Manager',
    company: 'Amazon',
    appliedDate: '2025-03-05',
    status: 'interview',
    jobDescription: 'Lead product development from concept to launch, working with cross-functional teams.',
    location: 'Boston, MA'
  },
  {
    id: '5',
    jobTitle: 'Data Analyst',
    company: 'Netflix',
    appliedDate: '2025-03-18',
    status: 'pending',
    jobDescription: 'Analyze user behavior data to provide insights for business decisions.',
    location: 'Los Angeles, CA'
  }
];

interface ApplicationsListProps {
  className?: string;
}

const ApplicationsList: React.FC<ApplicationsListProps> = ({ className }) => {
  const [applications] = useState(mockUserApplications);
  const [activeTab, setActiveTab] = useState('all');
  
  const filteredApplications = activeTab === 'all' 
    ? applications 
    : applications.filter(app => app.status === activeTab);

  return (
    <Card className={`p-6 ${className}`}>
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="interview">Interview</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab}>
          {filteredApplications.length > 0 ? (
            <div className="space-y-4">
              {filteredApplications.map(application => (
                <ApplicationCard key={application.id} application={application} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No applications found.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default ApplicationsList;
