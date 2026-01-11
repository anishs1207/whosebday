import Link from "next/link";
import { CalendarDays, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-12 border-t border-gray-800">
      <div className="mx-auto px-4 max-w-screen-lg">
        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CalendarDays className="h-5 w-5 text-purple-500" />
              <span className="font-bold text-white">Whosebday</span>
            </div>
            <p className="text-gray-400 text-sm">
              Never forget a birthday again with our smart reminder platform.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-4">
              <Link href="https://x.com/anishs1207" target="_blank">
                <Twitter className="h-5 w-5 text-purple-500 hover:text-purple-600 cursor-pointer" />
              </Link>
              <Link href="https://www.linkedin.com/in/anish-sabharwal-a113a9307" target="_blank">
                <Linkedin className="h-5 w-5 text-purple-500 hover:text-purple-600 cursor-pointer" />
              </Link>
              <Link href="https://www.instagram.com/anishsab1207/" target="_blank">
                <Instagram className="h-5 w-5 text-purple-500 hover:text-purple-600 cursor-pointer" />
              </Link>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-bold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#home" className="text-gray-400 hover:text-purple-400 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-gray-400 hover:text-purple-400 text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-gray-400 hover:text-purple-400 text-sm">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-bold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-purple-400 text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-purple-400 text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-purple-400 text-sm">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex justify-center items-center">
          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} Whosebday. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
