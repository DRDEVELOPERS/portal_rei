//app/context/user.js
"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const UserContext = createContext(undefined); // Initialize with undefined

const Context = createContext({
  user: null, // Add default values
  id: null,
  email: null,
  name: null,
  picture: null,
  signOut: () => {},
});

export const UserProvider = ({ children }) => {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  // const [user, setUser] = useState(null);
  const [userState, setUserState] = useState({
    user: null,
    id: null,
    email: null,
    name: null,
    picture: null,
  });
  const [id, setId] = useState(null);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [picture, setPicture] = useState(null);

  const supabaseClient = createClientComponentClient();

  const getCurrentSession = async () => {
    const res = await supabaseClient.auth.getSession();
    if (res && res.data.session) {
      return res.data.session;
    }
    clearUser();
    return null;
  };

  const getCurrentUser = async () => {
    if (id) return;

    const res = await supabaseClient.auth.getUser();
    if (res && res.data.user) {
      const theUser = res.data.user;

      setUser(theUser);
      setId(theUser.id);
      setEmail(theUser.email);
      setName(theUser.identities[0].identity_data.name);
      setPicture(theUser.identities[0].identity_data.picture);
    }
  };

  useEffect(() => {
    const isUser = async () => {
      const currentSession = await getCurrentSession();
      if (currentSession) await getCurrentUser();
    };
    isUser();
  }, []);

  const signOut = async () => {
    await supabaseClient.auth.signOut();
    clearUser();
    router.push("/");
  };

  const clearUser = () => {
    setUser(null);
    setId(null);
    setEmail(null);
    setName(null);
    setPicture(null);
  };

  const exposed = { user, id, email, name, picture, signOut };

  // return <Context.Provider value={exposed}>{children}</Context.Provider>;

  return (
    <UserContext.Provider value={{ ...userState, loading, signOut }}>
      {!loading && children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(Context);

export default Provider;
