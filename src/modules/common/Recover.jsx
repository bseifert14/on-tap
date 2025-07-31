import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../../supabase";
import { toast } from "sonner";
import SetPasswordModal from "../../components/SetPasswordModal";

export default function Recover() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");

    if (!access_token || !refresh_token) {
      toast.error("Missing access token.");
      return;
    }

    const completeSession = async () => {
      const { error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      });

      if (error) {
        toast.error("Could not complete sign-in.");
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
        <SetPasswordModal
          onClose={() => {
            setShowModal(false);
            navigate("/profile");
          }}
        />
      )}
    </>
  );
}
