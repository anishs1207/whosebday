import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Cta() {
  return (
    <section className="py-20 bg-purple-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Never Miss a Birthday Again?</h2>
        <p className="text-gray-200 max-w-2xl mx-auto mb-8">
          Join thousands of users who rely on Whosebday to keep track of important dates and strengthen their
          relationships.
        </p>
        <Link href="/sign-up">
          <Button className="cursor-pointer bg-white hover:bg-gray-100 text-purple-900 px-8 py-6 text-lg">Get Started for Free</Button>
        </Link>
      </div>
    </section>
  )
}