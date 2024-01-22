import { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";

type NavbarSheetProps = {
  children: JSX.Element;
};

type NavItem = {
  title: string;
  href: string;
};

const NAV_ITEMS_MOBILE: NavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Contato",
    href: "/contact",
  },
];

export const NavbarSheet: React.FC<NavbarSheetProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <Link href="/">
            <Image
              src="/logo-short.png"
              width={150}
              height={30}
              alt="Logo IPB - Instituto Pontes e Borboletas"
              className="mx-auto"
            />
          </Link>
        </SheetHeader>

        <div className="w-full flex flex-col space-y-2 mt-6 items-center">
          {NAV_ITEMS_MOBILE.map(({ title, href }) => (
            <SheetClose key={title} asChild>
              <Link className={"font-semibold"} href={href}>
                {title}
              </Link>
            </SheetClose>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
