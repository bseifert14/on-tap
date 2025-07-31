import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../../supabase";
import { toast } from 'sonner';

import SetPasswordModal from "../../components/SetPasswordModal";

export default function Recover() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search); // <- use search, not hash
    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");

    if (!access_token || !refresh_token) {
      toast.error("Missing token. Please use the link in your email.");
      return;
    }

    const completeSession = async () => {
      const { error } = await supabase.auth.setSession({ 
        access_token, 
        refresh_token 
      });

      if (error) {
        toast.error("Error completing session.");
        return;
      }

      // Clean up the URL
      window.history.replaceState(null, "", "/recover");
      setShowModal(true);
    };

    completeSession();
  }, [location.search]);

  return (
    <>
      {showModal && (
        <SetPasswordModal onClose={() => navigate("/profile")} />
      )}
    </>
  );
}
