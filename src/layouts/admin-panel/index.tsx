import Link from "next/link";
import { ContentLayout } from "@/layouts/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import AdminPanelLayout from "@/layouts/admin-panel/admin-panel-layout";

interface AdminCompleteLayoutProps {
  title: string;
  parent?: {
    title: string;
    href: string;
  };
  children: React.ReactNode;
}

export default function AdminCompleteLayout({
  title,
  parent,
  children,
}: AdminCompleteLayoutProps) {
  return (
    <AdminPanelLayout>
      <ContentLayout title={title}>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/admin">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {!!parent && (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={parent.href}>{parent.title}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}
            <BreadcrumbItem>
              <BreadcrumbPage>{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {children}
      </ContentLayout>
    </AdminPanelLayout>
  );
}
