import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useTranslation } from "@/lib/i18n";
import { BadgeCheck, Bell, CreditCard, LogOut } from 'lucide-react';

const triggerButtonClass = "relative h-8 w-8 rounded-full";
const avatarClass = "h-8 w-8";
const avatarFallbackClass = "rounded-lg";
const dropdownContentClass = "w-56";
const labelClass = "font-normal";
const labelTextWrapperClass = "grid flex-1 text-left text-sm leading-tight";
const userNameClass = "truncate font-medium";
const userEmailClass = "truncate text-xs";

export function ProfileDropdown({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { t } = useTranslation();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className={triggerButtonClass}>
          <Avatar className={avatarClass}>
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className={avatarFallbackClass}>CN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={dropdownContentClass} align='end' forceMount>
        <DropdownMenuLabel className={labelClass}>
          <div className={labelTextWrapperClass}>
            <span className={userNameClass}>{user.name}</span>
            <span className={userEmailClass}>{user.email}</span>
          </div>
        </DropdownMenuLabel>
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
  )
}