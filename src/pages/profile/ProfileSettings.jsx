import { toast } from "sonner";
import { Phone, Mail, Link as LinkIcon } from "lucide-react";

import styles from "../../styles/ProfileSettings.module.css";
import formStyles from "../../styles/common/forms.module.css";
import { useBusinessProfile } from "../../utils/hooks/useBusinessProfile";
import { useContactProfile } from "../../utils/hooks/useContactProfile";

import FormLabel from "../../components/form/FormLabel";
import TextInput from "../../components/inputs/TextInput";

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
  console.log(contact);
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
      <section className={styles.section}>
        <h2 className={formStyles.title}>Business Information</h2>
        <p className={formStyles.helperText}>
          Appears publicly on your event listings. Any of these fields can be overriden when you create an event.
        </p>

        <div className={styles.group}>
          <p className={styles.groupCaption}>Business</p>
          <FormLabel label="Name" name="business_name" isRequired />
          <TextInput
            id="business_name"
            required
            placeholder="Business name"
            value={business?.business_name || ""}
            onChange={e => handleChange(setBusiness)("business_name", e.target.value)}
          />
        </div>

        <div className={styles.group}>
          <p className={styles.groupCaption}>Location</p>
          <FormLabel label="Street Address" name="street_address" isRequired />
          <TextInput
            id="street_address"
            placeholder="123 Main St"
            value={business?.street_address || ""}
            onChange={e => handleChange(setBusiness)("street_address", e.target.value)}
          />

          <div className={styles.row3}>
            <div>
              <FormLabel label="City" name="city" isRequired />
              <TextInput
                id="city"
                placeholder="Stowe"
                value={business?.city || ""}
                onChange={e => handleChange(setBusiness)("city", e.target.value)}
              />
            </div>
            <div>
              <FormLabel label="State" name="state" isRequired />
              <TextInput
                id="state"
                placeholder="VT"
                value={business?.state || ""}
                onChange={e => handleChange(setBusiness)("state", e.target.value)}
              />
            </div>
            <div>
              <FormLabel label="Zip" name="zipcode" isRequired />
              <TextInput
                id="zipcode"
                placeholder="05672"
                value={business?.zipcode || ""}
                onChange={e => handleChange(setBusiness)("zipcode", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={styles.group}>
          <p className={styles.groupCaption}>Public Contact Info</p>
          <div className={styles.row2}>
            <div>
              <FormLabel label="Phone" name="businessPhone" isRequired />
              <TextInput
                id="businessPhone"
                type="tel"
                placeholder="(555) 123-4567"
                leadingIcon={<Phone size={15} />}
                value={business?.phone || ""}
                onChange={e => handleChange(setBusiness)("phone", e.target.value)}
              />
            </div>
            <div>
              <FormLabel label="Email" name="email" isRequired />
              <TextInput
                id="email"
                type="email"
                placeholder="hello@business.com"
                leadingIcon={<Mail size={15} />}
                value={business?.email || ""}
                onChange={e => handleChange(setBusiness)("email", e.target.value)}
              />
            </div>
          </div>

          <FormLabel label="Website" name="url" isRequired />
          <TextInput
            id="url"
            type="url"
            placeholder="https://yourbusiness.com"
            leadingIcon={<LinkIcon size={15} />}
            value={business?.url || ""}
            onChange={e => handleChange(setBusiness)("url", e.target.value)}
          />
        </div>

        <div className={formStyles.actions}>
          <button className={formStyles.buttonPrimary} onClick={handleSaveBusiness}>
            Save Business Info
          </button>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={formStyles.title}>Primary Contact</h2>
        <p className={formStyles.helperText}>
          This info is kept internal and never displayed publicly. We'll use it to reach you directly for time-sensitive or event-related issues.
        </p>

        <div className={styles.group}>
          <FormLabel label="Contact Name" name="contactName" isRequired />
          <TextInput
            id="contactName"
            placeholder="Full name"
            value={contact?.name || ""}
            onChange={e => handleChange(setContact)("name", e.target.value)}
          />

          <div className={styles.row2}>
            <div>
              <FormLabel label="Phone" name="contactPhone" isRequired />
              <TextInput
                id="contactPhone"
                type="tel"
                placeholder="(555) 123-4567"
                leadingIcon={<Phone size={15} />}
                value={contact?.phone || ""}
                onChange={e => handleChange(setContact)("phone", e.target.value)}
              />
            </div>
            <div>
              <FormLabel label="Email" name="contactEmail" isRequired />
              <TextInput
                id="contactEmail"
                type="email"
                placeholder="you@email.com"
                leadingIcon={<Mail size={15} />}
                value={contact?.email || ""}
                onChange={e => handleChange(setContact)("email", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={formStyles.actions}>
          <button className={formStyles.buttonPrimary} onClick={handleSaveContact}>
            Save Contact Info
          </button>
        </div>
      </section>
    </div>
  );
}
