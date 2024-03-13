import { useState } from "react";
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

type Product = {
  id: number;
  name: string;
  unit: string;
  price: number;
  active: number;
  availableQuantity: number;
  quantity: number;
};
//TODO: Não encontrou? Encomende
//TODO: Modal inferior | carrinho
//TODO: Buscar produto por nome
//TODO: Buscar por categorias

const ShoppingList = () => {
  const sortProducts = (products: Product[]) => {
    // organiza alfabeticamente
    return products.sort((a, b) => a.name.localeCompare(b.name));
  };
  // FIXME: Manter ativo ou considerar stock??
  // Seleciona só os items ativos
  const activeItems = productsList.filter((item) => item.active);
  const sortedProductsList = sortProducts(activeItems);

  const [itemsList, setItemsList] = useState<Product[]>([
    ...sortedProductsList,
  ]);
  const [selectedItems, setSelectedItems] = useState<Product[]>([]);
  const [subTotalValue, setSubTotalValue] = useState<number>(0);
  const [totalToPay, setTotalToPay] = useState<number>(0);

  const contributionDefault = contributionOptions.find(
    (option) => option.default,
  )?.rate as number;
  const [contributionRate, setContributionRate] =
    useState<number>(contributionDefault);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    const updatedItems = [...itemsList];
    const itemToUpdate = updatedItems.find((item) => item.id === id);
    if (itemToUpdate) {
      itemToUpdate.quantity = newQuantity;
    }
    selectedItems.push(itemToUpdate as Product);
    setSelectedItems(selectedItems);
    setItemsList(updatedItems);
    calculateSubTotal(updatedItems);
  };

  const incrementQuantity = (id: number, quantity: number) => {
    const newQuantity = quantity + 1;
    handleQuantityChange(id, newQuantity);
  };

  const decrementQuantity = (id: number, quantity: number) => {
    const newQuantity = quantity - 1;
    handleQuantityChange(id, Math.max(0, newQuantity));
  };

  const calculateSubTotal = (updatedItems: Product[]) => {
    const newSubTotalValue = updatedItems
      .reduce((acc, item) => acc + item.price * (item.quantity || 0), 0)
      .toFixed(2);
    const newSubTotalNumber = Number(newSubTotalValue);
    setSubTotalValue(newSubTotalNumber);
    calculateTotalToPay(newSubTotalNumber, contributionRate);
  };

  const checkedContribution = (subTotalValue: number, rate: number) => {
    const contribution = (subTotalValue * (rate / 100)).toFixed(2);
    return contribution;
  };

  const calculateTotalToPay = (subTotalValue: number, rate: number) => {
    const contribution = Number(checkedContribution(subTotalValue, rate));
    const newTotalToPay = (subTotalValue + contribution).toFixed(2);
    const newTotalNumber = Number(newTotalToPay);

    setTotalToPay(newTotalNumber);
    return newTotalNumber;
  };

  const handleContributionChange = (rate: number) => {
    setContributionRate(rate);
    calculateTotalToPay(subTotalValue, rate);
  };

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:justify-evenly">
      <div className="flex flex-col items-center lg:w-[30%]">
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
                    <div className="flex justify-between">
                      <span className="ml-2 text-sm font-medium text-gray-900">
                        {item.name}
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
              {itemsList.map(
                (item) =>
                  !!item.quantity && (
                    <li key={item.id} className="flex justify-between">
                      <span className="text-xs">{`${item.quantity} ${item.name} ${item.unit}`}</span>
                      <span className="text-xs">{`R$${(
                        item.quantity * item.price
                      )
                        .toFixed(2)
                        .split(".")
                        .join(",")}`}</span>
                    </li>
                  ),
              )}
            </ul>
          )}
        </div>
        <fieldset>
          <legend className="my-2">{contributionOptions[0].title}</legend>
          <div className="px-2 gap-1">
            {contributionOptions.map(
              (option) =>
                option.id && (
                  <label
                    className="flex gap-1 my-1 text-sm"
                    htmlFor={`rate-${option.rate}`}
                    key={option.rate}
                  >
                    <input
                      id={`rate-${option.rate}`}
                      type="radio"
                      name="contribution"
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
                  </label>
                ),
            )}
            <p className="italic text-xs py-2">
              {contributionOptions[0].description}
            </p>
          </div>
        </fieldset>
        <div>
          <Accordion type="single" collapsible className="shadow rounded-md">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xs">
                {costTransparency[0].title}
              </AccordionTrigger>
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
