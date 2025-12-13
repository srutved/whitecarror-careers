"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Building2, Mail, Lock, Eye, EyeOff, Loader2, User, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { supabase } from "@/lib/supabase/client"

export default function RegisterPage() {
    const router = useRouter()
    const [status, setStatus] = useState("Verifying...");

    useEffect(() => {
        const verify = async () => {
            const { error } = await supabase.auth.getSession();

            if (error) {
                setStatus("Verification failed");
                return;
            }

            try {
                await fetch("/api/auth/complete-profile", {
                    method: "POST",
                });

                setStatus("Email verified! Redirecting to login...");
                setTimeout(() => router.push("/login"), 3000);
            } catch (error) {
                setStatus("Verification failed");
            }
        };

        verify();
    }, [router]);

    return (
        <main id="main-content" className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center space-y-4">
                    <div className="flex items-center justify-center">
                        <Image src="/whitecarrot-careers-logo.png" width={256} height={256} alt="whitecarrot-careers-logo" className="w-16 h-16 text-primary" />
                    </div>
                    <div>
                        <CardTitle className="text-2xl font-bold">Verify Account</CardTitle>
                        <CardDescription className="mt-2">Verify account to get started!</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="p-4 rounded-lg bg-primary/10 text-primary text-center">{status}</div>

                    <div className="mt-2 text-right text-sm text-muted-foreground">
                        {"Don't have an account? "}
                        <Link href="/register">
                            <Button variant="link" className="px-0" type="button">
                                Sign up
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}
