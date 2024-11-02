import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Video } from "lucide-react"

export function Videos() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">
          Videos
        </CardTitle>
        <Video className="h-4 w-4 text-green-600" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">45</div>
        <p className="text-xs text-muted-foreground">
          <span className="text-green-600">+1.35%</span>{" "}
          from last month
        </p>
      </CardContent>
    </Card>
  )
}
