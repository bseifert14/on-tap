import { useEffect, useState } from "react";
import styles from "../../styles/revamp/ProfileBusiness.module.css";
import { supabase } from "../../supabase";
import AddressInput from "./AddressInput";

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
    <div className={styles.wrapper}>
      <div className={styles.profileGrid}>
        <div className={styles.formSection}>
          <h2 className={styles.sectionTitle}>Business Information</h2>
          <form>
            <div className={styles.formGroup}>
                <label className={styles.formLabel} for="businessName">Name</label>
                <input
                  type="text"
                  id="businessName"
                  className={styles.formInput}
                  placeholder="Business name"
                  value={business.name}
                  onChange={e => handleChange(setBusiness)("businessName", e.target.value)}
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.formLabel} for="businessAddress">Address</label>
                <input
                  type="text"
                  id="businessAddress"
                  className={styles.formInput}
                  placeholder="Business Address"
                  value={business.name}
                  onChange={e => handleChange(setBusiness)("businessAddress", e.target.value)}
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.formLabel} for="businessPhone">Phone Number</label>
                <input
                  type="text"
                  id="businessPhone"
                  className={styles.formInput}
                  placeholder="Business Phone Number"
                  value={business.name}
                  onChange={e => handleChange(setBusiness)("businessPhone", e.target.value)}
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.formLabel} for="businessEmail">Email</label>
                <input
                  type="text"
                  id="businessEmail"
                  className={styles.formInput}
                  placeholder="Business Email"
                  value={business.name}
                  onChange={e => handleChange(setBusiness)("businessEmail", e.target.value)}
                />
            </div>
          </form>
          <button className={styles.saveBtn} onClick={saveBusiness}>Save Business Info</button>
        </div>

        <div className={styles.formSection}>
          <h2 className={styles.sectionTitle}>Primary Contact</h2>
          <form>
            <div className={styles.formGroup}>
                <label className={styles.formLabel} for="contactName">Contact Name</label>
                <input
                  type="text"
                  id="contactName"
                  className={styles.formInput}
                  placeholder="Contact Person Name"
                  value={business.name}
                  onChange={e => handleChange(setBusiness)("contactName", e.target.value)}
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.formLabel} for="contactPhone">Contact Phone</label>
                <input
                  type="text"
                  id="contactPhone"
                  className={styles.formInput}
                  placeholder="Contact Phone Number"
                  value={business.name}
                  onChange={e => handleChange(setBusiness)("contactPhone", e.target.value)}
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.formLabel} for="contactEmail">Contact Email</label>
                <input
                  type="text"
                  id="contactEmail"
                  className={styles.formInput}
                  placeholder="Contact Person Email"
                  value={business.name}
                  onChange={e => handleChange(setBusiness)("contactEmail", e.target.value)}
                />
            </div>
          </form>
          <button className={styles.saveBtn} onClick={saveContact}>Save Contact Info</button>
        </div>
      </div>

        {/* <AddressInput
          onAddressSelect={(parts) =>
            setBusiness((prev) => ({
              ...prev,
              streetNumber: parts.streetNumber,
              streetName: parts.street,
              city: parts.city,
              state: parts.state,
              zip: parts.zip,
            }))
          }
        /> */}
    </div>
  );
}
