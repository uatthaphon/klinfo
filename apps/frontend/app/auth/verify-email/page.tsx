'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { resendVerificationEmail, verifyEmail } from '@/lib/api/auth';
import { useTranslation } from '@/lib/i18n';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const containerClass = 'bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10';
const wrapperClass = 'w-full max-w-md';
const headerClass = 'text-center';
const titleClass = 'text-2xl';
const contentClass = 'flex flex-col items-center space-y-4 pt-4';
const iconWrapperClass = 'rounded-full bg-primary/20 p-3';
const iconClass = 'h-6 w-6 text-primary';
const messageClass = 'text-center text-sm text-muted-foreground';
const resendWrapperClass = 'text-center text-sm text-muted-foreground';
const resendLinkClass = 'text-primary underline-offset-4 hover:underline px-2';
const errorMessageClass = 'text-center text-sm text-destructive';
const successMessageClass = 'text-center text-sm text-green-600';
const footerClass = 'flex flex-col space-y-2';
const buttonClass = 'w-full';

export default function VerifyEmailPage() {
  const { t } = useTranslation();
  const params = useSearchParams()!;
  const router = useRouter();
  const [status, setStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [email, setEmail] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [resendStatus, setResendStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const token = params.get('token');
    const paramEmail = params.get('email');
    const stored = localStorage.getItem('userEmail');
    const finalEmail = paramEmail || stored || '';
    setEmail(finalEmail);
    if (token && finalEmail) {
      verifyEmail({ email: finalEmail, token })
        .then(() => {
          setStatus('success');
          router.push('/onboarding/setup');
        })
        .catch(() => setStatus('error'));
    }
  }, [params, router]);

  return (
    <div className={containerClass}>
      <div className={wrapperClass}>
        <Card>
          <CardHeader className={headerClass}>
            <CardTitle className={titleClass}>{t('onboarding.verifyEmailAddress')}</CardTitle>
            <CardDescription>{t('onboarding.verifyEmail')}</CardDescription>
          </CardHeader>
          <CardContent className={contentClass}>
            <div className={iconWrapperClass}>
              <Mail className={iconClass} />
            </div>
            {status === 'error' && <p className={messageClass}>{t('onboarding.verifyEmail')}</p>}
            <div className={resendWrapperClass}>
              <>
                {t('onboarding.verificationEmailSent', { email })} <br />
                {t('onboarding.verificationEmailNotReceived')}
              </>
              <Button
                type="button"
                variant="link"
                className={resendLinkClass}
                onClick={() => {
                  if (!email) return;
                  setResendLoading(true);
                  setResendStatus('idle');
                  resendVerificationEmail(email)
                    .then(() => setResendStatus('success'))
                    .catch(() => setResendStatus('error'))
                    .finally(() => setResendLoading(false));
                }}
                disabled={resendLoading}>
                {resendLoading ? t('onboarding.loading') : t('onboarding.resendEmail')}
              </Button>
              {resendStatus === 'success' && (
                <p className={successMessageClass}>{t('onboarding.resendEmailSuccess')}</p>
              )}
              {resendStatus === 'error' && <p className={errorMessageClass}>{t('onboarding.resendEmailError')}</p>}
            </div>
          </CardContent>
          <CardFooter className={footerClass}>
            <Button asChild className={buttonClass}>
              <Link href="/onboarding/setup">{t('onboarding.continueSetup')}</Link>
            </Button>
            <Button variant="outline" asChild className={buttonClass}>
              <Link href="/auth/login">{t('onboarding.goToLogin')}</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
