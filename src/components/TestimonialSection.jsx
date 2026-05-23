import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star, Quote } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const TESTIMONIALS_COL_1 = [
  {
    quote: "Incredibly helpful for students on a tight budget. The daily allowance algorithm ensures I never overspend again!",
    name: "Farhan Ardiansyah",
    role: "Information Systems Student, PENS",
    rating: 5,
  },
  {
    quote: "I absolutely love the Voice Input feature! I just say 'bought lunch for twenty thousand' and it's logged automatically. Brilliant.",
    name: "Siti Rahma",
    role: "English Literature Student, Unesa",
    rating: 5,
  },
  {
    quote: "Reporting my expenses to my parents is so easy now. Just export the history into a CSV file, and I'm done!",
    name: "Bagus Prasetyo",
    role: "Mechanical Engineering Student, ITS",
    rating: 5,
  },
  {
    quote: "The UI is very clean, the dark mode looks cool, and it's super easy to understand. Quick login with Google is a huge plus.",
    name: "Nabila Putri",
    role: "Visual Communication Design Student, ITB",
    rating: 5,
  },
]

const TESTIMONIALS_COL_2 = [
  {
    quote: "The perfect finance app for students! It's free, has no ads, and truly helps manage my monthly allowance.",
    name: "Rian Hidayat",
    role: "Finance Management Student, UGM",
    rating: 5,
  },
  {
    quote: "The Smart Budgeting feature is top-notch. I now know my exact safe daily limit so I can still afford a nice meal at the end of the month.",
    name: "Amanda Lestari",
    role: "Medical Student, Airlangga University",
    rating: 5,
  },
  {
    quote: "Tried many expense trackers, but BudJet fits best. It's simple, lightweight, cloud-synced, and lightning fast for logging.",
    name: "Dwi Cahyo",
    role: "Computer Science Student, Undip",
    rating: 5,
  },
  {
    quote: "A true lifesaver for dorm students! From constantly running out of money mid-month to being financially disciplined with BudJet.",
    name: "Putu Gede",
    role: "Accounting Student, Udayana University",
    rating: 5,
  },
]

