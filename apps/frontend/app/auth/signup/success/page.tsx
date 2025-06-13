"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Hospital, Check, CheckCircle, Info } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

const rootClass = "flex min-h-screen flex-col";
const headerClass = "bg-white border-b border-gray-200";
const headerInnerClass = "container flex h-16 items-center px-4 md:px-6";
const brandLinkClass = "flex items-center gap-2";
const logoClass = "h-6 w-6 text-teal-600";
const brandTextClass = "text-xl font-bold";
const mainClass = "flex-1 flex items-center justify-center p-4 md:p-8";
const cardWrapperClass = "mx-auto max-w-md";
const cardHeaderClass = "text-center";
const iconWrapperClass =
  "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100";
const successIconClass = "h-8 w-8 text-teal-600";
const cardTitleClass = "text-2xl";
const cardContentClass = "space-y-4";
const stepBoxClass = "rounded-lg bg-muted p-4";
const stepHeadingClass = "mb-2 font-medium";
const stepListClass = "space-y-2 text-sm";
const stepItemClass = "flex items-center";
const stepIconClass = "mr-2 h-4 w-4 text-teal-600";
const tipBoxClass = "rounded-lg border border-teal-200 bg-teal-50 p-4";
const tipHeaderClass = "flex items-center gap-2";
const infoIconClass = "h-5 w-5 text-teal-600";
const tipTitleClass = "font-medium text-teal-900";
const tipTextClass = "mt-2 text-sm text-teal-800";
const buttonClass = "w-full";
const footerClass = "border-t border-gray-200 bg-white py-6";
const footerInnerClass =
  "container flex flex-col items-center justify-center gap-4 text-center text-sm text-gray-500";
const footerLinkClass = "hover:underline";

export default function SignupSuccessPage() {
  const params = useSearchParams();
  const { t } = useTranslation();
  const [name, setName] = useState("");

  useEffect(() => {
    const pName = params.get("name");
    const stored = localStorage.getItem("userName");
    if (pName) {
      setName(pName);
    } else if (stored) {
      setName(stored);
    }
  }, [params]);

  return (
    <div className={rootClass}>
      <header className={headerClass}>
        <div className={headerInnerClass}>
          <Link href="/" className={brandLinkClass}>
            <Hospital className={logoClass} />
            <span className={brandTextClass}>{t("common.appName")}</span>
          </Link>
        </div>
      </header>
      <main className={mainClass}>
        <Card className={cardWrapperClass}>
          <CardHeader className={cardHeaderClass}>
            <div className={iconWrapperClass}>
              <CheckCircle className={successIconClass} />
            </div>
            <CardTitle className={cardTitleClass}>
              {t("onboarding.accountCreated", {
                name: name || t("auth.signup"),
              })}
            </CardTitle>
            <CardDescription>{t("onboarding.verifyEmail")}</CardDescription>
          </CardHeader>
          <CardContent className={cardContentClass}>
            <div className={stepBoxClass}>
              <h3 className={stepHeadingClass}>{t("onboarding.nextSteps")}</h3>
              <ul className={stepListClass}>
                <li className={stepItemClass}>
                  <Check className={stepIconClass} />
                  {t("onboarding.verifyEmailAddress")}
                </li>
                <li className={stepItemClass}>
                  <Check className={stepIconClass} />
                  {t("onboarding.completeClinicSetup")}
                </li>
                <li className={stepItemClass}>
                  <Check className={stepIconClass} />
                  {t("onboarding.startAddingPatients")}
                </li>
              </ul>
            </div>
            <div className={tipBoxClass}>
              <div className={tipHeaderClass}>
                <Info className={infoIconClass} />
                <h3 className={tipTitleClass}>{t("onboarding.quickTip")}</h3>
              </div>
              <p className={tipTextClass}>
                {t("onboarding.completeProfileTip")}
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className={buttonClass}>
              <Link href="/verify-email">
                {t("onboarding.continueToDashboard")}
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
      <footer className={footerClass}>
        <div className={footerInnerClass}>
          <p>{t("common.rightsReserved")}</p>
          <div className="flex items-center gap-4">
            <Link href="#" className={footerLinkClass}>
              {t("common.terms")}
            </Link>
            <Link href="#" className={footerLinkClass}>
              {t("common.privacy")}
            </Link>
            <Link href="#" className={footerLinkClass}>
              {t("common.contact")}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
