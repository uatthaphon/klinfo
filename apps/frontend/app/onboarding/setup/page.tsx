'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from '@/lib/i18n';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Plus } from 'lucide-react';

const containerClass = 'bg-muted flex min-h-screen flex-col items-center justify-center p-4 md:p-8';
const mainClass = 'w-full max-w-3xl';
const cardClass = 'w-full';
const tabsListClass = 'grid w-full grid-cols-3';
const tabsContentClass = 'space-y-4 pt-4';
const gridTwoClass = 'grid grid-cols-1 gap-4 md:grid-cols-2';
const gridThreeClass = 'grid grid-cols-1 gap-4 md:grid-cols-3';
const footerClass = 'flex justify-between';

export default function SetupPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState('clinic');

  const handleNext = () => {
    if (currentStep === 'clinic') {
      setCurrentStep('team');
    } else if (currentStep === 'team') {
      setCurrentStep('services');
    } else {
      router.push('/dashboard');
    }
  };

  const handlePrev = () => {
    if (currentStep === 'services') {
      setCurrentStep('team');
    } else if (currentStep === 'team') {
      setCurrentStep('clinic');
    }
  };

  return (
    <div className={containerClass}>
      <div className={mainClass}>
        <Card className={cardClass}>
          <CardHeader>
            <CardTitle className="text-2xl">{t('onboarding.firstTimeSetup')}</CardTitle>
            <CardDescription>{t('onboarding.setupDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={currentStep} className="w-full">
              <TabsList className={tabsListClass}>
                <TabsTrigger value="clinic">{t('onboarding.clinicDetails')}</TabsTrigger>
                <TabsTrigger value="team">{t('onboarding.teamMembers')}</TabsTrigger>
                <TabsTrigger value="services">{t('onboarding.services')}</TabsTrigger>
              </TabsList>
              <TabsContent value="clinic" className={tabsContentClass}>
                <div className="space-y-2">
                  <Label htmlFor="clinicName">{t('onboarding.clinicName')}</Label>
                  <Input id="clinicName" defaultValue="" />
                </div>
                <div className={gridTwoClass}>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">{t('onboarding.timezone')}</Label>
                    <Select defaultValue="asia_bangkok">
                      <SelectTrigger>
                        <SelectValue placeholder={t('onboarding.timezone')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asia_bangkok">{t('onboarding.timezones.bangkok')} (UTC+7)</SelectItem>
                        <SelectItem value="asia_singapore">{t('onboarding.timezones.singapore')} (UTC+8)</SelectItem>
                        <SelectItem value="asia_kuala_lumpur">{t('onboarding.timezones.kualaLumpur')} (UTC+8)</SelectItem>
                        <SelectItem value="asia_jakarta">{t('onboarding.timezones.jakarta')} (UTC+7)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">{t('onboarding.language')}</Label>
                    <Select defaultValue="th">
                      <SelectTrigger>
                        <SelectValue placeholder={t('onboarding.language')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="th">🇹🇭 {t('onboarding.languageThai')}</SelectItem>
                        <SelectItem value="en">🇺🇸 {t('onboarding.languageEnglish')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">{t('onboarding.address')}</Label>
                  <Input id="address" placeholder="" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('onboarding.phone')}</Label>
                  <Input id="phone" placeholder="" />
                </div>
                <div className={gridThreeClass}>
                  <div className="space-y-2">
                    <Label htmlFor="city">{t('onboarding.city')}</Label>
                    <Input id="city" placeholder="" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">{t('onboarding.state')}</Label>
                    <Input id="state" placeholder="" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">{t('onboarding.zip')}</Label>
                    <Input id="zip" placeholder="" />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="team" className={tabsContentClass}>
                <div className="space-y-2">
                  <Label>{t('onboarding.inviteTeamMembers')}</Label>
                  <p className="text-sm text-gray-500">{t('onboarding.inviteTeamDescription')}</p>
                </div>
                <div className="space-y-4">
                  {[1, 2].map((index) => (
                    <div key={index} className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor={`name-${index}`}>{t('auth.name')}</Label>
                        <Input id={`name-${index}`} placeholder={t('auth.name')} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`email-${index}`}>{t('auth.email')}</Label>
                        <Input id={`email-${index}`} type="email" placeholder="email@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`role-${index}`}>{t('onboarding.role')}</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder={t('onboarding.role')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="doctor">{t('onboarding.roles.doctor')}</SelectItem>
                            <SelectItem value="staff">{t('onboarding.roles.staff')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    {t('onboarding.addAnotherTeamMember')}
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="services" className={tabsContentClass}>
                <div className="space-y-2">
                  <Label>{t('onboarding.servicesTitle')}</Label>
                  <p className="text-sm text-gray-500">{t('onboarding.servicesDescription')}</p>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map((index) => (
                    <div key={index} className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor={`service-${index}`}>{t('onboarding.services')}</Label>
                        <Input id={`service-${index}`} placeholder="e.g., Annual Check-up" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`price-${index}`}>Price ($)</Label>
                        <Input id={`price-${index}`} type="number" placeholder="0.00" />
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    {t('onboarding.addAnotherService')}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className={footerClass}>
            <Button variant="outline" asChild>
              <Link href="/dashboard">{t('onboarding.skipForNow')}</Link>
            </Button>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handlePrev} disabled={currentStep === 'clinic'}>
                {t('onboarding.previousStep')}
              </Button>
              <Button onClick={handleNext}>
                {currentStep === 'services' ? t('onboarding.finishSetup') : t('onboarding.nextStep')}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
