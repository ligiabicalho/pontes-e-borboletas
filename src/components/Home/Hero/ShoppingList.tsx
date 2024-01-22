import { useState } from "react";
import productList from "../../../db/productsList.json";
import GetPixCopyAndPaste from "./GetPixCopyAndPaste";

type Items = {
  product: string;
  price: number;
  checked: boolean;
  quantity?: number;
};

const ShoppingList = () => {
  const sortProducts = (products: Items[]) => {
    return products.sort((a, b) => {
      // Mantém os itens checados na base e organiza alfabeticamente
      if (a.checked && !b.checked) return 1;
      if (!a.checked && b.checked) return -1;
      return a.product.localeCompare(b.product);
    });
  };

  const sortedProductsList = sortProducts(productList);
  const [items, setItems] = useState<Items[]>([...sortedProductsList]);
  const [subTotalValue, setSubTotalValue] = useState<number>(0);
  const [contributionRate, setContributionRate] = useState<number>(30);
  const [totalToPay, setTotalToPay] = useState<string>("0");

  const handleCheck = (index: number) => {
    let updatedItems = [...items];
    updatedItems[index].checked = !updatedItems[index].checked;

    updatedItems = sortProducts(updatedItems);

    setItems(updatedItems);
    calculateSubTotal(updatedItems);
  };

  const calculateSubTotal = (updatedItems: Items[]) => {
    const checkedItems = updatedItems.filter((item) => item.checked);
    const newTotalValue = checkedItems
      .reduce((acc, item) => acc + item.price, 0)
      .toFixed(2);
    const newTotalNumber = Number(newTotalValue);
    setSubTotalValue(newTotalNumber);
    calculateTotalToPay(newTotalNumber, contributionRate);
  };

  const checkedContribution = (subTotalValue: number, rate: number) => {
    const contribution = (subTotalValue * (rate / 100)).toFixed(2);
    return contribution;
  };

  const calculateTotalToPay = (subTotalValue: number, rate: number) => {
    const contribution = Number(checkedContribution(subTotalValue, rate));
    const newTotalToPay = (subTotalValue + contribution).toFixed(2);
    setTotalToPay(newTotalToPay);
    return newTotalToPay;
  };

  const handleContributionChange = (rate: number) => {
    setContributionRate(rate);
    calculateTotalToPay(subTotalValue, rate);
  };

  return (
    <div className="flex flex-col w-[100%] gap-4 lg:flex-row lg:justify-evenly">
      <div>
        <ul className="flex flex-col gap-2 lg:gap-0">
          {items.map((item, index) => (
            <li key={index}>
              <label htmlFor={item.product} className="flex gap-1">
                <input
                  id={item.product}
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => handleCheck(index)}
                />
                {item.product} - R${item.price.toFixed(2).split(".").join(",")}
              </label>
            </li>
          ))}
        </ul>

        <p className="my-2 italic">Sub-total: R${subTotalValue.toFixed(2)}</p>
      </div>
      <div className="flex flex-col justify-between lg:w-[40%]">
        <fieldset className="flex flex-col gap-2 lg:gap-0 lg:self-center">
          <legend className="my-2">Contribuição:</legend>
          <div className="px-2">
            <label className="flex gap-1" htmlFor="rate-30">
              <input
                id="rate-30"
                type="radio"
                name="contribution"
                value={30}
                checked={contributionRate === 30}
                onChange={() => handleContributionChange(30)}
              />
              30%{" "}
              {!!subTotalValue &&
                `- R$${checkedContribution(subTotalValue, 30)
                  .split(".")
                  .join(",")}`}
            </label>
            <label className="flex gap-1" htmlFor="rate-0">
              <input
                id="rate-0"
                type="radio"
                name="contribution"
                value={0}
                checked={contributionRate === 0}
                onChange={() => handleContributionChange(0)}
              />
              Não desejo contribuir.
            </label>
          </div>
        </fieldset>
        <div className="p-2">
          <p className="text-xs italic pb-2">
            Escolher contribuir ou não é livre porque a sua decisão é outra
            economia com a gente!
          </p>
          <p className="text-xs">Transparência dos nossos custos:</p>
          <p className="text-xs">
            luz (R$290,00), água (R$220,00), internet e telefonia (R$170,00),
            frete (R$450,00), mídias digitais (R$340,00), equipe - 01 Armazém;
            07 feiras por semana; 05 dias de Cozinha para população em situação
            de rua - (R$10.320,00)
          </p>
        </div>
        <p className="my-2 font-bold">
          Total a pagar:{" "}
          {!!subTotalValue && `R$${totalToPay.split(".").join(",")}`}
        </p>
      </div>
      <div>
        <GetPixCopyAndPaste value={totalToPay} />
      </div>
    </div>
  );
};

export default ShoppingList;
