'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { requestPasswordReset } from '@/lib/api/auth';
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formRootClass = 'flex flex-col gap-6';
const cardClass = 'overflow-hidden p-0';
const cardContentClass = 'grid p-0 md:grid-cols-2';
const formClass = 'p-6 md:p-8';
const formGroupClass = 'flex flex-col gap-6';
const headingGroupClass = 'flex flex-col items-center text-center';
const headingTextClass = 'text-2xl font-bold';
const subtextClass = 'text-muted-foreground text-sm';
const inputGroupClass = 'grid gap-3';
const submitButtonClass = 'w-full';
const backLinkWrapperClass = 'text-center text-sm';
const imageContainerClass = 'bg-muted relative hidden md:block';
const imageClass = 'absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale';
const legalNoticeClass =
  'text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4';

export function ResetPasswordForm({ className, ...props }: React.ComponentProps<'div'>) {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');

  const schema = z
    .object({
      email: z.string().min(1, t('auth.requiredField')).email(t('auth.invalidEmail')),
    })
    .required();

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    setMessage('');
    try {
      await requestPasswordReset(values);
      setMessage(t('auth.errorCodes.AUTH_RESET_EMAIL_SENT'));
    } catch (err: any) {
      setMessage(t('auth.errorCodes.AUTH_INVALID_TOKEN'));
    }
  };

  return (
    <div className={cn(formRootClass, className)} {...props}>
      <Card className={cardClass}>
        <CardContent className={cardContentClass}>
          <form className={formClass} onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className={formGroupClass}>
              <div className={headingGroupClass}>
                <h1 className={headingTextClass}>{t('auth.resetPasswordTitle')}</h1>
                <p className={subtextClass}>{t('auth.resetPasswordDescription')}</p>
              </div>
              <div className={inputGroupClass}>
                <Label htmlFor="email">{t('auth.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('auth.emailPlaceholder')}
                  aria-invalid={!!errors.email}
                  {...register('email')}
                  disabled={isSubmitting}
                />
                {errors.email && <p className="text-destructive text-sm -mt-1">{errors.email.message}</p>}
              </div>
              <Button type="submit" className={submitButtonClass} disabled={isSubmitting}>
                {t('auth.continue')}
              </Button>
              <div className={backLinkWrapperClass}>
                <Link href="/auth/login">{t('auth.backToLogin')}</Link>
              </div>
              {message && <p className="text-center text-sm mt-2">{message}</p>}
            </div>
          </form>
          <div className={imageContainerClass}>
            <Image src="/vercel.svg" alt="Image" className={imageClass} fill />
          </div>
        </CardContent>
      </Card>
      <div className={legalNoticeClass}>
        {t('auth.agree')} <a href="#">{t('auth.terms')}</a> {t('auth.and')} <a href="#">{t('auth.privacy')}</a>.
      </div>
    </div>
  );
}
