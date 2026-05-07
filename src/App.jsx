import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import CinematicLoader from './components/CinematicLoader'
import FloatingNav from './components/FloatingNav'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import QuoteSection from './components/QuoteSection'
import TestimonialSection from './components/TestimonialSection'
import FaqSection from './components/FaqSection'
import CtaSection from './components/CtaSection'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Buttery smooth easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    })

    // Expose Lenis globally for custom smooth scroll navigation
    window.lenis = lenis

    // Lock scrolling initially while loader is active
    lenis.stop()

    // Connect Lenis to requestAnimationFrame
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

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

  return (
    <div className="relative min-h-screen text-brand-slate overflow-x-clip antialiased bg-brand-bg select-none">
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
        <QuoteSection />
        <CtaSection />
        <TestimonialSection />
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
