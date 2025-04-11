
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronDown, ChevronUp, Search, MapPin, Clock } from 'lucide-react';
import JobCard from '@/components/Jobs/JobCard';
import PageLayout from '@/components/Layout/PageLayout';

const jobListings = [
  {
    id: '1',
    title: 'Technical Support Specialist',
    company: 'Google Inc.',
    location: 'New Delhi, India',
    salary: 'Salary: 20,000 INR - 25,000 INR',
    jobType: 'PART-TIME',
    logo: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png',
    applicants: 10,
    bookmark: false
  },
  {
    id: '2',
    title: 'Senior UI/UX Designer',
    company: 'Apple',
    location: 'Boston, USA',
    salary: 'Salary: $30,000 - $55,000',
    jobType: 'FULL-TIME',
    logo: 'https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png',
    applicants: 9,
    bookmark: false
  },
  {
    id: '3',
    title: 'Marketing Officer',
    company: 'Intel Corp',
    location: 'Bangalore, India',
    salary: 'Salary: 15,000 INR - 35,000 INR',
    jobType: 'PART-TIME',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Intel_logo_%282006-2020%29.svg/1005px-Intel_logo_%282006-2020%29.svg.png',
    applicants: 30,
    bookmark: false
  },
  {
    id: '4',
    title: 'Technical Support Specialist',
    company: 'Google Inc.',
    location: 'New Delhi, India',
    salary: 'Salary: 20,000 INR - 25,000 INR',
    jobType: 'PART-TIME',
    logo: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png',
    applicants: 10,
    bookmark: true
  },
  {
    id: '5',
    title: 'Senior UI/UX Designer',
    company: 'Apple',
    location: 'Boston, USA',
    salary: 'Salary: $30,000 - $55,000',
    jobType: 'FULL-TIME',
    logo: 'https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png',
    applicants: 9,
    bookmark: false
  },
  {
    id: '6',
    title: 'Senior UI/UX Designer',
    company: 'Apple',
    location: 'Boston, USA',
    salary: 'Salary: $30,000 - $55,000',
    jobType: 'FULL-TIME',
    logo: 'https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png',
    applicants: 9,
    bookmark: true
  }
];

const jobTypes = [
  { id: 'all', label: 'All', count: 2567 },
  { id: 'full-time', label: 'Full-Time', count: 450 },
  { id: 'part-time', label: 'Part-Time', count: 149 },
  { id: 'internship', label: 'Internship', count: 65 },
  { id: 'contract', label: 'Contract', count: 12 }
];

const workModes = [
  { id: 'on-site', label: 'On-Site' },
  { id: 'remote', label: 'Remote', count: 180 },
  { id: 'hybrid', label: 'Hybrid', count: 200 }
];

const jobFunctions = [
  { id: 'marketing', label: 'Marketing', count: 21 },
  { id: 'engineering', label: 'Engineering', count: 45 },
  { id: 'design', label: 'Design', count: 71 },
  { id: 'sales', label: 'Sales', count: 24 },
  { id: 'customer-service', label: 'Customer Service', count: 109 }
];

const experienceLevels = [
  { id: 'fresher', label: 'Fresher/Entry-Level', count: 265 },
  { id: 'junior', label: 'Junior', count: 21 },
  { id: 'mid-level', label: 'Mid-Level', count: 212 },
  { id: 'senior', label: 'Senior', count: 12 },
  { id: 'lead', label: 'Lead/Managerial', count: 24 },
  { id: 'director', label: 'Director/Executive', count: 10 }
];

interface FilterSectionProps {
  title: string;
  isOpen: boolean;
  toggleOpen: () => void;
  children: React.ReactNode;
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, isOpen, toggleOpen, children }) => {
  return (
    <div className="border-b pb-4">
      <div 
        className="flex justify-between items-center py-3 cursor-pointer"
        onClick={toggleOpen}
      >
        <h3 className="font-medium text-gray-900">{title}</h3>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </div>
      {isOpen && (
        <div className="mt-2 space-y-2">
          {children}
        </div>
      )}
    </div>
  );
};

