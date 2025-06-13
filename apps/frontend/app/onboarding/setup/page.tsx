'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from '@/lib/i18n';
import { setupClinic } from '@/lib/api/onboarding';
import { Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

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
const spaceY5Class = 'space-y-5';
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
const timezoneTextClass = 'text-muted-foreground indent-2';

const serviceSchema = z.object({
  name: z.string().min(1),
  price: z.preprocess((v) => parseFloat(String(v || 0)), z.number()),
});

const schema = z.object({
  name: z.string().min(1),
  language: z.string().optional(),
  phone: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  email: z.string().optional(),
  website: z.string().optional(),
  googleMap: z.string().optional(),
  services: z.array(serviceSchema),
});

export default function SetupPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState('clinic');
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      language: 'th',
      services: [{ name: '', price: 0 }],
    },
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'services' });

  const handleNext = async (data: any) => {
    if (currentStep === 'clinic') {
      setCurrentStep('team');
      return;
    }
    if (currentStep === 'team') {
      setCurrentStep('services');
      return;
    }

    await setupClinic({
      clinicInfo: {
        name: data.name,
        language: data.language,
        timezone: 'Asia/Bangkok',
        phone: data.phone,
        city: data.city,
        state: data.state,
        zip: data.zip,
        email: data.email,
        website: data.website,
        googleMap: data.googleMap,
      },
      // owner will be assigned automatically on the backend
      services: data.services.map((s: any) => ({
        name: s.name,
        price: s.price,
      })),
    });
    router.push('/dashboard');
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
                  <Input id="clinicName" {...register('name')} />
                </div>
                <div className={gridTwoClass}>
                  <div className={spaceY2Class}>
                    <Label htmlFor="language">{t('onboarding.language')}</Label>
                    <Select value={watch('language')} onValueChange={(v) => setValue('language', v)}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('onboarding.language')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="th">🇹🇭 {t('onboarding.languageThai')}</SelectItem>
                        <SelectItem value="en">🇺🇸 {t('onboarding.languageEnglish')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className={spaceY5Class}>
                    <Label htmlFor="timezone">{t('onboarding.timezone')}</Label>
                    <input type="hidden" id="timezone" value="Asia/Bangkok" />
                    <Label className={timezoneTextClass}>{`${t('onboarding.timezones.bangkok')} (UTC+7)`}</Label>
                  </div>
                </div>
                <div className={spaceY2Class}>
                  <Label htmlFor="phone">{t('onboarding.phone')}</Label>
                  <Input id="phone" {...register('phone')} placeholder="" />
                </div>
                <div className={gridThreeClass}>
                  <div className={spaceY2Class}>
                    <Label htmlFor="city">{t('onboarding.city')}</Label>
                    <Input id="city" {...register('city')} placeholder="" />
                  </div>
                  <div className={spaceY2Class}>
                    <Label htmlFor="state">{t('onboarding.state')}</Label>
                    <Input id="state" {...register('state')} placeholder="" />
                  </div>
                  <div className={spaceY2Class}>
                    <Label htmlFor="zip">{t('onboarding.zip')}</Label>
                    <Input id="zip" {...register('zip')} placeholder="" />
                  </div>
                </div>
                <div className={spaceY2Class}>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...register('email')} />
                </div>
                <div className={spaceY2Class}>
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" {...register('website')} />
                </div>
                <div className={spaceY2Class}>
                  <Label htmlFor="googleMap">Google Map Link</Label>
                  <Input id="googleMap" {...register('googleMap')} />
                </div>
              </TabsContent>
              <TabsContent value="team" className={tabsContentClass}>
                <div className={spaceY2Class}>
                  <Label>{t('onboarding.inviteTeamMembers')}</Label>
                  <p className={inviteDescClass}>
                    {t('onboarding.inviteTeamDescription')}{' '}
                    <Link href="/pricing" target="_blank" className="underline">
                      Pricing
                    </Link>
                  </p>
                </div>
                <p className={inviteDescClass}>{t('onboarding.singleMemberNotice')}</p>
              </TabsContent>
              <TabsContent value="services" className={tabsContentClass}>
                <div className={spaceY2Class}>
                  <Label>{t('onboarding.servicesTitle')}</Label>
                  <p className={inviteDescClass}>{t('onboarding.servicesDescription')}</p>
                </div>
                <div className={gridHeadClass}>
                  <Label htmlFor="service-0">{t('onboarding.services')}</Label>
                  <Label htmlFor="price-0" className={priceHeadClass}>
                    {t('onboarding.price')}
                  </Label>
                </div>
                <div className={spaceY4Class}>
                  {fields.map((field, index) => (
                    <div key={field.id} className={gridRowClass}>
                      <Input
                        id={`service-${index}`}
                        placeholder="e.g., Annual Check-up"
                        className={serviceInputClass}
                        {...register(`services.${index}.name` as const)}
                      />
                      <div className={flexRowClass}>
                        <Input
                          id={`price-${index}`}
                          type="number"
                          placeholder="0.00"
                          {...register(`services.${index}.price` as const, { valueAsNumber: true })}
                        />
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          onClick={() => remove(index)}
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
                    onClick={() => append({ name: '', price: 0 })}
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
              <Button onClick={handleSubmit(handleNext)}>
                {currentStep === 'services' ? t('onboarding.finishSetup') : t('onboarding.nextStep')}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
