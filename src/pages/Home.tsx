
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import JobCard from '@/components/Jobs/JobCard';
import PageLayout from '@/components/Layout/PageLayout';
import { MapPinIcon, SearchIcon } from 'lucide-react';

const featuredJobs = [
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
  }
];

const companies = [
  { name: 'Google', logo: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png' },
  { name: 'Microsoft', logo: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31' },
  { name: 'Infosys', logo: 'https://1000logos.net/wp-content/uploads/2020/08/Infosys-Logo.png' },
  { name: 'YouTube', logo: 'https://www.youtube.com/s/desktop/fa273944/img/favicon_144x144.png' },
  { name: 'IBM', logo: 'https://www.ibm.com/brand/experience-guides/developer/8f4e3cc2b5d52354a6d43c8edba1e3c9/02_8-bar-reverse.svg' }
];

const Home = () => {
  const [jobSearchQuery, setJobSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');

  return (
    <PageLayout>
      {/* Hero Section */}
      <div className="bg-purple-light py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="animate-fade-in">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                Find a job that aligns with your interests and skills
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Thousands of jobs in all the leading sector are waiting for you.
              </p>
              
              <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col md:flex-row gap-2">
                <div className="relative flex-grow">
                  <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input 
                    type="text"
                    placeholder="Job title, Keyword..."
                    className="pl-10"
                    value={jobSearchQuery}
                    onChange={(e) => setJobSearchQuery(e.target.value)}
                  />
                </div>
                <div className="relative flex-grow">
                  <MapPinIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input 
                    type="text"
                    placeholder="Location"
                    className="pl-10"
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                  />
                </div>
                <Link to="/jobs">
                  <Button className="bg-primary text-white hover:bg-primary/90 w-full md:w-auto">
                    Find Job
                  </Button>
                </Link>
              </div>
              
              <div className="mt-4 text-sm text-gray-600">
                <span>Suggestion: </span>
                <span className="text-gray-700">UI/UX Designer, </span>
                <span className="text-gray-700">Programming, </span>
                <span className="text-purple-600">Digital Marketing</span>
                <span className="text-gray-700">, Video, Animation.</span>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="/lovable-uploads/hero_img.png" 
                alt="Job search illustration" 
                className="w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Jobs Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Jobs</h2>
            <p className="text-gray-600">Choose jobs from the top employers and apply for the same.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} {...job} />
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Link to="/jobs">
              <Button variant="link" className="text-primary hover:text-primary/90">
                View all
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Companies Section */}
      <div className="py-12 border-t">
        <div className="container mx-auto px-4">
          <h3 className="text-xl font-semibold text-center mb-8">Top companies hiring now</h3>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {companies.map((company) => (
              <div key={company.name} className="flex items-center">
                <img 
                  src={company.logo} 
                  alt={`${company.name} logo`}
                  className="h-10 object-contain" 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;
