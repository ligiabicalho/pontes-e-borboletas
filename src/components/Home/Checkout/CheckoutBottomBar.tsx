import { Button } from "../../ui/button";
import { BottomBar } from "../../BottomBar/BottomBar";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect } from "react";
import { useShoppingListContext } from "@/contexts/shoppingListContext";
import ScrollToTopButton from "./ScrollToTopButton";

type CheckoutProps = {
  subTotalValue: number;
  totalValue: number;
  hasPixCode?: boolean;
};

export const CheckoutBottomBar = ({
  subTotalValue,
  totalValue,
  // hasPixCode,
}: CheckoutProps) => {
  const router = useRouter();
  const currentPage = router.pathname;
  const targetPage = `${currentPage}#checkout`;

  // const value = hasPixCode ? totalValue : subTotalValue;
  const value = totalValue ? totalValue : subTotalValue;

  const { isBottomBarVisible, setIsBottomBarVisible } =
    useShoppingListContext();

  useEffect(() => {
    const heightToInvisible =
      document.documentElement.scrollHeight - 1.05 * window.innerHeight;

    const checkScroll = () => {
      if (window.scrollY > heightToInvisible) {
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
      <div className="flex w-full items-center gap-2 justify-between">
        <p className="flex flex-col">
          <span className="flex before:font-primary text-neutral-black text-right text-xs">
            {/* {hasPixCode ? "Total" : "Sub-total"} */}
            Total
          </span>
          <span className="text-xs text-secondary font-primary self-end">
            R$
          </span>
        </p>

        <p className="flex text-secondary font-primary">
          <span className="text-2xl">
            {value.toFixed(2).split(".").join(",")}
          </span>
        </p>
        <Link href={targetPage}>
          <Button>Finalizar compra</Button>
        </Link>
        <ScrollToTopButton />
      </div>
    </BottomBar>
  );
};
