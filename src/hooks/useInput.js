import { useState } from "react";

export const useInput = () => {
  const [value, setValue] = useState("");

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  return [value, handleValueChange];
};
