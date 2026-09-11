import { useEffect, useState } from "react";
import { supabase } from "../../supabase";

const ADMIN_EMAILS = (import.meta.env.VITE_ADMIN_EMAILS || "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export default function useIsAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!mounted) return;
      const email = user?.email?.toLowerCase();
      setIsAdmin(Boolean(email && ADMIN_EMAILS.includes(email)));
      setIsLoading(false);
    };

    check();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_evt, session) => {
      const email = session?.user?.email?.toLowerCase();
      setIsAdmin(Boolean(email && ADMIN_EMAILS.includes(email)));
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return { isAdmin, isLoading };
}
