import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { sanitizeUrl } from "../sanitizeUrl";

export function useBusinessProfile(userId) {
  const [business, setBusiness] = useState(null);
  const [businessId, setBusinessId] = useState(null);

  useEffect(() => {
    if (userId) loadBusiness();
  }, [userId]);

  const loadBusiness = async () => {
    const { data, error } = await supabase
      .from("businesses")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (data) {
      setBusiness(data);
      setBusinessId(data.id);
    }

    return { data, error };
  };

  const saveBusiness = async (updatedBusiness) => {
    const cleanUrl = updatedBusiness.website_url
        ? sanitizeUrl(updatedBusiness.website_url)
        : null;

    const { data, error } = await supabase
      .from("businesses")
      .upsert({
        ...updatedBusiness,
        url: cleanUrl,
        user_id: userId
      })
      .select()
      .single();

    if (!error) {
      setBusiness(data);
      setBusinessId(data.id);
    }

    return { data, error };
  };

  return { business, setBusiness, businessId, loadBusiness, saveBusiness };
}
