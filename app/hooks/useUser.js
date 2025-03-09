// hooks/useUser.js
"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export const useUser = () => {
  const [user, setUser] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getSession();
  }, [supabase]);

  return user;
};
