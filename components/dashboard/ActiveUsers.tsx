import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"

export function ActiveUsers() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">
          Active Users
        </CardTitle>
        <Users className="h-4 w-4 text-orange-600" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">573</div>
        <p className="text-xs text-muted-foreground">
          <span className="text-green-600">+5.25%</span>{" "}
          from last month
        </p>
      </CardContent>
    </Card>
  )
}
