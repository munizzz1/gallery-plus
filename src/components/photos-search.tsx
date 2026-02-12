import React from "react";

import usePhotos from "../contexts/photos/hooks/use-photos";
import { debounce } from "../helpers/utils";
import InputText from "./input-text";

import SearchIcon from "../assets/icons/search.svg?react";

export default function PhotosSearch() {
  const [inputValue, setInputValue] = React.useState("");
  const { filters } = usePhotos();

  const debouncedSetValue = React.useCallback(
    debounce((value: string) => filters.setQ(value), 300),
    [filters.setQ],
  );

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setInputValue(value);
    debouncedSetValue(value);
  }

  return (
    <InputText
      icon={SearchIcon}
      placeholder="Buscar fotos"
      className="flex-1"
    />
  );
}
