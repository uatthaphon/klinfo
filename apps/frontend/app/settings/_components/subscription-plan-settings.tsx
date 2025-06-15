'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, Check, CreditCard, Crown } from 'lucide-react';
import { useState } from 'react';

interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
}

export function SubscriptionPlanSettings() {
  const [currentPlan] = useState({
    id: 'professional',
    name: 'Professional Plan',
    price: 79,
    nextBilling: 'January 15, 2024',
    paymentMethod: '•••• •••• •••• 4242',
  });

  const [isChangePlanOpen, setIsChangePlanOpen] = useState(false);
  const [isUpdatePaymentOpen, setIsUpdatePaymentOpen] = useState(false);

  const plans: Plan[] = [
    {
      id: 'starter',
      name: 'Starter',
      price: 29,
      features: [
        'Up to 100 patients',
        'Basic appointment scheduling',
        'Simple invoicing',
        'Email support',
        '1 clinic location',
        '2 staff members',
      ],
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 79,
      popular: true,
      features: [
        'Up to 1,000 patients',
        'Advanced scheduling & calendar',
        'Full billing & payment processing',
        'Patient portal access',
        'Priority support',
        '3 clinic locations',
        '10 staff members',
        'Basic reporting',
      ],
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 149,
      features: [
        'Unlimited patients',
        'Multi-location management',
        'Advanced analytics & reporting',
        'Custom integrations',
        'Dedicated account manager',
        'Unlimited locations',
        'Unlimited staff',
        'API access',
        'Custom branding',
      ],
    },
  ];

  const handleChangePlan = (planId: string) => {
    console.log('Changing to plan:', planId);
    setIsChangePlanOpen(false);
  };

  const handleUpdatePayment = (paymentData: any) => {
    console.log('Updating payment method:', paymentData);
    setIsUpdatePaymentOpen(false);
  };

  const handleDownloadInvoice = () => {
    console.log('Downloading invoice...');
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-primary" />
                {currentPlan.name}
              </CardTitle>
              <CardDescription>Your current subscription plan</CardDescription>
            </div>
            <Badge className="bg-primary">Active</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Monthly Cost</span>
              <span className="text-2xl font-bold">${currentPlan.price}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Next billing date</span>
              <span className="text-sm">{currentPlan.nextBilling}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Payment method</span>
              <span className="text-sm">{currentPlan.paymentMethod}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Plan Features</h3>
        <div className="grid gap-3">
          {plans
            .find((p) => p.id === currentPlan.id)
            ?.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Dialog open={isChangePlanOpen} onOpenChange={setIsChangePlanOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Change Plan</Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Choose Your Plan</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 md:grid-cols-3">
              {plans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`relative ${plan.id === currentPlan.id ? 'border-primary' : ''} ${
                    plan.popular ? 'border-primary shadow-lg' : ''
                  }`}>
                  {plan.popular && <Badge className="absolute -top-2 left-1/2 -translate-x-1/2">Most Popular</Badge>}
                  {plan.id === currentPlan.id && (
                    <Badge variant="secondary" className="absolute -top-2 right-4">
                      Current
                    </Badge>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-3xl font-bold tracking-tight">${plan.price}</span>
                      <span className="ml-1 text-lg font-semibold text-muted-foreground">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <Check className="mr-2 h-4 w-4 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full mt-4"
                      variant={plan.id === currentPlan.id ? 'secondary' : 'default'}
                      onClick={() => handleChangePlan(plan.id)}
                      disabled={plan.id === currentPlan.id}>
                      {plan.id === currentPlan.id ? 'Current Plan' : 'Select Plan'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isUpdatePaymentOpen} onOpenChange={setIsUpdatePaymentOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <CreditCard className="h-4 w-4 mr-2" />
              Update Payment Method
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Payment Method</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardName">Cardholder Name</Label>
                <Input id="cardName" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="billingAddress">Billing Address</Label>
                <Input id="billingAddress" placeholder="123 Main St, City, State, ZIP" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsUpdatePaymentOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => handleUpdatePayment({})}>Update Payment Method</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Button variant="outline" onClick={handleDownloadInvoice}>
          <Calendar className="h-4 w-4 mr-2" />
          Download Invoice
        </Button>
      </div>
    </div>
  );
}
