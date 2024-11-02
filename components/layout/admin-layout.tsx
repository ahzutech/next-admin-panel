import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { cn } from "../../lib/utils"
import {
  LayoutDashboard,
  Video,
  FileText,
  Briefcase,
  Users,
  File,
  Menu,
  Settings,
  ChevronLeft,
} from "lucide-react"
import { Button } from "../ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../ui/sheet"

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
    title: "Posts",
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
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings
  }
]

export default function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const SidebarContent = () => (
    <div className="space-y-4 py-4">
      <div className="px-3 py-2">
        <h2 className={cn(
          "mb-2 px-4 text-lg font-semibold transition-opacity duration-200 text-white",
          isCollapsed && "lg:opacity-0"
        )}>
          Admin Panel
        </h2>
        <div className="space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center rounded-md px-3 py-2.5 text-sm font-medium hover:bg-zinc-800 hover:text-white transition-colors text-zinc-400",
                router.pathname === item.href ? "bg-zinc-800 text-white" : "transparent",
                isCollapsed && "lg:justify-center lg:px-2"
              )}
            >
              <item.icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
              <span className={cn(
                "transition-opacity duration-200",
                isCollapsed && "lg:hidden"
              )}>
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen">
      {/* Sidebar for desktop */}
      <aside className={cn(
        "hidden lg:block border-r bg-zinc-950 transition-all duration-300 ease-in-out relative mr-6",
        isCollapsed ? "lg:w-16" : "lg:w-64"
      )}>
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-6 top-4 hidden lg:flex h-8 w-8 z-50 rounded-full border shadow-md bg-background"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <ChevronLeft className={cn(
            "h-4 w-4 transition-transform duration-200",
            isCollapsed && "rotate-180"
          )} />
        </Button>
        <div className="sticky top-0 h-screen overflow-y-auto">
          <SidebarContent />
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
        <SheetContent side="left" className="w-64 p-0 bg-zinc-900 border-r-zinc-800">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <main className={cn(
        "flex-1 overflow-y-auto transition-all duration-300 px-6",
        !isCollapsed && "lg:ml-0"
      )}>
        <div className="container mx-auto py-6">
          {children}
        </div>
      </main>
    </div>
  )
}
