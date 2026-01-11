import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-black/70 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-6 w-6 text-purple-500" />
            <span className="text-xl font-bold">Whosebday</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="#" className="text-sm hover:text-purple-400 transition-colors">
            Home
          </Link>
          <Link href="#about" className="text-sm hover:text-purple-400 transition-colors">
            About
          </Link>
          <Link href="#pricing" className="text-sm hover:text-purple-400 transition-colors">
            Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" className="bg-purple-600 hover:text-purple-400">
            <Link href="/sign-in">
              Sign In
            </Link>
          </Button>
          <Button variant="ghost" className="bg-purple-600 hover:text-purple-400">
            <Link href="/sign-up">
              Sign Up
            </Link>
          </Button>

        </div>
      </div>
    </header>
  );
}
