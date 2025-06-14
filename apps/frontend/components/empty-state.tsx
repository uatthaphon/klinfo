'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getProfile, resendVerificationEmail } from '@/lib/api/auth';
import { useTranslations } from '@/lib/i18n';
import { ArrowRight, Building2, Clock, FileText, Users } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function EmptyState() {
  const { t } = useTranslations('onboarding');
  const [showBanner, setShowBanner] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkStatus = async () => {
    try {
      const res = await getProfile();
      const verified = res?.data?.isVerified;
      localStorage.setItem('isVerified', String(verified));
      setShowBanner(!verified);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    const initial = localStorage.getItem('isVerified');
    setShowBanner(initial === 'false');
    checkStatus();
    const id = setInterval(checkStatus, 15000);
    return () => clearInterval(id);
  }, []);

  const cardClass = 'border-2 border-dashed border-primary/20 bg-primary/5';
  const headerClass = 'text-center';
  const iconWrapperClass = 'mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10';
  const iconClass = 'h-8 w-8 text-primary';
  const featureWrapperClass = 'grid gap-4 md:grid-cols-3';
  const featureCardClass = 'flex flex-col items-center text-center p-4 rounded-lg bg-background';
  const featureIconClass = 'h-8 w-8 text-primary mb-2';
  const featureTitleClass = 'font-semibold';
  const featureDescClass = 'text-sm text-muted-foreground';
  const buttonsWrapperClass = 'flex flex-col gap-3 sm:flex-row sm:justify-center';
  const helpClass = 'text-center text-sm text-muted-foreground';
  const helpLinkClass = 'text-primary hover:underline';
  const bannerClass = 'bg-yellow-100 text-yellow-900 p-4 text-center text-sm';

  return (
    <Card className={cardClass}>
      {showBanner && (
        <div className={bannerClass}>
          {t('emailNotVerifiedBanner')}{' '}
          <Button
            variant="link"
            className="underline-offset-4"
            onClick={() => {
              const email = localStorage.getItem('userEmail');
              if (!email) return;
              setLoading(true);
              resendVerificationEmail(email).finally(() => setLoading(false));
            }}
            disabled={loading}>
            {t('resendVerificationEmail')}
          </Button>
        </div>
      )}
      <CardHeader className={headerClass}>
        <div className={iconWrapperClass}>
          <Building2 className={iconClass} />
        </div>
        <CardTitle className="text-2xl">{t('cta.welcome')}</CardTitle>
        <CardDescription className="text-base">{t('cta.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className={featureWrapperClass}>
          <div className={featureCardClass}>
            <Users className={featureIconClass} />
            <h3 className={featureTitleClass}>{t('cta.managePatientsTitle')}</h3>
            <p className={featureDescClass}>{t('cta.managePatientsDesc')}</p>
          </div>
          <div className={featureCardClass}>
            <Clock className={featureIconClass} />
            <h3 className={featureTitleClass}>{t('cta.queueManagementTitle')}</h3>
            <p className={featureDescClass}>{t('cta.queueManagementDesc')}</p>
          </div>
          <div className={featureCardClass}>
            <FileText className={featureIconClass} />
            <h3 className={featureTitleClass}>{t('cta.handleBillingTitle')}</h3>
            <p className={featureDescClass}>{t('cta.handleBillingDesc')}</p>
          </div>
        </div>
        <div className={buttonsWrapperClass}>
          <Button asChild size="lg" className="flex items-center gap-2">
            <Link href="/onboarding">
              {t('cta.createClinic')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="flex items-center gap-2">
            <Link href="/join-clinic">
              {t('cta.joinClinic')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="flex items-center gap-2">
            <Link href="/pricing" target="_blank" rel="noopener noreferrer">
              {t('cta.viewPricing')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className={helpClass}>
          <p>
            {t('cta.needHelp')}{' '}
            <Link href="/faq" className={helpLinkClass}>
              {t('cta.faqLink')}
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
