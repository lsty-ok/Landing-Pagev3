import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import lottie from 'lottie-web'
import animationData from '../assets/Animations/logo.json'

export default function CinematicLoader({ onComplete }) {
  const containerRef = useRef(null)
  const lottieRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Stop scrolling during loading
    if (window.lenis) {
      window.lenis.stop()
    } else {
      document.body.style.overflow = 'hidden'
    }

    // Initialize Lottie animation
    let anim = null
    if (lottieRef.current) {
      anim = lottie.loadAnimation({
        container: lottieRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: animationData,
      })
    }

    // GSAP Progress Counter
    const counter = { value: 0 }
    const tl = gsap.timeline({
      onComplete: () => {
        // Elite Exit Animation: Slide up cleanly with luxurious ease-in-out curve
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: 'power4.inOut',
          onComplete: () => {
            // Cleanup and enable scroll
            if (anim) anim.destroy()
            if (window.lenis) {
              window.lenis.start()
            } else {
              document.body.style.overflow = 'auto'
            }
            if (onComplete) onComplete()
          }
        })
      }
    })

    // Progress counting animation over 3.2 seconds for cinematic pacing
    tl.to(counter, {
      value: 100,
      duration: 3.2,
      ease: 'power2.out',
      onUpdate: () => {
        setProgress(Math.floor(counter.value))
      }
    })

    // Subtle holding delay at 100% for smooth reveal pacing
    tl.to({}, { duration: 0.3 })

    return () => {
      if (anim) anim.destroy()
    }
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030712] overflow-hidden select-none"
    >
      {/* Cinematic Glowing Background Spatial Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-lime/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-blue-500/4 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Main Loader Content (Floating Vector Logo) */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Transparent Lottie Animation Wrapper */}
        <div 
          ref={lottieRef} 
          className="w-72 h-72 md:w-[400px] md:h-[400px] filter drop-shadow-[0_0_50px_rgba(212,232,102,0.12)] opacity-95 transition-opacity duration-300 scale-x-[-1]"
        ></div>
      </div>

      {/* High-Tech, Minimal Progress Console at Bottom */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2.5 z-10">
        <span className="text-[9px] font-mono tracking-[0.35em] text-white/30 uppercase">
          SISTEM DIINISIALISASI
        </span>
        <span className="text-brand-lime font-mono text-[11px] font-bold tracking-[0.2em]">
          {progress.toString().padStart(3, '0')}%
        </span>
        
        {/* Fine 1px loading track */}
        <div className="w-32 h-[1px] bg-white/5 rounded-full overflow-hidden relative">
          <div 
            className="absolute left-0 top-0 bottom-0 bg-brand-lime shadow-[0_0_8px_rgba(212,232,102,0.8)] transition-all duration-75"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}
