// app/dashboard/page.js
import ClientOnly from "@/components/ClientOnly";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  return (
    <ClientOnly>
      <ProtectedContent />
    </ClientOnly>
  );
}

async function ProtectedContent() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Protected Dashboard</h1>
      <p>Welcome {user.email}</p>
    </div>
  );
}
