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
          type="search"
          placeholder="Pesquisar"
          value={searchQuery}
          onChange={(e: any) => handleSearch(e.target.value)}
          className="border mb-2 pl-2"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-3 px-1">
          {isInputEmpty ? (
            <Search size={18} color="gray" />
          ) : (
            <X
              cursor="pointer"
              size={18}
              color="gray"
              onClick={handleClearSearch}
            />
          )}
        </div>
      </Label>
      {/* TODO //FIXME: Implementar busca por categoria */}
      {/* <div className="flex gap-4">
        <Label
          className="flex items-center gap-1 py-1 text-sm"
          htmlFor="name"
        >
          <Input
            type="radio"
            id="name"
            name="searchType"
            value="name"
            onChange={() => setSearchType("name")}
          />
          Nome
        </Label>

        <Label
          className="flex items-center gap-1 py-1 text-sm"
          htmlFor="category"
        >
          <Input
            type="radio"
            id="category"
            name="searchType"
            value="category"
            onChange={() => setSearchType("category")}
          />
          Categoria
        </Label>
      </div> */}
    </div>
  );
};

export default SearchBar;
