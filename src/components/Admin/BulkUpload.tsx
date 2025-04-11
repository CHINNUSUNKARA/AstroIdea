
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BulkUploadJobs from './BulkUploadJobs';
import BulkUploadUsers from './BulkUploadUsers';

const BulkUpload = () => {
  const [activeTab, setActiveTab] = useState('jobs');

  return (
    <Card className="border-0 shadow-none">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        
        <TabsContent value="jobs" className="mt-4">
          <BulkUploadJobs />
        </TabsContent>
        
        <TabsContent value="users" className="mt-4">
          <BulkUploadUsers />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default BulkUpload;
