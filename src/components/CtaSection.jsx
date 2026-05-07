import { ArrowRight, Download, Laptop, Smartphone, Rocket } from 'lucide-react'

export default function CtaSection() {
  return (
    <section id="cta" className="py-28 bg-brand-slate text-white relative overflow-hidden select-text">
      {/* Dynamic ambient lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-lime/5 blur-[150px] rounded-full pointer-events-none glow-ambient"></div>
      
      {/* Decorative vector grid lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cta-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-grid)" className="text-brand-lime" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-20 text-center">
        
        {/* Floating miniature decorative panels for spatial depth */}
        <div className="absolute -top-10 left-10 w-24 h-24 bg-white/5 rounded-3xl border border-white/10 hidden lg:flex flex-col p-4 justify-between backdrop-blur-md rotate-12 glow-ambient">
          <Smartphone className="w-6 h-6 text-brand-lime" />
          <div className="w-12 h-1.5 bg-white/20 rounded"></div>
        </div>
        <div className="absolute -bottom-10 right-10 w-28 h-28 bg-white/5 rounded-3xl border border-white/10 hidden lg:flex flex-col p-4 justify-between backdrop-blur-md -rotate-12 glow-ambient-delayed">
          <Laptop className="w-8 h-8 text-brand-blue" />
          <div className="w-16 h-2 bg-white/20 rounded"></div>
        </div>

        {/* Text Content */}
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-lime/10 border border-brand-lime-dark/30 text-brand-lime text-xs font-bold uppercase tracking-wider mb-2">
            <Rocket className="w-3.5 h-3.5 text-brand-lime animate-bounce" style={{ animationDuration: '3s' }} />
            COMING SOON TO YOUR SMARTPHONE
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight font-jakarta">
            Ready to Transform How <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-lime via-white to-brand-blue">
              You Manage Your Allowance?
            </span>
          </h2>
          
          <p className="text-gray-300 text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-2xl mx-auto">
            Join thousands of students who have upgraded to a smarter, faster, and stress-free financial life with BudJet.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <button className="group bg-brand-lime text-brand-slate hover:bg-brand-lime-dark text-base sm:text-lg font-extrabold px-10 py-4.5 rounded-full shadow-2xl hover:shadow-brand-lime/20 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 w-full sm:w-auto flex items-center justify-center">
              Start Now - It's Free
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button className="inline-flex items-center justify-center px-10 py-4.5 bg-white/5 text-white hover:bg-white/10 border border-white/10 rounded-full font-bold text-base sm:text-lg tracking-tight transition-all duration-300 w-full sm:w-auto">
              Download Beta (TestFlight)
              <Download className="ml-2 w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-gray-500 font-medium">
            Available for Android &amp; iOS. No credit card required, 100% secure for students.
          </p>
        </div>

      </div>
    </section>
  )
}