const JobSearch = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');
  const [sortOrder, setSortOrder] = useState('Popular');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  
  const [openSections, setOpenSections] = useState({
    jobType: true,
    workMode: true,
    jobFunctions: true,
    experienceLevel: true
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <PageLayout>
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Search</h1>
          <p className="text-lg text-gray-600 mb-8">Search for your desired job matching your skills</p>
          
          {/* Search Filters */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Enter Job title"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Enter location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Years of experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="mt-4 text-right">
              <Button className="bg-primary text-white hover:bg-primary/90">
                Search
              </Button>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <h2 className="text-xl font-semibold">Filter</h2>
              <button className="ml-4 text-sm text-gray-500 hover:text-primary">
                Clear all
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-medium">All Jobs (2310)</span>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-white border rounded-md px-3 py-1 text-sm"
              >
                <option value="Popular">Popular</option>
                <option value="Latest">Latest</option>
                <option value="Highest Salary">Highest Salary</option>
                <option value="Lowest Salary">Lowest Salary</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                {/* Salary Range */}
                <div className="border-b pb-4 mb-4">
                  <h3 className="font-medium text-gray-900 mb-3">Salary Range</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Input
                        type="text"
                        placeholder="Min"
                        value={minSalary}
                        onChange={(e) => setMinSalary(e.target.value)}
                      />
                    </div>
                    <div>
                      <Input
                        type="text"
                        placeholder="Max"
                        value={maxSalary}
                        onChange={(e) => setMaxSalary(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Job Type */}
                <FilterSection
                  title="Job Type"
                  isOpen={openSections.jobType}
                  toggleOpen={() => toggleSection('jobType')}
                >
                  {jobTypes.map(type => (
                    <div key={type.id} className="flex items-center">
                      <Checkbox id={`job-type-${type.id}`} />
                      <label htmlFor={`job-type-${type.id}`} className="ml-2 text-sm text-gray-700 flex justify-between w-full">
                        <span>{type.label}</span>
                        <span className="text-gray-500">({type.count})</span>
                      </label>
                    </div>
                  ))}
                </FilterSection>
                
                {/* Work Mode */}
                <FilterSection
                  title="Work Mode"
                  isOpen={openSections.workMode}
                  toggleOpen={() => toggleSection('workMode')}
                >
                  {workModes.map(mode => (
                    <div key={mode.id} className="flex items-center">
                      <Checkbox id={`work-mode-${mode.id}`} />
                      <label htmlFor={`work-mode-${mode.id}`} className="ml-2 text-sm text-gray-700 flex justify-between w-full">
                        <span>{mode.label}</span>
                        {mode.count && <span className="text-gray-500">({mode.count})</span>}
                      </label>
                    </div>
                  ))}
                </FilterSection>
                
                {/* Job Functions */}
                <FilterSection
                  title="Job Functions"
                  isOpen={openSections.jobFunctions}
                  toggleOpen={() => toggleSection('jobFunctions')}
                >
                  {jobFunctions.map(func => (
                    <div key={func.id} className="flex items-center">
                      <Checkbox id={`job-function-${func.id}`} />
                      <label htmlFor={`job-function-${func.id}`} className="ml-2 text-sm text-gray-700 flex justify-between w-full">
                        <span>{func.label}</span>
                        <span className="text-gray-500">({func.count})</span>
                      </label>
                    </div>
                  ))}
                </FilterSection>
                
                {/* Experience Level */}
                <FilterSection
                  title="Experience Level"
                  isOpen={openSections.experienceLevel}
                  toggleOpen={() => toggleSection('experienceLevel')}
                >
                  {experienceLevels.map(level => (
                    <div key={level.id} className="flex items-center">
                      <Checkbox id={`exp-level-${level.id}`} />
                      <label htmlFor={`exp-level-${level.id}`} className="ml-2 text-sm text-gray-700 flex justify-between w-full">
                        <span>{level.label}</span>
                        <span className="text-gray-500">({level.count})</span>
                      </label>
                    </div>
                  ))}
                </FilterSection>
                
                <div className="mt-6 text-center">
                  <Button variant="link" className="text-primary hover:text-primary/90">
                    Expand all
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Job Listings */}
            <div className="lg:col-span-3 space-y-6">
              {jobListings.map((job) => (
                <JobCard key={job.id} {...job} />
              ))}
              
              <div className="mt-8 text-center">
                <Button variant="outline" className="text-primary border-primary hover:bg-primary/10">
                  View more
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default JobSearch;
