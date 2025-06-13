'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { useTranslation } from '@/lib/i18n'
import { verifyEmail } from '@/lib/api/auth'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const containerClass = 'bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10'
const wrapperClass = 'w-full max-w-md'
const cardClass = 'p-8 text-center flex flex-col gap-4'
const messageClass = 'text-lg'
const buttonClass = 'mt-4'
const linkClass = 'underline underline-offset-4'

export default function VerifyEmailPage() {
  const { t } = useTranslation()
  const params = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<'pending' | 'success' | 'error'>('pending')

  useEffect(() => {
    const token = params.get('token')
    const email = params.get('email')
    if (token && email) {
      verifyEmail({ email, token })
        .then(() => {
          setStatus('success')
          router.push('/onboarding/setup')
        })
        .catch(() => setStatus('error'))
    }
  }, [params, router])

  return (
    <div className={containerClass}>
      <div className={wrapperClass}>
        <Card>
          <CardContent className={cardClass}>
            {status === 'error' ? (
              <p className={messageClass}>{t('onboarding.verifyEmail')}</p>
            ) : (
              <p className={messageClass}>{t('onboarding.verifyEmail')}</p>
            )}
            <Link href="#" className={linkClass}>
              {t('onboarding.resendEmail')}
            </Link>
            <Button asChild className={buttonClass}>
              <Link href="/onboarding/setup">{t('onboarding.goToLogin')}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
