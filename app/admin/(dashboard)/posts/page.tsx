'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  CheckCircle,
  XCircle,
  MessageSquare,
  Clock,
  AlertTriangle,
  Trash2,
  Heart,
  Share2,
  Flag,
  Image as ImageIcon,
  Users2,
} from 'lucide-react';
import { posts, type Post } from '@/lib/admin-data';

const statusColors: Record<string, string> = {
  active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  reported: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  removed: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
};

const statusIcons: Record<string, React.ElementType> = {
  active: CheckCircle,
  pending: Clock,
  reported: AlertTriangle,
  removed: XCircle,
};

function StatCard({ title, value, icon: Icon, color }: { title: string; value: number | string; icon: React.ElementType; color: string }) {
  return (
    <Card>
      <CardContent className="p-4 flex items-center gap-4">
        <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function PostsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.communityName?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
      const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const stats = useMemo(() => ({
    total: posts.length,
    active: posts.filter(p => p.status === 'active').length,
    pending: posts.filter(p => p.status === 'pending').length,
    reported: posts.filter(p => p.status === 'reported').length,
    totalEngagement: posts.reduce((sum, p) => sum + p.likes + p.comments + p.shares, 0),
  }), []);

  const handleViewDetails = (post: Post) => {
    setSelectedPost(post);
    setIsDetailOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Posts Moderation</h1>
          <p className="text-muted-foreground">Review and moderate community posts</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">Export</Button>
          <Button size="sm" variant="destructive">Bulk Remove</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard 
          title="Total Posts" 
          value={stats.total} 
          icon={MessageSquare} 
          color="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
        />
        <StatCard 
          title="Active" 
          value={stats.active} 
          icon={CheckCircle} 
          color="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
        />
        <StatCard 
          title="Pending Review" 
          value={stats.pending} 
          icon={Clock} 
          color="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
        />
        <StatCard 
          title="Reported" 
          value={stats.reported} 
          icon={Flag} 
          color="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
        />
        <StatCard 
          title="Total Engagement" 
          value={stats.totalEngagement.toLocaleString()} 
          icon={Heart} 
          color="bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400"
        />
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by author, content, or community..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending Review</SelectItem>
                <SelectItem value="reported">Reported</SelectItem>
                <SelectItem value="removed">Removed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader className="pb-0">
          <CardTitle>Posts List</CardTitle>
          <CardDescription>
            Showing {filteredPosts.length} of {posts.length} posts
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Author</TableHead>
                  <TableHead className="min-w-[300px]">Content</TableHead>
                  <TableHead>Community</TableHead>
                  <TableHead>Engagement</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reports</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPosts.map((post) => {
                  const StatusIcon = statusIcons[post.status] || Clock;
                  return (
                    <TableRow key={post.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={post.authorAvatar} alt={post.authorName} />
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {post.authorName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{post.authorName}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-[300px]">
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {post.content}
                          </p>
                          {post.images.length > 0 && (
                            <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                              <ImageIcon className="h-3 w-3" />
                              <span>{post.images.length} image{post.images.length > 1 ? 's' : ''}</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {post.communityName ? (
                          <div className="flex items-center gap-2">
                            <Users2 className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm truncate max-w-[120px]">{post.communityName}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">General</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Heart className="h-3.5 w-3.5" />
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-3.5 w-3.5" />
                            <span>{post.comments}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Share2 className="h-3.5 w-3.5" />
                            <span>{post.shares}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[post.status]}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {post.reportCount > 0 ? (
                          <Badge variant="destructive" className="gap-1">
                            <Flag className="h-3 w-3" />
                            {post.reportCount}
                          </Badge>
                        ) : (
                          <span className="text-sm text-muted-foreground">0</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-muted-foreground">
                          {new Date(post.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        </p>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewDetails(post)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {post.status === 'pending' && (
                              <DropdownMenuItem className="text-emerald-600">
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Approve
                              </DropdownMenuItem>
                            )}
                            {post.status === 'reported' && (
                              <>
                                <DropdownMenuItem className="text-emerald-600">
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Dismiss Reports
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Remove Post
                                </DropdownMenuItem>
                              </>
                            )}
                            {post.status === 'active' && (
                              <DropdownMenuItem className="text-amber-600">
                                <Flag className="h-4 w-4 mr-2" />
                                Flag for Review
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Permanently
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Post Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          {selectedPost && (
            <>
              <DialogHeader>
                <DialogTitle>Post Details</DialogTitle>
                <DialogDescription>Review post content and take moderation action</DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                {/* Author Info */}
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={selectedPost.authorAvatar} alt={selectedPost.authorName} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {selectedPost.authorName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedPost.authorName}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(selectedPost.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center justify-between">
                  <Badge className={statusColors[selectedPost.status]}>
                    {selectedPost.status.charAt(0).toUpperCase() + selectedPost.status.slice(1)}
                  </Badge>
                  {selectedPost.reportCount > 0 && (
                    <Badge variant="destructive" className="gap-1">
                      <Flag className="h-3 w-3" />
                      {selectedPost.reportCount} Reports
                    </Badge>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm">{selectedPost.content}</p>
                </div>

                {/* Images */}
                {selectedPost.images.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {selectedPost.images.map((img, idx) => (
                      <div key={idx} className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Community */}
                {selectedPost.communityName && (
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Posted in</p>
                    <div className="flex items-center gap-2">
                      <Users2 className="h-4 w-4 text-primary" />
                      <p className="text-sm font-medium">{selectedPost.communityName}</p>
                    </div>
                  </div>
                )}

                {/* Engagement Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 bg-muted/50 rounded-lg text-center">
                    <Heart className="h-5 w-5 mx-auto mb-1 text-pink-500" />
                    <p className="text-lg font-bold">{selectedPost.likes}</p>
                    <p className="text-xs text-muted-foreground">Likes</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg text-center">
                    <MessageSquare className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                    <p className="text-lg font-bold">{selectedPost.comments}</p>
                    <p className="text-xs text-muted-foreground">Comments</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg text-center">
                    <Share2 className="h-5 w-5 mx-auto mb-1 text-emerald-500" />
                    <p className="text-lg font-bold">{selectedPost.shares}</p>
                    <p className="text-xs text-muted-foreground">Shares</p>
                  </div>
                </div>
              </div>

              <DialogFooter className="mt-6 flex-col sm:flex-row gap-2">
                <Button variant="outline" onClick={() => setIsDetailOpen(false)}>Close</Button>
                {selectedPost.status === 'pending' && (
                  <Button>Approve Post</Button>
                )}
                {selectedPost.status === 'reported' && (
                  <>
                    <Button variant="outline">Dismiss Reports</Button>
                    <Button variant="destructive">Remove Post</Button>
                  </>
                )}
                {selectedPost.status === 'active' && (
                  <Button variant="destructive">Remove Post</Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
