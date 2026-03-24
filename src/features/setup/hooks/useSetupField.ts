import { useState } from "react";

export function useSetupField(key: string, defaultValue = "") {
  const [value, setValue] = useState<string>(
    () => sessionStorage.getItem(key) ?? defaultValue,
  );

  const set = (newValue: string) => {
    sessionStorage.setItem(key, newValue);
    setValue(newValue);
  };

  return [value, set] as const;
}
