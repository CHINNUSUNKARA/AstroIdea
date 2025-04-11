
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CompanyLogo from '@/components/Layout/CompanyLogo';
import { useAuth } from '@/context/AuthContext';
import { LogOut, User, LayoutDashboard, Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  // Check if user can access admin section - fix case sensitivity
  const isAdminUser = isAuthenticated && 
    (currentUser?.role === 'Admin' || currentUser?.role === 'HR' || currentUser?.role === 'Recruiter');
  
  // Check if user is a regular user - fix case sensitivity
  const isRegularUser = isAuthenticated && currentUser?.role === 'User';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Navigation links shared between desktop and mobile
  const navigationLinks = (
    <>
      <Link to="/" className="py-2 px-3 text-violet-900 hover:text-primary transition">
        Home
      </Link>
      <Link to="/jobs" className="py-2 px-3 text-violet-900 hover:text-primary transition">
        Find Jobs
      </Link>
      <Link to="/about" className="py-2 px-3 text-violet-900 hover:text-primary transition">
        About Us
      </Link>
      
      {isAdminUser && (
        <Link to="/admin" className="py-2 px-3 text-violet-900 hover:text-primary transition">
          Admin
        </Link>
      )}
      
      {isRegularUser && (
        <Link to="/dashboard" className="py-2 px-3 text-violet-900 hover:text-primary transition">
          Dashboard
        </Link>
      )}
    </>
  );

  return (
    <nav className="border-b py-4 bg-white">
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
        <div className="flex-shrink-0">
          <CompanyLogo />
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navigationLinks}
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col space-y-4 mt-6">
                  {navigationLinks}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <Link to="/contact">
            <Button variant="outline" className="border-primary text-primary hover:text-primary-foreground hover:bg-primary">
              Contact Us
            </Button>
          </Link>
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-white">
                      {currentUser?.name?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{currentUser?.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {currentUser?.email}
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                {isRegularUser && (
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer flex items-center gap-2">
                      <LayoutDashboard size={16} />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                
                {isAdminUser && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="cursor-pointer flex items-center gap-2">
                      <LayoutDashboard size={16} />
                      <span>Admin Panel</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer flex items-center gap-2">
                    <User size={16} />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer flex items-center gap-2 text-red-500">
                  <LogOut size={16} />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button className="bg-primary text-white hover:bg-primary/90">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
