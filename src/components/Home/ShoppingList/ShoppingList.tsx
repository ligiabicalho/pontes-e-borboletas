import { useCallback, useState } from "react";
import productsList from "../../../db/productsList.json";
import costTransparency from "../../../db/costTransparency.json";
import contributionOptions from "../../../db/contributionOptions.json";
import GetPixCopyAndPaste from "./GetPixCopyAndPaste";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import QuantityControlButtons from "./QuantityControlButtons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SearchBar from "./SearchBar";
import { parseItemName } from "@/lib/parseItemName";

const activeItems = productsList.filter((item) => item.active);

type Product = {
  id: number;
  name: string;
  unit: string;
  price: number;
  active: boolean | number;
  availableQuantity: number;
  quantity: number;
  category: string;
};

//TODO: Buscar por categorias

const ShoppingList: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<Product[]>([]);
  const [subTotalValue, setSubTotalValue] = useState<number>(0);
  const [totalToPay, setTotalToPay] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>();
  const [isInputEmpty, setIsInputEmpty] = useState<boolean>(true);
  type SearchType = "name" | "category";
  const [searchType] = useState<SearchType>("name"); //TODO: setSearchType
  const contributionDefault = contributionOptions.find(
    (option) => option.default,
  )?.rate as number;
  const [contributionRate, setContributionRate] =
    useState<number>(contributionDefault);

  const sortAndSearchProducts = (
    products: Product[],
    searchQuery?: string,
    searchType?: SearchType,
  ): Product[] => {
    let filteredProducts = products;

    if (searchQuery && searchType) {
      filteredProducts = filteredProducts.filter((product) => {
        if (searchType === "name") {
          return product.name.toLowerCase().includes(searchQuery.toLowerCase());
        } else {
          return product.category.toLowerCase() === searchQuery.toLowerCase();
        }
      });
    }
    // organiza alfabeticamente
    const sortedProductsList = filteredProducts.sort((a, b) =>
      a.name.localeCompare(b.name),
    );
    return sortedProductsList;
  };

  const sortedProductsList = sortAndSearchProducts(
    activeItems,
    searchQuery,
    searchType,
  );

  const [itemsList, setItemsList] = useState<Product[]>([
    ...sortedProductsList,
  ]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setIsInputEmpty(value === "");
    const result = sortAndSearchProducts(activeItems, searchQuery, searchType);
    setItemsList(result);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setIsInputEmpty(true);
    const result = sortAndSearchProducts(activeItems, "", searchType);
    setItemsList(result);
  };

  const calculateTotalToPay = useCallback(
    (subTotalValue: number, rate: number) => {
      const contribution = Number(checkedContribution(subTotalValue, rate));
      const newTotalToPay = (subTotalValue + contribution).toFixed(2);
      const newTotalNumber = Number(newTotalToPay);

      setTotalToPay(newTotalNumber);
      return newTotalNumber;
    },
    [setTotalToPay],
  );

  const calculateSubTotal = useCallback(
    (updatedItems: Product[]) => {
      const newSubTotalValue = updatedItems
        .reduce((acc, item) => acc + item.price * (item.quantity || 0), 0)
        .toFixed(2);
      const newSubTotalNumber = Number(newSubTotalValue);
      setSubTotalValue(newSubTotalNumber);
      calculateTotalToPay(newSubTotalNumber, contributionRate);
    },
    [setSubTotalValue, calculateTotalToPay, contributionRate],
  );

  const handleQuantityChange = useCallback(
    (id: number, newQuantity: number) => {
      setItemsList((prevItemsList) => {
        const updatedItems = prevItemsList.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item,
        );
        return updatedItems;
      });

      setSelectedItems((prevSelectedItems) => {
        let updatedSelectedItems = [...prevSelectedItems];

        if (updatedSelectedItems.some((item) => item.id === id)) {
          if (newQuantity === 0) {
            updatedSelectedItems = updatedSelectedItems.filter(
              (selectedItem) => selectedItem.id !== id,
            );
          } else {
            updatedSelectedItems = updatedSelectedItems.map((selectedItem) =>
              selectedItem.id === id
                ? { ...selectedItem, quantity: newQuantity }
                : selectedItem,
            );
          }
        } else {
          const itemToAdd = itemsList.find((item) => item.id === id);
          if (itemToAdd) {
            updatedSelectedItems.push({ ...itemToAdd, quantity: newQuantity });
          }
        }

        calculateSubTotal(updatedSelectedItems);
        return updatedSelectedItems;
      });
    },
    [itemsList, calculateSubTotal],
  );

  const incrementQuantity = (id: number, quantity: number) => {
    const newQuantity = quantity + 1;
    handleQuantityChange(id, newQuantity);
  };

  const decrementQuantity = (id: number, quantity: number) => {
    const newQuantity = quantity - 1;
    handleQuantityChange(id, Math.max(0, newQuantity));
  };

  const checkedContribution = (subTotalValue: number, rate: number) => {
    const contribution = (subTotalValue * (rate / 100)).toFixed(2);
    return contribution;
  };

  const handleContributionChange = (rate: number) => {
    setContributionRate(rate);
    calculateTotalToPay(subTotalValue, rate);
  };

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:justify-evenly">
      <div className="flex flex-col items-center lg:w-[30%]">
        <SearchBar
          handleSearch={handleSearch}
          searchQuery={searchQuery}
          handleClearSearch={handleClearSearch}
          isInputEmpty={isInputEmpty}
        />
        <div className="overflow-x-auto">
          <table>
            <tbody className="divide-y divide-gray-200">
              {itemsList.map((item) => (
                <tr key={item.id}>
                  <td
                    className={`flex flex-col py-2 whitespace-nowrap ${
                      !!item.quantity && "bg-gray-100"
                    }`}
                  >
                    <div className="flex justify-between w-fit">
                      <span className="ml-2 text-sm font-medium text-gray-900 min-w-[220px]">
                        {parseItemName(item.name, 25)}
                      </span>
                      <QuantityControlButtons
                        itemId={item.id}
                        quantity={item.quantity}
                        availableQuantity={item.availableQuantity}
                        incrementQuantity={incrementQuantity}
                        decrementQuantity={decrementQuantity}
                      />
                    </div>
                    <p className="flex ml-4 justify-between">
                      <span className="whitespace-nowrap text-sm text-gray-500">
                        R${item.price.toFixed(2).split(".").join(",")}/{" "}
                        {item.unit}
                      </span>
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col gap-3 lg:w-[30%]">
        <div>
          <p className="italic self-start">
            Sub-total: R${subTotalValue.toFixed(2).split(".").join(",")}
          </p>
          {!!subTotalValue && (
            <ul className="flex flex-col self-start w-full p-2 bg-white rounded-sm">
              {selectedItems.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span className="text-xs">{`${item.quantity} ${item.name} ${item.unit}`}</span>
                  <span className="text-xs">{`R$${(item.quantity * item.price)
                    .toFixed(2)
                    .split(".")
                    .join(",")}`}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <fieldset>
          <legend className="my-2">{contributionOptions[0].title}</legend>
          <div className="px-2 gap-1">
            {contributionOptions.map(
              (option) =>
                option.id && (
                  <Label
                    className="flex items-center gap-1 py-1 text-sm"
                    htmlFor={`rate-${option.rate}`}
                    key={option.rate}
                  >
                    <Input
                      id={`rate-${option.rate}`}
                      type="radio"
                      name="contribution"
                      className="mr-1"
                      value={option.rate}
                      checked={contributionRate === option.rate}
                      onChange={() => handleContributionChange(option.rate)}
                    />
                    {!!option.rate && "Contribuição: "}
                    {option.label}{" "}
                    {!!option.rate &&
                      !!subTotalValue &&
                      `(R$${checkedContribution(subTotalValue, option.rate)
                        .split(".")
                        .join(",")})`}
                  </Label>
                ),
            )}
            <p className="italic text-xs py-2">
              {contributionOptions[0].description}
            </p>
          </div>
        </fieldset>
        <div>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>{costTransparency[0].title}</AccordionTrigger>
              <AccordionContent>
                <p className="text-xs italic pb-2">
                  {costTransparency[0].description}
                </p>
                <ul>
                  {costTransparency.map(
                    (item) =>
                      item.id && (
                        <li key={item.id} className="text-xs">
                          {`${item.expense} (${item.cost})`}
                        </li>
                      ),
                  )}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <div className="lg:w-[30%]">
        <p className="py-2 font-bold text-center bg-white border-2 rounded-sm">
          Total a pagar: R$ {totalToPay.toFixed(2).split(".").join(",")}
        </p>
        <GetPixCopyAndPaste value={Number(totalToPay)} />
      </div>
    </div>
  );
};

export default ShoppingList;
