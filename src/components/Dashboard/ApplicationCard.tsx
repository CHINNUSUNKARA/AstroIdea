
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Application {
  id: string;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: string;
  jobDescription: string;
  location: string;
}

// Status color mapping
const statusColorMap: Record<string, string> = {
  pending: 'bg-yellow-500',
  approved: 'bg-green-500',
  rejected: 'bg-red-500',
  interview: 'bg-blue-500'
};

// Status label mapping
const statusLabelMap: Record<string, string> = {
  pending: 'Pending Review',
  approved: 'Approved',
  rejected: 'Rejected',
  interview: 'Interview Scheduled'
};

interface ApplicationCardProps {
  application: Application;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application }) => {
  return (
    <div className="border rounded-lg p-4 bg-white">
      <div className="flex flex-col md:flex-row justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-1">{application.jobTitle}</h3>
          <p className="text-gray-600 mb-1">{application.company} • {application.location}</p>
          <p className="text-gray-500 text-sm mb-2">Applied on: {new Date(application.appliedDate).toLocaleDateString()}</p>
          <p className="text-gray-700 mb-3">{application.jobDescription}</p>
        </div>
        <div className="flex flex-col items-start md:items-end mt-2 md:mt-0">
          <Badge className={`${statusColorMap[application.status]} mb-2`}>
            {statusLabelMap[application.status]}
          </Badge>
          <Button variant="outline" size="sm">View Details</Button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;
