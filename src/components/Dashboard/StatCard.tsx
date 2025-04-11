
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDown, ArrowUp, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  description: string;
  value: number;
  change?: number;
  icon?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, description, value, change, icon }) => {
  const renderChangeIndicator = () => {
    if (!change && change !== 0) return null;
    
    if (change > 0) {
      return (
        <div className="flex items-center text-green-600 text-sm">
          <ArrowUp className="h-4 w-4 mr-1" />
          <span>{change}% increase</span>
        </div>
      );
    } else if (change < 0) {
      return (
        <div className="flex items-center text-red-600 text-sm">
          <ArrowDown className="h-4 w-4 mr-1" />
          <span>{Math.abs(change)}% decrease</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center text-gray-600 text-sm">
          <Minus className="h-4 w-4 mr-1" />
          <span>No change</span>
        </div>
      );
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          {icon && (
            <div className="p-2 bg-primary/10 rounded-lg">
              {icon}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-4xl font-bold">{value}</p>
        {renderChangeIndicator()}
      </CardContent>
    </Card>
  );
};

export default StatCard;
