import SignUpForm from "@/components/auth/signUpForm";
import { ThemeProvider } from "@/providers/admin-panel/theme-provider";

export default function SignUpPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex lg:h-full items-center px-2 container relative">
        <SignUpForm />
      </div>
    </ThemeProvider>
  );
}
