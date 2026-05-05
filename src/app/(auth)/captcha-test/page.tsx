"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import { useState } from "react";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";
import { NavBar, Footer } from "../../_components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Mail, Loader2 } from "lucide-react";

export default function CaptchaTestPage() {
    const [token, setToken] = useState("");
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            toast.error("Please complete the captcha verification.");
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post<{ success: boolean; message?: string }>("/api/verify", { token });

            if (response.data.success) {
                toast.success("Verification successful! You're not a bot. ✅");
            } else {
                toast.error("Verification failed. Please try again. ❌");
            }
        } catch (error: unknown) {
            console.error("Verification error:", error);
            if (isAxiosError(error)) {
                toast.error(error.response?.data?.message || "An error occurred during verification.");
            } else {
                toast.error("An unexpected error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const siteKey = process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY || "";

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <NavBar />

            <main className="flex-grow flex items-center justify-center p-4 relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-1/4 -left-20 w-72 h-72 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />

                <Card className="w-full max-w-md bg-zinc-900/50 border-zinc-800 backdrop-blur-xl shadow-2xl animate-in fade-in zoom-in duration-500">
                    <CardHeader className="space-y-1">
                        <div className="flex items-center justify-center mb-2">
                            <div className="p-3 bg-purple-500/10 rounded-2xl border border-purple-500/20">
                                <ShieldCheck className="w-8 h-8 text-purple-400" />
                            </div>
                        </div>
                        <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                            Bot Protection
                        </CardTitle>
                        <CardDescription className="text-center text-zinc-400">
                            Verify your identity to proceed with the demo.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-zinc-300">Email Address</Label>
                                <div className="relative group">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-purple-400 transition-colors" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="hello@example.com"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10 bg-zinc-950/50 border-zinc-800 focus:border-purple-500/50 focus:ring-purple-500/20 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-center py-2 min-h-[65px]">
                                {siteKey ? (
                                    <Turnstile
                                        siteKey={siteKey}
                                        onSuccess={(token) => setToken(token)}
                                        options={{ theme: "dark" }}
                                    />
                                ) : (
                                    <div className="text-xs text-red-500 italic">
                                        Site key missing in configuration.
                                    </div>
                                )}
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading || !token}
                                className="w-full h-11 bg-white text-black hover:bg-zinc-200 font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                ) : (
                                    "Verify & Submit"
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </main>

            <Footer />
        </div>
    );
}