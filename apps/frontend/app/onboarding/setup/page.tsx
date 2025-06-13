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
import { Plus, Trash2 } from 'lucide-react';

const containerClass = 'bg-muted flex min-h-screen flex-col items-center justify-center p-4 md:p-8';
const mainClass = 'w-full max-w-3xl';
const cardClass = 'w-full';
const tabsClass = 'w-full';
const tabsListClass = 'grid w-full grid-cols-3';
const tabsContentClass = 'space-y-4 pt-4';
const gridTwoClass = 'grid grid-cols-1 gap-4 md:grid-cols-2';
const gridThreeClass = 'grid grid-cols-1 gap-4 md:grid-cols-3';
const footerClass = 'flex justify-between';
const titleClass = 'text-2xl';
const spaceY2Class = 'space-y-2';
const spaceY4Class = 'space-y-4';
const inviteDescClass = 'text-sm text-gray-500';
const gridHeadClass = 'grid grid-cols-1 gap-4 md:grid-cols-3 font-medium';
const gridRowClass = 'grid grid-cols-1 gap-4 md:grid-cols-3 items-end';
const flexRowClass = 'flex items-center gap-2';
const iconSmallClass = 'h-4 w-4';
const addButtonClass = 'w-full';
const plusIconClass = 'mr-2 h-4 w-4';
const priceHeadClass = 'md:col-span-2 text-right md:text-left';
const serviceInputClass = 'md:col-span-2';
const footerButtonsClass = 'flex space-x-2';

export default function SetupPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState('clinic');
  const [teamMembers, setTeamMembers] = useState([{ id: 1 }]);
  const [servicesList, setServicesList] = useState([{ id: 1 }]);

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
            <CardTitle className={titleClass}>{t('onboarding.firstTimeSetup')}</CardTitle>
            <CardDescription>{t('onboarding.setupDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={currentStep} className={tabsClass}>
              <TabsList className={tabsListClass}>
                <TabsTrigger value="clinic">{t('onboarding.clinicDetails')}</TabsTrigger>
                <TabsTrigger value="team">{t('onboarding.teamMembers')}</TabsTrigger>
                <TabsTrigger value="services">{t('onboarding.services')}</TabsTrigger>
              </TabsList>
              <TabsContent value="clinic" className={tabsContentClass}>
                <div className={spaceY2Class}>
                  <Label htmlFor="clinicName">{t('onboarding.clinicName')}</Label>
                  <Input id="clinicName" defaultValue="" />
                </div>
                <div className={gridTwoClass}>
                  <div className={spaceY2Class}>
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
                  <div className={spaceY2Class}>
                    <input type="hidden" id="timezone" value="Asia/Bangkok" />
                    <Label htmlFor="timezone">{t('onboarding.timezone')} (UTC+7)</Label>
                  </div>
                </div>
                <div className={spaceY2Class}>
                  <Label htmlFor="address">{t('onboarding.address')}</Label>
                  <Input id="address" placeholder="" />
                </div>
                <div className={spaceY2Class}>
                  <Label htmlFor="phone">{t('onboarding.phone')}</Label>
                  <Input id="phone" placeholder="" />
                </div>
                <div className={gridThreeClass}>
                  <div className={spaceY2Class}>
                    <Label htmlFor="city">{t('onboarding.city')}</Label>
                    <Input id="city" placeholder="" />
                  </div>
                  <div className={spaceY2Class}>
                    <Label htmlFor="state">{t('onboarding.state')}</Label>
                    <Input id="state" placeholder="" />
                  </div>
                  <div className={spaceY2Class}>
                    <Label htmlFor="zip">{t('onboarding.zip')}</Label>
                    <Input id="zip" placeholder="" />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="team" className={tabsContentClass}>
                <div className={spaceY2Class}>
                  <Label>{t('onboarding.inviteTeamMembers')}</Label>
                  <p className={inviteDescClass}>{t('onboarding.inviteTeamDescription')}</p>
                </div>
                <div className={gridHeadClass}>
                  <span>{t('auth.name')}</span>
                  <span>{t('auth.email')}</span>
                  <span>{t('onboarding.role')}</span>
                </div>
                <div className={spaceY4Class}>
                  {teamMembers.map((member, index) => (
                    <div key={member.id} className={gridRowClass}>
                      <Input id={`name-${index}`} placeholder={t('auth.name')} />
                      <Input id={`email-${index}`} type="email" placeholder="email@example.com" />
                      <div className={flexRowClass}>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder={t('onboarding.role')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="doctor">{t('onboarding.roles.doctor')}</SelectItem>
                            <SelectItem value="staff">{t('onboarding.roles.staff')}</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          onClick={() =>
                            setTeamMembers((prev) =>
                              prev.length > 1 ? prev.filter((_, i) => i !== index) : prev,
                            )
                          }
                        >
                          <Trash2 className={iconSmallClass} />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    className={addButtonClass}
                    type="button"
                    onClick={() =>
                      setTeamMembers((prev) => [...prev, { id: Date.now() }])
                    }
                  >
                    <Plus className={plusIconClass} />
                    {t('onboarding.addAnotherTeamMember')}
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="services" className={tabsContentClass}>
                <div className={spaceY2Class}>
                  <Label>{t('onboarding.servicesTitle')}</Label>
                  <p className={inviteDescClass}>{t('onboarding.servicesDescription')}</p>
                </div>
                <div className={gridHeadClass}>
                  <span>{t('onboarding.services')}</span>
                  <span className={priceHeadClass}>{t('onboarding.price')}</span>
                </div>
                <div className={spaceY4Class}>
                  {servicesList.map((service, index) => (
                    <div key={service.id} className={gridRowClass}>
                      <Input id={`service-${index}`} placeholder="e.g., Annual Check-up" className={serviceInputClass} />
                      <div className={flexRowClass}>
                        <Input id={`price-${index}`} type="number" placeholder="0.00" />
                        <span>฿</span>
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          onClick={() =>
                            setServicesList((prev) =>
                              prev.length > 1 ? prev.filter((_, i) => i !== index) : prev,
                            )
                          }
                        >
                          <Trash2 className={iconSmallClass} />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    className={addButtonClass}
                    type="button"
                    onClick={() =>
                      setServicesList((prev) => [...prev, { id: Date.now() }])
                    }
                  >
                    <Plus className={plusIconClass} />
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
            <div className={footerButtonsClass}>
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
