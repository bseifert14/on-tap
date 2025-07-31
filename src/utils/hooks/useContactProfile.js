import { useEffect, useState } from "react";
import { supabase } from "../../supabase";

export function useContactProfile(businessId) {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    if (businessId) loadContact();
  }, [businessId]);

  const loadContact = async () => {
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .eq("business_id", businessId)
      .single();

    if (data) setContact(data);
    return { data, error };
  };

  const saveContact = async (updatedContact) => {
    const { error } = await supabase
      .from("contacts")
      .upsert({ ...updatedContact, business_id: businessId });

    return { error };
  };

  return { contact, setContact, loadContact, saveContact };
}
