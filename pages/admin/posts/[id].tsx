"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import RichTextEditor from "components/editor/rich-text-editor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";
import { Save, ArrowLeft, Upload, ImagePlus, X } from "lucide-react";
import { Card, CardContent } from "components/ui/card";
import Image from "next/image";

interface Post {
  title: string;
  body: string;
  author: string;
  slug: string;
  status: string;
  categories: string[];
  tags: string[];
  image?: string;
}

export default function EditPost() {
  const router = useRouter();
  const { id } = router.query;
  const isNew = id === "new";
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [post, setPost] = useState<Post>({
    title: "",
    body: "",
    author: "",
    slug: "",
    status: "draft",
    categories: [],
    tags: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!isNew && id) {
        try {
          setLoading(true);
          const response = await fetch(`/api/posts?id=${id}`);
          if (!response.ok) throw new Error("Failed to fetch post");
          const data = await response.json();
          setPost(data);
          if (data.image) {
            setImagePreview(data.image);
          }
        } catch (error) {
          console.error("Error fetching post:", error);
          setError(error instanceof Error ? error.message : "Failed to fetch post");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id, isNew]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.entries(post).forEach(([key, value]) => {
        if (key === 'categories' || key === 'tags') {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });

      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      const method = isNew ? "POST" : "PUT";
      const response = await fetch(`/api/posts${isNew ? "" : `?id=${id}`}`, {
        method,
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to submit post data");

      const result = await response.json();
      console.log("Post submitted:", result);

      router.push("/admin/posts");
    } catch (error) {
      console.error("Error submitting post:", error);
      setError(error instanceof Error ? error.message : "Failed to save post");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/admin/posts")}
            type="button"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">
            {isNew ? "Create New Post" : "Edit Post"}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title field - full width */}
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={post.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              setPost({ ...post, title: e.target.value })
            }
            className="text-lg"
            required
          />
        </div>

        {/* Slug field - full width */}
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={post.slug}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              setPost({ ...post, slug: e.target.value })
            }
            required
          />
        </div>

        {/* Editor - full width */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <Label htmlFor="body">Content</Label>
              <RichTextEditor
                content={post.body}
                onChange={(html: string) => setPost({ ...post, body: html })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Settings Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Post Settings */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={post.author}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setPost({ ...post, author: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={post.status}
                  onValueChange={(value: string) => setPost({ ...post, status: value })}
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

              <div className="space-y-2">
                <Label htmlFor="categories">Categories</Label>
                <Input
                  id="categories"
                  placeholder="Separate categories with commas"
                  value={post.categories.join(", ")}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPost({
                    ...post,
                    categories: e.target.value.split(",").map((cat: string) => cat.trim())
                  })}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Additional Settings */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  placeholder="Separate tags with commas"
                  value={post.tags.join(", ")}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPost({
                    ...post,
                    tags: e.target.value.split(",").map((tag: string) => tag.trim())
                  })}
                />
              </div>

              <div className="mt-4">
                <div className="rounded-lg border-2 border-dashed p-6 text-center relative">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="mx-auto max-h-48 w-auto object-contain"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-0 right-0"
                        onClick={removeImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <ImagePlus className="mx-auto h-12 w-12 text-muted-foreground" />
                      <div className="mt-4">
                        <p className="text-sm text-muted-foreground">
                          Upload featured image
                        </p>
                      </div>
                    </>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                    id="image-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-4"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Choose Image
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
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
