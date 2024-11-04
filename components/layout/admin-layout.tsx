import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "lib/utils";
import {
  LayoutDashboard,
  FileText,
  Settings,
  Users,
  Video,
  Files,
  Briefcase,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "components/ui/sheet";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    title: "Posts",
    icon: FileText,
    href: "/admin/posts",
  },
  {
    title: "Pages",
    icon: Files,
    href: "/admin/pages",
  },
  {
    title: "Services",
    icon: Briefcase,
    href: "/admin/services",
  },
  {
    title: "Videos",
    icon: Video,
    href: "/admin/videos",
  },
  {
    title: "Users",
    icon: Users,
    href: "/admin/users",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/admin/settings",
  },
];

function SidebarContent({ className, isCollapsed }: { className?: string; isCollapsed: boolean }) {
  const router = useRouter();
  
  return (
    <div className={cn("flex h-full flex-col", className)}>
      <div className="border-b px-6 py-4">
        <Link href="/admin" className="flex items-center">
          {!isCollapsed && <span className="text-xl font-bold">Admin Panel</span>}
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => {
          const isActive = item.href === "/admin" 
            ? router.pathname === "/admin" || router.pathname === "/admin/index"
            : router.pathname.startsWith(item.href);
          
          const Icon = item.icon;
          
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-4 transition-all duration-200",
                  isCollapsed && "justify-center px-2"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!isCollapsed && <span>{item.title}</span>}
              </Button>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 lg:hidden"
        onClick={() => setIsMobileOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetContent side="left" className="w-[200px] p-0">
          <SheetHeader className="px-4 py-4 border-b">
            <SheetTitle className="flex items-center justify-between">
              <span>Admin Panel</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </SheetTitle>
          </SheetHeader>
          <SidebarContent isCollapsed={false} />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex">
        <div
          className={cn(
            "fixed inset-y-0 z-50 flex transition-all duration-300",
            isCollapsed ? "w-[60px]" : "w-[200px]"
          )}
        >
          <div className="flex flex-1 flex-col bg-background border-r">
            <SidebarContent isCollapsed={isCollapsed} />
          </div>
          
          {/* Collapse Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute -right-4 top-[calc(50%-24px)] h-12 w-8 rounded-full border bg-background shadow-md"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Main Content */}
        <main
          className={cn(
            "flex-1 transition-all duration-300",
            isCollapsed ? "ml-[60px]" : "ml-[200px]"
          )}
        >
          <div className="container mx-auto p-8">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Main Content */}
      <main className="lg:hidden">
        <div className="container mx-auto pl-8 pr-4 pt-16">
          {children}
        </div>
      </main>
    </div>
  );
}
