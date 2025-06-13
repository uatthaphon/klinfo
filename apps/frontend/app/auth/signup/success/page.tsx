'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/lib/i18n';
import { Check, CheckCircle, Info } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const rootClass = 'flex min-h-screen flex-col bg-muted';
const mainClass = 'flex-1 flex items-center justify-center p-4 md:p-8';
const cardWrapperClass = 'mx-auto max-w-md';
const cardHeaderClass = 'text-center';
const iconWrapperClass = 'mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20';
const successIconClass = 'h-8 w-8 text-primary';
const cardTitleClass = 'text-2xl';
const cardContentClass = 'space-y-4';
const stepBoxClass = 'rounded-lg bg-muted p-4';
const stepHeadingClass = 'mb-2 font-medium';
const stepListClass = 'space-y-2 text-sm';
const stepItemClass = 'flex items-center';
const stepIconClass = 'mr-2 h-4 w-4 text-primary';
const tipBoxClass = 'rounded-lg border border-primary/10 bg-primary/20 p-4';
const tipHeaderClass = 'flex items-center gap-2';
const infoIconClass = 'h-5 w-5 text-primary';
const tipTitleClass = 'font-medium text-primary';
const tipTextClass = 'mt-2 text-sm text-primary';
const buttonClass = 'w-full';

export default function SignupSuccessPage() {
  const params = useSearchParams()!;
  const { t } = useTranslation();
  const [name, setName] = useState('');

  useEffect(() => {
    const pName = params.get('name');
    const stored = localStorage.getItem('userName');
    if (pName) {
      setName(pName);
    } else if (stored) {
      setName(stored);
    }
  }, [params]);

  return (
    <div className={rootClass}>
      <main className={mainClass}>
        <Card className={cardWrapperClass}>
          <CardHeader className={cardHeaderClass}>
            <div className={iconWrapperClass}>
              <CheckCircle className={successIconClass} />
            </div>
            <CardTitle className={cardTitleClass}>
              {t('onboarding.accountCreated', {
                name: name || t('auth.signup'),
              })}
            </CardTitle>
            <CardDescription>{t('onboarding.verifyEmail')}</CardDescription>
          </CardHeader>
          <CardContent className={cardContentClass}>
            <div className={stepBoxClass}>
              <h3 className={stepHeadingClass}>{t('onboarding.nextSteps')}</h3>
              <ul className={stepListClass}>
                <li className={stepItemClass}>
                  <Check className={stepIconClass} />
                  {t('onboarding.verifyEmailAddress')}
                </li>
                <li className={stepItemClass}>
                  <Check className={stepIconClass} />
                  {t('onboarding.completeClinicSetup')}
                </li>
                <li className={stepItemClass}>
                  <Check className={stepIconClass} />
                  {t('onboarding.startAddingPatients')}
                </li>
              </ul>
            </div>
            <div className={tipBoxClass}>
              <div className={tipHeaderClass}>
                <Info className={infoIconClass} />
                <h3 className={tipTitleClass}>{t('onboarding.quickTip')}</h3>
              </div>
              <p className={tipTextClass}>{t('onboarding.completeProfileTip')}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className={buttonClass}>
              <Link href="/auth/verify-email">{t('onboarding.continueToDashboard')}</Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
