import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"
import { useEffect, useState } from "react"

export function TotalPosts() {
  const [postCount, setPostCount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts')
        if (!response.ok) {
          throw new Error('Failed to fetch posts')
        }
        const data = await response.json()
        setPostCount(Array.isArray(data) ? data.length : 0)
      } catch (err) {
        setError('Error fetching posts')
        console.error('Error fetching posts:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">
          Total Posts
        </CardTitle>
        <FileText className="h-4 w-4 text-blue-600" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {isLoading ? (
            <span className="text-muted-foreground">Loading...</span>
          ) : error ? (
            <span className="text-red-500">Error</span>
          ) : (
            postCount
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Updated just now
        </p>
      </CardContent>
    </Card>
  )
}
