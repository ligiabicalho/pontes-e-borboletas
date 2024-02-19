import { MinusCircle, PlusCircle } from "lucide-react";

type QuantityControlButtonsProps = {
  itemId: number;
  quantity: number;
  availableQuantity: number;
  incrementQuantity: (id: number, quantity: number) => void;
  decrementQuantity: (id: number, quantity: number) => void;
};

const QuantityControlButtons = ({
  itemId,
  quantity,
  availableQuantity,
  incrementQuantity,
  decrementQuantity,
}: QuantityControlButtonsProps) => {
  return (
    <div className="flex gap-2">
      {quantity > 0 ? (
        <MinusCircle
          className="mx-1 text-purple-700"
          onClick={() => decrementQuantity(itemId, quantity)}
        />
      ) : (
        <MinusCircle className="mx-1 text-gray-300" />
      )}
      <span className="px-1">{quantity}</span>
      {quantity < availableQuantity ? (
        <PlusCircle
          className="mx-1 text-purple-700"
          onClick={() => incrementQuantity(itemId, quantity)}
        />
      ) : (
        <PlusCircle className="mx-1  text-gray-300" />
      )}
    </div>
  );
};

export default QuantityControlButtons;
