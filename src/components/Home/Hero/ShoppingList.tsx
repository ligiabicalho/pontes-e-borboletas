import { useState } from "react";
import productList from "../../../db/productsList.json";

type Items = {
  product: string;
  price: number;
  checked: boolean;
};

const ShoppingList = () => {
  const [items, setItems] = useState([...productList]);
  const [totalValue, setTotalValue] = useState(0);
  const [contributionRate, setContributionRate] = useState(0);
  const [totalToPay, setTotalToPay] = useState(0);

  const handleCheck = (index: number) => {
    const updatedItems = [...items];
    updatedItems[index].checked = !updatedItems[index].checked;

    updatedItems.sort((a, b) => {
      // Mantém os itens checados na base e organiza alfabeticamente
      if (a.checked && !b.checked) return 1;
      if (!a.checked && b.checked) return -1;
      return a.product.localeCompare(b.product);
    });

    setItems(updatedItems);
    recalculateTotal(updatedItems);
  };

  const recalculateTotal = (updatedItems: Items[]) => {
    const checkedItems = updatedItems.filter((item) => item.checked);
    const newTotalValue = checkedItems.reduce(
      (acc, item) => acc + item.price,
      0,
    );
    setTotalValue(newTotalValue);
    recalculateContribution(newTotalValue);
  };

  const recalculateContribution = (newTotalValue: number) => {
    const checkedContribution = newTotalValue * (contributionRate / 100);
    const newTotalToPay = newTotalValue + checkedContribution;
    setTotalToPay(newTotalToPay);
  };

  const handleContributionChange = (rate: number) => {
    setContributionRate(rate);
    recalculateContribution(totalValue);
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <ul className="flex flex-col gap-2 lg:gap-0">
          {items.map((item, index) => (
            <li key={index}>
              <label htmlFor={item.product} className="flex gap-1">
                <input
                  name={item.product}
                  id={item.product}
                  type="checkbox"
                  checked={item.checked || false}
                  onChange={() => handleCheck(index)}
                />
                {item.product} - R${item.price.toFixed(2)}
              </label>
            </li>
          ))}
        </ul>

        <p className="my-2">Sub-total: R${totalValue.toFixed(2)}</p>
      </div>
      <div>
        <fieldset className="flex flex-col gap-2 lg:gap-0">
          <legend className="my-2">Contribuição:</legend>
          <label className="flex gap-1">
            <input
              type="radio"
              name="contribution"
              value={17}
              // checked={contributionRate === 17}
              onChange={() => handleContributionChange(17)}
            />
            17% - R${(totalValue * 0.17).toFixed(2)}
          </label>
          <label className="flex gap-1">
            <input
              type="radio"
              name="contribution"
              value={20}
              // checked={contributionRate === 20}
              onChange={() => handleContributionChange(20)}
            />
            20% - R${(totalValue * 0.2).toFixed(2)}
          </label>
          <label className="flex gap-1">
            <input
              type="radio"
              name="contribution"
              value={25}
              // checked={contributionRate === 25}
              onChange={() => handleContributionChange(25)}
            />
            25% - R${(totalValue * 0.25).toFixed(2)}
          </label>
          <label className="flex gap-1">
            <input
              type="radio"
              name="contribution"
              value="other"
              // checked={contributionRate > 25}
              // onChange={() => handleContributionChange(0)}
            />
            Outro:{" "}
            <input
              type="number"
              className="px-2 w-16"
              onChange={(e) =>
                handleContributionChange(parseFloat(e.target.value))
              }
            />
          </label>
        </fieldset>
      </div>

      <p>Total a pagar: R${totalToPay.toFixed(2)}</p>
    </div>
  );
};

export default ShoppingList;
