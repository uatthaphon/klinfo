"use client"

import {
  AudioWaveform,
  ChartNoAxesCombined,
  ClipboardList,
  Command,
  GalleryVerticalEnd,
  History,
  IdCard,
  LayoutDashboard,
  List,
  Orbit,
  Receipt,
  Users
} from "lucide-react"
import * as React from "react"

import { ClinicSwitcher } from "@/components/clinic-switcher"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

function getNavItemsByRole(role: "owner" | "staff" | "doctor") {
  const roleSpecific = {
    owner: [
      { title: "Dashboard", url: "#", icon: LayoutDashboard },
      { title: "Queue", url: "#", icon: List },
      { title: "Patients", url: "#", icon: Users },
      { title: "Orders", url: "#", icon: ClipboardList },
      { title: "Billing", url: "#", icon: Receipt },
      { title: "Staff", url: "#", icon: IdCard },
      { title: "Report", url: "#", icon: ChartNoAxesCombined },
      { title: "Subscription", url: "#", icon: Orbit },
    ],
    staff: [
      { title: "Dashboard", url: "#", icon: LayoutDashboard },
      { title: "Queue", url: "#", icon: List },
      { title: "Patients", url: "#", icon: Users },
      { title: "Orders", url: "#", icon: ClipboardList },
      { title: "Billing", url: "#", icon: Receipt },
    ],
    doctor: [
      { title: "Queue", url: "#", icon: List },
      { title: "Past Visits", url: "#", icon: History },
    ],
  };

  return roleSpecific[role] || [];
}

const role = "owner"; // Replace this with a dynamic value as needed

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  clinics: [
    {
      name: "คลินิกเวชกรรมกรุงเทพ",
      logo: GalleryVerticalEnd,
    },
    {
      name: "คลินิกยิ้มสวยทันตกรรม",
      logo: AudioWaveform,
    },
    {
      name: "คลินิกหมอใจดี",
      logo: Command,
    },
  ],
  navMain: getNavItemsByRole(role),
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ClinicSwitcher clinics={data.clinics} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain role={role} items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
