import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { LogOut } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import AdminLayout from "@/components/layout/admin-layout"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>
      <Separator />
      <div className="grid gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Appearance</h3>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">Theme</p>
              <p className="text-sm text-muted-foreground">
                Switch between light and dark mode.
              </p>
            </div>
            <ThemeToggle />
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Account</h3>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">Logout</p>
              <p className="text-sm text-muted-foreground">
                Sign out of your account.
              </p>
            </div>
            <Button variant="destructive">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

SettingsPage.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}
