'use client';
import { AppSidebar } from '@/components/app-sidebar';
import { Header } from '@/components/header';
import { Breadcrumb, BreadcrumbItem } from '@/components/ui/breadcrumb';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { useTranslation } from '@/lib/i18n';
import { Dashboard } from './_components/Dashboard';
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: 'https://ui.shadcn.com/avatars/02.png',
  },
};

export default function Page() {
  const { t } = useTranslation();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header fixed user={data.user}>
          <div className="flex items-center gap-2 px-4">
            {/* <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb> */}

            <Breadcrumb>
              <BreadcrumbItem>{t('Dashboard')}</BreadcrumbItem>
            </Breadcrumb>
          </div>
        </Header>

        <Dashboard />
      </SidebarInset>
    </SidebarProvider>
  );
}
