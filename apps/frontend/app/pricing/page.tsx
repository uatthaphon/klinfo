"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useTranslation } from '@lib/i18n'
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { BarChart3, Bell, Building, FileText, LayoutTemplate, ListCheck, MapPin, ShieldCheck, ShoppingCart, User, User2, UserCog, Users } from "lucide-react"
import { useState } from "react"

// ClassName constants
const flexWrapGroupClass = "flex flex-row flex-wrap items-center gap-12";
const iconGraySmallClass = "h-5 w-5 text-gray-500";
const tooltipTriggerClass = "cursor-pointer border-b border-dashed border-muted-foreground";
const featureIconClass = "h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0";
const pageClass = "min-h-screen bg-white py-16 px-4";
const containerClass = "max-w-7xl mx-auto";
const headerClass = "text-center mb-16";
const headingClass = "text-5xl font-bold text-gray-900 mb-6";
const trustRowClass = "flex items-center justify-center gap-8 mb-12 text-gray-600";
const trustGroupClass = "flex items-center gap-2";
const avatarGroupClass = "*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale";
const billingTabsClass = "w-fit mx-auto rounded-full";
const billingTabsListClass = "grid w-full h-full grid-cols-2 rounded-full";
const pricingGridClass = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6";
const cardBaseClass = "relative border rounded-xl p-6";
const badgePopularClass = "absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white";
const cardTitleClass = "text-xl text-gray-900 mb-4 flex items-center gap-2";
const cardPriceClass = "text-4xl font-bold text-gray-900";
const cardPriceSuffixClass = "text-gray-600 ml-1";
const cardInfoClass = "text-gray-600 text-sm";
const buttonBaseClass = "w-full mb-6 rounded-full bg-blue-600 hover:bg-blue-700 text-white";
const sectionTitleClass = "font-medium text-muted-foreground text-sm mb-2";
const featureItemClass = "flex items-start gap-3";
const featureTextClass = "text-sm";
const iconAvailableClass = "text-green-600 font-semibold";
const iconLimitedClass = "text-yellow-500 font-semibold";
const iconUnavailableClass = "text-red-500 font-semibold";
const avatarClass = "h-8 w-8 rounded-full";
const avatarImageClass = "rounded-full";
const avatarFallbackClass = "rounded-full";
const tabsTriggerClass = "rounded-full text-2xl px-8";
const tabsTriggerActiveClass = "bg-white text-blue-600 shadow-sm";
const tabsTriggerInactiveClass = "text-gray-600 hover:text-gray-900";
const badgeSaveClass = "ml-2 text-[12px] bg-blue-500 text-background";
const sectionGroupClass = "space-y-4";
const cardHeaderPaddingClass = "p-0";

