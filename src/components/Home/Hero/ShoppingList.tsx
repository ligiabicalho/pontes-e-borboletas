import { useState } from "react";
import productsList from "../../../db/productsList.json";
import GetPixCopyAndPaste from "./GetPixCopyAndPaste";

type Product = {
  id: number;
  name: string;
  unit: string;
  price: number;
  checked: boolean;
  active: boolean;
  quantity?: number;
};

const ShoppingList = () => {
  // Seleciona só os items ativos
  const activeItems = productsList.filter((item) => item.active);
  console.log("activeItems", activeItems);


  const sortProducts = (products: Product[]) => {
    return products.sort((a, b) => {

      //Mantém os itens checados na base da lista
      // if (a.checked && !b.checked) return 1;
      // if (!a.checked && b.checked) return -1;

      // organiza alfabeticamente
      return a.name.localeCompare(b.name);
    });
  };
  const sortedProductsList = sortProducts(activeItems);

  const [items, setItems] = useState<Product[]>([...sortedProductsList]);
  const [subTotalValue, setSubTotalValue] = useState<number>(0);
  const [contributionRate, setContributionRate] = useState<number>(30);
  const [totalToPay, setTotalToPay] = useState<string>("0");

  const handleCheck = (id: number) => {
    let updatedItems = [...items];
    const [ itemChecked ] = updatedItems.filter((item) => item.id === id);
    itemChecked.checked = !itemChecked.checked;

    updatedItems = sortProducts(updatedItems);

    setItems(updatedItems);
    calculateSubTotal(updatedItems);
  };

  const calculateSubTotal = (updatedItems: Product[]) => {
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
    <div className="flex flex-col gap-4 lg:flex-row lg:justify-evenly">
      <div className="flex flex-col items-center w-full lg:w-[40%]">
        <div className="overflow-x-auto w-full">
          <table className="w-full">
            <tbody className="divide-y divide-gray-200">
              {items
                .filter((item) => item.active)
                .map((item) => (
                  <tr key={item.id}>
                    <td
                      className={`flex items-center px-4 py-2 whitespace-nowrap ${
                        item.checked && "bg-gray-100"
                      }`}
                    >
                      <label htmlFor={`${item.id}`} className="flex flex-col w-full">
                        <div className="flex">
                          <input
                            id={`${item.id}`}
                            type="checkbox"
                            checked={item.checked}
                            onChange={() => handleCheck(item.id)}
                            className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                          <span className="ml-2 block text-sm font-medium text-gray-900">
                            {item.name}
                          </span>
                        </div>
                        <p className="flex px-2 ml-5 justify-between">
                          <span className="whitespace-nowrap text-sm text-gray-500">
                            {item.unit}
                          </span>
                          <span className="whitespace-nowrap text-sm text-gray-500">
                            R${item.price.toFixed(2).split(".").join(",")}
                          </span>
                        </p>
                      </label>
                    </td>
                        
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <p className="my-2 italic self-start">
          Sub-total: R${subTotalValue.toFixed(2)}
        </p>
        <ul className="flex flex-col pl-2 self-start">
          {items.map((item) => (
            item.checked && 
            <li key={item.id} className="text-xs">
              {`${item.name} ${item.unit} R$${item.price.toFixed(2).split(".").join(",")}`}
            </li>
        ))}
        </ul>
      </div>

      <div className="flex flex-col gap-4 lg:w-[25%]">
        <fieldset className="flex flex-col gap-2 lg:gap-0">
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
        <div className="py-2">
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
      <div className="lg:w-[28%]">
        <GetPixCopyAndPaste value={Number(totalToPay)} />
      </div>
    </div>
  );
};

export default ShoppingList;
