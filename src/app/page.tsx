import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { LoginButton } from "@/components/auth/login-button";

const font = Poppins({
  subsets: ["latin"],
  weight: "600",
});

export const metadata = {
  title: "Home",
  description: "Landing page",
};

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <div className=" space-y-6 text-center ">
        <h1
          className={cn(
            "text-6xl font-semibold text-white drop-shadow-md",
            font.className
          )}
        >
          🔐 Point Blank
        </h1>
        <p className="text-white text-lg">A Simple Authentication service</p>
        <div>
          <LoginButton>
            <Button variant="secondary" size="lg">
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
