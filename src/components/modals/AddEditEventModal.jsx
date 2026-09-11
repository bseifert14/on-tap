import formStyles from "../../styles/common/forms.module.css";
import useEventForm from "../../utils/hooks/useEventForm";
import Modal from "../common/Modal";
import EventFormFields from "../events/EventFormFields";

export default function AddEditEventModal({ user, business, event, onClose, onSave }) {
  const {
    form,
    handleChange,
    handleSubmit,
    fileInputRef,
    selectedFile,
    validateAndProcessFile
  } = useEventForm(user, event, onSave, business);

  const Footer = () => {
    return (
      <div className={formStyles.actions}>
        <button className={formStyles.buttonPrimary} onClick={handleSubmit}>
          Save
        </button>
        <button className={formStyles.buttonSecondary} onClick={onClose}>
          Cancel
        </button>
      </div>
    );
  }

  const defaultAddress = `${business.street_address} ${business.city}, ${business.state} ${business.zipcode}`;

  return (
    <Modal
      onClose={onClose}
      footer={<Footer />}
    >
      <h3 className={formStyles.title}>
        {event ? "Edit Event" : "Add Event"}
      </h3>
      <div>
        <EventFormFields
          form={form}
          handleChange={handleChange}
          fileInputRef={fileInputRef}
          selectedFile={selectedFile}
          validateAndProcessFile={validateAndProcessFile}
          locationPlaceholder={defaultAddress}
          businessNamePlaceholder={business.business_name}
          allowRecurring={true}
        />
      </div>
    </Modal>
  )
}
