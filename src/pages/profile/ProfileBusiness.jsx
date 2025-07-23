import { useEffect, useState } from "react";
import styles from "../../styles/revamp/ProfileBusiness.module.css";
import { supabase } from "../../supabase";

export default function ProfileBusiness({ user }) {
  const [business, setBusiness] = useState({ name: "", location: "", phone: "", email: "", address: "" });
  const [contact, setContact] = useState({ name: "", phone: "", email: "" });
  const [businessId, setBusinessId] = useState(null);

  useEffect(() => {
    if (user) loadBusinessAndContact();
  }, [user]);

  const loadBusinessAndContact = async () => {
    const { data: biz } = await supabase
      .from("businesses")
      .select("*")
      .eq("user_id", user.uid)
      .single();

    if (biz) {
      setBusiness(biz);
      setBusinessId(biz.id);

      const { data: contactData } = await supabase
        .from("contacts")
        .select("*")
        .eq("business_id", biz.id)
        .single();

      if (contactData) setContact(contactData);
    }
  };

  const saveBusiness = async () => {
    const { data, error } = await supabase
      .from("businesses")
      .upsert({ ...business, user_id: user.uid })
      .select()
      .single();

    if (!error) {
      setBusinessId(data.id);
      alert("Business info saved!");
    } else {
      alert("Error saving business info");
    }
  };

  const saveContact = async () => {
    if (!businessId) return alert("Save business info first");
    const { error } = await supabase
      .from("contacts")
      .upsert({ ...contact, business_id: businessId });

    if (!error) alert("Contact info saved!");
    else alert("Error saving contact info");
  };

  const handleChange = (setter) => (field, value) => {
    setter(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className={styles.form}>
      <h3>Business Information</h3>
      <input placeholder="Business Name" value={business.name} onChange={e => handleChange(setBusiness)("name", e.target.value)} />
      <input placeholder="Business Location" value={business.location} onChange={e => handleChange(setBusiness)("location", e.target.value)} />
      <input placeholder="Business Phone" value={business.phone} onChange={e => handleChange(setBusiness)("phone", e.target.value)} />
      <input placeholder="Business Email" value={business.email} onChange={e => handleChange(setBusiness)("email", e.target.value)} />
      <input placeholder="Business Address" value={business.address} onChange={e => handleChange(setBusiness)("address", e.target.value)} />
      <button onClick={saveBusiness}>Save Business Info</button>

      <h3 style={{ marginTop: 24 }}>Primary Contact</h3>
      <input placeholder="Contact Name" value={contact.name} onChange={e => handleChange(setContact)("name", e.target.value)} />
      <input placeholder="Contact Phone" value={contact.phone} onChange={e => handleChange(setContact)("phone", e.target.value)} />
      <input placeholder="Contact Email" value={contact.email} onChange={e => handleChange(setContact)("email", e.target.value)} />
      <button onClick={saveContact}>Save Contact Info</button>
    </div>
  );
}
