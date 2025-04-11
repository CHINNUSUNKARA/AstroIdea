import { User, LoginResponse, PaginatedUsersResponse, Job, Application } from '../types/api';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Helper to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'API request failed');
  }
  return response.json();
}

// Authentication APIs
export const authApi = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse<LoginResponse>(response);
  },

  register: async (
    name: string,
    email: string,
    password: string,
    mobile: string
  ): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, mobile }),
    });
    return handleResponse<{ message: string }>(response);
  },
};

// User APIs
export const userApi = {
  getAll: async (
    page = 1,
    limit = 10,
    filters?: { name?: string; location?: string; email?: string }
  ): Promise<PaginatedUsersResponse> => {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(filters?.name && { name: filters.name }),
      ...(filters?.location && { location: filters.location }),
      ...(filters?.email && { email: filters.email }),
    });

    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/users?${queryParams}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse<PaginatedUsersResponse>(response);
  },

  getById: async (id: string): Promise<User> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse<User>(response);
  },

  updateUser: async (idOrMobile: string, userData: Partial<User>): Promise<User> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/users/${idOrMobile}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    return handleResponse<User>(response);
  },

  completeProfile: async (id: string, profileData: Partial<User>): Promise<{ message: string; user: User }> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/${id}/complete-profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });
    return handleResponse<{ message: string; user: User }>(response);
  },

  activateUser: async (id: string): Promise<{ message: string; user: User }> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/users/activate/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse<{ message: string; user: User }>(response);
  },

  deactivateUser: async (id: string): Promise<{ message: string; user: User }> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/users/deactivate/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse<{ message: string; user: User }>(response);
  },

  promoteUser: async (id: string, role: 'User' | 'HR' | 'Recruiter' | 'Admin'): Promise<{ message: string; user: User }> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/users/promote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ role }),
    });
    return handleResponse<{ message: string; user: User }>(response);
  },

  deleteUser: async (idOrMobile: string): Promise<{ message: string }> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/users/${idOrMobile}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse<{ message: string }>(response);
  },

  createUser: async (userData: Partial<User>): Promise<User> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    return handleResponse<User>(response);
  },
};

// Job APIs
export const jobApi = {
  getAll: async (
    page = 1,
    limit = 10,
    filters?: { title?: string; location?: string; company?: string }
  ): Promise<{ jobs: Job[]; total: number; page: number; totalPages: number }> => {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    if (filters?.title) queryParams.append('title', filters.title);
    if (filters?.location) queryParams.append('location', filters.location);
    if (filters?.company) queryParams.append('company', filters.company);
    

    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/jobs?${queryParams}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },

  getById: async (id: string): Promise<Job> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse<Job>(response);
  },

  createJob: async (jobData: Partial<Job>): Promise<Job> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(jobData),
    });
    return handleResponse<Job>(response);
  },

  updateJob: async (id: string, jobData: Partial<Job>): Promise<Job> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(jobData),
    });
    return handleResponse<Job>(response);
  },

  deleteJob: async (id: string): Promise<{ message: string }> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse<{ message: string }>(response);
  },
};

export const applicationApi = {
  // GET /applications
  getAll: async (): Promise<Application[]> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/applications`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse<Application[]>(response);
  },

  // GET /applications/:id
  getById: async (id: string): Promise<Application> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse<Application>(response);
  },

  // POST /applications
  applyToJob: async (applicationData: {
    jobId: string;
    userId: string;
    coverLetter?: string;
    resumeUrl?: string;
  }): Promise<{ message: string; application: Application }> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(applicationData),
    });

    return handleResponse<{ message: string; application: Application }>(response);
  },

  // PUT /applications/:id/status
  updateStatus: async (
    id: string,
    status: 'Pending' | 'Shortlisted' | 'Rejected' | 'Interviewing' | 'Hired'
  ): Promise<{ message: string; application: Application }> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/applications/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    return handleResponse<{ message: string; application: Application }>(response);
  },

  // DELETE /applications/:id
  deleteApplication: async (id: string): Promise<{ message: string }> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return handleResponse<{ message: string }>(response);
  },
};