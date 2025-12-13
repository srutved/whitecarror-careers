import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabase/server";

export async function POST(req: Request) {
    const { email, password, name } = await req.json();
    const supabase = createSupabaseServer();

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/verify-account`,
            data: { name }, // temporarily store name
        },
    });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
        success: true,
        message: "Sign up successful! Check your email to verify your account",
    });
}
