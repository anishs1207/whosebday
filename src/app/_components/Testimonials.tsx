import { Star } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join thousands of satisfied users who never miss important dates.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-gray-800 p-8 rounded-xl">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-purple-500 text-purple-500" />
              ))}
            </div>
            <p className="text-gray-300 mb-4">
              Whosebday has saved me countless times. I used to forget my friends&apos; birthdays, but now I&apos;m always
              prepared with the perfect gift!
            </p>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-purple-600 rounded-full"></div>
              <div>
                <p className="font-medium">Sarah Johnson</p>
                <p className="text-sm text-gray-400">Whosebday User</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-8 rounded-xl">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-purple-500 text-purple-500" />
              ))}
            </div>
            <p className="text-gray-300 mb-4">
              &apos;The gift suggestions are spot on! I&apos;ve been using this app for 6 months and it&apos;s made me look so
              thoughtful to all my friends and family.&apos;
            </p>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-purple-600 rounded-full"></div>
              <div>
                <p className="font-medium">Michael Chen</p>
                <p className="text-sm text-gray-400">Whosebday User</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
