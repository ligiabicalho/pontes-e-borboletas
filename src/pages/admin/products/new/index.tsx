import PlaceholderContent from "@/components/admin-panel/demo/placeholder-content";
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
      <PlaceholderContent />
    </AdminCompleteLayout>
  );
}
