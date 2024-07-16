import PlaceholderContent from "@/components/admin-panel/demo/placeholder-content";
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
      <PlaceholderContent />
    </AdminCompleteLayout>
  );
}
