import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@lib/i18n';
import { ArrowRight, Building2, Calendar, FileText, Users } from 'lucide-react';
import Link from 'next/link';

export function ClinicOnboardingCTA() {
  const { t } = useTranslation();

  return (
    <Card className="border-2 border-dashed border-primary/20 bg-primary/5">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Building2 className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl">Welcome to Klinfo!</CardTitle>
        <CardDescription className="text-base">
          You haven't created or joined any clinic yet. Let's get you started with setting up your first clinic.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex flex-col items-center text-center p-4 rounded-lg bg-background">
            <Users className="h-8 w-8 text-primary mb-2" />
            <h3 className="font-semibold">Manage Patients</h3>
            <p className="text-sm text-muted-foreground">Keep track of patient records and history</p>
          </div>
          <div className="flex flex-col items-center text-center p-4 rounded-lg bg-background">
            <Calendar className="h-8 w-8 text-primary mb-2" />
            <h3 className="font-semibold">Schedule Appointments</h3>
            <p className="text-sm text-muted-foreground">Organize your clinic's daily schedule</p>
          </div>
          <div className="flex flex-col items-center text-center p-4 rounded-lg bg-background">
            <FileText className="h-8 w-8 text-primary mb-2" />
            <h3 className="font-semibold">Handle Billing</h3>
            <p className="text-sm text-muted-foreground">Generate invoices and track payments</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="flex items-center gap-2">
            <Link href="/onboarding">
              Create Your Clinic
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/join-clinic">Join Existing Clinic</Link>
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>
            Need help?{' '}
            <Link href="/support" className="text-primary hover:underline">
              Contact our support team
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
