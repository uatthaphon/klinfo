'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { useTranslation } from '@/lib/i18n'

const containerClass = 'bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10'
const wrapperClass = 'w-full max-w-md'
const cardClass = 'p-8 text-center flex flex-col gap-4'
const messageClass = 'text-lg'
const buttonClass = 'mt-4'
const linkClass = 'underline underline-offset-4'

export default function VerifyEmailPage() {
  const { t } = useTranslation()
  return (
    <div className={containerClass}>
      <div className={wrapperClass}>
        <Card>
          <CardContent className={cardClass}>
            <p className={messageClass}>{t('onboarding.verifyEmail')}</p>
            <Link href="#" className={linkClass}>{t('onboarding.resendEmail')}</Link>
            <Button asChild className={buttonClass}>
              <Link href="/onboarding/setup">{t('onboarding.goToLogin')}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
