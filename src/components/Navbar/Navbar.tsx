import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "../../lib/utils";
import { LucideIcon, MenuIcon } from "lucide-react";
import { NavbarSheet } from "./NavbarSheet";

type NavItem = {
  title: string;
  href: string;
  navigationMenuLinkClassName?: string;
  Icon?: LucideIcon;
  Wrapper?: React.FunctionComponent<any>;
};

type MobileNavItem = {
  key: string;
  Icon: LucideIcon;
  Wrapper?: React.FunctionComponent<any>;
};

export const NAV_ITEMS: NavItem[] = [
  {
    title: "Produtos",
    href: "/",
  },
  {
    title: "Como funcionamos",
    href: "/como-funcionamos",
  },
  {
    title: "Perguntas frequentes",
    href: "/faq",
  },
  {
    title: "Sobre nós",
    href: "/sobre-nos",
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

const MOBILE_NAV_BAR: MobileNavItem[] = [
  {
    key: "menu",
    Icon: MenuIcon,
    Wrapper: NavbarSheet,
  },
];

export function Navbar() {
  const [bgColor, setBGColor] = useState("bg-transparent");

  const changeBGColor = () => {
    if (window.scrollY > 0) {
      setBGColor("bg-background");
    } else {
      setBGColor("bg-transparent");
    }
  };

  useEffect(() => {
    if (window) {
      window.addEventListener("scroll", changeBGColor);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn("w-full fixed z-50", bgColor)}>
      <div className="container flex items-center justify-between py-3">
        <div className="hidden lg:flex">
          <Link href="/">
            <Image
              src="/logo-large.png"
              width={300}
              height={50}
              alt="Logo IPB - Instituto Pontes e Borboletas"
            />
          </Link>
        </div>
        <div className="lg:hidden">
          <Link href="/">
            <Image
              src="/logo-short.png"
              width={150}
              height={50}
              alt="Logo IPB - Instituto Pontes e Borboletas"
            />
          </Link>
        </div>

        <div className="space-x-4 block lg:hidden">
          {MOBILE_NAV_BAR.map(({ Icon, key, Wrapper }) => {
            const Component = (
              <Button
                key={key}
                variant={"outline"}
                size={"icon"}
                className="bg-transparent border-gray-500 rounded-3xl shadow-md"
              >
                <Icon size={18} />
              </Button>
            );

            if (Wrapper) {
              return <Wrapper key={key}>{Component}</Wrapper>;
            }

            return Component;
          })}
        </div>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {NAV_ITEMS.map(
              ({ Icon, title, href, navigationMenuLinkClassName, Wrapper }) => {
                if (href) {
                  return (
                    <NavigationMenuItem key={title}>
                      <Link href={href} legacyBehavior passHref>
                        <NavigationMenuLink
                          className={cn(
                            navigationMenuTriggerStyle(),
                            "bg-transparent",
                            navigationMenuLinkClassName,
                          )}
                        >
                          {title}

                          {Icon && <Icon size={18} className="ml-1" />}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  );
                }

                const Component = (
                  <NavigationMenuItem
                    key={title}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent cursor-pointer",
                      navigationMenuLinkClassName,
                    )}
                  >
                    {title}

                    {Icon && <Icon size={18} className="ml-1" />}
                  </NavigationMenuItem>
                );

                if (Wrapper) {
                  return <Wrapper key={title}>{Component}</Wrapper>;
                }

                return Component;
              },
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
