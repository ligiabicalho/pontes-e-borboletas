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
    title: "Produtos",
    href: "/",
  },
  {
    title: "Feiras",
    href: "/feiras",
  },
  {
    title: "Contato",
    href: "/contato",
  },
  {
    title: "Suporte",
    href: "/suporte",
  },
];

export const NavbarSheet: React.FC<NavbarSheetProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="top" className="flex flex-col items-center">
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
        {/* grid grid-cols-2 */}
        <div className="w-[70%] flex flex-col space-y-2 mt-4 pb-4 place-items-center border-b-2">
          {NAV_ITEMS_MOBILE.map(({ title, href }) => (
            <SheetClose key={title} asChild>
              <Link className={"font-semibold"} href={href}>
                {title}
              </Link>
            </SheetClose>
          ))}
        </div>
        <SheetClose asChild>
          <div className="flex py-1 gap-6 justify-center">
            <Link
              href="https://instagram.com/ponteseborboletas"
              target="_blank"
            >
              <Image
                src="/instagram_black_logo_icon.svg"
                width={30}
                height={30}
                alt="Logo IPB - Instituto Pontes e Borboletas"
              />
            </Link>
            <Link
              href="https://api.whatsapp.com/send?phone=5521997555322"
              target="_blank"
            >
              <Image
                src="/whatsapp_black_logo_icon.svg"
                width={30}
                height={30}
                alt="Logo IPB - Instituto Pontes e Borboletas"
              />
            </Link>
          </div>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};
