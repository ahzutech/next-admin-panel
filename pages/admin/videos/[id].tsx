import { useState } from "react"
import { useRouter } from "next/router"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Save, ArrowLeft, Upload } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function EditVideo() {
  const router = useRouter()
  const { id } = router.query
  const isNew = id === "new"

  const [video, setVideo] = useState({
    title: "",
    description: "",
    status: "draft",
    category: "",
    tags: "",
    url: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Saving video:", video)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/admin/videos")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">
          {isNew ? "Upload New Video" : "Edit Video"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {isNew && (
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="rounded-lg border-2 border-dashed p-12 text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">
                      Drag and drop your video file here, or click to browse
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Maximum file size: 500MB. Supported formats: MP4, WebM
                </p>
                <div className="flex gap-4">
                  <Button type="button">Upload File</Button>
                  <Button type="button" variant="outline">
                    Add URL Instead
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={video.title}
              onChange={(e) =>
                setVideo({ ...video, title: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={video.status}
              onValueChange={(value) =>
                setVideo({ ...video, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            className="min-h-[200px]"
            value={video.description}
            onChange={(e) =>
              setVideo({ ...video, description: e.target.value })
            }
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={video.category}
              onValueChange={(value) =>
                setVideo({ ...video, category: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tutorials">Tutorials</SelectItem>
                <SelectItem value="courses">Courses</SelectItem>
                <SelectItem value="webinars">Webinars</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              placeholder="Separate tags with commas"
              value={video.tags}
              onChange={(e) =>
                setVideo({ ...video, tags: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/videos")}
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
  )
}