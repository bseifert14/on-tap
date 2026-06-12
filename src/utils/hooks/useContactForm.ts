import { useState } from "react";
import { supabase } from "../../supabase";
import { toast } from "sonner";

interface ContactForm {
  name: string;
  email: string;
  message: string;
  website: string; // honeypot
}

interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
  form?: string;
}

export default function useContactForm() {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    message: "",
    website: "", // honeypot
  });

  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof ContactForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    // Optional: clear error as user types
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as keyof typeof next];
        return next;
      });
    }
  };

  const validate = () => {
    const next: ContactFormErrors = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.email.trim()) next.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email";
    if (!form.message.trim()) next.message = "Message is required";
    return next;
  };

  const handleSubmit = async () => {
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return false;
    }

    // Dismiss keyboard before submitting
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    setIsSubmitting(true);
    setErrors({});

    const { data, error } = await supabase.functions.invoke("contact", {
      body: {
        name: form.name,
        email: form.email,
        message: form.message,
        website: form.website, // honeypot
      },
    });

    setIsSubmitting(false);

    if (error || !data?.ok) {
      toast.error("Message failed to send. Please try again.");
      setErrors((prev) => ({ ...prev, form: "Failed to send. Try again." }));
      return false;
    }

    toast.success("Message sent!");
    setForm({ name: "", email: "", message: "", website: "" });
    return true;
  };

  return {
    form,
    setForm,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
}
