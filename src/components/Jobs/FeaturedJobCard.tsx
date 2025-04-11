
import React from 'react';
import { BookmarkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface FeaturedJobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  jobType: string;
  logo: string;
  applicants: number;
  bookmarked?: boolean;
}

const FeaturedJobCard: React.FC<FeaturedJobCardProps> = ({
  id,
  title,
  company,
  location,
  salary,
  jobType,
  logo,
  applicants,
  bookmarked = false
}) => {
  const [isBookmarked, setIsBookmarked] = React.useState(bookmarked);
  
  const jobTypeColor = jobType === 'FULL-TIME' 
    ? 'bg-purple-100 text-purple-800' 
    : 'bg-green-100 text-green-800';

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border h-full hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex justify-between">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${jobTypeColor}`}>
            {jobType}
          </span>
          <button 
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="text-gray-400 hover:text-purple-500 focus:outline-none"
          >
            <BookmarkIcon className={`h-5 w-5 ${isBookmarked ? 'fill-purple-600 text-purple-600' : ''}`} />
          </button>
        </div>
        
        <h3 className="font-medium text-lg mt-2 text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{salary}</p>
        
        <div className="mt-4 flex items-center">
          <img 
            src={logo} 
            alt={company} 
            className="h-8 w-8 rounded-full mr-2"
          />
          <div>
            <div className="text-sm font-medium text-gray-900">{company}</div>
            <div className="flex items-center text-xs text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {location}
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex items-center text-xs text-gray-500">
          <div className="flex -space-x-1 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <img
                key={i}
                className="inline-block h-5 w-5 rounded-full ring-1 ring-white"
                src={`https://randomuser.me/api/portraits/men/${10 + i}.jpg`}
                alt=""
              />
            ))}
          </div>
          <span className="ml-2">{applicants}+ applicants</span>
        </div>
      </div>
      
      <div className="border-t p-3 bg-gray-50 flex justify-between">
        <Link to={`/jobs/${id}`}>
          <Button variant="outline" size="sm">View details</Button>
        </Link>
        <Link to={`/apply/${id}`}>
          <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">Apply now</Button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedJobCard;
