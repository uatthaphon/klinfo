'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useTranslations } from '@/lib/i18n'
import { ArrowRight, Building2 } from 'lucide-react'
import Link from 'next/link'

export function EmptyState() {
  const { t } = useTranslations('onboardingEmptyState')

  const cardClass = 'border-2 border-dashed border-primary/20 bg-primary/5'
  const headerClass = 'text-center'
  const iconWrapperClass = 'mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10'
  const iconClass = 'h-8 w-8 text-primary'
  const buttonsWrapperClass = 'flex flex-col gap-3 sm:flex-row sm:justify-center'
  const helpClass = 'text-center text-sm text-muted-foreground'
  const helpLinkClass = 'text-primary hover:underline'

  return (
    <Card className={cardClass}>
      <CardHeader className={headerClass}>
        <div className={iconWrapperClass}>
          <Building2 className={iconClass} />
        </div>
        <CardTitle className="text-2xl">{t('welcome')}</CardTitle>
        <CardDescription className="text-base">{t('description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className={buttonsWrapperClass}>
          <Button asChild size="lg" className="flex items-center gap-2">
            <Link href="/onboarding">
              {t('createClinic')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="flex items-center gap-2">
            <Link href="/join-clinic">
              {t('joinClinic')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="flex items-center gap-2">
            <Link href="/pricing" target="_blank" rel="noopener noreferrer">
              {t('viewPricing')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className={helpClass}>
          <p>
            {t('needHelp')}{' '}
            <Link href="/faq" className={helpLinkClass}>
              {t('faqLink')}
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
