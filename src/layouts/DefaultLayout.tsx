import { Navbar } from "@/components/Navbar/Navbar";

export default function DefaultLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="lg:pb-0 min-h-screen">
      <Navbar />
      {children}
    </div>
  );
}
