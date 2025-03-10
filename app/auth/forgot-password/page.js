// app/auth/forgot-password/page.js
"use client";

import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ClientOnly from "@/components/ClientOnly";

export default function ForgotPasswordPage() {
  return (
    <ClientOnly>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Column - Consistent with login page */}
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

          {/* Right Column - Password Reset Form */}
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
                  Recuperação de Senha
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Digite seu email para redefinir sua senha
                </p>
              </div>

              <PasswordResetForm />
            </div>
          </div>
        </div>
      </div>
    </ClientOnly>
  );
}

function PasswordResetForm() {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/auth/update-password`,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Email de recuperação enviado com sucesso!");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-700 shadow-sm 
            focus:border-primary-yellow focus:ring-primary-yellow bg-white dark:bg-gray-800 
            text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          disabled={loading}
        />
      </div>

      {message && (
        <div
          className={`p-3 rounded-lg text-sm ${
            message.includes("sucesso")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg 
          shadow-sm text-sm font-medium text-white bg-primary-black hover:bg-opacity-90 
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow
          transition-all duration-200 disabled:opacity-50"
      >
        {loading ? "Enviando..." : "Enviar Email de Recuperação"}
      </button>

      <div className="text-center text-sm">
        <Link
          href="/auth/login"
          className="font-medium text-primary-yellow hover:text-yellow-500"
        >
          Voltar para o login
        </Link>
      </div>
    </form>
  );
}
