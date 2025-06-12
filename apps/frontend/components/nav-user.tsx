'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useTranslation } from "@/lib/i18n";
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";

const menuButtonClass = "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground";
const avatarClass = "h-8 w-8 rounded-lg";
const userInfoClass = "grid flex-1 text-left text-sm leading-tight";
const userNameClass = "truncate font-medium";
const userEmailClass = "truncate text-xs";
const dropdownIconClass = "ml-auto size-4";
const dropdownContentClass = "w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg";
const dropdownLabelClass = "p-0 font-normal";
const dropdownLabelContentClass = "flex items-center gap-2 px-1 py-1.5 text-left text-sm";

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()
  const { t } = useTranslation();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className={menuButtonClass}
            >
              <Avatar className={avatarClass}>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className={userInfoClass}>
                <span className={userNameClass}>{user.name}</span>
                <span className={userEmailClass}>{user.email}</span>
              </div>
              <ChevronsUpDown className={dropdownIconClass} />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className={dropdownContentClass}
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className={dropdownLabelClass}>
              <div className={dropdownLabelContentClass}>
                <Avatar className={avatarClass}>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className={userInfoClass}>
                  <span className={userNameClass}>{user.name}</span>
                  <span className={userEmailClass}>{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                {t("user.upgradePro")}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                {t("user.account")}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                {t("user.billing")}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                {t("user.notifications")}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              {t("user.logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
