import { useState, useRef } from 'react'
import { gsap } from 'gsap'
import { ChevronDown, HelpCircle } from 'lucide-react'

const FAQ_ITEMS = [
  {
    question: "Is BudJet completely free for students?",
    answer: "Yes, 100% free! All core features of BudJet—including automated daily budgeting, smart voice logging, and monthly reports exports—are fully accessible for free with absolutely no hidden fees or intrusive advertisements.",
  },
  {
    question: "How does the Instant Voice Logging feature work?",
    answer: "It's extremely simple! Just tap the microphone button in the app and speak your transactions naturally, like, 'Bought an avocado juice for fifteen thousand'. Our finance AI instantly recognizes the amount and categorizes it under Food & Drinks in the blink of an eye.",
  },
]

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState(null)
  const contentRefs = useRef([])

  const toggleAccordion = (index) => {
    const isOpening = activeIndex !== index
    const prevIndex = activeIndex

    // Set new active state
    setActiveIndex(isOpening ? index : null)

    // Animate opening section
    if (isOpening && contentRefs.current[index]) {
      gsap.fromTo(
        contentRefs.current[index],
        { height: 0, opacity: 0 },
        {
          height: 'auto',
          opacity: 1,
          duration: 0.45,
          ease: 'power2.out',
          overwrite: 'auto',
        }
      )
    }

    // Animate closing previous section
    if (prevIndex !== null && contentRefs.current[prevIndex]) {
      gsap.to(contentRefs.current[prevIndex], {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: 'power2.inOut',
        overwrite: 'auto',
      })
    }
  }

  return (
    <section id="faq" className="py-24 bg-brand-bg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-brand-lime/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-20 select-text">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-slate/5 border border-brand-slate/10 text-brand-slate text-xs font-bold uppercase tracking-wider mb-6">
            <HelpCircle className="w-4 h-4 mr-1.5 text-brand-slate" /> Common Questions
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-slate tracking-tight mb-6">
            Have Questions?
          </h2>
          <p className="text-brand-text-muted text-base sm:text-lg font-light">
            Find quick answers to help you start managing your daily allowance smarter and with total control.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = activeIndex === index
            return (
              <div
                key={index}
                className={`border border-brand-border/80 rounded-2xl transition-all duration-300 ${
                  isOpen
                    ? 'bg-white shadow-lg shadow-brand-slate/5 border-brand-slate/20'
                    : 'bg-white/65 hover:bg-white'
                }`}
              >
                {/* Question Trigger Header */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex justify-between items-center px-6 py-5 sm:px-8 text-left focus:outline-none group"
                >
                  <span className="font-bold text-base sm:text-lg text-brand-slate group-hover:text-brand-lime-dark transition-colors pr-4">
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full border border-brand-border/80 flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? 'bg-brand-slate text-brand-lime border-brand-slate rotate-180'
                        : 'bg-white text-brand-slate group-hover:border-brand-slate/30'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Answer Content Wrapper (animated by GSAP) */}
                <div
                  ref={(el) => (contentRefs.current[index] = el)}
                  className="overflow-hidden"
                  style={{ height: 0, opacity: 0 }}
                >
                  <div className="px-6 pb-6 pt-1 sm:px-8 sm:pb-6 text-brand-text-muted text-sm sm:text-base font-light leading-relaxed border-t border-brand-border/40 mt-1">
                    {item.answer}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
