import usePlacesAutocomplete, { getGeocode } from "use-places-autocomplete";
import styles from '../../styles/AddressInput.module.css';

export default function AddressInput({ onAddressSelect }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: "us" },
    },
    debounce: 300,
  });

  const handleSelect = async (val) => {
    setValue(val, false);
    clearSuggestions();

    const results = await getGeocode({ address: val });
    const address = results[0];
    const parts = {
      streetNumber: "",
      street: "",
      city: "",
      state: "",
      zip: "",
    };

    for (const comp of address.address_components) {
      const type = comp.types[0];
      if (type === "street_number") parts.streetNumber = comp.long_name;
      if (type === "route") parts.street = comp.long_name;
      if (type === "locality") parts.city = comp.long_name;
      if (type === "administrative_area_level_1") parts.state = comp.short_name;
      if (type === "postal_code") parts.zip = comp.long_name;
    }

    onAddressSelect(parts);
  };
  
  return (
    <div className={styles.container}>
      <label>Business Address</label>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        placeholder="Start typing address..."
        className={styles.input}
      />
      {status === "OK" && (
        <ul className={styles.dropdown}>
          {data.map(({ place_id, description }) => (
            <li key={place_id} onClick={() => handleSelect(description)}>
              {description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
