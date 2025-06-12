'use client';

import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { HTMLAttributes, Ref, useEffect, useState } from 'react';
import { ProfileDropdown } from './profile-dropdown';
import { ModeToggle } from './ui/mode-toggle';

const headerBaseClass = "bg-background flex h-16 items-center gap-3 p-4 sm:gap-4";
const headerFixedClass = "header-fixed peer/header fixed z-50 w-[-webkit-fill-available]";
const shadowClass = "shadow-sm";
const noShadowClass = "shadow-none";
const sidebarTriggerClass = "-ml-1";
const separatorClass = "mr-2 data-[orientation=vertical]:h-4";
const rightControlsClass = "ml-auto flex items-center space-x-4";

interface HeaderProps extends HTMLAttributes<HTMLElement> {
  user: {
    name: string
    email: string
    avatar: string
  },
  fixed?: boolean
  ref?: Ref<HTMLElement>
}

export const Header = ({
  className,
  user,
  fixed,
  children,
  ...props
}: HeaderProps) => {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setOffset(document.body.scrollTop || document.documentElement.scrollTop)
    }

    // Add scroll listener to the body
    document.addEventListener('scroll', onScroll, { passive: true })

    // Clean up the event listener on unmount
    return () => document.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        headerBaseClass,
        fixed && headerFixedClass,
        offset > 10 && fixed ? shadowClass : noShadowClass,
        className
      )}
      {...props}
    >
      <SidebarTrigger className={sidebarTriggerClass} />
      <Separator
        orientation="vertical"
        className={separatorClass}
      />
      {children}
      <div className={rightControlsClass}>
        <ModeToggle />
        <ProfileDropdown user={user} />
      </div>
    </header>
  )
}

Header.displayName = 'Header'