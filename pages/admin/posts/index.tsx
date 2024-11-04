import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Post {
  _id: number;
  title: string;
  status: string;
  createdAt: string;
  author: string;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        
        // Ensure data is an array before sorting
        const postsArray = Array.isArray(data) ? data : data.posts || [];
        
        // Sort posts by createdAt in descending order (latest first)
        const sortedPosts = [...postsArray].sort((a: Post, b: Post) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        
        setPosts(sortedPosts);
      } catch (err) {
        console.error('Error fetching posts:', err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      const response = await fetch(`/api/posts?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      // Update the posts state to remove the deleted post
      setPosts(posts.filter(post => post._id !== id));
    } catch (err) {
      console.error('Error deleting post:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred while deleting the post");
      }
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }).format(date);
    } catch (err) {
      console.error('Error formatting date:', err);
      return dateString; // Return original string if formatting fails
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <div className="text-lg text-muted-foreground">Loading posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <div className="text-lg text-destructive">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Posts</h1>
        <Link href="/admin/posts/new" className="inline-flex">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Post
          </Button>
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[200px] border rounded-lg bg-muted/10">
          <p className="text-lg text-muted-foreground mb-4">No posts found</p>
          <Link href="/admin/posts/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create your first post
            </Button>
          </Link>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Author</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post._id}>
                  <TableCell className="font-medium">
                    <Link 
                      href={`/admin/posts/${post._id}`} 
                      className="hover:underline"
                    >
                      {post.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                        post.status.toLowerCase() === "published"
                          ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100"
                      )}
                    >
                      {post.status}
                    </span>
                  </TableCell>
                  <TableCell>{formatDate(post.createdAt)}</TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/posts/${post._id}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit post</span>
                        </Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleDelete(post._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete post</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
