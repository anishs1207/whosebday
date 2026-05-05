"use client";

import { SignUp } from '@clerk/nextjs';
import { Turnstile } from "@marsidev/react-turnstile";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios, { isAxiosError } from "axios";

import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function SignUpPage() {
    const params = useParams();
    const isSubRoute = params?.["sign-up"] && Array.isArray(params["sign-up"]) && params["sign-up"].length > 0;
    
    const [isVerified, setIsVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const siteKey = process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY || "";

    // Check session storage on mount
    useEffect(() => {
        const verified = sessionStorage.getItem("captcha_verified");
        if (verified === "true" || isSubRoute) {
            setIsVerified(true);
        }
    }, [isSubRoute]);

    // If we're in a sub-route, skip the captcha
    const shouldShowCaptcha = !isVerified && !isSubRoute;

    const handleVerify = async (token: string) => {
        setIsLoading(true);
        try {
            const response = await axios.post<{ success: boolean }>("/api/verify", { token });
            if (response.data.success) {
                setIsVerified(true);
                sessionStorage.setItem("captcha_verified", "true");
                toast.success("Verification successful! Welcome.");
            } else {
                toast.error("Verification failed. Please try again.");
            }
        } catch (error: unknown) {
            console.error("Verification error:", error);
            if (isAxiosError(error)) {
                toast.error(error.response?.data?.message || "An error occurred during verification.");
            } else {
                toast.error("An error occurred during verification.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-1/4 -left-20 w-72 h-72 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

            {shouldShowCaptcha ? (
                <Card className="w-full max-w-md bg-zinc-900/50 border-zinc-800 backdrop-blur-xl shadow-2xl animate-in fade-in zoom-in duration-500">
                    <CardHeader className="space-y-1">
                        <div className="flex items-center justify-center mb-2">
                            <div className="p-3 bg-purple-500/10 rounded-2xl border border-purple-500/20">
                                <ShieldCheck className="w-8 h-8 text-purple-400" />
                            </div>
                        </div>
                        <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                            Human Verification
                        </CardTitle>
                        <CardDescription className="text-center text-zinc-400">
                            Please complete the captcha to access the signup form.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center gap-4">
                        {siteKey ? (
                            <div className="min-h-[65px] flex items-center justify-center">
                                {isLoading ? (
                                    <div className="flex flex-col items-center gap-2">
                                        <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
                                        <span className="text-xs text-zinc-500">Verifying...</span>
                                    </div>
                                ) : (
                                    <Turnstile
                                        siteKey={siteKey}
                                        onSuccess={handleVerify}
                                        options={{ theme: "dark" }}
                                    />
                                )}
                            </div>
                        ) : (
                            <div className="text-xs text-red-500 italic">
                                Site key missing in configuration.
                            </div>
                        )}
                        <p className="text-[10px] text-zinc-500 text-center px-4">
                            This protection helps us keep our community safe from automated bots.
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <SignUp 
                        appearance={{
                            elements: {
                                card: "bg-zinc-900 border border-zinc-800 shadow-2xl",
                                headerTitle: "text-white",
                                headerSubtitle: "text-zinc-400",
                                socialButtonsBlockButton: "bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700",
                                formButtonPrimary: "bg-purple-600 hover:bg-purple-700",
                                footerActionLink: "text-purple-400 hover:text-purple-300",
                                identityPreviewText: "text-white",
                                identityPreviewEditButtonIcon: "text-purple-400",
                                formFieldLabel: "text-zinc-300",
                                formFieldInput: "bg-zinc-950 border-zinc-800 text-white focus:border-purple-500",
                                dividerText: "text-zinc-500",
                                dividerLine: "bg-zinc-800",
                            }
                        }}
                    />
                </div>
            )}
        </div>
    );
}
