import PlaceholderContent from "@/components/admin-panel/demo/placeholder-content";
import { ContentLayout } from "@/layouts/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import AdminPanelLayout from "@/layouts/admin-panel/admin-panel-layout";

export default function DashboardPage() {
  return (
    <AdminPanelLayout>
      <ContentLayout title="Dashboard">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>
                Dashboard (em construção) - Escolha uma opção do menu ao lado
              </BreadcrumbPage>
              {/* //FIXME */}
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <PlaceholderContent />
      </ContentLayout>
    </AdminPanelLayout>
  );
}
