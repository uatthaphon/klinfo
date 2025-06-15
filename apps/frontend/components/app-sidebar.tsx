'use client';

import {
  AudioWaveform,
  BarChart3,
  ClipboardList,
  Clock,
  Command,
  CreditCard,
  GalleryVerticalEnd,
  History,
  Info,
  LayoutDashboard,
  SettingsIcon,
  UserCheck,
  Users,
} from 'lucide-react';
import * as React from 'react';

import { ClinicSwitcher } from '@/components/clinic-switcher';
import { NavMain } from '@/components/nav-main';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { NavSecondary } from './nav-secondary';

function getNavItemsByRole(role: 'owner' | 'staff' | 'doctor') {
  const roleSpecific = {
    owner: [
      { title: 'Dashboard', url: '#', icon: LayoutDashboard },
      { title: 'Queue', url: '#', icon: Clock },
      { title: 'Patients', url: '#', icon: Users },
      { title: 'Orders', url: '#', icon: ClipboardList },
      { title: 'Billing', url: '#', icon: CreditCard },
      { title: 'Staff', url: '#', icon: UserCheck },
      { title: 'Report', url: '#', icon: BarChart3 },
    ],
    staff: [
      { title: 'Dashboard', url: '#', icon: LayoutDashboard },
      { title: 'Queue', url: '#', icon: Clock },
      { title: 'Patients', url: '#', icon: Users },
      { title: 'Orders', url: '#', icon: ClipboardList },
      { title: 'Billing', url: '#', icon: CreditCard },
    ],
    doctor: [
      { title: 'Queue', url: '#', icon: Clock },
      { title: 'Past Visits', url: '#', icon: History },
    ],
  };

  return roleSpecific[role] || [];
}

const role = 'owner'; // Replace this with a dynamic value as needed

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: 'https://ui.shadcn.com/avatars/02.png',
  },
  clinics: [
    {
      name: 'คลินิกเวชกรรมกรุงเทพ',
      logo: GalleryVerticalEnd,
    },
    {
      name: 'คลินิกยิ้มสวยทันตกรรม',
      logo: AudioWaveform,
    },
    {
      name: 'คลินิกหมอใจดี',
      logo: Command,
    },
  ],
  navMain: getNavItemsByRole(role),
  navSecondary: [
    {
      title: 'Settings',
      url: '#',
      icon: SettingsIcon,
    },
    {
      title: 'Get Help',
      url: '#',
      icon: Info,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ClinicSwitcher clinics={data.clinics} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain role={role} items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
