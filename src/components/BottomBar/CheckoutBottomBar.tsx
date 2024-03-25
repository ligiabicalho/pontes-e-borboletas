import { Button } from "../ui/button";
import { BottomBar } from "./BottomBar";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect } from "react";
import { useShoppingListContext } from "@/contexts/shoppingListContext";

type CheckoutProps = {
  subTotalValue: number;
  totalValue: number;
  hasPixCode: boolean;
};

export const CheckoutBottomBar = ({
  subTotalValue,
  totalValue,
  hasPixCode,
}: CheckoutProps) => {
  const router = useRouter();
  const currentPage = router.pathname;
  const targetPage = `${currentPage}#checkout`;

  const value = hasPixCode ? totalValue : subTotalValue;

  const { isBottomBarVisible, setIsBottomBarVisible } =
    useShoppingListContext();
  useEffect(() => {
    const targetElement = document.getElementById("checkout") as HTMLElement;

    const checkScroll = () => {
      if (window.scrollY > targetElement.offsetTop) {
        setIsBottomBarVisible(false);
      } else {
        setIsBottomBarVisible(true);
      }
    };

    window.addEventListener("scroll", checkScroll);

    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, [setIsBottomBarVisible]);

  if (!isBottomBarVisible) {
    return null;
  }

  return (
    <BottomBar>
      <div className="flex items-start space-x-2">
        <p className="font-primary text-neutral-black text-right text-xs">
          {hasPixCode ? "Total" : "Sub-total"}
        </p>

        <p className="flex text-secondary font-primary">
          <span className="text-xs">R$</span>
          <span className="text-2xl pl-1">
            {value.toFixed(2).split(".").join(",")}
          </span>
        </p>
      </div>

      <Link href={targetPage}>
        <Button>Finalizar compra</Button>
      </Link>
    </BottomBar>
  );
};
