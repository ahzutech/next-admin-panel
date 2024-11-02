"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save, ArrowLeft } from "lucide-react";

interface Post {
  title: string;
  body: string;
  author: string;
  slug: string;
  status: string;
  categories: string[]; // Changed to array
  tags: string[];       // Changed to array
}

export default function EditPost() {
  const router = useRouter();
  const { id } = router.query; // Post ID from URL
  const isNew = id === "new"; // Check if it's a new post

  const [post, setPost] = useState<Post>({
    title: "",
    body: "",
    author: "",
    slug: "",
    status: "draft",
    categories: [], // Changed to array
    tags: [],       // Changed to array
  });

  // Fetch existing post data if not creating a new post
  useEffect(() => {
    const fetchPost = async () => {
      if (!isNew && id) {
        try {
          const response = await fetch(`/api/posts?id=${id}`);
          if (!response.ok) throw new Error("Failed to fetch post");
          const data = await response.json();
          setPost(data);
        } catch (error) {
          console.error("Error fetching post:", error);
        }
      }
    };

    fetchPost();
  }, [id, isNew]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const method = isNew ? "POST" : "PUT"; // Determine method based on if new or editing
      const response = await fetch(`/api/posts${isNew ? "" : `?id=${id}`}`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post), // `post` is your state containing form data
      });

      if (!response.ok) throw new Error("Failed to submit post data");

      const result = await response.json();
      console.log("Post submitted:", result);
      
      // Optionally redirect or show a success message
      router.push("/admin/posts");
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end lg:justify-start gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/admin/posts")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">
          {isNew ? "Create New Post" : "Edit Post"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              value={post.author}
              onChange={(e) => setPost({ ...post, author: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={post.slug}
              onChange={(e) => setPost({ ...post, slug: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={post.status}
              onValueChange={(value) => setPost({ ...post, status: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="body">Content</Label>
          <Textarea
            id="body"
            className="min-h-[400px]"
            value={post.body}
            onChange={(e) => setPost({ ...post, body: e.target.value })}
            required
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="categories">Categories</Label>
            <Input
              id="categories"
              placeholder="Separate categories with commas"
              value={post.categories.join(", ")} // Show as a comma-separated string
              onChange={(e) => setPost({
                ...post,
                categories: e.target.value.split(",").map(cat => cat.trim()) // Convert to array
              })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              placeholder="Separate tags with commas"
              value={post.tags.join(", ")} // Show as a comma-separated string
              onChange={(e) => setPost({
                ...post,
                tags: e.target.value.split(",").map(tag => tag.trim()) // Convert to array
              })}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/posts")}
          >
            Cancel
          </Button>
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
