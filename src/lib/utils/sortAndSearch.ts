import { Product } from "@/entities/product";

export const sortAndSearchProducts = (
  products: Product[],
  searchQuery: string,
  setItemsList: any,
) => {
  const activeItems = products
    .filter((item) => item.active)
    .sort((a, b) => a.name.localeCompare(b.name));
  if (!searchQuery) return setItemsList(activeItems);
  console.log("searchQuery", searchQuery);
  const filteredProducts = activeItems.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  return setItemsList(filteredProducts);
};
