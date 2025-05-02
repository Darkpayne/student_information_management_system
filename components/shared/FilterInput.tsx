import { Button, CloseButton, Group, Input, InputGroup } from "@chakra-ui/react"
import React from "react";

interface FilterInputProps {
    handleSearch: () => void;
    handleClear: () => void;
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>
}
export const FilterInput = ({ handleSearch, query, setQuery, handleClear }: FilterInputProps) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const endElement = query ? (
    <CloseButton
      size="xs"
      onClick={() => {
        setQuery("");
        handleClear();
        inputRef.current?.blur();
      }}
      me="-2"
    />
  ) : undefined;
  return (
    <Group attached w="full" maxW="sm">
      <InputGroup endElement={endElement}>
        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search..."
        />
      </InputGroup>
      <Button onClick={handleSearch} bg="bg.subtle" variant="outline">
        Search
      </Button>
    </Group>
  );
}
