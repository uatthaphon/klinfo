'use client';
import { useEffect, useState } from 'react';
import { resendVerificationEmail, getProfile } from '@/lib/api/auth';
import { useTranslation } from '@/lib/i18n';
import { Button } from './ui/button';

const bannerClass = 'bg-yellow-100 text-yellow-900 p-4 text-center text-sm';

export function EmailVerificationBanner() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkStatus = async () => {
    try {
      const res = await getProfile();
      const verified = res?.data?.isVerified;
      localStorage.setItem('isVerified', String(verified));
      setVisible(!verified);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    const initial = localStorage.getItem('isVerified');
    setVisible(initial === 'false');
    checkStatus();
    const id = setInterval(checkStatus, 15000);
    return () => clearInterval(id);
  }, []);

  if (!visible) return null;

  return (
    <div className={bannerClass}>
      {t('onboarding.emailNotVerifiedBanner')}{' '}
      <Button
        variant="link"
        className="underline-offset-4"
        onClick={() => {
          const email = localStorage.getItem('userEmail');
          if (!email) return;
          setLoading(true);
          resendVerificationEmail(email)
            .finally(() => setLoading(false));
        }}
        disabled={loading}
      >
        {t('onboarding.resendVerificationEmail')}
      </Button>
    </div>
  );
}
