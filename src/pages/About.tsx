
import React from 'react';
import PageLayout from '@/components/Layout/PageLayout';
import { Card } from '@/components/ui/card';

const About = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
          
          <Card className="p-8 mb-10">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-6">
              At AlwaysApply, we're on a mission to connect talented professionals with their dream jobs. 
              We believe that finding the right job shouldn't be a hassle, and hiring the right talent 
              shouldn't be a guessing game. That's why we've built a platform that makes the job search 
              and hiring process as seamless and efficient as possible.
            </p>
            <p className="text-gray-700">
              Our innovative approach uses the latest technology to match job seekers with employers based 
              on skills, experience, and culture fit, ensuring that both parties find exactly what they're 
              looking for.
            </p>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-3">For Job Seekers</h2>
              <ul className="space-y-2 text-gray-700 list-disc list-inside">
                <li>Access to thousands of verified job listings</li>
                <li>Personalized job recommendations</li>
                <li>Easy application process</li>
                <li>Career development resources</li>
                <li>Interview preparation support</li>
              </ul>
            </Card>
            
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-3">For Employers</h2>
              <ul className="space-y-2 text-gray-700 list-disc list-inside">
                <li>Targeted recruitment campaigns</li>
                <li>AI-powered candidate matching</li>
                <li>Streamlined application management</li>
                <li>Employer branding solutions</li>
                <li>Data-driven hiring insights</li>
              </ul>
            </Card>
          </div>
          
          <Card className="p-8 mb-10">
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-700 mb-4">
              Founded in 2023, AlwaysApply was born out of the frustration experienced by our founders 
              during their own job searches. They realized that the traditional job application process 
              was broken – too time-consuming, inefficient, and often disheartening.
            </p>
            <p className="text-gray-700 mb-4">
              What started as a small project to help friends find jobs has grown into a comprehensive 
              platform serving thousands of job seekers and employers worldwide. Our team has grown from 
              just three passionate individuals to a diverse group of professionals dedicated to 
              transforming how people find their perfect career match.
            </p>
            <p className="text-gray-700">
              Today, we're proud to have helped over 10,000 professionals find meaningful employment 
              and assisted hundreds of companies in building their dream teams.
            </p>
          </Card>
          
          <div className="bg-primary/5 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="m3 11 18-5-5 18-4-7-9-6Z"></path>
                  </svg>
                </div>
                <h3 className="font-bold mb-2">Innovation</h3>
                <p className="text-gray-700">We constantly seek new and better ways to solve recruitment challenges.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </div>
                <h3 className="font-bold mb-2">Transparency</h3>
                <p className="text-gray-700">We believe in open, honest communication with our users and partners.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M18 8a6 6 0 0 0-6-6 6 6 0 0 0-6 6c0 7 6 13 6 13s6-6 6-13Z"></path>
                    <circle cx="12" cy="8" r="2"></circle>
                  </svg>
                </div>
                <h3 className="font-bold mb-2">Impact</h3>
                <p className="text-gray-700">We're committed to making a positive difference in people's careers and lives.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default About;
