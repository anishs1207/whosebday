import { Button } from "@/components/ui/button"
import Spline from '@splinetool/react-spline/next';

export default function Hero() {

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Never Forget a <span className="text-purple-500">Birthday</span> Again
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-md">
              Keep track of all your important dates and get timely reminders for birthdays that matter to you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6">Get Started</Button>
              <Button
                variant="outline"
                className="border-purple-600 text-purple-400 hover:bg-purple-950/50 px-8 py-6"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="w-full h-[300px] lg:h-[400px] xl:h-[580px]">
              <Spline
                className="w-full h-full"
                scene="https://prod.spline.design/rTQMLbWhMytfBARK/scene.splinecode"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}