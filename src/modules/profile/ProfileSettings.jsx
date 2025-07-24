import { useEffect, useState } from "react";
import styles from "../../styles/ProfileSettings.module.css";
import { supabase } from "../../supabase";
import AddressInput from "../../components/inputs/AddressInput";

export default function ProfileSettings({ user }) {
  const [business, setBusiness] = useState({ 
    business_name: "",
    street_address: "",
    city: "",
    state: "",
    zipcode: "",
    phone: "",
    email: "", 
    url: ""
  });
  const [contact, setContact] = useState({ name: "", phone: "", email: "" });
  const [businessId, setBusinessId] = useState(null);

  useEffect(() => {
    if (user) loadBusinessAndContact();
  }, [user]);

  const loadBusinessAndContact = async () => {
    const { data: biz } = await supabase
      .from("businesses")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (biz) {
      setBusiness(biz);
      setBusinessId(biz.id);

      const { data: contactData } = await supabase
        .from("contacts")
        .select("*")
        .eq("business_id", biz.id)
        .single();
      console.log(contactData);
      if (contactData) setContact(contactData);
    }
  };

  const saveBusiness = async () => {
    const { data, error } = await supabase
      .from("businesses")
      .upsert({ ...business, user_id: user.id })
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
                <label className={styles.formLabel} htmlFor="business_name">Name</label>
                <input
                  type="text"
                  id="business_name"
                  required
                  className={styles.formInput}
                  placeholder="Business name"
                  value={business.business_name}
                  onChange={e => handleChange(setBusiness)("business_name", e.target.value)}
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.formLabel} for="street_address">Street Address</label>
                <input
                  type="text"
                  id="street_address"
                  className={styles.formInput}
                  placeholder="Business Address"
                  value={business.street_address}
                  onChange={e => handleChange(setBusiness)("street_address", e.target.value)}
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.formLabel} for="city">City</label>
                <input
                  type="text"
                  id="city"
                  className={styles.formInput}
                  placeholder="Business City"
                  value={business.city}
                  onChange={e => handleChange(setBusiness)("city", e.target.value)}
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.formLabel} for="state">State</label>
                <input
                  type="text"
                  id="state"
                  className={styles.formInput}
                  placeholder="Business State"
                  value={business.state}
                  onChange={e => handleChange(setBusiness)("state", e.target.value)}
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.formLabel} for="zipcode">Zipcode</label>
                <input
                  type="number"
                  id="zipcode"
                  className={styles.formInput}
                  placeholder="Business Address"
                  value={business.zipcode}
                  onChange={e => handleChange(setBusiness)("zipcode", e.target.value)}
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="phone">Phone Number</label>
                <input
                  type="text"
                  id="businessPhone"
                  className={styles.formInput}
                  placeholder="Business Phone Number"
                  value={business.phone}
                  onChange={e => handleChange(setBusiness)("phone", e.target.value)}
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  className={styles.formInput}
                  placeholder="Business Email"
                  value={business.email}
                  onChange={e => handleChange(setBusiness)("email", e.target.value)}
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="url">URL</label>
                <input
                  type="text"
                  id="url"
                  className={styles.formInput}
                  placeholder="Business URL"
                  value={business.url}
                  onChange={e => handleChange(setBusiness)("url", e.target.value)}
                />
            </div>
          </form>
          <button className={styles.saveBtn} onClick={saveBusiness}>Save Business Info</button>
        </div>

        <div className={styles.formSection}>
          <h2 className={styles.sectionTitle}>Primary Contact</h2>
          <form>
            <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="name">Contact Name</label>
                <input
                  type="text"
                  id="contactName"
                  className={styles.formInput}
                  placeholder="Contact Person Name"
                  value={contact.name}
                  onChange={e => handleChange(setContact)("name", e.target.value)}
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="phone">Contact Phone</label>
                <input
                  type="text"
                  id="contactPhone"
                  className={styles.formInput}
                  placeholder="Contact Phone Number"
                  value={contact.phone}
                  onChange={e => handleChange(setContact)("phone", e.target.value)}
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="email">Contact Email</label>
                <input
                  type="text"
                  id="contactEmail"
                  className={styles.formInput}
                  placeholder="Contact Person Email"
                  value={contact.email}
                  onChange={e => handleChange(setContact)("email", e.target.value)}
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
