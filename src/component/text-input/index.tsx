import { debounce } from "lodash";
import { ChangeEvent, HTMLAttributes } from "react";

export interface TextInputProps extends HTMLAttributes<HTMLInputElement> {
  label?: string;
  delay?: number;
}

const TextInput = ({
  label,
  onChange = () => {},
  delay = 0,
  style,
  ...rest
}: TextInputProps) => {
  const handleChangeDebounce = debounce(onChange!, delay);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    handleChangeDebounce(e);
  }
  return (
    <label style={{ display: "flex", flexDirection: "column" }}>
      <span style={{ color: "black", marginBottom: "0.25rem" }}>{label}</span>
      <input
        {...rest}
        onChange={handleChange}
        style={{
          padding: "0.5rem 1rem",
          ...style,
        }}
      />
    </label>
  );
};

export { TextInput };
