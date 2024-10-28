import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Video,
  FileText,
  Briefcase,
  Users,
  File,
  Menu,
  LogOut
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard
  },
  {
    title: "Videos",
    href: "/admin/videos",
    icon: Video
  },
  {
    title: "Blog Posts",
    href: "/admin/posts",
    icon: FileText
  },
  {
    title: "Services",
    href: "/admin/services",
    icon: Briefcase
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users
  },
  {
    title: "Pages",
    href: "/admin/pages",
    icon: File
  }
]

export default function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const SidebarContent = () => (
    <div className="space-y-4 py-4">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold">Admin Panel</h2>
        <div className="space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                router.pathname === item.href ? "bg-accent" : "transparent"
              )}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen">
      {/* Sidebar for desktop */}
      <aside className="hidden w-64 border-r bg-background lg:block">
        <div className="sticky top-0 h-screen overflow-y-auto">
          <SidebarContent />
          <div className="absolute bottom-4 left-4">
            <Button variant="ghost" className="w-[calc(100%-2rem)]">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="lg:hidden fixed left-4 top-4 z-40"
            size="icon"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-6">
          {children}
        </div>
      </main>
    </div>
  )
}