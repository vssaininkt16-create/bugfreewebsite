'use client';
import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { useFirestore } from '../../hooks/useFirestore';
import { orderBy } from '../../firebase/database';
import { toast } from 'sonner';

export const DatabaseDemo = () => {
  const [newItem, setNewItem] = useState({ name: '', email: '', role: 'user' });
  const [editItem, setEditItem] = useState(null);
  const { data, loading, error, create, update, remove, subscribe } = useFirestore('users');

  useEffect(() => {
    // Subscribe to real-time updates
    const unsubscribe = subscribe([orderBy('createdAt', 'desc')]);
    return () => unsubscribe();
  }, [subscribe]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await create(newItem);
      setNewItem({ name: '', email: '', role: 'user' });
      toast.success('User created successfully!');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await update(editItem.id, editItem);
      setEditItem(null);
      toast.success('User updated successfully!');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await remove(id);
      toast.success('User deleted successfully!');
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading && data.length === 0) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="text-center">Loading database...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Firebase Firestore Demo</CardTitle>
          <CardDescription>
            Real-time database operations with Cloud Firestore
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              Error: {error}
            </div>
          )}
          
          <Tabs defaultValue="create" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="create">Create User</TabsTrigger>
              <TabsTrigger value="edit">Edit User</TabsTrigger>
              <TabsTrigger value="view">View Users ({data.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="create">
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={newItem.name}
                      onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newItem.email}
                      onChange={(e) => setNewItem(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter email"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <select
                    id="role"
                    value={newItem.role}
                    onChange={(e) => setNewItem(prev => ({ ...prev, role: e.target.value }))}
                    className="w-full p-2 border rounded"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>
                  </select>
                </div>
                <Button type="submit" className="w-full">
                  Create User
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="edit">
              {editItem ? (
                <form onSubmit={handleUpdate} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-name">Name</Label>
                      <Input
                        id="edit-name"
                        value={editItem.name}
                        onChange={(e) => setEditItem(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-email">Email</Label>
                      <Input
                        id="edit-email"
                        type="email"
                        value={editItem.email}
                        onChange={(e) => setEditItem(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="Enter email"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-role">Role</Label>
                    <select
                      id="edit-role"
                      value={editItem.role}
                      onChange={(e) => setEditItem(prev => ({ ...prev, role: e.target.value }))}
                      className="w-full p-2 border rounded"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="moderator">Moderator</option>
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">
                      Update User
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setEditItem(null)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Select a user from the list to edit</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="view">
              <div className="space-y-4">
                {data.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No users in database</p>
                  </div>
                ) : (
                  data.map((user) => (
                    <Card key={user.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold">{user.name}</h3>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <Badge variant="secondary" className="mt-1">
                            {user.role}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setEditItem(user)}
                          >
                            Edit
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleDelete(user.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
