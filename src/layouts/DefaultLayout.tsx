import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";

export default function DefaultLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex flex-col lg:pb-0 bg-gradient min-h-screen justify-between">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
