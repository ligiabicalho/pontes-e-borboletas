import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type shoppingListContextData = {
  setIsBottomBarVisible: Dispatch<SetStateAction<boolean>>;
  isBottomBarVisible: boolean;
};

type ShoppingListProviderProps = {
  children: ReactNode;
};

export const ShoppingListContext = createContext({} as shoppingListContextData);

export const useShoppingListContext = () => {
  const context = useContext(ShoppingListContext);

  if (!context) {
    throw new Error("useAuthContext should be used within AuthProvider");
  }

  return context;
};

export function ShoppingListProvider({ children }: ShoppingListProviderProps) {
  const [isBottomBarVisible, setIsBottomBarVisible] = useState(true);

  return (
    <ShoppingListContext.Provider
      value={{ isBottomBarVisible, setIsBottomBarVisible }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
}
