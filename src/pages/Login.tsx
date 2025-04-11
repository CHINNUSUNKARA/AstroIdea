import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff } from 'lucide-react';
import PageLayout from '@/components/Layout/PageLayout';
import { toast } from "sonner";
import { useAuth } from '@/context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await login(email, password);
      
      if (result) {
        toast.success("Login successful!");
        
        // Get the role from local storage to determine where to redirect
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          
          // Redirect based on user role
          if (user.role === 'Admin' || user.role === 'HR' || user.role === 'Recruiter') {
            navigate("/admin");
          } else {
            navigate("/dashboard");
          }
        } else {
          navigate("/");
        }
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred during login.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border p-8">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 lg:pr-10">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Login to your Account</h1>
              <p className="text-gray-600 mb-8">Welcome back! Select the below login methods.</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email ID / Username
                  </label>
                  <Input
                    id="email"
                    type="text"
                    placeholder="Enter email id / username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pr-10"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-2.5 text-gray-500 focus:outline-none"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Checkbox
                      id="rememberMe"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked === true)}
                      className="text-purple-600"
                    />
                    <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-600">
                      Remember me
                    </label>
                  </div>
                  <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot Password?
                  </Link>
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-primary text-white hover:bg-primary/90 py-5"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>

                <div className="mt-4 p-3 bg-blue-50 rounded-md">
                  <h3 className="text-sm font-medium mb-2">Demo Credentials:</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p><strong>Admin:</strong> admin@example.com</p>
                      <p><strong>Password:</strong> admin123</p>
                    </div>
                    <div>
                      <p><strong>HR:</strong> hr@example.com</p>
                      <p><strong>Password:</strong> hr123</p>
                    </div>
                    <div>
                      <p><strong>Recruiter:</strong> recruiter@example.com</p>
                      <p><strong>Password:</strong> recruiter123</p>
                    </div>
                    <div>
                      <p><strong>User:</strong> user@example.com</p>
                      <p><strong>Password:</strong> user123</p>
                    </div>
                  </div>
                </div>
                
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">or login with</span>
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
                
                <div className="text-center mt-6">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-purple-600 font-medium hover:underline">
                      Register
                    </Link>
                  </p>
                </div>
              </form>
            </div>
            
            <div className="hidden lg:block lg:w-1/2 lg:pl-10">
              <img 
                src="/lovable-uploads/auth.png" 
                alt="Login illustration" 
                className="max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Login;
