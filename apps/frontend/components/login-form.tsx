'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { login } from "@/lib/api/auth";
import { mapLoginErrorCode } from "@/lib/api/error-handler";

const rootClass = "flex flex-col gap-6";
const cardClass = "overflow-hidden p-0";
const cardContentClass = "grid p-0 md:grid-cols-2";
const formClass = "p-6 md:p-8";
const formGroupClass = "flex flex-col gap-6";
const headingWrapperClass = "flex flex-col items-center text-center";
const headingClass = "text-2xl font-bold";
const subtextClass = "text-muted-foreground text-sm";
const inputGroupClass = "grid gap-3";
const passwordLabelWrapperClass = "flex items-center";
const forgotPasswordLinkClass = "ml-auto text-sm underline-offset-2 hover:underline";
const submitButtonClass = "w-full";
const footerTextClass = "text-center text-sm";
const signupLinkClass = "underline underline-offset-4";
const imageWrapperClass = "bg-muted relative hidden md:block";
const imageClass = "absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale";
const legalNoticeClass = "text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { t } = useTranslation();
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const schema = z
    .object({
      email: z
        .string()
        .min(1, `${t("auth.requiredField")} (${t("auth.email")})`)
        .email(t("auth.invalidEmail")),
      password: z
        .string()
        .min(1, `${t("auth.requiredField")} (${t("auth.password")})`),
    })
    .required();

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
    setServerError("");
    try {
      await login(values);
      router.push("/dashboard");
    } catch (err: any) {
      const code = err.code || "UNKNOWN";
      const mapped = mapLoginErrorCode(code, t);
      if (mapped?.field) {
        setFormError(mapped.field as keyof FormValues, { type: "server", message: mapped.message });
      } else {
        setServerError(t(`auth.errorCodes.${code}`) || t("auth.errorCodes.UNKNOWN"));
      }
    }
  };

  return (
    <div className={cn(rootClass, className)} {...props}>
      <Card className={cardClass}>
        <CardContent className={cardContentClass}>
          <form className={formClass} onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className={formGroupClass}>
              <div className={headingWrapperClass}>
                <h1 className={headingClass}>{t("auth.welcomeBack")}</h1>
                <p className={subtextClass}>
                  {t("auth.loginToAccount")}
                </p>
              </div>
              <div className={inputGroupClass}>
                <Label htmlFor="email">{t("auth.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("auth.emailPlaceholder")}
                  aria-invalid={!!errors.email}
                  {...register("email")}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-destructive text-sm -mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className={inputGroupClass}>
                <div className={passwordLabelWrapperClass}>
                  <Label htmlFor="password">{t("auth.password")}</Label>
                  <a
                    href="#"
                    className={forgotPasswordLinkClass}
                  >
                    {t("auth.forgotPassword")}
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  aria-invalid={!!errors.password}
                  {...register("password")}
                  disabled={isSubmitting}
                />
                {errors.password && (
                  <p className="text-destructive text-sm -mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className={submitButtonClass}
                disabled={isSubmitting}
              >
                {t("auth.login")}
              </Button>
              <div className={footerTextClass}>
                {t("auth.noAccount")}{" "}
                <a href="#" className={signupLinkClass}>
                  {t("auth.signup")}
                </a>
              </div>
              {serverError && (
                <p className="text-destructive text-sm text-center">{serverError}</p>
              )}
            </div>
          </form>
          <div className={imageWrapperClass}>
            <img
              src="/vercel.svg"
              alt="Image"
              className={imageClass}
            />
          </div>
        </CardContent>
      </Card>
      <div className={legalNoticeClass}>
        {t("auth.agree")} <a href="#">{t("auth.terms")}</a>{" "}
        {t("auth.and")} <a href="#">{t("auth.privacy")}</a>.
      </div>
    </div>
  )
}
