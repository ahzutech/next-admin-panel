import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus, Pencil, Trash2, Play } from "lucide-react"
import { cn } from "@/lib/utils"

export default function VideosPage() {
  const [videos] = useState([
    {
      id: 1,
      title: "Getting Started with React",
      status: "Published",
      duration: "12:34",
      views: "1.2k",
      date: "2024-03-20"
    },
    {
      id: 2,
      title: "Advanced TypeScript Tips",
      status: "Processing",
      duration: "25:10",
      views: "856",
      date: "2024-03-19"
    }
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Videos</h1>
        <Link href="/admin/videos/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Upload Video
          </Button>
        </Link>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {videos.map((video) => (
              <TableRow key={video.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Play className="h-4 w-4 text-muted-foreground" />
                    {video.title}
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                      video.status === "Published"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    )}
                  >
                    {video.status}
                  </span>
                </TableCell>
                <TableCell>{video.duration}</TableCell>
                <TableCell>{video.views}</TableCell>
                <TableCell>{video.date}</TableCell>
                <TableCell className="text-right">
                  <Link href={`/admin/videos/${video.id}`}>
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}