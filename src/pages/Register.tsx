import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import PageLayout from '@/components/Layout/PageLayout';
import { toast } from "sonner";
import { useAuth } from '@/context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    mobileNumber: '',
    receiveUpdates: true,
    rememberPassword: false
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        mobileNumber: formData.mobileNumber
      });
      
      if (result) {
        toast.success("Registration successful! Welcome to our platform.");
        navigate("/dashboard");
      } else {
        toast.error("Email already in use. Please try a different email.");
      }
    } catch (error) {
      toast.error("An error occurred during registration.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="py-10 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Registration form</h1>
          <p className="text-gray-600 mb-8">Register to apply for jobs of your choice all over the world</p>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full name<span className="text-red-500">*</span>
                </label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email ID<span className="text-red-500">*</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email id"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">Job notifications will be sent to this email id</p>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password<span className="text-red-500">*</span>
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="(Minimum 6 characters)"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full"
                />
                <div className="mt-1 flex items-center">
                  <Checkbox
                    id="rememberPassword"
                    name="rememberPassword"
                    checked={formData.rememberPassword}
                    onCheckedChange={(checked) => setFormData(prev => ({
                      ...prev,
                      rememberPassword: checked === true
                    }))}
                  />
                  <label htmlFor="rememberPassword" className="ml-2 text-sm text-gray-600">
                    Remember your password
                  </label>
                </div>
              </div>
              
              <div>
                <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile number<span className="text-red-500">*</span>
                </label>
                <Input
                  id="mobileNumber"
                  name="mobileNumber"
                  type="tel"
                  placeholder="Enter your mobile number"
                  required
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">Recruiters will contact you on this number</p>
              </div>
              
              <div className="flex items-center">
                <Checkbox
                  id="receiveUpdates"
                  name="receiveUpdates"
                  checked={formData.receiveUpdates}
                  onCheckedChange={(checked) => setFormData(prev => ({
                    ...prev,
                    receiveUpdates: checked === true
                  }))}
                  className="text-purple-600"
                />
                <label htmlFor="receiveUpdates" className="ml-3 text-sm text-gray-600">
                  Send me important updates & promotions via SMS, email, and <span className="text-green-600">WhatsApp</span>
                </label>
              </div>
              
              <div className="mt-2 text-sm text-gray-600">
                By clicking Register, you agree to the
                <Link to="/terms" className="text-blue-600 hover:underline ml-1">Terms and Conditions</Link>
                <span className="mx-1">&</span>
                <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
                <span className="ml-1">of AlwaysApply.com</span>
              </div>
              
              <div>
                <Button
                  type="submit"
                  className="w-full bg-primary text-white hover:bg-primary/90 py-5 text-lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Registering..." : "Register now"}
                </Button>
              </div>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or signup with</span>
                </div>
              </div>
              
              <div className="flex justify-center space-x-6">
                <button type="button" className="p-2 border rounded-full hover:bg-gray-50">
                  <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="Google" className="h-6" />
                </button>
                
                <button type="button" className="p-2 border rounded-full hover:bg-gray-50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </button>
                
                <button type="button" className="p-2 border rounded-full hover:bg-gray-50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-700">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
};

export default Register;
