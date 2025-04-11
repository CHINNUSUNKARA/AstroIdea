/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { useUsers } from '@/hooks/useUsers';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Plus, Check, X, Trash2, ShieldPlus } from 'lucide-react';
import {
  Card, CardContent, CardHeader, CardTitle
} from '@/components/ui/card';
import { User } from '@/types/api';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle
} from '@/components/ui/alert-dialog';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AddUserForm from './AddUserForm';

export default function UserManagement() {
  const [currentPage, setCurrentPage] = useState(1);
const [filters, setFilters] = useState<UsersFilters>({});
const pageSize = 10;

const {
  users,
  totalPages,
  isLoading,
  activateUser,
  deactivateUser,
  promoteUser,
  deleteUser,
} = useUsers(currentPage, pageSize, filters);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newRole, setNewRole] = useState<User['role']>('User');
  const [modal, setModal] = useState<'delete' | 'promote' | 'add' | null>(null);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, page: currentPage }));
  }, [currentPage]);
  

  useEffect(() => {
    (totalPages);
  }, [totalPages]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1); // reset to page 1 when search changes
      setFilters({ name: searchTerm }); // or add other filters
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);
  
  

  const handleStatusToggle = (user: User) => {
    user.status === 'Active' ? deactivateUser(user._id) : activateUser(user._id);
  };
  

  const handleAction = (action: 'promote' | 'delete', user: User) => {
    setSelectedUser(user);
    if (action === 'promote') setNewRole(user.role);
    setModal(action);
  };

  const handleConfirmDelete = () => {
    if (selectedUser) deleteUser(selectedUser._id);
    setModal(null);
  };

  const handleConfirmPromote = () => {
    if (selectedUser && selectedUser.role !== newRole) {
      promoteUser({ id: selectedUser._id, role: newRole });
    }
    setModal(null);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>User Management</CardTitle>
          <Button onClick={() => setModal('add')}>
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-4 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {isLoading ? (
            <div className="flex justify-center">Loading users...</div>
          ) : users.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleStatusToggle(user)}>
                            {user.status === 'Active' ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleAction('promote', user)}>
                            <ShieldPlus className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleAction('delete', user)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </p>
                <div className="space-x-2">
                <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>Previous</Button>
                <Button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>Next</Button>

                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-32">
              <p className="text-muted-foreground">No users found</p>
              <Button variant="outline" className="mt-2" onClick={() => setModal('add')}>
                Add your first user
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Dialog */}
      <AlertDialog open={modal === 'delete'} onOpenChange={() => setModal(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the user "{selectedUser?.name}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Promote Dialog */}
      <Dialog open={modal === 'promote'} onOpenChange={() => setModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change User Role</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-4">
              Change role for user: <strong>{selectedUser?.name}</strong>
            </p>
            <Select value={newRole} onValueChange={(val) => setNewRole(val as User['role'])}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {['User', 'HR', 'Recruiter', 'Admin'].map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex justify-end mt-4">
              <Button onClick={handleConfirmPromote} disabled={selectedUser?.role === newRole}>
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add User Dialog */}
      <Dialog open={modal === 'add'} onOpenChange={() => setModal(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
          </DialogHeader>
          <AddUserForm />
        </DialogContent>
      </Dialog>
    </>
  );
}
