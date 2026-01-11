"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, IndianRupee, Rocket, Sparkles, Star } from "lucide-react"

interface UserPlanCardProps {
    name: string
    plan: "Free" | "Pro" | "Premium"
    billingCycle: "monthly" | "yearly"
    startDate: string
    nextBillingDate?: string
}

const planIcons = {
    Free: <Star className="w-8 h-8 text-purple-600" />,
    Pro: <Rocket className="w-8 h-8 text-blue-600" />,
    Premium: <Sparkles className="w-8 h-8 text-yellow-500" />,
}

const planPrices: Record<string, { monthly: number; yearly: number }> = {
    Free: { monthly: 0, yearly: 0 },
    Pro: { monthly: 99, yearly: 830 },
    Premium: { monthly: 199, yearly: 1670 },
}

export default function UserPlanCard({
    plan,
    billingCycle,
    startDate,
    nextBillingDate,
}: UserPlanCardProps) {
    const price = planPrices[plan][billingCycle]

    return (
        <Card className="w-full mx-auto p-4 border border-primary/20 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-gray-black backdrop-blur-md">
            <CardHeader className="flex flex-col items-center space-y-2 text-center">
                {planIcons[plan]}
                <CardTitle className="text-3xl font-bold tracking-tight">
                    Free Plan
                </CardTitle>
                {plan !== "Free" && (
                    <Badge variant="outline" className="bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full">
                        {billingCycle} billing
                    </Badge>
                )}
            </CardHeader>

            <CardContent className="space-y-6 text-center">
                <p className="text-base">
                    Hello <span className="font-semibold">User</span>!
                    You’re on the <span className="font-semibold">Free</span> plan.
                </p>

                <div className="text-2xl font-semibold flex items-center justify-center gap-1 text-primary">
                    {price === 0 ? (
                        "Free"
                    ) : (
                        <>
                            <IndianRupee className="w-5 h-5" />
                            0
                            <span className="text-sm font-normal text-muted-foreground">/ {billingCycle}</span>
                        </>
                    )}
                </div>

                <div className="text-sm text-muted-foreground space-y-1">
                    <p><CheckCircle className="inline w-4 h-4 mr-1 text-green-500" /> Start: {startDate}</p>
                    {nextBillingDate && (
                        <p><CheckCircle className="inline w-4 h-4 mr-1 text-green-500" /> Next Billing: {nextBillingDate}</p>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
