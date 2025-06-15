'use client';

import { AppSidebar } from '@/components/app-sidebar';
import { Header } from '@/components/header';
import { Main } from '@/components/main';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Award, Building2, Clipboard, Clock, Crown, FileText, Stethoscope } from 'lucide-react';
import { useState } from 'react';
import { ClinicInfoSettings } from './_components/clinic-info-settings';
import { ConsultationTemplatesSettings } from './_components/consultation-templates-settings';
import { MedicalCertificateSettings } from './_components/medical-certificate-settings';
import { OperatingHoursSettings } from './_components/operating-hours-settings';
import { PrescriptionTemplateSettings } from './_components/prescription-template-settings';
import { ServicesSettings } from './_components/services-settings';
import { SubscriptionPlanSettings } from './_components/subscription-plan-settings';

type SettingsSection =
  | 'clinic-info'
  | 'operating-hours'
  | 'services'
  | 'consultation-templates'
  | 'medical-certificate'
  | 'prescription-template'
  | 'subscription-plan';

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: 'https://ui.shadcn.com/avatars/02.png',
  },
};

const settingsMenu = [
  {
    id: 'clinic-info' as const,
    title: 'Clinic Info',
    icon: Building2,
    description: 'Basic clinic information and branding',
  },
  {
    id: 'operating-hours' as const,
    title: 'Operating Hours',
    icon: Clock,
    description: "Set your clinic's working hours",
  },
  {
    id: 'services' as const,
    title: 'Services',
    icon: Stethoscope,
    description: 'Manage medical services offered',
  },
  {
    id: 'consultation-templates' as const,
    title: 'Consultation Templates',
    icon: FileText,
    description: 'Create consultation note templates',
  },
  {
    id: 'medical-certificate' as const,
    title: 'Medical Certificate',
    icon: Award,
    description: 'Manage medical certificate templates',
  },
  {
    id: 'prescription-template' as const,
    title: 'Prescription Template',
    icon: Clipboard,
    description: 'Customize prescription formats',
  },
  {
    id: 'subscription-plan' as const,
    title: 'Subscription Plan',
    icon: Crown,
    description: 'Manage your subscription',
  },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingsSection>('clinic-info');

  const renderContent = () => {
    switch (activeSection) {
      case 'clinic-info':
        return <ClinicInfoSettings />;
      case 'operating-hours':
        return <OperatingHoursSettings />;
      case 'services':
        return <ServicesSettings />;
      case 'consultation-templates':
        return <ConsultationTemplatesSettings />;
      case 'medical-certificate':
        return <MedicalCertificateSettings />;
      case 'prescription-template':
        return <PrescriptionTemplateSettings />;
      case 'subscription-plan':
        return <SubscriptionPlanSettings />;
      default:
        return <ClinicInfoSettings />;
    }
  };

  const activeMenuItem = settingsMenu.find((item) => item.id === activeSection);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header fixed user={data.user}>
          <div className="flex items-center gap-2 px-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Settings</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </Header>
        <Main>
          {/* <div className="flex flex-col gap-6"> */}
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
              <p className="text-muted-foreground">Manage your clinic settings and preferences</p>
            </div>

            <div className="flex gap-6 min-h-[600px]">
              {/* Left Sidebar Menu */}
              <div className="w-64 flex-shrink-0">
                <Card className="h-fit">
                  <CardContent className="p-0">
                    <nav className="space-y-1 p-2">
                      {settingsMenu.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setActiveSection(item.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-md transition-colors ${
                            activeSection === item.id
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                          }`}>
                          <item.icon className="h-4 w-4" />
                          <span className="text-sm font-medium">{item.title}</span>
                        </button>
                      ))}
                    </nav>
                  </CardContent>
                </Card>
              </div>

              {/* Right Content Area */}
              <div className="flex-1">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      {activeMenuItem && <activeMenuItem.icon className="h-5 w-5" />}
                      <div>
                        <CardTitle>{activeMenuItem?.title}</CardTitle>
                        <CardDescription>{activeMenuItem?.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>{renderContent()}</CardContent>
                </Card>
              </div>
            </div>
          </div>
        </Main>
      </SidebarInset>
    </SidebarProvider>
  );
}
