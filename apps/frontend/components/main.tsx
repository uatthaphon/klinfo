import { cn } from '@/lib/utils';
import { HTMLAttributes, Ref } from 'react';

interface MainProps extends HTMLAttributes<HTMLElement> {
  fixed?: boolean
  ref?: Ref<HTMLElement>
}

const mainBaseClass = "peer-[.header-fixed]/header:mt-16";
const mainPaddingClass = "px-4 py-6";
const mainFixedClass = "fixed-main flex grow flex-col overflow-hidden";

export const Main = ({ fixed, className, ...props }: MainProps) => {
  return (
    <main
      className={cn(
        mainBaseClass,
        mainPaddingClass,
        fixed && mainFixedClass,
        className
      )}
      {...props}
    />
  )
}

Main.displayName = 'Main'