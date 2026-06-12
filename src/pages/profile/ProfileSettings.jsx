import styles from "../../styles/ProfileSettings.module.css";
import { useBusinessProfile } from "../../utils/hooks/useBusinessProfile";
import { useContactProfile } from "../../utils/hooks/useContactProfile";

import { toast } from "sonner";
import FormLabel from "../../components/form/FormLabel";

export default function ProfileSettings({ user }) {
  const {
    business,
    setBusiness,
    businessId,
    saveBusiness
  } = useBusinessProfile(user?.id);

  const {
    contact,
    setContact,
    saveContact
  } = useContactProfile(businessId);

  const handleChange = (setter) => (field, value) => {
    setter(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveBusiness = async () => {
    const { error } = await saveBusiness(business);
    if (error) toast.error("Error saving business info.");
    else toast.success("Business info saved.");
  };

  const handleSaveContact = async () => {
    if (!businessId) return toast.warning("Save business info first.");
    const { error } = await saveContact(contact);
    if (error) toast.error("Error saving contact info.");
    else toast.success("Contact info saved.");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.profileGrid}>
        <div className={styles.formSection}>
          <h2 className={styles.sectionTitle}>Business Information</h2>
          <form>
            <div className={styles.formGroup}>
              <FormLabel label="Name" name="business_name" isRequired />
              <input
                type="text"
                id="business_name"
                required
                className={styles.formInput}
                placeholder="Business name"
                value={business?.business_name || ""}
                onChange={e => handleChange(setBusiness)("business_name", e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <FormLabel label="Street Address" name="street_address" isRequired />
              <input
                type="text"
                id="street_address"
                className={styles.formInput}
                placeholder="Business Address"
                value={business?.street_address || ""}
                onChange={e => handleChange(setBusiness)("street_address", e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <FormLabel label="City" name="city" isRequired />
              <input
                type="text"
                id="city"
                className={styles.formInput}
                placeholder="Business City"
                value={business?.city || ""}
                onChange={e => handleChange(setBusiness)("city", e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <FormLabel label="State" name="state" isRequired />
              <input
                type="text"
                id="state"
                className={styles.formInput}
                placeholder="Business State"
                value={business?.state || ""}
                onChange={e => handleChange(setBusiness)("state", e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <FormLabel label="Zipcode" name="zipcode" isRequired />
              <input
                type="number"
                id="zipcode"
                className={styles.formInput}
                placeholder="Business Zipcode"
                value={business?.zipcode || ""}
                onChange={e => handleChange(setBusiness)("zipcode", e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <FormLabel label="Phone Number" name="businessPhone" isRequired />
              <input
                type="text"
                id="businessPhone"
                className={styles.formInput}
                placeholder="Business Phone Number"
                value={business?.phone || ""}
                onChange={e => handleChange(setBusiness)("phone", e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <FormLabel label="Email" name="email" isRequired />
              <input
                type="text"
                id="email"
                className={styles.formInput}
                placeholder="Business Email"
                value={business?.email || ""}
                onChange={e => handleChange(setBusiness)("email", e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <FormLabel label="URL" name="url" isRequired />
              <input
                type="text"
                id="url"
                className={styles.formInput}
                placeholder="Business URL"
                value={business?.url || ""}
                onChange={e => handleChange(setBusiness)("url", e.target.value)}
              />
            </div>
          </form>
          <button className={styles.saveBtn} onClick={handleSaveBusiness}>Save Business Info</button>
        </div>

        <div className={styles.formSection}>
          <h2 className={styles.sectionTitle}>Primary Contact</h2>
          <form>
            <div className={styles.formGroup}>
              <FormLabel label="Contact Name" name="contactName" isRequired />
              <input
                type="text"
                id="contactName"
                className={styles.formInput}
                placeholder="Contact Person Name"
                value={contact?.name || ""}
                onChange={e => handleChange(setContact)("name", e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <FormLabel label="Contact Phone" name="contactPhone" isRequired />
              <input
                type="text"
                id="contactPhone"
                className={styles.formInput}
                placeholder="Contact Phone Number"
                value={contact?.phone || ""}
                onChange={e => handleChange(setContact)("phone", e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <FormLabel label="Contact Email" name="contactEmail" isRequired />
              <input
                type="text"
                id="contactEmail"
                className={styles.formInput}
                placeholder="Contact Person Email"
                value={contact?.email || ""}
                onChange={e => handleChange(setContact)("email", e.target.value)}
              />
            </div>
          </form>
          <button className={styles.saveBtn} onClick={handleSaveContact}>Save Contact Info</button>
        </div>
      </div>
    </div>
  );
}
