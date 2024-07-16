import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/admin",
          label: "Dashboard",
          active: pathname === "/admin",
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Feiras",
      menus: [
        {
          href: "",
          label: "Produtos",
          active: false,
          icon: SquarePen,
          submenus: [
            {
              href: "/admin/products",
              label: "Todos os produtos",
              active: pathname === "/admin/products",
            },
            {
              href: "/admin/products/new",
              label: "Novo produto",
              active: pathname === "/admin/products/new",
            },
          ],
        },
        {
          href: "/admin/categories",
          label: "Categorias",
          active: pathname.includes("/categories"),
          icon: Bookmark,
          submenus: [],
        },
        // {
        //   href: "/tags",
        //   label: "Tags",
        //   active: pathname.includes("/tags"),
        //   icon: Tag,
        //   submenus: [],
        // },
      ],
    },
    // {
    //   groupLabel: "Configurações",
    //   menus: [
    //     {
    //       href: "/admin/users",
    //       label: "Usuários",
    //       active: pathname.includes("/users"),
    //       icon: Users,
    //       submenus: [],
    //     },
    //     {
    //       href: "/admin/account",
    //       label: "Conta",
    //       active: pathname.includes("/account"),
    //       icon: Settings,
    //       submenus: [],
    //     },
    //   ],
    // },
  ];
}
