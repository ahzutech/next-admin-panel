import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TotalPosts } from "@/components/dashboard/TotalPosts"
import { Videos } from "@/components/dashboard/Videos"
import { Services } from "@/components/dashboard/Services"
import { Pages } from "@/components/dashboard/Pages"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <TotalPosts />
        <Videos />
        <Services />
        <Pages />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 rounded-lg border p-3"
                >
                  <div className="flex-1">
                    <p className="font-medium">New blog post published</p>
                    <p className="text-sm text-muted-foreground">
                      2 hours ago
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Draft Posts</span>
                <span className="text-sm text-muted-foreground">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Pending Reviews</span>
                <span className="text-sm text-muted-foreground">5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Comments</span>
                <span className="text-sm text-muted-foreground">24</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