const plans = [
  {
    name: (t: any) => t("pricing.plan.free"),
    monthlyPrice: 0,
    info: (t: any) => t("pricing.info.free"),
    tooltip: (t: any) => t("pricing.tooltips.free"),
    features: [
      { icon: ListCheck, text: (t: any) => t("pricing.features.queueManagement"), category: "Core Features", available: true },
      { icon: Users, text: (t: any) => t("pricing.features.patientList"), category: "Core Features", available: true },
      { icon: MapPin, text: (t: any) => t("pricing.features.visitTracking"), category: "Core Features", available: true },
      { icon: ShoppingCart, text: (t: any) => t("pricing.features.orderFinalization"), category: "Core Features", available: false },
      { icon: ShoppingCart, text: (t: any) => t("pricing.features.billing"), category: "Core Features", available: false },
      { icon: FileText, text: (t: any) => t("pricing.features.mcGenerator"), category: "Core Features", available: false },
      { icon: Bell, text: (t: any) => t("pricing.features.followUp"), category: "Core Features", available: false },
      { icon: LayoutTemplate, text: (t: any) => t("pricing.features.mcTemplates"), category: "Core Features", available: false },
      { icon: LayoutTemplate, text: (t: any) => t("pricing.features.consultationTemplates"), category: "Core Features", available: false },
      { icon: LayoutTemplate, text: (t: any) => t("pricing.features.prescriptionTemplates"), category: "Core Features", available: false },
      { icon: User, text: (t: any) => t("pricing.features.oneUser"), category: "Team", available: true },
      { icon: ShieldCheck, text: (t: any) => t("pricing.features.secureLogin"), category: "Security", available: true },
      { icon: UserCog, text: (t: any) => t("pricing.features.roleAccess"), category: "Security", available: false },
      { icon: BarChart3, text: (t: any) => t("pricing.features.insights"), category: "Reports", available: false },
      { icon: FileText, text: (t: any) => t("pricing.features.export"), category: "Reports", available: false },
      { icon: Building, text: (t: any) => t("pricing.features.multiBranch"), category: "Business", available: false },
    ],
    popular: false,
  },
  {
    name: (t: any) => t("pricing.plan.standard"),
    monthlyPrice: 490,
    info: (t: any) => t("pricing.info.standard"),
    tooltip: (t: any) => t("pricing.tooltips.standard"),
    features: [
      { icon: ListCheck, text: (t: any) => t("pricing.features.queueManagement"), category: "Core Features", available: true },
      { icon: Users, text: (t: any) => t("pricing.features.patientList"), category: "Core Features", available: true },
      { icon: MapPin, text: (t: any) => t("pricing.features.visitTracking"), category: "Core Features", available: true },
      { icon: ShoppingCart, text: (t: any) => t("pricing.features.orderFinalization"), category: "Core Features", available: true },
      { icon: ShoppingCart, text: (t: any) => t("pricing.features.billing"), category: "Core Features", available: true },
      { icon: FileText, text: (t: any) => t("pricing.features.mcGenerator"), category: "Core Features", available: true },
      { icon: Bell, text: (t: any) => t("pricing.features.followUp"), category: "Core Features", available: true },
      { icon: LayoutTemplate, text: (t: any) => t("pricing.features.mcTemplates") + " (Limit 2)", category: "Core Features", available: true, limit: true },
      { icon: LayoutTemplate, text: (t: any) => t("pricing.features.consultationTemplates") + " (Limit 2)", category: "Core Features", available: true, limit: true },
      { icon: LayoutTemplate, text: (t: any) => t("pricing.features.prescriptionTemplates") + " (Limit 2)", category: "Core Features", available: true, limit: true },
      { icon: Users, text: (t: any) => t("pricing.features.staff3"), category: "Team", available: true },
      { icon: ShieldCheck, text: (t: any) => t("pricing.features.secureLogin"), category: "Security", available: true },
      { icon: UserCog, text: (t: any) => t("pricing.features.roleAccess"), category: "Security", available: false },
      { icon: BarChart3, text: (t: any) => t("pricing.features.insights") + " (Basic)", category: "Reports", available: true, limit: true },
      { icon: FileText, text: (t: any) => t("pricing.features.export"), category: "Reports", available: false },
      { icon: Building, text: (t: any) => t("pricing.features.multiBranch"), category: "Business", available: false },
    ],
    popular: false,
  },
  {
    name: (t: any) => t("pricing.plan.pro"),
    monthlyPrice: 990,
    info: (t: any) => t("pricing.info.pro"),
    tooltip: (t: any) => t("pricing.tooltips.pro"),
    features: [
      { icon: ListCheck, text: (t: any) => t("pricing.features.queueManagement"), category: "Core Features", available: true },
      { icon: Users, text: (t: any) => t("pricing.features.patientList"), category: "Core Features", available: true },
      { icon: MapPin, text: (t: any) => t("pricing.features.visitTracking"), category: "Core Features", available: true },
      { icon: ShoppingCart, text: (t: any) => t("pricing.features.orderFinalization"), category: "Core Features", available: true },
      { icon: ShoppingCart, text: (t: any) => t("pricing.features.billing"), category: "Core Features", available: true },
      { icon: FileText, text: (t: any) => t("pricing.features.mcGenerator"), category: "Core Features", available: true },
      { icon: Bell, text: (t: any) => t("pricing.features.followUp"), category: "Core Features", available: true },
      { icon: LayoutTemplate, text: (t: any) => t("pricing.features.mcTemplates"), category: "Core Features", available: true },
      { icon: LayoutTemplate, text: (t: any) => t("pricing.features.consultationTemplates"), category: "Core Features", available: true },
      { icon: LayoutTemplate, text: (t: any) => t("pricing.features.prescriptionTemplates"), category: "Core Features", available: true },
      { icon: User2, text: (t: any) => t("pricing.features.unlimitedStaff"), category: "Team", available: true },
      { icon: ShieldCheck, text: (t: any) => t("pricing.features.secureLogin"), category: "Security", available: true },
      { icon: UserCog, text: (t: any) => t("pricing.features.roleAccess"), category: "Security", available: true },
      { icon: BarChart3, text: (t: any) => t("pricing.features.insights"), category: "Reports", available: true },
      { icon: FileText, text: (t: any) => t("pricing.features.export"), category: "Reports", available: true },
      { icon: Building, text: (t: any) => t("pricing.features.multiBranch"), category: "Business", available: false },
    ],
    popular: true,
  },
  {
    name: (t: any) => t("pricing.plan.premium"),
    monthlyPrice: 1490,
    info: (t: any) => t("pricing.info.premium"),
    tooltip: (t: any) => t("pricing.tooltips.premium"),
    features: [
      { icon: ListCheck, text: (t: any) => t("pricing.features.queueManagement"), category: "Core Features", available: true },
      { icon: Users, text: (t: any) => t("pricing.features.patientList"), category: "Core Features", available: true },
      { icon: MapPin, text: (t: any) => t("pricing.features.visitTracking"), category: "Core Features", available: true },
      { icon: ShoppingCart, text: (t: any) => t("pricing.features.orderFinalization"), category: "Core Features", available: true },
      { icon: ShoppingCart, text: (t: any) => t("pricing.features.billing"), category: "Core Features", available: true },
      { icon: FileText, text: (t: any) => t("pricing.features.mcGenerator"), category: "Core Features", available: true },
      { icon: Bell, text: (t: any) => t("pricing.features.followUp"), category: "Core Features", available: true },
      { icon: LayoutTemplate, text: (t: any) => t("pricing.features.mcTemplates"), category: "Core Features", available: true },
      { icon: LayoutTemplate, text: (t: any) => t("pricing.features.consultationTemplates"), category: "Core Features", available: true },
      { icon: LayoutTemplate, text: (t: any) => t("pricing.features.prescriptionTemplates"), category: "Core Features", available: true },
      { icon: User2, text: (t: any) => t("pricing.features.unlimitedStaff"), category: "Team", available: true },
      { icon: ShieldCheck, text: (t: any) => t("pricing.features.secureLogin"), category: "Security", available: true },
      { icon: UserCog, text: (t: any) => t("pricing.features.roleAccess"), category: "Security", available: true },
      { icon: BarChart3, text: (t: any) => t("pricing.features.insights"), category: "Reports", available: true },
      { icon: FileText, text: (t: any) => t("pricing.features.export"), category: "Reports", available: true },
      { icon: Building, text: (t: any) => t("pricing.features.multiBranchLimit"), category: "Business", available: true },
    ],
    popular: false,
  },
];
export default function PricingPage() {
  const { t } = useTranslation();
  const [billingCycle, setBillingCycle] = useState("monthly")

  const formatPrice = (price: number, isYearly: boolean) => {
    if (price === 0) return t("pricing.plan.free")
    const finalPrice = isYearly ? Math.round(price * 0.8) : price
    return `฿${finalPrice.toLocaleString()}`
  }

  const isYearly = billingCycle === "yearly"

  // Evaluate plan values with t
  const evaluatedPlans = plans.map(plan => ({
    ...plan,
    name: typeof plan.name === "function" ? plan.name(t) : plan.name,
    info: typeof plan.info === "function" ? plan.info(t) : plan.info,
    tooltip: typeof plan.tooltip === "function" ? plan.tooltip(t) : plan.tooltip,
    features: plan.features.map(feature => ({
      ...feature,
      text: typeof feature.text === "function" ? feature.text(t) : feature.text,
    })),
  }))

  return (
    <div className={pageClass}>
      <div className={containerClass}>
        {/* Header */}
        <div className={headerClass}>
          <h1 className={headingClass}>{t("pricing.choosePlan")}</h1>

          {/* Trust indicators */}
          <div className={trustRowClass}>
            <div className={trustGroupClass}>
              <div className={flexWrapGroupClass}>
                <div className={avatarGroupClass}>
                  <Avatar className={avatarClass}>
                    <AvatarImage
                      className={avatarImageClass}
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback className={avatarFallbackClass}>CN</AvatarFallback>
                  </Avatar>
                  <Avatar className={avatarClass}>
                    <AvatarImage
                      className={avatarImageClass}
                      src="https://github.com/leerob.png"
                      alt="@leerob"
                    />
                    <AvatarFallback className={avatarFallbackClass}>LR</AvatarFallback>
                  </Avatar>
                  <Avatar className={avatarClass}>
                    <AvatarImage
                      className={avatarImageClass}
                      src="https://github.com/evilrabbit.png"
                      alt="@evilrabbit"
                    />
                    <AvatarFallback className={avatarFallbackClass}>ER</AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <span className="font-medium">{t("pricing.clinicsTrust")}</span>
            </div>
            <span className="text-gray-400">|</span>
            <span>{t("pricing.cancelAnytime")}</span>
          </div>

          {/* Billing Toggle */}
          <Tabs value={billingCycle} onValueChange={setBillingCycle} className={billingTabsClass}>
            <TabsList className={billingTabsListClass}>
              <TabsTrigger
                value="monthly"
                className={
                  `${tabsTriggerClass} ${billingCycle === "monthly" ? tabsTriggerActiveClass : tabsTriggerInactiveClass}`
                }
              >
                {t("pricing.monthly")}
              </TabsTrigger>
              <TabsTrigger
                value="yearly"
                className={
                  `relative ${tabsTriggerClass} ${billingCycle === "yearly" ? tabsTriggerActiveClass : tabsTriggerInactiveClass}`
                }
              >
                {t("pricing.yearly")}
                <Badge variant="secondary" className={badgeSaveClass}>
                  {t("pricing.save")}
                </Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Pricing Cards */}
        <div className={pricingGridClass}>
          {evaluatedPlans.map((plan, index) => (
            <Card
              key={index}
              className={`${cardBaseClass} ${plan.popular ? "border-blue-200 shadow-lg" : "border-gray-200"
                }`}
            >
              {plan.popular && (
                <Badge className={badgePopularClass}>
                  {/* Not in dictionary, keep as is or add if needed */}
                  Popular
                </Badge>
              )}

              <CardHeader className={cardHeaderPaddingClass}>
                <h3 className={cardTitleClass}>
                  {plan.name === t("pricing.plan.free") && <User className={iconGraySmallClass} />}
                  {plan.name === t("pricing.plan.standard") && <Users className={iconGraySmallClass} />}
                  {plan.name === t("pricing.plan.pro") && <UserCog className={iconGraySmallClass} />}
                  {plan.name === t("pricing.plan.premium") && <Building className={iconGraySmallClass} />}
                  {t("pricing.getPlan", { plan: plan.name })}
                </h3>
                <div className="mb-2">
                  <span className={cardPriceClass}>{formatPrice(plan.monthlyPrice, isYearly)}</span>
                  {plan.monthlyPrice > 0 && <span className={cardPriceSuffixClass}>{t("pricing.perMonth")}</span>}
                </div>
                <p className={cardInfoClass}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className={tooltipTriggerClass}>
                        {t("pricing.infoLabel", { info: plan.info })}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>{t("pricing.tooltipText", { tooltip: plan.tooltip })}</p>
                    </TooltipContent>
                  </Tooltip>
                </p>
              </CardHeader>

              <CardContent className={cardHeaderPaddingClass}>
                <Button
                  className={buttonBaseClass}
                >
                  {plan.name === t("pricing.plan.premium")
                    ? t("pricing.contactSales")
                    : t("pricing.getPlan", { plan: plan.name })}
                </Button>

                <div className={sectionGroupClass}>
                  {/* Group features by category */}
                  {[
                    "Core Features",
                    "Team",
                    "Security",
                    "Reports",
                    "Business",
                    "Integration",
                    "Enterprise",
                    "Support",
                  ].map((category) => {
                    const categoryFeatures = plan.features.filter((f) => f.category === category)
                    if (categoryFeatures.length === 0) return null

                    return (
                      <div key={category}>
                        <h4 className={sectionTitleClass}>{category}</h4>
                        <ul className="space-y-2">
                          {categoryFeatures.map((feature, featureIndex) => (
                            <li key={featureIndex} className={featureItemClass}>
                              <feature.icon className={featureIconClass} />
                              <span className={featureTextClass}>
                                {feature.available === true && !feature?.limit && (
                                  <span className={iconAvailableClass}>✓</span>
                                )}
                                {feature.available === true && feature.limit && (
                                  <span className={iconLimitedClass}>●</span>
                                )}
                                {feature.available === false && (
                                  <span className={iconUnavailableClass}>✗</span>
                                )} {feature.text}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
