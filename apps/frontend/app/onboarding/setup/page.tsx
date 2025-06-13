'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createClinic } from '@/lib/api/clinics'
import { useTranslation } from '@/lib/i18n'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const containerClass = 'bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10'
const wrapperClass = 'w-full max-w-md'
const cardClass = 'p-6 space-y-4'
const formClass = 'space-y-4'
const buttonClass = 'w-full'

export default function FirstTimeSetupPage() {
  const { t, setLang } = useTranslation()
  const router = useRouter()
  const [clinic, setClinic] = useState('')
  const [timezone, setTimezone] = useState('')
  const [language, setLanguage] = useState<'th' | 'en'>('th')

  useEffect(() => {
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone)
  }, [])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      await createClinic({ name: clinic, timezone, language })
      localStorage.setItem('timezone', timezone)
      localStorage.setItem('lang', language)
      setLang(language)
      router.push('/dashboard')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className={containerClass}>
      <div className={wrapperClass}>
        <Card>
          <CardContent className={cardClass}>
            <h1 className="text-2xl font-bold text-center">{t('onboarding.firstTimeSetup')}</h1>
            <form className={formClass} onSubmit={onSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="clinic">{t('onboarding.clinicName')}</Label>
                <Input id="clinic" type="text" value={clinic} onChange={(e) => setClinic(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="timezone">{t('onboarding.timezone')}</Label>
                <Input id="timezone" type="text" value={timezone} onChange={(e) => setTimezone(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="language">{t('onboarding.language')}</Label>
                <Select value={language} onValueChange={(v) => setLanguage(v as 'th' | 'en')}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="th">ไทย</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className={buttonClass}>{t('onboarding.saveContinue')}</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
