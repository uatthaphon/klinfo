import { cn } from '@/lib/utils'
import { HTMLAttributes, Ref } from 'react'

interface MainProps extends HTMLAttributes<HTMLElement> {
  fixed?: boolean
  ref?: Ref<HTMLElement>
}

export const Main = ({ fixed, className, ...props }: MainProps) => {
  return (
    <main
      className={cn(
        'peer-[.header-fixed]/header:mt-16',
        'px-4 py-6',
        fixed && 'fixed-main flex grow flex-col overflow-hidden',
        className
      )}
      {...props}
    />
  )
}

Main.displayName = 'Main'