
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageLayout from '@/components/Layout/PageLayout';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GraduationCap, Briefcase, Github, Linkedin, Code2, Upload } from 'lucide-react';

const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  bio: z.string().max(500, { message: "Bio must not exceed 500 characters." }).optional(),
  location: z.string().optional(),
});

const educationFormSchema = z.object({
  degree: z.string().min(2, { message: "Degree must be at least 2 characters." }),
  institution: z.string().min(2, { message: "Institution must be at least 2 characters." }),
  startDate: z.string(),
  endDate: z.string().optional(),
  description: z.string().max(500).optional(),
});

const experienceFormSchema = z.object({
  position: z.string().min(2, { message: "Position must be at least 2 characters." }),
  company: z.string().min(2, { message: "Company must be at least 2 characters." }),
  startDate: z.string(),
  endDate: z.string().optional(),
  description: z.string().max(500).optional(),
});

const socialMediaFormSchema = z.object({
  github: z.string().url({ message: "Please enter a valid URL." }).optional(),
  linkedin: z.string().url({ message: "Please enter a valid URL." }).optional(),
  codechef: z.string().url({ message: "Please enter a valid URL." }).optional(),
  leetcode: z.string().url({ message: "Please enter a valid URL." }).optional(),
});

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [educations, setEducations] = useState<any[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
      bio: "Software developer with 5+ years of experience in web development.",
      location: "New York, USA",
    },
  });

  const educationForm = useForm<z.infer<typeof educationFormSchema>>({
    resolver: zodResolver(educationFormSchema),
    defaultValues: {
      degree: "",
      institution: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  });

  const experienceForm = useForm<z.infer<typeof experienceFormSchema>>({
    resolver: zodResolver(experienceFormSchema),
    defaultValues: {
      position: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  });

  const socialMediaForm = useForm<z.infer<typeof socialMediaFormSchema>>({
    resolver: zodResolver(socialMediaFormSchema),
    defaultValues: {
      github: "",
      linkedin: "",
      codechef: "",
      leetcode: "",
    },
  });

  function onProfileSubmit(values: z.infer<typeof profileFormSchema>) {
    console.log("Profile values:", values);
    // Save to API
  }

  function onEducationSubmit(values: z.infer<typeof educationFormSchema>) {
    console.log("Education values:", values);
    setEducations([...educations, values]);
    educationForm.reset();
  }

  function onExperienceSubmit(values: z.infer<typeof experienceFormSchema>) {
    console.log("Experience values:", values);
    setExperiences([...experiences, values]);
    experienceForm.reset();
  }

  function onSocialMediaSubmit(values: z.infer<typeof socialMediaFormSchema>) {
    console.log("Social Media values:", values);
    // Save to API
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="mb-8">
            <TabsList className="w-full bg-slate-100 p-1">
              <TabsTrigger value="personal" className="flex-1">Personal Info</TabsTrigger>
              <TabsTrigger value="education" className="flex-1">Education</TabsTrigger>
              <TabsTrigger value="experience" className="flex-1">Experience</TabsTrigger>
              <TabsTrigger value="social" className="flex-1">Social Media</TabsTrigger>
              <TabsTrigger value="resume" className="flex-1">Resume</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details here.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={profileForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Email" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={profileForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="Phone" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={profileForm.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <Input placeholder="City, Country" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={profileForm.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us a bit about yourself" 
                              className="min-h-[120px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Save Changes</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Education
                </CardTitle>
                <CardDescription>Add your educational background.</CardDescription>
              </CardHeader>
              <CardContent>
                {educations.length > 0 && (
                  <div className="mb-6 space-y-4">
                    {educations.map((edu, index) => (
                      <Card key={index}>
                        <CardHeader className="py-3">
                          <div className="flex justify-between">
                            <div>
                              <CardTitle className="text-lg">{edu.degree}</CardTitle>
                              <CardDescription>{edu.institution}</CardDescription>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {edu.startDate} - {edu.endDate || 'Present'}
                            </div>
                          </div>
                        </CardHeader>
                        {edu.description && (
                          <CardContent className="py-2">
                            <p>{edu.description}</p>
                          </CardContent>
                        )}
                      </Card>
                    ))}
                    <Separator />
                  </div>
                )}
                <Form {...educationForm}>
                  <form onSubmit={educationForm.handleSubmit(onEducationSubmit)} className="space-y-4">
                    <FormField
                      control={educationForm.control}
                      name="degree"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Degree/Certificate</FormLabel>
                          <FormControl>
                            <Input placeholder="Bachelor of Science" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={educationForm.control}
                      name="institution"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Institution</FormLabel>
                          <FormControl>
                            <Input placeholder="University Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={educationForm.control}
                        name="startDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Date</FormLabel>
                            <FormControl>
                              <Input type="month" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={educationForm.control}
                        name="endDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>End Date (leave empty if current)</FormLabel>
                            <FormControl>
                              <Input type="month" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={educationForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Brief description of your studies" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Add Education</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experience" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Work Experience
                </CardTitle>
                <CardDescription>Add your work experience.</CardDescription>
              </CardHeader>
              <CardContent>
                {experiences.length > 0 && (
                  <div className="mb-6 space-y-4">
                    {experiences.map((exp, index) => (
                      <Card key={index}>
                        <CardHeader className="py-3">
                          <div className="flex justify-between">
                            <div>
                              <CardTitle className="text-lg">{exp.position}</CardTitle>
                              <CardDescription>{exp.company}</CardDescription>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {exp.startDate} - {exp.endDate || 'Present'}
                            </div>
                          </div>
                        </CardHeader>
                        {exp.description && (
                          <CardContent className="py-2">
                            <p>{exp.description}</p>
                          </CardContent>
                        )}
                      </Card>
                    ))}
                    <Separator />
                  </div>
                )}
                <Form {...experienceForm}>
                  <form onSubmit={experienceForm.handleSubmit(onExperienceSubmit)} className="space-y-4">
                    <FormField
                      control={experienceForm.control}
                      name="position"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Position</FormLabel>
                          <FormControl>
                            <Input placeholder="Software Engineer" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={experienceForm.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input placeholder="Company Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={experienceForm.control}
                        name="startDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Date</FormLabel>
                            <FormControl>
                              <Input type="month" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={experienceForm.control}
                        name="endDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>End Date (leave empty if current)</FormLabel>
                            <FormControl>
                              <Input type="month" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={experienceForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Brief description of your role" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Add Experience</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Social Media Profiles</CardTitle>
                <CardDescription>Link your social media profiles.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...socialMediaForm}>
                  <form onSubmit={socialMediaForm.handleSubmit(onSocialMediaSubmit)} className="space-y-6">
                    <FormField
                      control={socialMediaForm.control}
                      name="github"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Github className="h-4 w-4" />
                            GitHub
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="https://github.com/username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={socialMediaForm.control}
                      name="linkedin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Linkedin className="h-4 w-4" />
                            LinkedIn
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="https://linkedin.com/in/username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={socialMediaForm.control}
                      name="codechef"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Code2 className="h-4 w-4" />
                            CodeChef
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="https://codechef.com/users/username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={socialMediaForm.control}
                      name="leetcode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Code2 className="h-4 w-4" />
                            LeetCode
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="https://leetcode.com/username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Save Links</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resume" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Resume Upload
                </CardTitle>
                <CardDescription>Upload your resume in PDF or DOCX format.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-10 w-10 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium mb-2">Drag & Drop your resume here</h3>
                  <p className="text-sm text-muted-foreground mb-4">or click to browse files (PDF, DOCX, max 5MB)</p>
                  <Button>Browse Files</Button>
                </div>

                <div className="mt-6">
                  <h4 className="font-medium mb-2">Uploaded Resumes</h4>
                  <Card>
                    <div className="p-4 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="bg-primary/10 p-2 rounded">
                          <Upload className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Resume-JohnDoe-2023.pdf</p>
                          <p className="text-sm text-muted-foreground">Uploaded on Apr 8, 2025</p>
                        </div>
                      </div>
                      <div>
                        <Button variant="outline" size="sm">Replace</Button>
                      </div>
                    </div>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default ProfilePage;
