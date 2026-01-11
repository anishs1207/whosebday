"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { loadStripe } from '@stripe/stripe-js';
import { CheckCircle, IndianRupee, Rocket, Sparkles, Star } from "lucide-react"
import axios from "axios";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

const pricingData = {
    monthly: [
        {
            id: "free",
            name: "Free",
            price: 0,
            icon: <Star className="w-6 h-6 text-purple-600" />,
            features: ["Basic Analytics", "Limited Projects", "Community Support"],
            cta: "Get Started",
        },
        {
            id: "pro",
            name: "Pro",
            price: 99,
            icon: <Rocket className="w-6 h-6 text-blue-600" />,
            features: ["Unlimited Projects", "Advanced Analytics", "Email Support"],
            cta: "Upgrade to Pro",
            stripeId: "price_1RMsjG2eiUVOJCeZSgXvY16S"
        },
        {
            id: "premium",
            name: "Premium",
            price: 199,
            icon: <Sparkles className="w-6 h-6 text-yellow-600" />,
            features: ["Team Collaboration", "Priority Support", "Dedicated Manager"],
            cta: "Upgrade to Premium",
            stripeId: "price_1RMsjf2eiUVOJCeZYhBa9kBd"
        },
    ],
    yearly: [
        {
            id: "free",
            name: "Free",
            price: 0,
            icon: <Star className="w-6 h-6 text-purple-600" />,
            features: ["Basic Analytics", "Limited Projects", "Community Support"],
            cta: "Get Started",
        },
        {
            id: "pro",
            name: "Pro",
            price: 830,
            icon: <Rocket className="w-6 h-6 text-blue-600" />,
            features: ["Unlimited Projects", "Advanced Analytics", "Email Support"],
            cta: "Upgrade to Pro",
            stripeId: "price_1RMskw2eiUVOJCeZW8lK7g6t"
        },
        {
            id: "Premium",
            name: "Premium",
            price: 1670,
            icon: <Sparkles className="w-6 h-6 text-yellow-600" />,
            features: ["Team Collaboration", "Priority Support", "Dedicated Manager"],
            cta: "Upgrade to Premium",
            stripeId: "price_1RMskT2eiUVOJCeZGMVBgNZL"
        },
    ],
}


const handleCheckout = async (priceId: string) => {
    const stripe = await stripePromise;
    if (!stripe) {
        alert('Stripe failed to load.');
        return;
    }

    try {
        const res = await axios.post<{ id: string }>('/api/create-checkout-session', {
            priceId, // Use the passed priceId
        });

        console.log("done")

        const data = res.data;

        if (data.id) {
            await stripe.redirectToCheckout({ sessionId: data.id });
        } else {
            alert('Failed to create checkout session.');
        }
    } catch (error) {
        console.error('Checkout error:', error);
        alert('Something went wrong during checkout.');
    }
};


export default function PricingCards() {
    const [isYearly, setIsYearly] = useState(false)
    const plans = isYearly ? pricingData.yearly : pricingData.monthly

    return (
        <>

            <div className="space-y-6 mt-6">
                <div className="flex items-center justify-center gap-4">
                    <span className="text-sm font-medium text-muted-foreground">Monthly</span>
                    <Switch checked={isYearly} onCheckedChange={setIsYearly} />
                    <span className="text-sm font-medium text-muted-foreground">Yearly</span>
                </div>

                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {plans.map((plan) => (
                        <Card key={plan.id} className="shadow-xl hover:shadow-2xl transition duration-300 border-primary/20 border-[1.5px]">
                            <CardHeader className="flex items-center space-y-2 text-center">
                                {plan.icon}
                                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                                {plan.id !== "free" && isYearly && (
                                    <Badge variant="outline" className="bg-green-100 text-green-600">Save 30%</Badge>
                                )}
                            </CardHeader>

                            <CardContent className="space-y-4 text-center">
                                <div className="text-3xl font-semibold flex items-center justify-center gap-1">
                                    {plan.price === 0 ? (
                                        "Free"
                                    ) : (
                                        <>
                                            <IndianRupee className="w-4 h-4" />
                                            {plan.price}
                                            <span className="text-sm font-normal text-muted-foreground">/ {isYearly ? "year" : "month"}</span>
                                        </>
                                    )}
                                </div>

                                <ul className="text-sm space-y-2 text-left">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>

                            <CardFooter className="flex justify-center">
                                {plan.id != "free" && <Button onClick={() => handleCheckout(plan.stripeId!)} size="lg" className="w-full cursor-pointer ">{plan.cta}</Button>}
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div >
        </>
    )
}
