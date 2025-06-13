'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/components/ui/password-input';
import { signup } from '@/lib/api/auth';
import { mapSignupErrorCode } from '@/lib/api/error-handler';
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formRootClass = 'flex flex-col gap-4';
const cardClass = 'overflow-hidden p-0';
const cardContentClass = 'grid p-0 md:grid-cols-2';
const formClass = 'p-6 md:p-8';
const formGroupClass = 'flex flex-col gap-4';
const headingGroupClass = 'flex flex-col items-center text-center';
const headingTextClass = 'text-2xl font-bold';
const subtextClass = 'text-muted-foreground text-sm';
const inputGroupClass = 'grid gap-2';
const passwordLabelWrapperClass = 'flex items-center';
const submitButtonClass = 'w-full';
const loginLinkWrapperClass = 'text-center text-sm';
const loginLinkClass = 'underline underline-offset-4';
const imageContainerClass = 'bg-muted relative hidden md:block';
const imageClass = 'absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale';
const legalNoticeClass =
  'text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4';

export function SignUpForm({ className, ...props }: React.ComponentProps<'div'>) {
  const { t } = useTranslation();

  const router = useRouter();
  const [serverError, setServerError] = useState('');

  const schema = z
    .object({
      name: z.string().min(1, `${t('auth.requiredField')} (${t('auth.name')})`),
      email: z
        .string()
        .min(1, `${t('auth.requiredField')} (${t('auth.email')})`)
        .email(t('auth.invalidEmail')),
      password: z.string().min(6, t('auth.passwordTooShort')),
      confirmPassword: z.string().min(1, `${t('auth.requiredField')} (${t('auth.confirmPassword')})`),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: t('auth.passwordsDoNotMatch'),
    });

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError: setFormError,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    setServerError('');
    try {
      await signup({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      router.push('/auth/login');
    } catch (err: any) {
      const code = err.code || 'unknown';
      const mapped = mapSignupErrorCode(code, t);
      if (mapped?.field) {
        setFormError(mapped.field as keyof FormValues, { type: 'server', message: mapped.message });
      } else {
        setServerError(t(`auth.errorCodes.${code}`) || t('auth.errorCodes.unknown'));
      }
    }
  };

  return (
    <div className={cn(formRootClass, className)} {...props}>
      <Card className={cardClass}>
        <CardContent className={cardContentClass}>
          <form className={formClass} onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className={formGroupClass}>
              <div className={headingGroupClass}>
                <h1 className={headingTextClass}>{t('auth.createAccount')}</h1>
                <p className={subtextClass}>{t('auth.signupToAccount')}</p>
              </div>
              <div className={inputGroupClass}>
                <Label htmlFor="name">{t('auth.name')}</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder={t('auth.namePlaceholder')}
                  aria-invalid={!!errors.name}
                  {...register('name')}
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p id="name-error" className="text-destructive text-sm -mt-1">
                    {errors.name.message}
                  </p>
                )}
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
                {errors.email && (
                  <p id="email-error" className="text-destructive text-sm -mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className={inputGroupClass}>
                <div className={passwordLabelWrapperClass}>
                  <Label htmlFor="password">{t('auth.password')}</Label>
                </div>
                <PasswordInput
                  id="password"
                  isInvalid={!!errors.password}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  {...register('password')}
                  disabled={isSubmitting}
                />
                {errors.password && (
                  <p id="password-error" className="text-destructive text-sm -mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className={inputGroupClass}>
                <div className={passwordLabelWrapperClass}>
                  <Label htmlFor="confirmPassword">{t('auth.confirmPassword')}</Label>
                </div>
                <PasswordInput
                  id="confirmPassword"
                  isInvalid={!!errors.confirmPassword}
                  aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
                  {...register('confirmPassword')}
                  disabled={isSubmitting}
                />
                {errors.confirmPassword && (
                  <p id="confirmPassword-error" className="text-destructive text-sm -mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <Button type="submit" className={submitButtonClass} disabled={isSubmitting}>
                {isSubmitting ? t('auth.loading') : t('auth.signup')}
              </Button>
              {serverError && <p className="text-destructive text-sm text-center">{serverError}</p>}
              <div className={loginLinkWrapperClass}>
                {t('auth.haveAccount')}{' '}
                <Link href="/auth/login" className={loginLinkClass}>
                  {t('auth.login')}
                </Link>
              </div>
            </div>
          </form>
          <div className={imageContainerClass}>
            <img src="/vercel.svg" alt="Image" className={imageClass} />
          </div>
        </CardContent>
      </Card>
      <div className={legalNoticeClass}>
        {t('auth.agree')} <Link href="/terms">{t('auth.terms')}</Link> {t('auth.and')}{' '}
        <Link href="/privacy">{t('auth.privacy')}</Link>.
      </div>
    </div>
  );
}
