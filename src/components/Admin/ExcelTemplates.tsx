
import * as XLSX from 'xlsx';

export const jobsTemplateHeaders = [
  "Title", 
  "Company", 
  "Location", 
  "Type (Full-time/Part-time/Contract/Remote)", 
  "Salary Range", 
  "Description", 
  "Requirements", 
  "Application Deadline (YYYY-MM-DD)"
];

export const jobsTemplateSampleData = [
  [
    "Frontend Developer", 
    "TechCorp Inc", 
    "New York, NY", 
    "Full-time", 
    "$80,000 - $100,000", 
    "We're looking for a skilled frontend developer to join our team...", 
    "3+ years of React experience, TypeScript knowledge", 
    "2025-06-30"
  ],
  [
    "Backend Engineer", 
    "DataSystems Ltd", 
    "Remote", 
    "Contract", 
    "$60/hour", 
    "Seeking an experienced backend engineer for a 6-month project...", 
    "Node.js, MongoDB, AWS experience required", 
    "2025-05-15"
  ]
];

export const usersTemplateHeaders = [
  "Full Name", 
  "Email", 
  "Password", 
  "Mobile Number", 
  "Role (user/hr/recruiter/admin)"
];

export const usersTemplateSampleData = [
  [
    "John Smith", 
    "john.smith@example.com", 
    "password123", 
    "1234567890", 
    "user"
  ],
  [
    "Sarah Johnson", 
    "sarah.j@example.com", 
    "password123", 
    "9876543210", 
    "hr"
  ]
];

// Function to generate and download Excel template for jobs
export const downloadJobsTemplate = () => {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet([jobsTemplateHeaders, ...jobsTemplateSampleData]);
  XLSX.utils.book_append_sheet(wb, ws, "Jobs Template");
  XLSX.writeFile(wb, "jobs_import_template.xlsx");
};

// Function to generate and download Excel template for users
export const downloadUsersTemplate = () => {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet([usersTemplateHeaders, ...usersTemplateSampleData]);
  XLSX.utils.book_append_sheet(wb, ws, "Users Template");
  XLSX.writeFile(wb, "users_import_template.xlsx");
};
