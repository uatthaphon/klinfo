'use client'
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"
import { EmailVerificationBanner } from "@/components/email-verification-banner"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  SidebarInset,
  SidebarProvider
} from "@/components/ui/sidebar"
import { MainDashboardContent } from "./_components/MainDashboardContent"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "https://ui.shadcn.com/avatars/02.png",
  }
}

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <EmailVerificationBanner />

        <Header fixed user={data.user}>
          <div className="flex items-center gap-2 px-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </Header>

        <MainDashboardContent />
      </SidebarInset>
    </SidebarProvider>
  )
}
