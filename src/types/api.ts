
export interface UserEducation {
  degree?: string;
  institution?: string;
  year?: string;
}

export interface UserExperience {
  jobTitle?: string;
  company?: string;
  duration?: string;
}

export interface UserProject {
  title?: string;
  description?: string;
  techStack?: string;
}

export interface UserSocialLinks {
  github?: string;
  linkedin?: string;
  codechef?: string;
  leetcode?: string;
}

export interface User {
  [x: string]: Key;
  id: string;
  name: string;
  fullName?: string;
  email: string;
  mobile?: string;
  profileCompleted: boolean;
  status: 'Active' | 'Inactive';
  location?: string;
  education?: UserEducation[];
  experience?: UserExperience[];
  role: 'User' | 'HR' | 'Recruiter' | 'Admin';
  projects?: UserProject[];
  socialLinks?: UserSocialLinks;
  resume?: string;
}

export interface Job {
  _id: any;
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  salary?: string;
  experience?: string;
  employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Remote';
  postedDate: string;
  deadline?: string;
  status: 'Active' | 'Closed';
  skills: string[];
  applicantsCount?: number;
  logo?: string;
  bookmark?: boolean;
}


export interface Application {
  id: string;
  userId: string;
  jobId: string;
  status: 'Pending' | 'Shortlisted' | 'Rejected' | 'Interviewing' | 'Hired';
  appliedDate: string;
  job?: Job;
  user?: User;
  coverLetter?: string;
  resumeUrl?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface PaginatedUsersResponse {
  totalUsers: number;
  currentPage: number;
  totalPages: number;
  users: User[];
}

export interface ApiErrorResponse {
  message: string;
  error?: string;
}
