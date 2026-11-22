import { MotionConfig } from 'framer-motion'
import { Navbar } from './components/Navbar'
import { HeroSlideshow } from './components/HeroSlideshow'
import { FlavorGrid } from './components/FlavorGrid'
import { Promo } from './components/Promo'
import { About } from './components/About'
import { Gallery } from './components/Gallery'
import { Testimonials } from './components/Testimonials'
import { Feedback } from './components/Feedback'
import { Visit } from './components/Visit'
import { Footer } from './components/Footer'
import { FloatingOrderButton } from './components/FloatingOrderButton'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-foam">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-espresso focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-cream"
        >
          Skip to content
        </a>

        <Navbar />

        <main id="main" tabIndex={-1} className="outline-none">
          <HeroSlideshow />
          <FlavorGrid />
          <Promo />
          <About />
          <Gallery />
          <Testimonials />
          <Feedback />
          <Visit />
        </main>

        <Footer />
        <FloatingOrderButton />
      </div>
    </MotionConfig>
  )
}
