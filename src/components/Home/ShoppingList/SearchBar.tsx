import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, X } from "lucide-react";

type SearchBarProps = {
  handleSearch: (value: string) => void;
  searchQuery?: string;
  handleClearSearch: (event: any) => void;
  isInputEmpty: boolean;
};

const SearchBar: React.FC<SearchBarProps> = ({
  handleSearch,
  searchQuery,
  handleClearSearch,
  isInputEmpty,
}) => {
  return (
    <div className="flex flex-col items-center w-full">
      <Label className="relative flex py-1 text-sm w-full" htmlFor="search">
        <Input
          id="search"
          type="text"
          placeholder="Pesquisar"
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleSearch(e.target.value)
          }
          className="border mb-2 pl-2"
        />
        <div className="absolute right-1 top-5 transform -translate-y-3 flex h-8 w-8 items-center justify-center">
          {isInputEmpty ? (
            <Search size={18} color="gray" />
          ) : (
            <X
              cursor="pointer"
              size={36}
              color="#2d4f86"
              strokeWidth={2.5}
              className="p-2"
              onClick={handleClearSearch}
            />
          )}
        </div>
      </Label>
    </div>
  );
};

export default SearchBar;
