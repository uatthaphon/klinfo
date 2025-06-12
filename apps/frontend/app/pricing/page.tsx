"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { BarChart3, Bell, Building, FileText, LayoutTemplate, ListCheck, MapPin, ShieldCheck, ShoppingCart, User, User2, UserCog, Users } from "lucide-react"
import { useState } from "react"

const plans = [
  {
    name: "Free",
    monthlyPrice: 0,
    info: "20 patients / month",
    tooltip: "Best for solo clinics just getting started",
    features: [
      { icon: ListCheck, text: "Queue management", category: "Core Features", available: true },
      { icon: Users, text: "Patient list", category: "Core Features", available: true },
      { icon: MapPin, text: "Visit tracking", category: "Core Features", available: true },
      { icon: ShoppingCart, text: "Order finalization by staff", category: "Core Features", available: false },
      { icon: ShoppingCart, text: "Billing and payment handling", category: "Core Features", available: false },
      { icon: FileText, text: "MC generator", category: "Core Features", available: false },
      { icon: Bell, text: "Follow-up management", category: "Core Features", available: false },
      { icon: LayoutTemplate, text: "MC templates", category: "Core Features", available: false },
      { icon: LayoutTemplate, text: "Consultation templates", category: "Core Features", available: false },
      { icon: LayoutTemplate, text: "Prescription templates", category: "Core Features", available: false },
      { icon: User, text: "1 user (Owner or Doctor only)", category: "Team", available: true },
      { icon: ShieldCheck, text: "Secure login access", category: "Security", available: true },
      { icon: UserCog, text: "Role-based access controls", category: "Security", available: false },
      { icon: BarChart3, text: "Reports & Insights", category: "Reports", available: false },
      { icon: FileText, text: "Report export (Excel / PDF)", category: "Reports", available: false },
      { icon: Building, text: "Multi-branch", category: "Business", available: false },
    ],
    popular: false,
  },
  {
    name: "Standard",
    monthlyPrice: 490,
    info: "Unlimited patients",
    tooltip: "Ideal for small clinics with a few staff",
    features: [
      { icon: ListCheck, text: "Queue management", category: "Core Features", available: true },
      { icon: Users, text: "Patient list", category: "Core Features", available: true },
      { icon: MapPin, text: "Visit tracking", category: "Core Features", available: true },
      { icon: ShoppingCart, text: "Order finalization by staff", category: "Core Features", available: true },
      { icon: ShoppingCart, text: "Billing and payment handling", category: "Core Features", available: true },
      { icon: FileText, text: "MC generator", category: "Core Features", available: true },
      { icon: Bell, text: "Follow-up management", category: "Core Features", available: true },
      { icon: LayoutTemplate, text: "MC templates (Limit 2)", category: "Core Features", available: true, limit: true },
      { icon: LayoutTemplate, text: "Consultation templates (Limit 2)", category: "Core Features", available: true, limit: true },
      { icon: LayoutTemplate, text: "Prescription templates (Limit 2)", category: "Core Features", available: true, limit: true },
      { icon: Users, text: "3 staff members", category: "Team", available: true },
      { icon: ShieldCheck, text: "Secure login access", category: "Security", available: true },
      { icon: UserCog, text: "Role-based access controls", category: "Security", available: false },
      { icon: BarChart3, text: "Reports & Insights (Basic)", category: "Reports", available: true, limit: true },
      { icon: FileText, text: "Report export (Excel / PDF)", category: "Reports", available: false },
      { icon: Building, text: "Multi-branch", category: "Business", available: false },
    ],
    popular: false,
  },
  {
    name: "Pro",
    monthlyPrice: 990,
    info: "Everything in Standard",
    tooltip: "Great for growing clinics with more needs",
    features: [
      { icon: ListCheck, text: "Queue management", category: "Core Features", available: true },
      { icon: Users, text: "Patient list", category: "Core Features", available: true },
      { icon: MapPin, text: "Visit tracking", category: "Core Features", available: true },
      { icon: ShoppingCart, text: "Order finalization by staff", category: "Core Features", available: true },
      { icon: ShoppingCart, text: "Billing and payment handling", category: "Core Features", available: true },
      { icon: FileText, text: "MC generator", category: "Core Features", available: true },
      { icon: Bell, text: "Follow-up management", category: "Core Features", available: true },
      { icon: LayoutTemplate, text: "MC templates", category: "Core Features", available: true },
      { icon: LayoutTemplate, text: "Consultation templates", category: "Core Features", available: true },
      { icon: LayoutTemplate, text: "Prescription templates", category: "Core Features", available: true },
      { icon: User2, text: "Unlimited staff", category: "Team", available: true },
      { icon: ShieldCheck, text: "Secure login access", category: "Security", available: true },
      { icon: UserCog, text: "Role-based access controls", category: "Security", available: true },
      { icon: BarChart3, text: "Reports & Insights", category: "Reports", available: true },
      { icon: FileText, text: "Report export (Excel / PDF)", category: "Reports", available: true },
      { icon: Building, text: "Multi-branch", category: "Business", available: false },
    ],
    popular: true,
  },
  {
    name: "Premium",
    monthlyPrice: 1490,
    info: "Up to 3 branches",
    tooltip: "Designed for clinics with multiple branches",
    features: [
      { icon: ListCheck, text: "Queue management", category: "Core Features", available: true },
      { icon: Users, text: "Patient list", category: "Core Features", available: true },
      { icon: MapPin, text: "Visit tracking", category: "Core Features", available: true },
      { icon: ShoppingCart, text: "Order finalization by staff", category: "Core Features", available: true },
      { icon: ShoppingCart, text: "Billing and payment handling", category: "Core Features", available: true },
      { icon: FileText, text: "MC generator", category: "Core Features", available: true },
      { icon: Bell, text: "Follow-up management", category: "Core Features", available: true },
      { icon: LayoutTemplate, text: "MC templates", category: "Core Features", available: true },
      { icon: LayoutTemplate, text: "Consultation templates", category: "Core Features", available: true },
      { icon: LayoutTemplate, text: "Prescription templates", category: "Core Features", available: true },
      { icon: User2, text: "Unlimited staff", category: "Team", available: true },
      { icon: ShieldCheck, text: "Secure login access", category: "Security", available: true },
      { icon: UserCog, text: "Role-based access controls", category: "Security", available: true },
      { icon: BarChart3, text: "Reports & Insights", category: "Reports", available: true },
      { icon: FileText, text: "Report export (Excel / PDF)", category: "Reports", available: true },
      { icon: Building, text: "Multi-branch (up to 3)", category: "Business", available: true },
    ],
    popular: false,
  },
];
export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState("monthly")

  const formatPrice = (price: number, isYearly: boolean) => {
    if (price === 0) return "Free"
    const finalPrice = isYearly ? Math.round(price * 0.8) : price
    return `฿${finalPrice.toLocaleString()}`
  }

  const isYearly = billingCycle === "yearly"

  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Choose the right plan for you</h1>

          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-8 mb-12 text-gray-600">
            <div className="flex items-center gap-2">
              <div className="flex flex-row flex-wrap items-center gap-12">
                <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
                  <Avatar className="h-8 w-8 rounded-full">
                    <AvatarImage
                      className="rounded-full"
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback className="rounded-full">CN</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-8 w-8 rounded-full">
                    <AvatarImage
                      className="rounded-full"
                      src="https://github.com/leerob.png"
                      alt="@leerob"
                    />
                    <AvatarFallback className="rounded-full">LR</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-8 w-8 rounded-full">
                    <AvatarImage
                      className="rounded-full"
                      src="https://github.com/evilrabbit.png"
                      alt="@evilrabbit"
                    />
                    <AvatarFallback className="rounded-full">ER</AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <span className="font-medium">50K+ clinics trust us</span>
            </div>
            <span className="text-gray-400">|</span>
            <span>Cancel any time, without any hassle</span>
          </div>

          {/* Billing Toggle */}
          <Tabs value={billingCycle} onValueChange={setBillingCycle} className="w-fit mx-auto rounded-full">
            <TabsList className="grid w-full h-full grid-cols-2 rounded-full">
              <TabsTrigger value="monthly" className={`rounded-full text-2xl px-8 ${billingCycle === "monthly" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"}`}>Monthly</TabsTrigger>
              <TabsTrigger value="yearly" className={`relative rounded-full text-2xl px-8 ${billingCycle === "yearly" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}>
                Yearly
                <Badge variant="secondary" className="ml-2 text-[12px] bg-blue-500 text-background">
                  Save 20%
                </Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative border rounded-xl p-6 ${plan.popular ? "border-blue-200 shadow-lg" : "border-gray-200"
                }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white">
                  Popular
                </Badge>
              )}

              <CardHeader className="p-0">
                <h3 className="text-xl text-gray-900 mb-4 flex items-center gap-2">
                  {plan.name === "Free" && <User className="h-5 w-5 text-gray-500" />}
                  {plan.name === "Standard" && <Users className="h-5 w-5 text-gray-500" />}
                  {plan.name === "Pro" && <UserCog className="h-5 w-5 text-gray-500" />}
                  {plan.name === "Premium" && <Building className="h-5 w-5 text-gray-500" />}
                  {plan.name} Plan
                </h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-900">{formatPrice(plan.monthlyPrice, isYearly)}</span>
                  {plan.monthlyPrice > 0 && <span className="text-gray-600 ml-1">/mo</span>}
                </div>
                <p className="text-gray-600 text-sm">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-pointer border-b border-dashed border-muted-foreground">
                        {plan.info}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>{plan.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </p>
              </CardHeader>

              <CardContent className="p-0">
                <Button
                  className={`w-full mb-6 rounded-full ${plan.popular
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                >
                  {plan.name === "Premium" ? "Contact Sale" : `Get ${plan.name} Plan`}
                </Button>

                <div className="space-y-4">
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
                        <h4 className="font-medium text-muted-foreground text-sm mb-2">{category}</h4>
                        <ul className="space-y-2">
                          {categoryFeatures.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start gap-3">
                              <feature.icon className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">
                                {feature.available === true && !feature?.limit && (
                                  <span className="text-green-600 font-semibold">✓</span>
                                )}
                                {feature.available === true && feature.limit && (
                                  <span className="text-yellow-500 font-semibold">●</span>
                                )}
                                {feature.available === false && (
                                  <span className="text-red-500 font-semibold">✗</span>
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
