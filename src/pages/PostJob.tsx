
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PageLayout from '@/components/Layout/PageLayout';
import { toast } from "sonner";
import { Bold, Italic, Underline, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, Image, Link as LinkIcon } from 'lucide-react';

const PostJob = () => {
  const [jobData, setJobData] = useState({
    title: '',
    tags: '',
    jobRole: '',
    minSalary: '',
    maxSalary: '',
    currency: 'INR',
    vacancies: '',
    jobLevel: '',
    country: '',
    city: '',
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setJobData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setJobData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Job posting submitted:', jobData);
    
    toast.success("Job posted successfully!");
    
    // In a real application, we'd make an API call here to submit the job
    // For now, reset the form or redirect
    setTimeout(() => {
      window.location.href = "/jobs";
    }, 1000);
  };

  return (
    <PageLayout>
      <div className="py-10 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a job</h1>
          <p className="text-gray-600 mb-8">Find the best talent for your company</p>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Job Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Job Title
              </label>
              <Input
                id="title"
                name="title"
                placeholder="Add job title, role vacancies etc"
                value={jobData.title}
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>
            
            {/* Tags & Job Role */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                  Tags
                </label>
                <Input
                  id="tags"
                  name="tags"
                  placeholder="Job keyword, tags etc.."
                  value={jobData.tags}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="jobRole" className="block text-sm font-medium text-gray-700 mb-1">
                  Job Role
                </label>
                <Select
                  value={jobData.jobRole}
                  onValueChange={(value) => handleSelectChange('jobRole', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="designer">Designer</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Salary */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salary
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="minSalary" className="sr-only">Min Salary</label>
                  <div className="flex">
                    <Input
                      id="minSalary"
                      name="minSalary"
                      placeholder="Minimum Salary..."
                      value={jobData.minSalary}
                      onChange={handleChange}
                      type="number"
                      className="rounded-r-none"
                    />
                    <span className="inline-flex items-center px-3 py-2 text-sm bg-gray-100 border border-l-0 border-gray-300 rounded-r-md">
                      {jobData.currency}
                    </span>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="maxSalary" className="sr-only">Max Salary</label>
                  <div className="flex">
                    <Input
                      id="maxSalary"
                      name="maxSalary"
                      placeholder="Maximum Salary..."
                      value={jobData.maxSalary}
                      onChange={handleChange}
                      type="number"
                      className="rounded-r-none"
                    />
                    <span className="inline-flex items-center px-3 py-2 text-sm bg-gray-100 border border-l-0 border-gray-300 rounded-r-md">
                      {jobData.currency}
                    </span>
                  </div>
                </div>
                
                <div>
                  <Select
                    value={jobData.currency}
                    onValueChange={(value) => handleSelectChange('currency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INR">INR</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {/* Vacancies & Job Level */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="vacancies" className="block text-sm font-medium text-gray-700 mb-1">
                  Vacancies
                </label>
                <Select
                  value={jobData.vacancies}
                  onValueChange={(value) => handleSelectChange('vacancies', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5+">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="jobLevel" className="block text-sm font-medium text-gray-700 mb-1">
                  Job Level
                </label>
                <Select
                  value={jobData.jobLevel}
                  onValueChange={(value) => handleSelectChange('jobLevel', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level</SelectItem>
                    <SelectItem value="junior">Junior</SelectItem>
                    <SelectItem value="mid">Mid Level</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                    <SelectItem value="lead">Lead/Manager</SelectItem>
                    <SelectItem value="executive">Executive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="country" className="sr-only">Country</label>
                  <Select
                    value={jobData.country}
                    onValueChange={(value) => handleSelectChange('country', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="india">India</SelectItem>
                      <SelectItem value="usa">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="canada">Canada</SelectItem>
                      <SelectItem value="germany">Germany</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label htmlFor="city" className="sr-only">City</label>
                  <Select
                    value={jobData.city}
                    onValueChange={(value) => handleSelectChange('city', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bangalore">Bangalore</SelectItem>
                      <SelectItem value="mumbai">Mumbai</SelectItem>
                      <SelectItem value="delhi">Delhi</SelectItem>
                      <SelectItem value="hyderabad">Hyderabad</SelectItem>
                      <SelectItem value="chennai">Chennai</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {/* Job Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Job Description
              </label>
              <div className="border rounded-md">
                <div className="flex flex-wrap border-b bg-gray-50 px-3 py-2 gap-1">
                  <button type="button" className="p-1 hover:bg-gray-200 rounded">
                    <Bold className="w-5 h-5" />
                  </button>
                  <button type="button" className="p-1 hover:bg-gray-200 rounded">
                    <Italic className="w-5 h-5" />
                  </button>
                  <button type="button" className="p-1 hover:bg-gray-200 rounded">
                    <Underline className="w-5 h-5" />
                  </button>
                  <span className="border-r mx-1"></span>
                  <button type="button" className="p-1 hover:bg-gray-200 rounded">
                    <AlignLeft className="w-5 h-5" />
                  </button>
                  <button type="button" className="p-1 hover:bg-gray-200 rounded">
                    <AlignCenter className="w-5 h-5" />
                  </button>
                  <button type="button" className="p-1 hover:bg-gray-200 rounded">
                    <AlignRight className="w-5 h-5" />
                  </button>
                  <span className="border-r mx-1"></span>
                  <button type="button" className="p-1 hover:bg-gray-200 rounded">
                    <List className="w-5 h-5" />
                  </button>
                  <button type="button" className="p-1 hover:bg-gray-200 rounded">
                    <ListOrdered className="w-5 h-5" />
                  </button>
                  <span className="border-r mx-1"></span>
                  <button type="button" className="p-1 hover:bg-gray-200 rounded">
                    <Image className="w-5 h-5" />
                  </button>
                  <button type="button" className="p-1 hover:bg-gray-200 rounded">
                    <LinkIcon className="w-5 h-5" />
                  </button>
                  <select className="text-sm p-1 border rounded bg-white ml-1">
                    <option>14</option>
                    <option>16</option>
                    <option>18</option>
                    <option>20</option>
                    <option>24</option>
                  </select>
                </div>
                <textarea
                  id="description"
                  name="description"
                  rows={10}
                  placeholder="Add your description..."
                  className="w-full p-4 border-0 focus:ring-0 focus:outline-none"
                  value={jobData.description}
                  onChange={(e) => setJobData(prev => ({ ...prev, description: e.target.value }))}
                ></textarea>
              </div>
            </div>
            
            <div>
              <Button
                type="submit"
                className="bg-primary text-white hover:bg-primary/90 py-6 px-10 text-lg"
              >
                Post Job
              </Button>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
};

export default PostJob;
