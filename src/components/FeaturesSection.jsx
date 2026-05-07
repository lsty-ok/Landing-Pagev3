"use client";

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check, Sparkles, Mic, FileSpreadsheet } from 'lucide-react'

// Mockup image imports & 3D Interactive Phone Showcase
import InteractivePhoneShowcase from './InteractivePhoneShowcase'
import dailySmartImg from '../assets/images/Mockup-fitur Daily Smart.png'
import asistenPintarImg from '../assets/images/Mockup-fitur Asisten Catatan Pintar.png'
import laporanBulananImg from '../assets/images/Mockup-fitur laporan Bulanan.png'

gsap.registerPlugin(ScrollTrigger)

export default function FeaturesSection() {
  const containerRef = useRef(null)
  
  // Card Connection Anchors (Fixed positions for stable SVG tracing)
  const card1Ref = useRef(null)
  const card2Ref = useRef(null)
  const card3Ref = useRef(null)

  // Expandable Area Content Refs
  const expand1Ref = useRef(null)
  const expand2Ref = useRef(null)
  const expand3Ref = useRef(null)

  // Active Path Refs
  const path1Ref = useRef(null)
  const path2Ref = useRef(null)
  const path3Ref = useRef(null)
  const path4Ref = useRef(null)

  // Node (Circle) Refs
  const node1Ref = useRef(null)
  const node2Ref = useRef(null)
  const node3Ref = useRef(null)

  // Node Glow Ring Refs
  const node1GlowRef = useRef(null)
  const node2GlowRef = useRef(null)
  const node3GlowRef = useRef(null)

  // Mobile trail ref
  const mobileTrailRef = useRef(null)

  // Expandable state of the cards (independent toggles)
  const [expanded, setExpanded] = useState({ 1: false, 2: false, 3: false })

  // SVG Paths state (calculated dynamically)
  const [paths, setPaths] = useState(null)

  // Smooth expandable spring bounce toggle using GSAP 'back.out' ease
  const toggleCard = (id) => {
    const isCurrentlyExpanded = expanded[id]
    const contentEl = id === 1 ? expand1Ref.current : id === 2 ? expand2Ref.current : id === 3 ? expand3Ref.current : null

    // Toggle local state
    setExpanded(prev => ({ ...prev, [id]: !isCurrentlyExpanded }))

    if (!isCurrentlyExpanded) {
      // "Swoosh" - Springy/elastic expanding bounce
      gsap.killTweensOf(contentEl)
      gsap.fromTo(contentEl, 
        { height: 0, opacity: 0 },
        { 
          height: 'auto', 
          opacity: 1, 
          duration: 0.85, 
          ease: 'back.out(1.5)', // Elastic spring feel!
          onComplete: () => {
            // Instantly sync layout shifts with ScrollTrigger for other sections
            ScrollTrigger.refresh()
          }
        }
      )
    } else {
      // Clean sliding collapse
      gsap.killTweensOf(contentEl)
      gsap.to(contentEl, {
        height: 0,
        opacity: 0,
        duration: 0.55,
        ease: 'power3.inOut',
        onComplete: () => {
          ScrollTrigger.refresh()
        }
      })
    }
  }

  // Calculate exact motherboard-style coordinates based on card cell top offsets
  const updatePath = () => {
    if (!containerRef.current || !card1Ref.current || !card2Ref.current || !card3Ref.current) return

    const gridRect = containerRef.current.getBoundingClientRect()
    
    // We use the static connection anchors inside each cell to determine the y coordinates.
    // Since anchors are placed at static positions, they remain completely unaffected by card height changes!
    const card1Rect = card1Ref.current.getBoundingClientRect()
    const card2Rect = card2Ref.current.getBoundingClientRect()
    const card3Rect = card3Ref.current.getBoundingClientRect()

    const y1 = card1Rect.top - gridRect.top
    const y2 = card2Rect.top - gridRect.top
    const y3 = card3Rect.top - gridRect.top

    const width = gridRect.width
    const x_mid = width / 2
    const bottom = gridRect.height

    // Motherboard trace calculations with 90° and 45° bends
    // Node 1 is at (x_mid - 80, y1), Node 2 is at (x_mid + 80, y2), Node 3 is at (x_mid - 80, y3)
    
    // 1. Path 1: Top to Node 1
    const d1 = `M ${x_mid} 0 
                L ${x_mid} ${y1 - 80} 
                L ${x_mid - 40} ${y1 - 40} 
                L ${x_mid - 40} ${y1 - 20} 
                L ${x_mid - 60} ${y1} 
                L ${x_mid - 80} ${y1}`

    // 2. Path 2: Node 1 to Node 2
    const d2 = `M ${x_mid - 80} ${y1} 
                L ${x_mid - 60} ${y1} 
                L ${x_mid - 40} ${y1 + 20} 
                L ${x_mid - 40} ${y1 + 60} 
                L ${x_mid} ${y1 + 100} 
                L ${x_mid} ${y2 - 80} 
                L ${x_mid + 40} ${y2 - 40} 
                L ${x_mid + 40} ${y2 - 20} 
                L ${x_mid + 60} ${y2} 
                L ${x_mid + 80} ${y2}`

    // 3. Path 3: Node 2 to Node 3
    const d3 = `M ${x_mid + 80} ${y2} 
                L ${x_mid + 60} ${y2} 
                L ${x_mid + 40} ${y2 + 20} 
                L ${x_mid + 40} ${y2 + 60} 
                L ${x_mid} ${y2 + 100} 
                L ${x_mid} ${y3 - 80} 
                L ${x_mid - 40} ${y3 - 40} 
                L ${x_mid - 40} ${y3 - 20} 
                L ${x_mid - 60} ${y3} 
                L ${x_mid - 80} ${y3}`

    // 4. Path 4: Node 3 to bottom
    const d4 = `M ${x_mid - 80} ${y3} 
                L ${x_mid - 60} ${y3} 
                L ${x_mid - 40} ${y3 + 20} 
                L ${x_mid - 40} ${y3 + 60} 
                L ${x_mid} ${y3 + 100} 
                L ${x_mid} ${bottom}`

    setPaths({ d1, d2, d3, d4, x_mid, y1, y2, y3, bottom })
  }

  // ResizeObserver to automatically recalculate paths on container scale/wrapping
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new ResizeObserver(() => {
      updatePath()
    })
    observer.observe(container)

    const loadTimeout = setTimeout(() => {
      updatePath()
    }, 600)

    window.addEventListener('load', updatePath)

    return () => {
      observer.disconnect()
      clearTimeout(loadTimeout)
      window.removeEventListener('load', updatePath)
    }
  }, [])

  // GSAP Animations and Responsive Behaviors
  useEffect(() => {
    if (!paths) return

    const mm = gsap.matchMedia()

    // DESKTOP SYSTEM (>= 768px)
    mm.add("(min-width: 768px)", () => {
      const activePath1 = path1Ref.current
      const activePath2 = path2Ref.current
      const activePath3 = path3Ref.current
      const activePath4 = path4Ref.current

      const setupPath = (pathEl) => {
        if (!pathEl) return 0
        const length = pathEl.getTotalLength()
        gsap.set(pathEl, {
          strokeDasharray: length,
          strokeDashoffset: length
        })
        return length
      }

      setupPath(activePath1)
      setupPath(activePath2)
      setupPath(activePath3)
      setupPath(activePath4)

      // Initial nodes states
      gsap.set([node1Ref.current, node2Ref.current, node3Ref.current], {
        scale: 0.3,
        opacity: 0.1,
      })
      gsap.set([node1GlowRef.current, node2GlowRef.current, node3GlowRef.current], {
        scale: 0,
        opacity: 0,
      })

      // Initial card glassmorphism dimmed states
      gsap.set([card1Ref.current.parentNode.querySelector('.glass-card-container'), 
                card2Ref.current.parentNode.querySelector('.glass-card-container'), 
                card3Ref.current.parentNode.querySelector('.glass-card-container')], {
        opacity: 0.15,
        filter: 'brightness(0.3) blur(2px)',
        scale: 0.97,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        boxShadow: '0 0 0px rgba(0, 0, 0, 0)',
      })

      // Initial showcase containers dimmed states
      gsap.set(['.showcase-container-1', '.showcase-container-2', '.showcase-container-3'], {
        opacity: 0.15,
        filter: 'brightness(0.3) blur(2px)',
        scale: 0.95,
        borderColor: 'rgba(255, 255, 255, 0.05)',
      })

      // Hide card elements inside for staggering slide-reveal
      gsap.set([
        card1Ref.current.parentNode.querySelectorAll('.card-animate-el'),
        card2Ref.current.parentNode.querySelectorAll('.card-animate-el'),
        card3Ref.current.parentNode.querySelectorAll('.card-animate-el')
      ], {
        y: 20,
        opacity: 0,
      })

      // Master GSAP scroll-triggered timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 35%',
          end: 'bottom 85%',
          scrub: 1.2,
          markers: false,
        }
      })

      // ---- FITUR 1: Anggaran Pintar ----
      tl.to(activePath1, {
        strokeDashoffset: 0,
        ease: 'none',
      }, 'segment1')
      .to(node1Ref.current, {
        opacity: 1,
        scale: 1,
        duration: 0.2,
      }, 'segment1+=0.5')

      // Node 1 explosion + Card 1 Activation + Showcase 1 Glow (Lime green theme)
      tl.to(node1Ref.current, {
        scale: 1.6,
        backgroundColor: '#D4E866',
        duration: 0.2,
      }, 'node1Hit')
      .to(node1GlowRef.current, {
        scale: 2.8,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      }, 'node1Hit')
      .to(node1GlowRef.current, {
        scale: 1,
        opacity: 0.3,
        duration: 0.3,
      }, 'node1Hit+=0.3')
      .to(card1Ref.current.parentNode.querySelector('.glass-card-container'), {
        opacity: 1,
        filter: 'brightness(1) blur(0px)',
        scale: 1,
        borderColor: 'rgba(212, 232, 102, 0.35)',
        boxShadow: '0 0 40px rgba(212, 232, 102, 0.22)',
        duration: 0.5,
      }, 'node1Hit')
      .to('.showcase-container-1', {
        opacity: 1,
        filter: 'brightness(1) blur(0px)',
        scale: 1,
        borderColor: 'rgba(212, 232, 102, 0.25)',
        boxShadow: '0 0 40px rgba(212, 232, 102, 0.15)',
        duration: 0.5,
      }, 'node1Hit')
      .to(card1Ref.current.parentNode.querySelectorAll('.card-animate-el'), {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.4,
        ease: 'power2.out',
      }, 'node1Hit+=0.1')

      // ---- FITUR 2: Asisten Suara ----
      .to(activePath2, {
        strokeDashoffset: 0,
        ease: 'none',
      }, 'segment2')
      .to(node2Ref.current, {
        opacity: 1,
        scale: 1,
        duration: 0.2,
      }, 'segment2+=0.5')

      // Node 2 explosion + Card 2 Activation + Showcase 2 Glow (Tech Blue theme)
      .to(node2Ref.current, {
        scale: 1.6,
        backgroundColor: '#60A5FA',
        duration: 0.2,
      }, 'node2Hit')
      .to(node2GlowRef.current, {
        scale: 2.8,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      }, 'node2Hit')
      .to(node2GlowRef.current, {
        scale: 1,
        opacity: 0.3,
        duration: 0.3,
      }, 'node2Hit+=0.3')
      .to(card2Ref.current.parentNode.querySelector('.glass-card-container'), {
        opacity: 1,
        filter: 'brightness(1) blur(0px)',
        scale: 1,
        borderColor: 'rgba(96, 165, 250, 0.35)',
        boxShadow: '0 0 40px rgba(96, 165, 250, 0.22)',
        duration: 0.5,
      }, 'node2Hit')
      .to('.showcase-container-2', {
        opacity: 1,
        filter: 'brightness(1) blur(0px)',
        scale: 1,
        borderColor: 'rgba(96, 165, 250, 0.25)',
        boxShadow: '0 0 40px rgba(96, 165, 250, 0.15)',
        duration: 0.5,
      }, 'node2Hit')
      .to(card2Ref.current.parentNode.querySelectorAll('.card-animate-el'), {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.4,
        ease: 'power2.out',
      }, 'node2Hit+=0.1')

      // ---- FITUR 3: Laporan Bulanan ----
      .to(activePath3, {
        strokeDashoffset: 0,
        ease: 'none',
      }, 'segment3')
      .to(node3Ref.current, {
        opacity: 1,
        scale: 1,
        duration: 0.2,
      }, 'segment3+=0.5')

      // Node 3 explosion + Card 3 Activation + Showcase 3 Glow (Lime green theme)
      .to(node3Ref.current, {
        scale: 1.6,
        backgroundColor: '#D4E866',
        duration: 0.2,
      }, 'node3Hit')
      .to(node3GlowRef.current, {
        scale: 2.8,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      }, 'node3Hit')
      .to(node3GlowRef.current, {
        scale: 1,
        opacity: 0.3,
        duration: 0.3,
      }, 'node3Hit+=0.3')
      .to(card3Ref.current.parentNode.querySelector('.glass-card-container'), {
        opacity: 1,
        filter: 'brightness(1) blur(0px)',
        scale: 1,
        borderColor: 'rgba(212, 232, 102, 0.35)',
        boxShadow: '0 0 40px rgba(212, 232, 102, 0.22)',
        duration: 0.5,
      }, 'node3Hit')
      .to('.showcase-container-3', {
        opacity: 1,
        filter: 'brightness(1) blur(0px)',
        scale: 1,
        borderColor: 'rgba(212, 232, 102, 0.25)',
        boxShadow: '0 0 40px rgba(212, 232, 102, 0.15)',
        duration: 0.5,
      }, 'node3Hit')
      .to(card3Ref.current.parentNode.querySelectorAll('.card-animate-el'), {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.4,
        ease: 'power2.out',
      }, 'node3Hit+=0.1')

      // ---- PATH TERMINATION ----
      .to(activePath4, {
        strokeDashoffset: 0,
        ease: 'none',
      }, 'segment4')
    })

    // MOBILE SYSTEM (< 768px)
    mm.add("(max-width: 767px)", () => {
      // Keep cards and showcases active instantly on mobile
      const cards = [
        card1Ref.current.parentNode.querySelector('.glass-card-container'),
        card2Ref.current.parentNode.querySelector('.glass-card-container'),
        card3Ref.current.parentNode.querySelector('.glass-card-container')
      ]

      const showcases = [
        document.querySelector('.showcase-container-1'),
        document.querySelector('.showcase-container-2'),
        document.querySelector('.showcase-container-3')
      ]

      gsap.set(cards, {
        opacity: 1,
        filter: 'brightness(1) blur(0px)',
        scale: 1,
        boxShadow: 'none',
        borderColor: 'rgba(255, 255, 255, 0.1)',
      })

      gsap.set(showcases, {
        opacity: 1,
        filter: 'brightness(1) blur(0px)',
        scale: 1,
        boxShadow: 'none',
        borderColor: 'rgba(255, 255, 255, 0.1)',
      })

      gsap.set([
        card1Ref.current.parentNode.querySelectorAll('.card-animate-el'),
        card2Ref.current.parentNode.querySelectorAll('.card-animate-el'),
        card3Ref.current.parentNode.querySelectorAll('.card-animate-el')
      ], {
        y: 0,
        opacity: 1,
      })

      // Mobile vertical glow line trail
      gsap.fromTo(mobileTrailRef.current, 
        { height: '0%' },
        {
          height: '100%',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 40%',
            end: 'bottom 85%',
            scrub: 1.0,
          }
        }
      )

      // Simple staggered cards entries on scroll
      cards.forEach((card) => {
        gsap.fromTo(card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none none',
            }
          }
        )
      })

      showcases.forEach((sc) => {
        if (!sc) return
        gsap.fromTo(sc,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sc,
              start: 'top 80%',
              toggleActions: 'play none none none',
            }
          }
        )
      })
    })

    return () => {
      mm.revert()
    }
  }, [paths])

  return (
    <section 
      id="fitur" 
      className="py-24 sm:py-32 bg-slate-950 text-white relative overflow-hidden"
    >
      {/* Background radial soft glowing backdrops */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-lime/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-24 md:mb-32">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-lime/10 border border-brand-lime/20 text-brand-lime text-xs font-bold uppercase tracking-wider mb-6">
            ✨ Fitur Unggulan
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6 font-jakarta">
            Atur Keuanganmu Tanpa Ribet
          </h2>
          <p className="text-slate-400 text-lg sm:text-xl font-light leading-relaxed">
            Dirancang khusus untuk mendukung mobilitas mahasiswa. Nikmati kemudahan pencatatan, analisis mendalam, dan asisten suara cerdas.
          </p>
        </div>

        {/* 
          Features Grid Container
          3-Columns Layout: [Left Card / Showcase (1fr)] - [Motherboard Tracks Spacer (160px)] - [Right Showcase / Card (1fr)]
        */}
        <div 
          ref={containerRef} 
          className="relative grid grid-cols-1 md:grid-cols-[1fr_160px_1fr] gap-x-8 gap-y-16 md:gap-y-28 items-center"
        >
          {/* Mobile Left Glowing Trail Line */}
          <div className="absolute left-3 top-0 bottom-0 w-[2px] bg-slate-900 md:hidden pointer-events-none rounded-full">
            <div 
              ref={mobileTrailRef} 
              className="w-full bg-brand-lime absolute top-0 rounded-full" 
              style={{ boxShadow: '0 0 12px #D4E866, 0 0 4px #D4E866' }}
            ></div>
          </div>

          {/* DYNAMIC SVG LAYER (Desktop/Tablet Motherboard Tracks) */}
          {paths && (
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
              style={{ zIndex: 0 }}
            >
              <defs>
                <filter id="glow-lime" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="glow-blue" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* BACKGROUND DIMMED TRACES */}
              <path d={paths.d1} stroke="#101726" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <path d={paths.d1} stroke="#1E293B" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
              
              <path d={paths.d2} stroke="#101726" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <path d={paths.d2} stroke="#1E293B" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
              
              <path d={paths.d3} stroke="#101726" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <path d={paths.d3} stroke="#1E293B" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
              
              <path d={paths.d4} stroke="#101726" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <path d={paths.d4} stroke="#1E293B" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />

              {/* GLOWING ACTIVE PATHS */}
              <path 
                ref={path1Ref} 
                d={paths.d1} 
                stroke="#D4E866" 
                strokeWidth="2.5" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                filter="url(#glow-lime)" 
              />
              <path 
                ref={path2Ref} 
                d={paths.d2} 
                stroke="#60A5FA" 
                strokeWidth="2.5" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                filter="url(#glow-blue)" 
              />
              <path 
                ref={path3Ref} 
                d={paths.d3} 
                stroke="#D4E866" 
                strokeWidth="2.5" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                filter="url(#glow-lime)" 
              />
              <path 
                ref={path4Ref} 
                d={paths.d4} 
                stroke="#D4E866" 
                strokeWidth="2.5" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                filter="url(#glow-lime)" 
              />

              {/* BACKGROUND SLEEVES */}
              <circle cx={paths.x_mid - 80} cy={paths.y1} r="9" fill="#0B0F19" stroke="#1E293B" strokeWidth="1.5" />
              <circle cx={paths.x_mid + 80} cy={paths.y2} r="9" fill="#0B0F19" stroke="#1E293B" strokeWidth="1.5" />
              <circle cx={paths.x_mid - 80} cy={paths.y3} r="9" fill="#0B0F19" stroke="#1E293B" strokeWidth="1.5" />

              {/* ACTIVE NODES */}
              {/* Node 1 */}
              <circle 
                ref={node1Ref} 
                cx={paths.x_mid - 80} 
                cy={paths.y1} 
                r="5" 
                fill="#1E293B" 
              />
              <circle 
                ref={node1GlowRef} 
                cx={paths.x_mid - 80} 
                cy={paths.y1} 
                r="10" 
                fill="none" 
                stroke="#D4E866" 
                strokeWidth="2.5" 
                opacity="0"
                filter="url(#glow-lime)"
              />

              {/* Node 2 */}
              <circle 
                ref={node2Ref} 
                cx={paths.x_mid + 80} 
                cy={paths.y2} 
                r="5" 
                fill="#1E293B" 
              />
              <circle 
                ref={node2GlowRef} 
                cx={paths.x_mid + 80} 
                cy={paths.y2} 
                r="10" 
                fill="none" 
                stroke="#60A5FA" 
                strokeWidth="2.5" 
                opacity="0"
                filter="url(#glow-blue)"
              />

              {/* Node 3 */}
              <circle 
                ref={node3Ref} 
                cx={paths.x_mid - 80} 
                cy={paths.y3} 
                r="5" 
                fill="#1E293B" 
              />
              <circle 
                ref={node3GlowRef} 
                cx={paths.x_mid - 80} 
                cy={paths.y3} 
                r="10" 
                fill="none" 
                stroke="#D4E866" 
                strokeWidth="2.5" 
                opacity="0"
                filter="url(#glow-lime)"
              />
            </svg>
          )}

          {/* ========================================================= */}
          {/* BARIS 1: FEATURE 1 (Anggaran Pintar - Tatap Muka) */}
          {/* ========================================================= */}
          {/* Left Column (Row 1): Card Teks */}
          <div className="md:col-start-1 md:row-start-1 pl-8 md:pl-0 relative flex flex-col justify-start">
            {/* Stable anchor for sirkuit, positioned relative to cell parent */}
            <div ref={card1Ref} className="absolute left-0 top-[220px] w-1 h-1 pointer-events-none"></div>

            <div 
              className="glass-card-container relative p-6 sm:p-8 rounded-3xl border border-white/10 bg-slate-950/60 backdrop-blur-xl transition-all duration-500 overflow-hidden flex flex-col justify-between h-auto hover:border-white/20 group"
            >
              {/* Dynamic decorative backdrop orb */}
              <div className="absolute -right-24 -top-24 w-48 h-48 rounded-full bg-brand-lime/5 blur-[50px] group-hover:bg-brand-lime/10 transition-colors duration-500 pointer-events-none"></div>

              {/* Base Card Content */}
              <div>
                <div className="card-animate-el flex items-center space-x-3 mb-4">
                  <div className="w-9 h-9 bg-brand-lime/10 rounded-xl flex items-center justify-center text-brand-lime font-bold border border-brand-lime/20 shadow-sm">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-extrabold text-brand-lime tracking-widest uppercase">OTOMATISASI REAL-TIME</span>
                </div>
                
                <h3 className="card-animate-el text-2xl sm:text-3xl font-extrabold text-white mb-4 leading-tight font-jakarta">
                  Anggaran Pintar Harian
                </h3>
                
                <p className="card-animate-el text-slate-400 text-sm sm:text-base leading-relaxed font-light mb-2">
                  Lupakan pencatatan manual yang membosankan. Biarkan AI BudJet menyusun anggaran harianmu secara otomatis agar keuangan tetap aman.
                </p>
              </div>

              {/* EXPANDABLE TEXT CONTAINER (Smooth spring bounce auto-height) */}
              <div 
                ref={expand1Ref}
                className="overflow-hidden h-0 opacity-0"
              >
                <div className="pt-4 border-t border-white/5 mt-4">
                  <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
                    BudJet secara cerdas menganalisis kebiasaan belanjamu dan menyusun batas pengeluaran harian yang realistis. Kamu tidak perlu lagi khawatir kehabisan uang saku di akhir bulan karena asisten AI kami selalu menjaga dompetmu tetap aman.
                  </p>

                  <ul className="space-y-3.5 mb-2">
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-brand-lime/20 text-brand-lime flex items-center justify-center shrink-0 mr-3 mt-1 border border-brand-lime/30">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="text-slate-300 text-xs sm:text-sm font-medium">Kategorisasi otomatis berbasis AI (Makanan, Kos, Buku, Kopi).</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-brand-lime/20 text-brand-lime flex items-center justify-center shrink-0 mr-3 mt-1 border border-brand-lime/30">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="text-slate-300 text-xs sm:text-sm font-medium">Notifikasi instan jika Anda melewati batas limit harian.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Interactive Button */}
              <button
                onClick={() => toggleCard(1)}
                className="card-animate-el mt-6 w-full px-5 py-3 rounded-xl border border-white/10 text-xs font-semibold uppercase tracking-wider bg-white/5 text-brand-lime hover:border-brand-lime/30 hover:bg-brand-lime/5 hover:shadow-[0_0_20px_rgba(212,232,102,0.12)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                {expanded[1] ? "Tutup Deskripsi ↑" : "Pelajari Lebih Lanjut ↴"}
              </button>
            </div>
          </div>

          {/* Middle Spacer (Filled by SVG) */}
          <div className="hidden md:block md:col-start-2 md:row-start-1"></div>

          {/* Right Column (Row 1): Phone Showcase (Tatap Muka!) */}
          <div className="showcase-container-1 md:col-start-3 md:row-start-1 w-full max-w-[350px] mx-auto h-[450px] relative overflow-visible rounded-3xl border border-white/5 bg-slate-900/10 backdrop-blur-md p-4 flex items-center justify-center shadow-lg shadow-black/30 transition-all duration-500">
            <InteractivePhoneShowcase
              variant="single"
              texturePath={dailySmartImg}
              themeColor="#D4E866"
            />
          </div>

          {/* ========================================================= */}
          {/* BARIS 2: FEATURE 2 (Asisten Suara - Tatap Muka) */}
          {/* ========================================================= */}
          {/* Left Column (Row 2): Phone Showcase (Tatap Muka!) */}
          <div className="showcase-container-2 md:col-start-1 md:row-start-2 w-full max-w-[350px] mx-auto h-[450px] relative overflow-visible rounded-3xl border border-white/5 bg-slate-900/10 backdrop-blur-md p-4 flex items-center justify-center shadow-lg shadow-black/30 transition-all duration-500">
            <InteractivePhoneShowcase
              variant="single"
              texturePath={asistenPintarImg}
              themeColor="#60A5FA"
            />
          </div>

          {/* Middle Spacer (Filled by SVG) */}
          <div className="hidden md:block md:col-start-2 md:row-start-2"></div>

          {/* Right Column (Row 2): Card Teks */}
          <div className="md:col-start-3 md:row-start-2 pl-8 md:pl-0 relative flex flex-col justify-start">
            {/* Stable anchor for sirkuit, positioned relative to cell parent */}
            <div ref={card2Ref} className="absolute left-0 top-[220px] w-1 h-1 pointer-events-none"></div>

            <div 
              className="glass-card-container relative p-6 sm:p-8 rounded-3xl border border-white/10 bg-slate-950/60 backdrop-blur-xl transition-all duration-500 overflow-hidden flex flex-col justify-between h-auto hover:border-white/20 group"
            >
              {/* Dynamic decorative backdrop orb */}
              <div className="absolute -right-24 -top-24 w-48 h-48 rounded-full bg-brand-blue/5 blur-[50px] group-hover:bg-brand-blue/10 transition-colors duration-500 pointer-events-none"></div>

              {/* Base Card Content */}
              <div>
                <div className="card-animate-el flex items-center space-x-3 mb-4">
                  <div className="w-9 h-9 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue font-bold border border-brand-blue/20 shadow-sm">
                    <Mic className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-extrabold text-brand-blue tracking-widest uppercase">ASISTEN AUDIO CERDAS</span>
                </div>
                
                <h3 className="card-animate-el text-2xl sm:text-3xl font-extrabold text-white mb-4 leading-tight font-jakarta">
                  Asisten Suara Instan
                </h3>
                
                <p className="card-animate-el text-slate-400 text-sm sm:text-base leading-relaxed font-light mb-2">
                  Capek mengetik pengeluaran setiap waktu? Cukup ucapkan nominal belanjaanmu dan asisten suara pintar kami akan mencatatnya otomatis.
                </p>
              </div>

              {/* EXPANDABLE TEXT CONTAINER (Smooth spring bounce auto-height) */}
              <div 
                ref={expand2Ref}
                className="overflow-hidden h-0 opacity-0"
              >
                <div className="pt-4 border-t border-white/5 mt-4">
                  <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
                    Ditenagai oleh teknologi Speech-to-Finance generasi terbaru, asisten suara BudJet memahami nominal, nama barang, bahkan dialek kasual sehari-hari. Cukup tekan tombol suara dan katakan 'Beli kopi 15 ribu tadi pagi'—dan selesai!
                  </p>

                  <ul className="space-y-3.5 mb-2">
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-brand-blue/20 text-brand-blue flex items-center justify-center shrink-0 mr-3 mt-1 border border-brand-blue/30">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="text-slate-300 text-xs sm:text-sm font-medium">Akurasi tinggi mengenal dialek dan ungkapan kasual sehari-hari.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-brand-blue/20 text-brand-blue flex items-center justify-center shrink-0 mr-3 mt-1 border border-brand-blue/30">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="text-slate-300 text-xs sm:text-sm font-medium">Konversi text-to-finance dalam waktu kurang dari 1 detik.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Interactive Button */}
              <button
                onClick={() => toggleCard(2)}
                className="card-animate-el mt-6 w-full px-5 py-3 rounded-xl border border-white/10 text-xs font-semibold uppercase tracking-wider bg-white/5 text-brand-blue hover:border-brand-blue/30 hover:bg-brand-blue/5 hover:shadow-[0_0_20px_rgba(96,165,250,0.12)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                {expanded[2] ? "Tutup Deskripsi ↑" : "Pelajari Lebih Lanjut ↴"}
              </button>
            </div>
          </div>

          {/* ========================================================= */}
          {/* BARIS 3: FEATURE 3 (Laporan Bulanan - Tatap Muka) */}
          {/* ========================================================= */}
          {/* Left Column (Row 3): Card Teks */}
          <div className="md:col-start-1 md:row-start-3 pl-8 md:pl-0 relative flex flex-col justify-start">
            {/* Stable anchor for sirkuit, positioned relative to cell parent */}
            <div ref={card3Ref} className="absolute left-0 top-[220px] w-1 h-1 pointer-events-none"></div>

            <div 
              className="glass-card-container relative p-6 sm:p-8 rounded-3xl border border-white/10 bg-slate-950/60 backdrop-blur-xl transition-all duration-500 overflow-hidden flex flex-col justify-between h-auto hover:border-white/20 group"
            >
              {/* Dynamic decorative backdrop orb */}
              <div className="absolute -right-24 -top-24 w-48 h-48 rounded-full bg-brand-lime/5 blur-[50px] group-hover:bg-brand-lime/10 transition-colors duration-500 pointer-events-none"></div>

              {/* Base Card Content */}
              <div>
                <div className="card-animate-el flex items-center space-x-3 mb-4">
                  <div className="w-9 h-9 bg-brand-lime/10 rounded-xl flex items-center justify-center text-brand-lime font-bold border border-brand-lime/20 shadow-sm">
                    <FileSpreadsheet className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-extrabold text-brand-lime tracking-widest uppercase">EKSPOR EKSEKUTIF</span>
                </div>
                
                <h3 className="card-animate-el text-2xl sm:text-3xl font-extrabold text-white mb-4 leading-tight font-jakarta">
                  Laporan Bulanan PDF &amp; Excel
                </h3>
                
                <p className="card-animate-el text-slate-400 text-sm sm:text-base leading-relaxed font-light mb-2">
                  Ekspor seluruh rekap pengeluaran dan pemasukan bulanan Anda menjadi berkas PDF &amp; spreadsheet Excel rapi dalam satu klik.
                </p>
              </div>

              {/* EXPANDABLE TEXT CONTAINER (Smooth spring bounce auto-height) */}
              <div 
                ref={expand3Ref}
                className="overflow-hidden h-0 opacity-0"
              >
                <div className="pt-4 border-t border-white/5 mt-4">
                  <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
                    Membuat laporan bulanan untuk orang tua atau pengajuan beasiswa kini menjadi sangat mudah. BudJet menyusun grafik visual interaktif yang cantik dan profesional, siap dikirim langsung melalui WhatsApp atau Email.
                  </p>

                  <ul className="space-y-3.5 mb-2">
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-brand-lime/20 text-brand-lime flex items-center justify-center shrink-0 mr-3 mt-1 border border-brand-lime/30">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="text-slate-300 text-xs sm:text-sm font-medium">Desain grafik interaktif yang mudah dipahami orang tua.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-brand-lime/20 text-brand-lime flex items-center justify-center shrink-0 mr-3 mt-1 border border-brand-lime/30">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="text-slate-300 text-xs sm:text-sm font-medium">Ekspor langsung terintegrasi ke email, WhatsApp, atau Drive.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Interactive Button */}
              <button
                onClick={() => toggleCard(3)}
                className="card-animate-el mt-6 w-full px-5 py-3 rounded-xl border border-white/10 text-xs font-semibold uppercase tracking-wider bg-white/5 text-brand-lime hover:border-brand-lime/30 hover:bg-brand-lime/5 hover:shadow-[0_0_20px_rgba(212,232,102,0.12)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                {expanded[3] ? "Tutup Deskripsi ↑" : "Pelajari Lebih Lanjut ↴"}
              </button>
            </div>
          </div>

          {/* Middle Spacer (Filled by SVG) */}
          <div className="hidden md:block md:col-start-2 md:row-start-3"></div>

          {/* Right Column (Row 3): Phone Showcase (Tatap Muka!) */}
          <div className="showcase-container-3 md:col-start-3 md:row-start-3 w-full max-w-[350px] mx-auto h-[450px] relative overflow-visible rounded-3xl border border-white/5 bg-slate-900/10 backdrop-blur-md p-4 flex items-center justify-center shadow-lg shadow-black/30 transition-all duration-500">
            <InteractivePhoneShowcase
              variant="single"
              texturePath={laporanBulananImg}
              themeColor="#D4E866"
            />
          </div>

        </div>

      </div>
    </section>
  )
}
