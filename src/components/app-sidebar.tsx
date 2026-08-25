"use client";

import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  BarChart2,
  Users,
  LogOut,
  FileText,
  PenSquare,
} from "lucide-react";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Blogs", url: "/blogs", icon: PenSquare },
  { title: "Drafts", url: "/drafts", icon: FileText },
  { title: "Projects", url: "/projects", icon: Search },
  { title: "Calendar", url: "/calendar", icon: Calendar },
  { title: "Analytics", url: "/analytics", icon: BarChart2 },
  { title: "Subscribers", url: "/subscribers", icon: Users },
];

const settingsItems = [
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Logout", url: "/logout", icon: LogOut },
];

export function AppSidebar() {
  const pathname = usePathname();

  const isActive = (url: string) => pathname === url;

  return (
    <Sidebar className="w-64 h-screen border-r border-border shadow-md">
      <div className="absolute inset-0 rounded-xl z-0 bg-foreground p-px">
        <div className="w-full h-full  rounded-[11px] z-10"></div>
      </div>
      <SidebarContent className="p-4 relative z-10">
        <SidebarGroup>
          <SidebarGroupLabel className="text-foreground text-xs font-bold tracking-widest uppercase opacity-50">
            Dashboard
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-2 space-y-1">
              {navItems.map((item) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        className={`flex items-center gap-3 text-sm px-3 py-2 rounded-lg transition
                          ${
                            active
                              ? "bg-foreground text-foreground font-semibold"
                              : "text-gray-400 hover:text-foreground hover:bg-foreground"
                          }`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-foreground text-xs font-bold tracking-widest uppercase opacity-50">
            Preferences
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-2 space-y-1">
              {settingsItems.map((item) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        className={`flex items-center gap-3 text-sm px-3 py-2 rounded-lg transition
                          ${
                            active
                              ? "bg-foreground text-foreground font-semibold"
                              : "text-gray-400 hover:text-foreground hover:bg-foreground"
                          }`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
