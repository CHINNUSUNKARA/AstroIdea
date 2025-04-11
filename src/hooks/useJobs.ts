
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { jobApi } from '../services/api';
import { Job } from '../types/api';
import { toast } from 'sonner';

export function useJobs() {
  const queryClient = useQueryClient();

  // Get all jobs
  const { data: jobs = [], isLoading, error } = useQuery({
    queryKey: ['jobs'],
    queryFn: () => jobApi.getAll(),
  });

  // Create job
  const createMutation = useMutation({
    mutationFn: jobApi.createJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast.success('Job created successfully');
    },
    onError: (error) => {
      toast.error(`Failed to create job: ${error.message}`);
    },
  });

  // Update job
  const updateMutation = useMutation({
    mutationFn: ({ id, jobData }: { id: string; jobData: Partial<Job> }) => 
      jobApi.updateJob(id, jobData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast.success('Job updated successfully');
    },
    onError: (error) => {
      toast.error(`Failed to update job: ${error.message}`);
    },
  });

  // Delete job
  const deleteMutation = useMutation({
    mutationFn: jobApi.deleteJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast.success('Job deleted successfully');
    },
    onError: (error) => {
      toast.error(`Failed to delete job: ${error.message}`);
    },
  });

  return {
    jobs,
    isLoading,
    error,
    createJob: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateJob: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteJob: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
}
