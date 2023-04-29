import { Input, Button } from "@nextui-org/react";

const SearchBar = ({ onSubmit, value, setValue }) => {
  return (
    <form
      onSubmit={onSubmit}
      style={{ display: "flex", gap: 10, justifyContent: "space-between" }}
    >
      <div style={{ display: "flex", gap: 10 }}>
        <Input
          aria-label="Search bar"
          value={value}
          placeholder="Search Title"
          onChange={(e) => setValue(e.target.value)}
        />
        <Button onPress={(e) => onSubmit(e)} auto>
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
