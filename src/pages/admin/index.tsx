import Link from "next/link";
import { NavbarSimple } from "@/components/admin-panel/navbar/navbar-simple";
import LoginForm from "@/components/auth/loginForm";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarSimple />
      <main className="min-h-[calc(100vh-57px-97px)] flex-1">
        <div className="container relative pb-10 px-2">
          <section className="mx-auto flex flex-col lg:flex-row-reverse lg:items-start justify-around max-w-[1140px] items-center gap-2 py-4 md:py-12 md:pb-8 lg:py-24 lg:pb-6">
            <div className="mx-auto flex flex-col items-center lg:mt-10">
              <h1 className="text-center text-2xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1] mt-2">
                Feiras Outras Economias
              </h1>
              <span className="text-center text-lg font-light text-foreground">
                Instituto Pontes e Borboletas
              </span>
              <span className="lg:hidden font-bold">Dashboard</span>
            </div>

            <div className="flex items-center justify-center py-4 md:pb-6">
              <LoginForm />
            </div>
          </section>
        </div>
      </main>
      <footer className="py-2 md:py-0 border-t border-border/40">
        <div className="container px-2 flex flex-col items-center justify-center gap-4 md:h-12 md:flex-row">
          <p className="text-balance text-center text-xs leading-loose text-muted-foreground">
            Built on top of{" "}
            <Link
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4"
            >
              shadcn/ui
            </Link>
            . The source code is available on{" "}
            <Link
              href="https://github.com/salimi-my/shadcn-ui-sidebar"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </Link>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}
