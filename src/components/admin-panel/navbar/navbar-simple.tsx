import { ModeToggle } from "@/components/admin-panel/navbar/mode-toggle";
import { PanelsTopLeft } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function NavbarSimple() {
  return (
    <header className="z-[50] sticky top-0 w-full bg-background/95 border-b backdrop-blur-sm dark:bg-black/[0.6] border-border/40">
      <div className="container h-14 flex items-center">
        <Link
          href="/"
          className="flex justify-start items-center hover:opacity-85 transition-opacity duration-300"
        >
          <PanelsTopLeft className="w-6 h-6 mr-3" />
          <span className="hidden lg:flex font-bold">IPB Dashboard</span>
          <span className="lg:hidden font-bold">IPB</span>
          <span className="sr-only">IPB Dashboard Feiras Outra</span>
        </Link>
        <nav className="ml-auto flex items-center gap-2">
          <Button variant="outline" className="text-xs lg:text-sm" asChild>
            <Link
              href="https://pontes-e-borboletas.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              App Feira
            </Link>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-8 h-8 bg-background"
            asChild
          >
            <Link href="https://github.com/ligiabicalho">
              <GitHubLogoIcon className="h-[1.2rem] w-[1.2rem]" />
            </Link>
          </Button>
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
