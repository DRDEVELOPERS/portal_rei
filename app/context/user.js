// app/context/user.js
"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client"; // Use your existing client

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const router = useRouter();
  const supabase = createClient(); // Use the correct client from utils

  const [loading, setLoading] = useState(true);
  const [userState, setUserState] = useState({
    user: null,
    id: null,
    email: null,
    name: null,
    picture: null,
  });

  const getCurrentSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  };

  const getCurrentUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const session = await getCurrentSession();
        const user = await getCurrentUser();

        if (user) {
          setUserState({
            user,
            id: user.id,
            email: user.email,
            name: user.user_metadata?.name || "",
            picture: user.user_metadata?.picture || "",
          });
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUserState({
      user: null,
      id: null,
      email: null,
      name: null,
      picture: null,
    });
    router.push("/");
  };

  return (
    <UserContext.Provider value={{ ...userState, loading, signOut }}>
      {!loading && children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
