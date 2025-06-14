'use client'

import { AppSidebar } from '@/components/app-sidebar'
import { Header } from '@/components/header'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Main } from '@/components/main'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { useTranslations } from '@/lib/i18n'
import Link from 'next/link'

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: 'https://ui.shadcn.com/avatars/02.png',
  },
}

export default function JoinClinicPage() {
  const { t } = useTranslations('joinClinicPage')

  const wrapperClass = 'flex flex-1 flex-col gap-4 p-4 pt-0'
  const headingClass = 'text-2xl font-bold'
  const descClass = 'text-muted-foreground'

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header fixed user={data.user}>
          <div className="flex items-center gap-2 px-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>{t('title')}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </Header>

        <Main>
          <div className={wrapperClass}>
            <div className="space-y-2">
              <h1 className={headingClass}>{t('title')}</h1>
              <p className={descClass}>{t('description')}</p>
            </div>
            <Button asChild variant="outline" className="mt-4 self-start">
              <Link href="/dashboard">{t('backToDashboard')}</Link>
            </Button>
          </div>
        </Main>
      </SidebarInset>
    </SidebarProvider>
  )
}
