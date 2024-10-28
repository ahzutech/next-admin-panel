import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Video, Briefcase, Users } from "lucide-react"
import { cn } from "@/lib/utils"

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Posts",
      value: "124",
      icon: FileText,
      change: "+4.75%",
      color: "text-blue-600"
    },
    {
      title: "Videos",
      value: "45",
      icon: Video,
      change: "+1.35%",
      color: "text-green-600"
    },
    {
      title: "Services",
      value: "12",
      icon: Briefcase,
      change: "+2.45%",
      color: "text-purple-600"
    },
    {
      title: "Active Users",
      value: "573",
      icon: Users,
      change: "+5.25%",
      color: "text-orange-600"
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={cn("h-4 w-4", stat.color)} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
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