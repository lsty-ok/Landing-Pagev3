import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import CinematicLoader from './components/CinematicLoader'
import FloatingNav from './components/FloatingNav'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import SimulatorSection from './components/SimulatorSection'
import QuoteSection from './components/QuoteSection'
import TestimonialSection from './components/TestimonialSection'
import FaqSection from './components/FaqSection'
import TeamSection from './components/TeamSection'
import CtaSection from './components/CtaSection'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Buttery smooth easing
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
    })

    // Expose Lenis globally for custom smooth scroll navigation
    window.lenis = lenis

    // Lock scrolling initially while loader is active
    lenis.stop()

    // Sync ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    // Force ScrollTrigger calculations to recalculate after layout finishes painting
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 400)

    // Cleanup resources
    return () => {
      clearTimeout(refreshTimeout)
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  useEffect(() => {
    if (!showLoader && window.lenis) {
      window.lenis.start()
    }
  }, [showLoader])

  return (
    <div className="relative min-h-screen text-brand-slate antialiased bg-brand-bg">
      {/* Cinematic Loader overlay */}
      {showLoader && <CinematicLoader onComplete={() => setShowLoader(false)} />}

      {/* 
        Awwwards-level Glassmorphic Navigation Menu
      */}
      <FloatingNav />

      {/* 
        HTML DOM Layer (Under the 3D phone canvas)
        Wrap scroll hijacked sections inside #hero-trigger.
        Z-Index: 20 so it remains beneath Floating Nav (z-index 50) and matches Footer reveal.
      */}
      <div id="hero-trigger" className="uncover-wrapper relative z-20 bg-brand-bg shadow-2xl">
        <HeroSection />
        <FeaturesSection />
        <SimulatorSection />
        <QuoteSection />
        <CtaSection />
        <TestimonialSection />
        <TeamSection />
        <FaqSection />
      </div>

      {/* 
        Sticky Reveal Footer (Uncovered from underneath the .uncover-wrapper layer as user scrolls to absolute bottom)
        Z-Index: 5
      */}
      <Footer />
    </div>
  )
}
