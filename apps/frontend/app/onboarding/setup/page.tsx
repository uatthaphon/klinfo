'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { setupClinic } from '@/lib/api/onboarding';
import { useTranslation } from '@/lib/i18n';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
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
const gridRowClass = 'grid grid-cols-1 gap-4 md:grid-cols-3 items-end md:items-start';
const flexRowClass = 'flex items-center gap-2';
const iconSmallClass = 'h-4 w-4';
const addButtonClass = 'w-full';
const plusIconClass = 'mr-2 h-4 w-4';
const priceHeadClass = 'md:col-span-2 text-right md:text-left';
const serviceInputClass = 'md:col-span-2';
const footerButtonsClass = 'flex space-x-2';
const timezoneTextClass = 'text-muted-foreground indent-2';

const serviceSchema = z.object({
  name: z.string().min(1, { message: 'Service name is required' }),
  price: z.preprocess((v) => parseFloat(String(v || 0)), z.number().min(0, { message: 'Price must be at least 0' })),
});

const memberSchema = z.object({
  email: z.string().email({ message: 'Valid email required' }),
  role: z.enum(['doctor', 'staff']),
});

const schema = z.object({
  name: z.string().min(1, { message: 'Clinic name is required' }),
  language: z.string().min(1, { message: 'Language is required' }),
  phone: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  email: z.string().optional(),
  website: z.string().optional(),
  googleMap: z.string().optional(),
  members: z.array(memberSchema).max(1, { message: 'Only one member allowed on free plan' }),
  services: z.array(serviceSchema).min(1, { message: 'At least one service is required' }),
});

export default function SetupPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<'clinic' | 'team' | 'services'>('clinic');
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      language: 'th',
      services: [{ name: '', price: 0 }],
      members: [],
    },
    mode: 'onTouched',
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'services' });
  const {
    fields: fieldsMembers,
    append: appendMember,
    remove: removeMember,
  } = useFieldArray({ control, name: 'members' });

  const onSubmit = async (data: any) => {
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
      members: data.members,
      services: data.services.map((s: any) => ({
        name: s.name,
        price: s.price,
      })),
    });
    router.push('/dashboard');
  };

  const handleNext = async () => {
    if (currentStep === 'clinic') {
      const valid = await trigger(['name', 'language']);
      if (valid) setCurrentStep('team');
      return;
    }
    if (currentStep === 'team') {
      // Validate the members field before advancing to services
      const valid = await trigger(['members']);
      if (valid) setCurrentStep('services');
      return;
    }
    handleSubmit(onSubmit)();
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
            <Tabs value={currentStep} onValueChange={setCurrentStep} className={tabsClass}>
              <TabsList className={tabsListClass}>
                <TabsTrigger value="clinic">{t('onboarding.clinicDetails')}</TabsTrigger>
                <TabsTrigger value="team">{t('onboarding.teamMembers')}</TabsTrigger>
                <TabsTrigger value="services">{t('onboarding.services')}</TabsTrigger>
              </TabsList>
              <TabsContent value="clinic" className={tabsContentClass}>
                <div className={spaceY2Class}>
                  <Label htmlFor="clinicName">
                    {t('onboarding.clinicName')} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="clinicName"
                    {...register('name')}
                    required
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>
                <div className={gridTwoClass}>
                  <div className={spaceY2Class}>
                    <Label htmlFor="language">
                      {t('onboarding.language')} <span className="text-red-500">*</span>
                    </Label>
                    <Select value={watch('language')} onValueChange={(v) => setValue('language', v)} required>
                      <SelectTrigger className={errors.language ? 'border-red-500' : ''}>
                        <SelectValue placeholder={t('onboarding.language')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="th">🇹🇭 {t('onboarding.languageThai')}</SelectItem>
                        <SelectItem value="en">🇺🇸 {t('onboarding.languageEnglish')}</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.language && <p className="text-red-500 text-sm">{errors.language.message}</p>}
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
                <div className={spaceY2Class}>
                  {fieldsMembers.length < 1 && (
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => appendMember({ email: '', role: 'staff' })}
                    >
                      <Plus className={plusIconClass} />
                      {t('onboarding.addMember')}
                    </Button>
                  )}
                  {fieldsMembers.map((field, index) => (
                    <div key={field.id} className={gridRowClass}>
                      <Input
                        placeholder="staff@example.com"
                        {...register(`members.${index}.email` as const)}
                        required
                        type="email"
                        className={errors.members && errors.members[index]?.email ? 'border-red-500' : ''}
                      />
                      <Select
                        value={watch(`members.${index}.role`)}
                        onValueChange={(v) => setValue(`members.${index}.role`, v)}
                      >
                        <SelectTrigger className={errors.members && errors.members[index]?.role ? 'border-red-500' : ''}>
                          <SelectValue placeholder={t('onboarding.role')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="doctor">{t('onboarding.roles.doctor')}</SelectItem>
                          <SelectItem value="staff">{t('onboarding.roles.staff')}</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button type="button" size="icon" variant="ghost" onClick={() => removeMember(index)}>
                        <Trash2 className={iconSmallClass} />
                      </Button>
                    </div>
                  ))}
                  {errors.members && typeof errors.members.message === 'string' && (
                    <p className="text-red-500 text-sm">{errors.members.message}</p>
                  )}
                  {errors.members && Array.isArray(errors.members) && errors.members[0] && (
                    <div>
                      {errors.members[0].email && (
                        <p className="text-red-500 text-sm">{errors.members[0].email.message}</p>
                      )}
                      {errors.members[0].role && (
                        <p className="text-red-500 text-sm">{errors.members[0].role.message}</p>
                      )}
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="services" className={tabsContentClass}>
                <div className={spaceY2Class}>
                  <Label>{t('onboarding.servicesTitle')}</Label>
                  <p className={inviteDescClass}>{t('onboarding.servicesDescription')}</p>
                </div>
                <div className={gridHeadClass}>
                  <Label htmlFor="service-0">
                    {t('onboarding.services')} <span className="text-red-500">*</span>
                  </Label>
                  <Label htmlFor="price-0" className={priceHeadClass}>
                    {t('onboarding.price')} <span className="text-red-500">*</span>
                  </Label>
                </div>
                <div className={spaceY4Class}>
                  {fields.map((field, index) => {
                    return (
                      <div key={field.id} className={gridRowClass}>
                        <div className="flex flex-col space-y-1 md:col-span-2">
                          <Input
                            id={`service-${index}`}
                            placeholder="e.g., Annual Check-up"
                            className={errors.services && errors.services[index]?.name ? 'border-red-500' : ''}
                            {...register(`services.${index}.name` as const)}
                            required
                          />
                          {errors.services && errors.services[index]?.name && (
                            <p className="text-red-500 text-sm">{errors.services[index].name?.message}</p>
                          )}
                        </div>
                        <div className="flex flex-row items-end gap-2">
                          <div className="flex flex-col space-y-1">
                            <Input
                              id={`price-${index}`}
                              type="number"
                              placeholder="0.00"
                              className={errors.services && errors.services[index]?.price ? 'border-red-500' : ''}
                              {...register(`services.${index}.price` as const, { valueAsNumber: true })}
                              required
                            />
                            {errors.services && errors.services[index]?.price && (
                              <p className="text-red-500 text-sm">{errors.services[index].price?.message}</p>
                            )}
                          </div>
                          <Button type="button" size="icon" variant="ghost" onClick={() => remove(index)}>
                            <Trash2 className={iconSmallClass} />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                  <Button
                    variant="outline"
                    className={addButtonClass}
                    type="button"
                    onClick={() => append({ name: '', price: 0 })}>
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
