'use client';

import { signup } from '@/lib/api/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/components/ui/password-input';
import { mapSignupErrorCode } from '@/lib/api/error-handler';
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/utils';

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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!name.trim()) {
      errors.name = `${t('auth.requiredField')} (${t('auth.name')})`;
    }
    if (!email.trim()) {
      errors.email = `${t('auth.requiredField')} (${t('auth.email')})`;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = t('auth.invalidEmail');
    }
    if (!password) {
      errors.password = `${t('auth.requiredField')} (${t('auth.password')})`;
    } else if (password.length < 2) {
      errors.password = t('auth.passwordTooShort');
    }
    if (!confirmPassword) {
      errors.confirmPassword = `${t('auth.requiredField')} (${t('auth.confirmPassword')})`;
    } else if (password !== confirmPassword) {
      errors.confirmPassword = t('auth.passwordsDoNotMatch') || 'Passwords do not match.';
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors({});
    setLoading(true);
    try {
      await signup({ name, email, password });
      router.push('/auth/login');
    } catch (err: any) {
      const code = err.code || 'unknown';
      const mapped = mapSignupErrorCode(code, t);
      if (mapped?.field) {
        setValidationErrors((prev) => ({ ...prev, [mapped.field!]: mapped.message }));
      } else {
        setError(t(`auth.errorCodes.${code}`) || t('auth.errorCodes.unknown'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn(formRootClass, className)} {...props}>
      <Card className={cardClass}>
        <CardContent className={cardContentClass}>
          <form className={formClass} onSubmit={handleSubmit} noValidate>
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
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-invalid={!!validationErrors.name}
                  aria-describedby={validationErrors.name ? 'name-error' : undefined}
                />
                {validationErrors.name && (
                  <p id="name-error" className="text-destructive text-sm">
                    {validationErrors.name}
                  </p>
                )}
              </div>
              <div className={inputGroupClass}>
                <Label htmlFor="email">{t('auth.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('auth.emailPlaceholder')}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={!!validationErrors.email}
                  aria-describedby={validationErrors.email ? 'email-error' : undefined}
                />
                {validationErrors.email && (
                  <p id="email-error" className="text-destructive text-sm">
                    {validationErrors.email}
                  </p>
                )}
              </div>
              <div className={inputGroupClass}>
                <div className={passwordLabelWrapperClass}>
                  <Label htmlFor="password">{t('auth.password')}</Label>
                </div>
                <PasswordInput
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={!!validationErrors.password}
                  aria-describedby={validationErrors.password ? 'password-error' : undefined}
                />
                {validationErrors.password && (
                  <p id="password-error" className="text-destructive text-sm">
                    {validationErrors.password}
                  </p>
                )}
              </div>
              <div className={inputGroupClass}>
                <div className={passwordLabelWrapperClass}>
                  <Label htmlFor="confirmPassword">{t('auth.confirmPassword')}</Label>
                </div>
                <PasswordInput
                  id="confirmPassword"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  isInvalid={!!validationErrors.confirmPassword}
                  aria-describedby={validationErrors.confirmPassword ? 'confirmPassword-error' : undefined}
                />
                {validationErrors.confirmPassword && (
                  <p id="confirmPassword-error" className="text-destructive text-sm">
                    {validationErrors.confirmPassword}
                  </p>
                )}
              </div>
              <Button type="submit" className={submitButtonClass} disabled={loading}>
                {t('auth.signup')}
              </Button>
              {error && <p className="text-destructive text-sm text-center">{error}</p>}
              <div className={loginLinkWrapperClass}>
                {t('auth.haveAccount')}{' '}
                <a href="#" className={loginLinkClass}>
                  {t('auth.login')}
                </a>
              </div>
            </div>
          </form>
          <div className={imageContainerClass}>
            <img src="/vercel.svg" alt="Image" className={imageClass} />
          </div>
        </CardContent>
      </Card>
      <div className={legalNoticeClass}>
        {t('auth.agree')} <a href="#">{t('auth.terms')}</a> {t('auth.and')} <a href="#">{t('auth.privacy')}</a>.
      </div>
    </div>
  );
}
