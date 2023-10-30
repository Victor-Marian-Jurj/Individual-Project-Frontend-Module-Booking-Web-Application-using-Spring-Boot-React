import { useState } from "react";

export const useInput = (initialState) => {
  const [value, setValue] = useState(initialState);

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  return [value, handleValueChange];
};
