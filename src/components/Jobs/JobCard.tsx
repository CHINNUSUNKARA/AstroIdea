
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookmarkIcon } from 'lucide-react';

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  jobType: string;
  logo: string;
  applicants: number;
  bookmark?: boolean;
}

const JobCard = ({
  id,
  title,
  company,
  location,
  salary,
  jobType,
  logo,
  applicants,
  bookmark = false
}: JobCardProps) => {
  const [isBookmarked, setIsBookmarked] = useState(bookmark);

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsBookmarked(!isBookmarked);
  };

  const jobTypeColor = jobType === 'FULL-TIME' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800';

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-all">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <button
          onClick={toggleBookmark}
          className="text-gray-400 hover:text-purple-500 focus:outline-none"
        >
          <BookmarkIcon
            className={`h-5 w-5 ${isBookmarked ? 'fill-purple-600 text-purple-600' : ''}`}
          />
        </button>
      </div>
      
      <div className="mt-2">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${jobTypeColor}`}>
          {jobType}
        </span>
        <span className="ml-2 text-gray-500 text-sm">
          {salary}
        </span>
      </div>
      
      <div className="mt-4 flex items-start">
        <div className="flex-shrink-0">
          <img src={logo} alt={company} className="h-10 w-10 rounded-full" />
        </div>
        <div className="ml-3">
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
      
      <div className="mt-6 flex justify-between items-center">
        <div className="flex items-center">
          <div className="flex -space-x-1 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <img
                key={i}
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                src={`https://randomuser.me/api/portraits/men/${10 + i}.jpg`}
                alt=""
              />
            ))}
          </div>
          <span className="ml-2 text-xs text-gray-500">
            {applicants}+ applicants
          </span>
        </div>
        
        <div className="flex space-x-2">
          <Link to={`/jobs/${id}`}>
            <Button variant="outline" size="sm" className="text-sm">
              View details
            </Button>
          </Link>
          <Link to={`/apply/${id}`}>
            <Button size="sm" className="bg-primary text-white hover:bg-primary/90 text-sm">
              Apply now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
