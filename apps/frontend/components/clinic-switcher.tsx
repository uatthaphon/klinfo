'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { useTranslation } from '@/lib/i18n';
import { ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

const sidebarButtonClass = 'data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground';
const logoWrapperClass =
  'bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg';
const clinicInfoClass = 'grid flex-1 text-left text-sm leading-tight';
const dropdownIconClass = 'ml-auto';
const dropdownContentClass = 'w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg';
const dropdownLabelClass = 'text-muted-foreground text-xs';
const dropdownItemClass = 'gap-2 p-2';
const logoContainerClass = 'flex size-6 items-center justify-center rounded-md border';
const logoIconClass = 'size-3.5 shrink-0';
const clinicNameClass = 'truncate font-medium';

export function ClinicSwitcher({
  clinics,
}: {
  clinics: {
    name: string;
    logo: React.ElementType;
  }[];
}) {
  const { t } = useTranslation();
  const { isMobile } = useSidebar();
  const [activeClinic, setActiveClinic] = React.useState(clinics[0]);

  if (!activeClinic) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className={sidebarButtonClass}>
              <div className={logoWrapperClass}>
                <activeClinic.logo className="size-4" />
              </div>
              <div className={clinicInfoClass}>
                <span className={clinicNameClass}>{activeClinic.name}</span>
              </div>
              <ChevronsUpDown className={dropdownIconClass} />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className={dropdownContentClass}
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}>
            <DropdownMenuLabel className={dropdownLabelClass}>{t('common.clinics')}</DropdownMenuLabel>
            {clinics.map((clinic) => (
              <DropdownMenuItem key={clinic.name} onClick={() => setActiveClinic(clinic)} className={dropdownItemClass}>
                <div className={logoContainerClass}>
                  <clinic.logo className={logoIconClass} />
                </div>
                {clinic.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
