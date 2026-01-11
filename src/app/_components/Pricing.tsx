import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Pricing() {
  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose the plan that works best for you and your needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <h3 className="text-xl font-bold mb-2">Free</h3>
            <p className="text-purple-400 text-3xl font-bold mb-4">
              $0<span className="text-sm text-gray-400">/month</span>
            </p>
            <p className="text-gray-400 mb-6">Perfect for personal use</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <ChevronRight className="h-5 w-5 text-purple-500" />
                <span>Unlimited events</span>
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="h-5 w-5 text-purple-500" />
                <span>Smart reminders</span>
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="h-5 w-5 text-purple-500" />
                <span>Beautiful calendar view</span>
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="h-5 w-5 text-purple-500" />
                <span>Upcoming events list</span>
              </li>
            </ul>
            <Link href="/sign-up">
              <Button
                variant="outline"
                className="cursor-pointer w-full border-purple-600 text-purple-400 hover:bg-purple-950/50"
              >
                Get Started
              </Button>
            </Link>
          </div>

          {/* Premium Plan */}
          <div className="bg-purple-900 p-8 rounded-xl border-2 border-purple-500 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-purple-600 px-4 py-1 rounded-full text-sm font-medium">
              Most Popular
            </div>
            <h3 className="text-xl font-bold mb-2">Pro</h3>
            <p className="text-white text-3xl font-bold mb-4">
              ₹10<span className="text-sm text-gray-300">/month</span>
            </p>
            <p className="text-gray-300 mb-6">For thoughtful gift-givers</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <ChevronRight className="h-5 w-5 text-purple-300" />
                <span>Everything in Free</span>
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="h-5 w-5 text-purple-300" />
                <span> Auto Schedule messages (WhatsApp)</span>
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="h-5 w-5 text-purple-300" />
                <span>AI-powered gift ideas</span>
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="h-5 w-5 text-purple-300" />
                <span>Relationship-based suggestions</span>
              </li>
            </ul>
            <a
              href="https://rzp.io/rzp/hJVo6Ol5"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button className="w-full bg-white hover:bg-gray-100 text-purple-900">
                Subscribe Now
              </Button>
            </a>

          </div>

          {/* Family Plan */}
          <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <h3 className="text-xl font-bold mb-2">Premium</h3>
            <p className="text-purple-400 text-3xl font-bold mb-4">
              ₹20<span className="text-sm text-gray-400">/month</span>
            </p>
            <p className="text-gray-400 mb-6">For up to 5 family members</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <ChevronRight className="h-5 w-5 text-purple-500" />
                <span>All Premium features</span>
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="h-5 w-5 text-purple-500" />
                <span>Shared family calendar</span>
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="h-5 w-5 text-purple-500" />
                <span>Collaborative gift planning</span>
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="h-5 w-5 text-purple-500" />
                <span>Priority support</span>
              </li>
            </ul>
            <Button
              variant="outline"
              className="w-full border-purple-600 text-purple-400 hover:bg-purple-950/50"
            >
              Coming Soon
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
