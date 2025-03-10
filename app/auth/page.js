// app/auth/page.js
"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { useState } from "react";
import ClientOnly from "@/components/ClientOnly";
import Link from "next/link";

export default function LoginPage() {
  return (
    <ClientOnly>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Column - Decorative Image */}
          <div className="hidden lg:block relative bg-gradient-to-br from-primary-yellow/20 to-primary-black/90">
            <Image
              src="/images/auth-tools.jpg"
              alt="Professional tools"
              fill
              className="object-cover mix-blend-multiply"
              priority
            />
            <div className="absolute bottom-8 left-8 text-white z-10">
              <h2 className="text-4xl font-bold mb-2">
                Ferramentas Profissionais
              </h2>
              <p className="text-lg">Para quem entende de trabalho sério</p>
            </div>
          </div>

          {/* Right Column - Login Form */}
          <div className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
              <div className="text-center">
                <Image
                  src="/images/logo.svg"
                  alt="Logo"
                  width={120}
                  height={120}
                  className="mx-auto h-24 w-24"
                />
                <h2 className="mt-6 text-3xl font-bold text-primary-black dark:text-gray-100">
                  Acesse sua conta
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Gerencie seus pedidos e preferências
                </p>
              </div>

              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </ClientOnly>
  );
}

function LoginForm() {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!error) router.push("/dashboard");
    setLoading(false);
  };

  return (
    <div className="mt-8 space-y-6">
      <form onSubmit={handleEmailLogin} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            placeholder="seu@email.com"
            className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-700 shadow-sm 
              focus:border-primary-yellow focus:ring-primary-yellow bg-white dark:bg-gray-800 
              text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
            disabled={loading}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Senha
          </label>
          <input
            name="password"
            type="password"
            required
            placeholder="••••••••"
            className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-700 shadow-sm 
              focus:border-primary-yellow focus:ring-primary-yellow bg-white dark:bg-gray-800 
              text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg 
            shadow-sm text-sm font-medium text-white bg-primary-black hover:bg-opacity-90 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow
            transition-all duration-200 disabled:opacity-50"
        >
          {loading ? "Carregando..." : "Entrar"}
        </button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
            Ou continue com
          </span>
        </div>
      </div>

      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg border border-gray-300 
          dark:border-gray-700 shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 
          hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 disabled:opacity-50"
      >
        <FcGoogle className="w-5 h-5" />
        <span>Google</span>
      </button>

      <div className="text-center text-sm space-y-4">
        <div>
          <Link
            href="/auth/forgot-password"
            className="font-medium text-primary-yellow hover:text-yellow-500"
          >
            Esqueceu a senha?
          </Link>
        </div>
        <div className="text-gray-500 dark:text-gray-400">
          Não tem uma conta?{" "}
          <Link
            href="/auth/sign-up"
            className="font-medium text-primary-yellow hover:text-yellow-500"
          >
            Cadastre-se
          </Link>
        </div>
      </div>
    </div>
  );
}
