'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useTranslation } from '@/lib/i18n'

const containerClass = 'bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10'
const wrapperClass = 'w-full max-w-md'
const cardClass = 'p-8 text-center flex flex-col gap-6'
const messageClass = 'text-2xl font-bold'

export default function SignupSuccessPage() {
  const { t } = useTranslation()
  const params = useSearchParams()
  const name = params.get('name') || ''
  return (
    <div className={containerClass}>
      <div className={wrapperClass}>
        <Card>
          <CardContent className={cardClass}>
            <h1 className={messageClass}>{t('onboarding.accountCreated', { name })}</h1>
            <Button asChild>
              <Link href="/auth/verify-email">{t('onboarding.continueToDashboard')}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
