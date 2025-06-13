'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useTranslation } from '@/lib/i18n'

const containerClass = 'bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10'
const wrapperClass = 'w-full max-w-md'
const cardClass = 'p-6 space-y-4'
const formClass = 'space-y-4'
const buttonClass = 'w-full'

export default function FirstTimeSetupPage() {
  const { t } = useTranslation()
  return (
    <div className={containerClass}>
      <div className={wrapperClass}>
        <Card>
          <CardContent className={cardClass}>
            <h1 className="text-2xl font-bold text-center">{t('onboarding.firstTimeSetup')}</h1>
            <form className={formClass}>
              <div className="grid gap-2">
                <Label htmlFor="clinic">{t('onboarding.clinicName')}</Label>
                <Input id="clinic" type="text" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="timezone">{t('onboarding.timezone')}</Label>
                <Input id="timezone" type="text" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="language">{t('onboarding.language')}</Label>
                <Input id="language" type="text" />
              </div>
              <Button type="submit" className={buttonClass}>{t('onboarding.saveContinue')}</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
