import { NewProduct } from "@/components/admin-panel/products/new-product";
import AdminCompleteLayout from "@/layouts/admin-panel";

export default function NewProductPage() {
  return (
    <AdminCompleteLayout
      title="Novo produto"
      parent={{
        title: "Produtos",
        href: "/admin/products",
      }}
    >
      <NewProduct />
    </AdminCompleteLayout>
  );
}
