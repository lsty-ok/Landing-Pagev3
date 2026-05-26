"use client";

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check, Sparkles, Zap, PieChart } from 'lucide-react'

// Mockup image imports & 3D Interactive Phone Showcase
import InteractivePhoneShowcase from './InteractivePhoneShowcase'
import dailySmartImg from '../assets/images/Mockup-fitur Daily Smart.png'
import asistenPintarImg from '../assets/images/Mockup-fitur Asisten Catatan Pintar.png'
import laporanBulananImg from '../assets/images/Mockup-fitur laporan Bulanan.png'

gsap.registerPlugin(ScrollTrigger)

export default function FeaturesSection() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simple, high-performance fade-up animations
      gsap.utils.toArray('.feature-row').forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const features = [
    {
      id: 1,
      tag: "REAL-TIME AUTOMATION",
      icon: <Sparkles className="w-5 h-5" />,
      title: "Daily Smart Budgeting",
      description: "Forget tedious manual logging. Let BudJet AI draft your dynamic daily budget limits automatically to keep your spending perfectly safe.",
      bullets: [
        "AI-powered smart categorization (Food, Housing, Books, Coffee).",
        "Instant warning notifications as you approach your daily cap.",
        "Adaptive calculations based on your unique spending habits."
      ],
      image: dailySmartImg,
      color: "#D4E866",
      colorClass: "text-brand-lime",
      bgClass: "bg-brand-lime/10",
      borderClass: "border-brand-lime/20",
      reverse: false,
    },
    {
      id: 2,
      tag: "VOICE INTELLIGENCE",
      icon: <Zap className="w-5 h-5" />,
      title: "Voice-Powered Assistant",
      description: "Just speak to your phone and let BudJet do the heavy lifting. Logging your expenses is now as easy as talking to a friend.",
      bullets: [
        "Natural language processing understands complex inputs.",
        "Hands-free expense tracking while on the go.",
        "Automatic currency and amount detection."
      ],
      image: asistenPintarImg,
      color: "#60A5FA",
      colorClass: "text-brand-blue",
      bgClass: "bg-brand-blue/10",
      borderClass: "border-brand-blue/20",
      reverse: true,
    },
    {
      id: 3,
      tag: "SMART ANALYTICS",
      icon: <PieChart className="w-5 h-5" />,
      title: "Monthly Precision Reports",
      description: "Get crystal clear visibility into where your money goes. Beautiful, exportable reports help you find ways to save more every month.",
      bullets: [
        "Visual charts and graphs for quick comprehension.",
        "Export to PDF or CSV for easy sharing.",
        "Personalized saving recommendations."
      ],
      image: laporanBulananImg,
      color: "#D4E866",
      colorClass: "text-brand-lime",
      bgClass: "bg-brand-lime/10",
      borderClass: "border-brand-lime/20",
      reverse: false,
    }
  ]

  return (
    <section 
      id="fitur" 
      ref={containerRef}
      className="py-24 sm:py-32 bg-slate-950 text-white relative overflow-hidden"
    >
      {/* Lightweight background gradients instead of heavy blurs */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-lime/5 to-transparent pointer-events-none opacity-50"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-24 md:mb-32">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-lime/10 border border-brand-lime/20 text-brand-lime text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-brand-lime" />
            Key Features
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6 font-jakarta">
            Manage Your Money Stress-Free
          </h2>
          <p className="text-slate-400 text-lg sm:text-xl font-light leading-relaxed">
            Specially tailored for dynamic student life. Enjoy automated entry, smart insights, and cutting-edge voice intelligence.
          </p>
        </div>

        {/* Features Zig-Zag Layout */}
        <div className="flex flex-col gap-24 md:gap-32">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className={`feature-row flex flex-col ${feature.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 lg:gap-20`}
            >
              
              {/* Text Content */}
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <div className={`inline-flex items-center space-x-2 mb-6 ${feature.colorClass}`}>
                  <div className={`w-10 h-10 ${feature.bgClass} rounded-xl flex items-center justify-center border ${feature.borderClass} shadow-sm`}>
                    {feature.icon}
                  </div>
                  <span className="text-xs font-extrabold tracking-widest uppercase">
                    {feature.tag}
                  </span>
                </div>
                
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 leading-tight font-jakarta">
                  {feature.title}
                </h3>
                
                <p className="text-slate-400 text-base sm:text-lg leading-relaxed font-light mb-8">
                  {feature.description}
                </p>

                <ul className="space-y-4 mb-8">
                  {feature.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start">
                      <div className={`w-6 h-6 rounded-full ${feature.bgClass} ${feature.colorClass} flex items-center justify-center shrink-0 mr-4 mt-0.5 border ${feature.borderClass}`}>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="text-slate-300 text-sm sm:text-base font-medium">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Showcase Image/Phone */}
              <div className="w-full md:w-1/2 flex justify-center relative">
                {/* Clean geometric backdrop instead of heavy blurs */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl transform -rotate-3 scale-105 border border-white/5"></div>
                
                <div className="relative w-full max-w-[350px] aspect-[4/5] rounded-3xl border border-white/10 bg-slate-900/40 p-6 flex items-center justify-center shadow-2xl z-10">
                  <InteractivePhoneShowcase
                    variant="single"
                    texturePath={feature.image}
                    themeColor={feature.color}
                  />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
