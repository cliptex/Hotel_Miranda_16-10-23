import Hero from '../components/sections/Hero.jsx'
import Stats from '../components/sections/Stats.jsx'
import FeaturedProducts from '../components/sections/FeaturedProducts.jsx'
import Brands from '../components/sections/Brands.jsx'
import Services from '../components/sections/Services.jsx'
import Testimonials from '../components/sections/Testimonials.jsx'
import FAQ from '../components/sections/FAQ.jsx'
import CTABanner from '../components/sections/CTABanner.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <FeaturedProducts />
      <Brands />
      <Services />
      <Testimonials />
      <FAQ />
      <CTABanner />
    </>
  )
}
