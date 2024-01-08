import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";

export default function DefaultLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="lg:pb-0 bg-gradient min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
