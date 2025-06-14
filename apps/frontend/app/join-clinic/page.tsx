'use client';

import { AppSidebar } from '@/components/app-sidebar';
import { Header } from '@/components/header';
import { Main } from '@/components/main';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { useTranslations } from '@/lib/i18n';
import { Building2, CheckCircle, Clock, Mail, Users, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: 'https://ui.shadcn.com/avatars/02.png',
  },
};

const mockInvites = [
  {
    id: '1',
    clinicName: 'Downtown Medical Center',
    clinicAvatar: '/placeholder.svg?height=48&width=48',
    inviterName: 'Dr. Sarah Johnson',
    role: 'doctor',
    invitedAt: '2 days ago',
    status: 'pending',
  },
  {
    id: '2',
    clinicName: 'City Health Clinic',
    clinicAvatar: '/placeholder.svg?height=48&width=48',
    inviterName: 'Admin Team',
    role: 'staff',
    invitedAt: '1 week ago',
    status: 'pending',
  },
];

export default function JoinClinicPage() {
  const { t } = useTranslations('joinClinicPage');

  const [invites, setInvites] = useState(mockInvites);
  const [inviteCode, setInviteCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAcceptInvite = async (inviteId: string) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setInvites(invites.map((invite) => (invite.id === inviteId ? { ...invite, status: 'accepted' } : invite)));
      setIsLoading(false);
    }, 1000);
  };

  const handleDeclineInvite = async (inviteId: string) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setInvites(invites.map((invite) => (invite.id === inviteId ? { ...invite, status: 'declined' } : invite)));
      setIsLoading(false);
    }, 1000);
  };

  const handleJoinWithCode = async () => {
    if (!inviteCode.trim()) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Handle success/error
    }, 1000);
  };

  const pendingInvites = invites.filter((invite) => invite.status === 'pending');
  const hasInvites = pendingInvites.length > 0;
  const wrapperClass = 'flex flex-1 flex-col gap-4 p-4 pt-0';
  const headingClass = 'text-2xl font-bold';
  const descClass = 'text-muted-foreground';

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
            {/* <div className="space-y-2">
              <h1 className={headingClass}>{t('title')}</h1>
              <p className={descClass}>{t('description')}</p>
            </div>
            <Button asChild variant="outline" className="mt-4 self-start">
              <Link href="/dashboard">{t('backToDashboard')}</Link>
            </Button> */}

            <main className="flex-1 flex items-center justify-center p-4 md:p-8">
              <div className="w-full max-w-2xl space-y-6">
                <div className="text-center">
                  <h1 className="text-3xl font-bold">Join a Clinic</h1>
                  <p className="mt-2 text-muted-foreground">Accept pending invitations or join with an invite code</p>
                </div>

                {hasInvites ? (
                  <>
                    {/* Pending Invitations */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Mail className="h-5 w-5" />
                          Pending Invitations
                        </CardTitle>
                        <CardDescription>
                          You have {pendingInvites.length} pending invitation{pendingInvites.length !== 1 ? 's' : ''}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {pendingInvites.map((invite) => (
                          <div key={invite.id} className="flex items-center gap-4 p-4 rounded-lg border">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={invite.clinicAvatar || '/placeholder.svg'} />
                              <AvatarFallback>
                                <Building2 className="h-6 w-6" />
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold">{invite.clinicName}</h3>
                              <p className="text-sm text-muted-foreground">
                                Invited by {invite.inviterName} • {invite.invitedAt}
                              </p>
                              <Badge variant="secondary" className="mt-1">
                                {invite.role}
                              </Badge>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" onClick={() => handleAcceptInvite(invite.id)} disabled={isLoading}>
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Accept
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeclineInvite(invite.id)}
                                disabled={isLoading}>
                                <XCircle className="h-4 w-4 mr-1" />
                                Decline
                              </Button>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Join with Code */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Have an Invite Code?</CardTitle>
                        <CardDescription>Enter your invitation code to join a clinic</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="inviteCode">Invitation Code</Label>
                          <Input
                            id="inviteCode"
                            placeholder="Enter your invite code"
                            value={inviteCode}
                            onChange={(e) => setInviteCode(e.target.value)}
                          />
                        </div>
                        <Button
                          onClick={handleJoinWithCode}
                          disabled={!inviteCode.trim() || isLoading}
                          className="w-full">
                          Join Clinic
                        </Button>
                      </CardContent>
                    </Card>
                  </>
                ) : (
                  /* No Invites - Waiting State */
                  <Card className="text-center">
                    <CardHeader>
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                        <Clock className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <CardTitle>No Invitations Yet</CardTitle>
                      <CardDescription>You don't have any pending clinic invitations at the moment.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="rounded-lg bg-muted p-4">
                          <h3 className="font-medium mb-2">How to get invited:</h3>
                          <ul className="text-sm text-muted-foreground space-y-1 text-left">
                            <li>• Ask a clinic owner or administrator to send you an invitation</li>
                            <li>• They can invite you using your email address</li>
                            <li>• You'll receive an email notification when invited</li>
                          </ul>
                        </div>

                        {/* Join with Code Option */}
                        <div className="space-y-4">
                          <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                              <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                              <span className="bg-background px-2 text-muted-foreground">Or</span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="inviteCode">Have an Invite Code?</Label>
                            <div className="flex gap-2">
                              <Input
                                id="inviteCode"
                                placeholder="Enter invite code"
                                value={inviteCode}
                                onChange={(e) => setInviteCode(e.target.value)}
                              />
                              <Button onClick={handleJoinWithCode} disabled={!inviteCode.trim() || isLoading}>
                                Join
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <Button asChild variant="outline">
                          <Link href="/dashboard">Back to Dashboard</Link>
                        </Button>
                        <Button asChild>
                          <Link href="/onboarding">Create Your Own Clinic</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Additional Help */}
                <Card className="bg-muted/50">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">Need Help?</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          If you're having trouble joining a clinic or need assistance, our support team is here to
                          help.
                        </p>
                        <Button asChild variant="link" className="px-0 mt-2">
                          <Link href="/dashboard/help">Contact Support</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </main>
          </div>
        </Main>
      </SidebarInset>
    </SidebarProvider>
  );
}
