import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"

export function Pages() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">
          Pages
        </CardTitle>
        <FileText className="h-4 w-4 text-yellow-600" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">32</div>
        <p className="text-xs text-muted-foreground">
          <span className="text-green-600">+2.15%</span>{" "}
          from last month
        </p>
      </CardContent>
    </Card>
  )
}
