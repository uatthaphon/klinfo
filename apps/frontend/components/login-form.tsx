'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";

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

  return (
    <div className={cn(rootClass, className)} {...props}>
      <Card className={cardClass}>
        <CardContent className={cardContentClass}>
          <form className={formClass}>
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
                  required
                />
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
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className={submitButtonClass}>
                {t("auth.login")}
              </Button>
              <div className={footerTextClass}>
                {t("auth.noAccount")}{" "}
                <a href="#" className={signupLinkClass}>
                  {t("auth.signup")}
                </a>
              </div>
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
