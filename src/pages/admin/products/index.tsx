import { Products } from "@/components/admin-panel/products/all-products";
import AdminCompleteLayout from "@/layouts/admin-panel";

export default function AllProductsPage() {
  return (
    <AdminCompleteLayout
      title="Todos os produtos"
      parent={{
        title: "Produtos",
        href: "/admin/products",
      }}
    >
      <Products />
    </AdminCompleteLayout>
  );
}