export default function TestimonialSection() {
  const containerRef = useRef(null)
  const col1Ref = useRef(null)
  const col2Ref = useRef(null)
  const row1Ref = useRef(null)
  const row2Ref = useRef(null)

  useEffect(() => {
    // ----------------------------------------------------
    // DESKTOP: INFINITE VERTICAL MARQUEE
    // ----------------------------------------------------
    const col1 = col1Ref.current
    const col2 = col2Ref.current

    let tween1, tween2

    if (col1 && col2 && window.innerWidth > 768) {
      // Reset positions to percentage-based layouts
      gsap.set(col1, { yPercent: 0 })
      gsap.set(col2, { yPercent: -50 })

      // Create looping timelines using ultra-stable percent shifts
      tween1 = gsap.to(col1, {
        yPercent: -50,
        duration: 22,
        ease: 'none',
        repeat: -1,
      })

      tween2 = gsap.to(col2, {
        yPercent: 0,
        duration: 22,
        ease: 'none',
        repeat: -1,
      })

      // Hover to pause logic (gentle deceleration/acceleration)
      const setupHoverPause = (el, tween) => {
        const handleMouseEnter = () => {
          gsap.to(tween, { timeScale: 0.05, duration: 0.5, ease: 'power2.out' })
        }
        const handleMouseLeave = () => {
          gsap.to(tween, { timeScale: 1, duration: 0.5, ease: 'power2.out' })
        }
        el.addEventListener('mouseenter', handleMouseEnter)
        el.addEventListener('mouseleave', handleMouseLeave)
        return () => {
          el.removeEventListener('mouseenter', handleMouseEnter)
          el.removeEventListener('mouseleave', handleMouseLeave)
        }
      }

      const cleanHover1 = setupHoverPause(col1, tween1)
      const cleanHover2 = setupHoverPause(col2, tween2)

      return () => {
        if (tween1) tween1.kill()
        if (tween2) tween2.kill()
        cleanHover1()
        cleanHover2()
      }
    }

    // ----------------------------------------------------
    // MOBILE: INFINITE HORIZONTAL MARQUEE
    // ----------------------------------------------------
    const row1 = row1Ref.current
    const row2 = row2Ref.current
    let mobileTween1, mobileTween2

    if (row1 && row2 && window.innerWidth <= 768) {
      gsap.set(row1, { xPercent: 0 })
      gsap.set(row2, { xPercent: -50 })

      mobileTween1 = gsap.to(row1, {
        xPercent: -50,
        duration: 16,
        ease: 'none',
        repeat: -1,
      })

      mobileTween2 = gsap.to(row2, {
        xPercent: 0,
        duration: 16,
        ease: 'none',
        repeat: -1,
      })

      // Hover/touch to slow down
      const handleTouchStart = () => {
        gsap.to([mobileTween1, mobileTween2], { timeScale: 0.15, duration: 0.5 })
      }
      const handleTouchEnd = () => {
        gsap.to([mobileTween1, mobileTween2], { timeScale: 1, duration: 0.5 })
      }

      row1.addEventListener('touchstart', handleTouchStart, { passive: true })
      row1.addEventListener('touchend', handleTouchEnd, { passive: true })
      row2.addEventListener('touchstart', handleTouchStart, { passive: true })
      row2.addEventListener('touchend', handleTouchEnd, { passive: true })

      return () => {
        if (mobileTween1) mobileTween1.kill()
        if (mobileTween2) mobileTween2.kill()
        row1.removeEventListener('touchstart', handleTouchStart)
        row1.removeEventListener('touchend', handleTouchEnd)
        row2.removeEventListener('touchstart', handleTouchStart)
        row2.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [])

  return (
    <section
      ref={containerRef}
      id="ulasan"
      className="py-24 bg-brand-slate text-white relative overflow-hidden"
    >
      {/* Dynamic ambient lights */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-brand-lime/5 blur-[120px] rounded-full pointer-events-none glow-ambient"></div>
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-brand-blue/5 blur-[120px] rounded-full pointer-events-none glow-ambient"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20 grid grid-cols-1 md:grid-cols-3 gap-16">
        
        {/* Left Side Content Column */}
        <div className="space-y-8 select-text flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-brand-lime text-xs font-bold uppercase tracking-wider mb-2 w-fit">
            💬 Student Reviews
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            What They <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-lime to-white">
              Are Saying
            </span>
          </h2>
          
          <p className="text-gray-400 text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-xl">
            Over 10,000 students nationwide have revolutionized how they manage their allowances with BudJet. Explore their success stories!
          </p>

          {/* Social Proof Stats Badge */}
          <div className="pt-6 border-t border-white/10 flex items-center gap-4">
            <div className="flex -space-x-2.5">
              {[1, 2, 3, 4].map((num) => (
                <img
                  key={num}
                  src={`https://i.pravatar.cc/80?img=${num + 10}`}
                  alt="Active Student user profile"
                  className="w-9 h-9 rounded-full border-2 border-brand-slate object-cover"
                />
              ))}
            </div>
            <div className="text-sm">
              <div className="font-extrabold text-white flex items-center gap-1">
                ⭐⭐⭐⭐⭐ <span className="font-bold text-xs ml-1 bg-brand-lime text-brand-slate px-2 py-0.5 rounded-md">4.9/5</span>
              </div>
              <p className="text-gray-400 text-xs font-medium mt-0.5">Average 4.9/5 rating on Google Play Store</p>
            </div>
          </div>
        </div>

        {/* Testimonials Columns (2/3 Width) */}
        <div className="md:col-span-2 relative h-[520px] overflow-hidden hidden md:grid grid-cols-2 gap-6 pr-4">
          
          {/* Subtle fading mask top and bottom */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-brand-slate to-transparent z-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-brand-slate to-transparent z-10 pointer-events-none"></div>

          {/* Column 1 Scroll Down */}
          <div className="relative h-full overflow-hidden">
            <div ref={col1Ref} className="space-y-6">
              {[...TESTIMONIALS_COL_1, ...TESTIMONIALS_COL_1].map((item, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 hover:border-brand-lime/40 p-6 rounded-2xl transition-all duration-300 shadow-md group relative"
                >
                  <Quote className="absolute top-4 right-4 w-10 h-10 text-white/5 group-hover:text-brand-lime/10 transition-colors" />
                  <div className="flex text-brand-lime mb-4">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
                    "{item.quote}"
                  </p>
                  <div>
                    <h4 className="text-sm font-bold text-white">{item.name}</h4>
                    <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">{item.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2 Scroll Up */}
          <div className="relative h-full overflow-hidden">
            <div ref={col2Ref} className="space-y-6">
              {[...TESTIMONIALS_COL_2, ...TESTIMONIALS_COL_2].map((item, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 hover:border-brand-blue/40 p-6 rounded-2xl transition-all duration-300 shadow-md group relative"
                >
                  <Quote className="absolute top-4 right-4 w-10 h-10 text-white/5 group-hover:text-brand-blue/10 transition-colors" />
                  <div className="flex text-brand-blue mb-4">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
                    "{item.quote}"
                  </p>
                  <div>
                    <h4 className="text-sm font-bold text-white">{item.name}</h4>
                    <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">{item.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* MOBILE LAYOUT: HORIZONTAL SCROLL MARQUEES */}
        <div className="md:hidden space-y-6 col-span-1 overflow-hidden relative">
          
          {/* Row 1 scrolls left */}
          <div className="relative overflow-hidden w-full">
            <div ref={row1Ref} className="flex space-x-4 w-max">
              {[...TESTIMONIALS_COL_1, ...TESTIMONIALS_COL_1].map((item, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 p-5 rounded-2xl w-[260px] flex-shrink-0"
                >
                  <div className="flex text-brand-lime mb-3">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 text-xs leading-relaxed mb-4 italic">
                    "{item.quote}"
                  </p>
                  <div>
                    <h4 className="text-xs font-bold text-white">{item.name}</h4>
                    <p className="text-[9px] text-gray-500 uppercase tracking-wider">{item.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 scrolls right */}
          <div className="relative overflow-hidden w-full">
            <div ref={row2Ref} className="flex space-x-4 w-max">
              {[...TESTIMONIALS_COL_2, ...TESTIMONIALS_COL_2].map((item, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 p-5 rounded-2xl w-[260px] flex-shrink-0"
                >
                  <div className="flex text-brand-blue mb-3">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 text-xs leading-relaxed mb-4 italic">
                    "{item.quote}"
                  </p>
                  <div>
                    <h4 className="text-xs font-bold text-white">{item.name}</h4>
                    <p className="text-[9px] text-gray-500 uppercase tracking-wider">{item.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
