
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '../services/api';
import { User } from '../types/api';
import { toast } from 'sonner';

interface UsersFilters {
  name?: string;
  email?: string;
  location?: string;
}

export function useUsers(page: number, limit: number, filters: UsersFilters) {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['users', page, limit, filters],
    queryFn: () => userApi.getAll(page, limit, filters),
  });

  // Mutations
  const activateMutation = useMutation({
    mutationFn: userApi.activateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User activated successfully');
    },
    onError: (error) => {
      toast.error(`Failed to activate user: ${error.message}`);
    },
  });

  const deactivateMutation = useMutation({
    mutationFn: userApi.deactivateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User deactivated successfully');
    },
    onError: (error) => {
      toast.error(`Failed to deactivate user: ${error.message}`);
    },
  });

  const promoteMutation = useMutation({
    mutationFn: (params: { id: string; role: 'User' | 'HR' | 'Recruiter' | 'Admin' }) =>
      userApi.promoteUser(params.id, params.role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User role updated successfully');
    },
    onError: (error) => {
      toast.error(`Failed to update user role: ${error.message}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: userApi.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User deleted successfully');
    },
    onError: (error) => {
      toast.error(`Failed to delete user: ${error.message}`);
    },
  });

  return {
    users: data?.users || [],
    totalUsers: data?.totalUsers || 0,
    currentPage: data?.currentPage || 1,
    totalPages: data?.totalPages || 1,
    isLoading,
    error,
    activateUser: activateMutation.mutate,
    deactivateUser: deactivateMutation.mutate,
    promoteUser: promoteMutation.mutate,
    deleteUser: deleteMutation.mutate,
  };
}

