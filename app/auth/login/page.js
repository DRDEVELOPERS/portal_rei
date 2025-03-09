// app/login/page.js
"use client";
import ClientOnly from "@/components/ClientOnly";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  return (
    <ClientOnly>
      <LoginForm />
    </ClientOnly>
  );
}

function LoginForm() {
  const supabase = createClient();
  const router = useRouter();

  const handleGoogleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!error) router.push("/dashboard");
  };

  return (
    <div>
      <form onSubmit={handleEmailLogin}>
        <input name="email" type="email" required />
        <input name="password" type="password" required />
        <button type="submit">Sign In</button>
      </form>

      <button onClick={handleGoogleLogin}>Continue with Google</button>
    </div>
  );
}
