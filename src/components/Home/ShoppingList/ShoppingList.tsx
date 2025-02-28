import { useCallback, useState } from "react";
import productsList from "../../../db/productsList.json";
import contribution from "../../../db/contributionOptions.json";
import GeneratePixCode from "../Checkout/Pix/GeneratePixCode";

import QuantityControlButtons from "./QuantityControlButtons";
import { Label } from "@/components/ui/label";
import SearchBar from "./SearchBar";
import { parseItemName } from "@/lib/parseItemName";
import { Product } from "@/entities/product";
import { CheckoutBottomBar } from "@/components/Home/Checkout/CheckoutBottomBar";
import { ShoppingBasket } from "lucide-react";
import CostTransparency from "./CostTransparency";
import { sortAndSearchProducts } from "@/lib/utils/sortAndSearch";
import Link from "next/link";
import handleScroll from "@/lib/utils/scrollToElement";

//TODO: Buscar por categorias

const ShoppingList: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<Product[]>([]);
  const [subTotalValue, setSubTotalValue] = useState<number>(0);
  const [totalToPay, setTotalToPay] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isInputEmpty, setIsInputEmpty] = useState<boolean>(true);
  const [hasPixCode, setHasPixCode] = useState<boolean>(false);
  const [itemsList, setItemsList] = useState<Product[]>([...productsList]);
  const [isContributing, setIsContributing] = useState<boolean>(true);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setIsInputEmpty(value === "");
    sortAndSearchProducts(productsList, value, setItemsList);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setIsInputEmpty(true);
    sortAndSearchProducts(productsList, "", setItemsList);
  };

  const calculateSubTotal = useCallback(
    (updatedItems: Product[], isContributing: boolean) => {
      const newSubTotalValue = (hasContribution = true) => {
        const result = updatedItems
          .reduce(
            (acc, item) =>
              acc +
              (hasContribution ? item.priceIpb : item.price) *
                (item.quantity || 0),
            0,
          )
          .toFixed(2);

        return Number(result);
      };
      const newSubTotalNumber = newSubTotalValue();
      setSubTotalValue(newSubTotalNumber);

      isContributing
        ? setTotalToPay(newSubTotalNumber)
        : setTotalToPay(newSubTotalValue(false));
    },
    [setSubTotalValue, setTotalToPay],
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

        calculateSubTotal(updatedSelectedItems, isContributing);
        return updatedSelectedItems;
      });
    },
    [itemsList, calculateSubTotal, isContributing],
  );

  const incrementQuantity = (id: number, quantity: number) => {
    const newQuantity = quantity + 1;
    handleQuantityChange(id, newQuantity);
  };

  const decrementQuantity = (id: number, quantity: number) => {
    const newQuantity = quantity - 1;
    handleQuantityChange(id, Math.max(0, newQuantity));
  };

  const handleContributionChange = (contribution: boolean) => {
    setIsContributing(contribution);
    calculateSubTotal(selectedItems, contribution);
  };

  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-evenly lg:pt-4">
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
                  <tr key={item.id} id={item.id.toString()}>
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
                          R${item.priceIpb.toFixed(2).split(".").join(",")}/{" "}
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
        <div
          id="checkout"
          className="flex flex-col lg:grid grid-cols-2 lg:w-[70%] gap-x-8 pt-4"
        >
          <div className="flex flex-col gap-3">
            <p className="flex font-bold items-center py-2">
              <ShoppingBasket className="inline mr-2" /> Finalizar compra
            </p>
            <div>
              <p className="italic self-start pb-2">
                Sub-total: R${subTotalValue.toFixed(2).split(".").join(",")}
              </p>
              {!!subTotalValue && (
                <ul className="flex flex-col self-start w-full p-2 bg-white rounded-sm">
                  {selectedItems.map((item) => (
                    <Link
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => handleScroll(e, `${item.id}`)}
                    >
                      <li key={item.id} className="flex justify-between">
                        <span className="text-xs">{`${item.quantity} ${item.name} ${item.unit}`}</span>
                        <span className="text-xs">
                          {`R$${(item.quantity * item.priceIpb)
                            .toFixed(2)
                            .split(".")
                            .join(",")}`}
                        </span>
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </div>
            <fieldset>
              <legend className="py-2">{contribution.title}</legend>
              <div className="px-2 gap-1">
                {contribution.options.map(
                  (option) =>
                    option.id && (
                      <Label
                        className="flex items-center gap-1 py-1 text-sm"
                        htmlFor={`rate-${option.rate}`}
                        key={option.rate}
                      >
                        <input
                          id={`rate-${option.rate}`}
                          type="checkbox"
                          name="contribution"
                          className="mr-1"
                          value={option.rate}
                          checked={!isContributing}
                          onClick={() =>
                            handleContributionChange(!isContributing)
                          }
                        />
                        {option.label}{" "}
                        {/* {!!option.rate &&
                          !!subTotalValue &&
                          `(R$${checkedContribution(subTotalValue, option.rate)
                            .split(".")
                            .join(",")})`} */}
                      </Label>
                    ),
                )}
                <p className="italic text-xs py-1">
                  {contribution.description}
                </p>
              </div>
            </fieldset>
            <div className="pb-4">
              <CostTransparency />
            </div>
          </div>

          <div className="flex flex-col py-2">
            <p className="py-2 font-bold text-center bg-white border-2 rounded-sm">
              Total a pagar: R$ {totalToPay.toFixed(2).split(".").join(",")}
            </p>
            <GeneratePixCode
              value={Number(totalToPay)}
              setHasPixCode={setHasPixCode}
            />
          </div>
        </div>
      </div>
      <CheckoutBottomBar
        subTotalValue={subTotalValue}
        totalValue={totalToPay}
        hasPixCode={hasPixCode}
      />
    </>
  );
};

export default ShoppingList;
