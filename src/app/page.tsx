import {
  Footer,
  NavBar,
  Hero,
  Features,
  Testimonials,
  Work,
  Pricing,
  Cta,
  About
} from "./_components"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />
      <Hero />
      <Features />
      <Work />
      <Testimonials />
      <Pricing />
      <Cta />
      <About />
      <Footer />
    </div>
  )
}
