import { ArrowUp, Mail } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="reveal-footer bg-brand-slate text-white w-full sticky bottom-0 z-5 select-text overflow-hidden border-t border-white/5">
      {/* Decorative top pattern */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-lime/30 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-12 relative z-10">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="md:col-span-1.5 space-y-6">
            <a href="#" className="flex items-center space-x-2.5 group w-fit">
              <img src="/logo.svg" alt="BudJet Logo" className="w-9 h-9 rounded-xl object-cover group-hover:scale-105 transition-transform duration-300" />
              <span className="font-extrabold text-2xl tracking-tight text-white group-hover:opacity-90 transition-opacity duration-300">
                Bud<span className="text-brand-lime">J</span>et.
              </span>
            </a>
            <p className="text-gray-400 text-sm font-light leading-relaxed max-w-sm">
              Helping students manage daily finances smartly, quickly, and automatically using AI assistance &amp; voice input technologies.
            </p>
            {/* Social media badges */}
            <div className="flex space-x-4 pt-2">
              <a href="#github" className="w-9 h-9 bg-white/5 hover:bg-brand-lime hover:text-brand-slate rounded-full flex items-center justify-center transition-all duration-300 border border-white/10" aria-label="GitHub">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </a>
              <a href="mailto:pdbl2026a2@gmail.com" className="w-9 h-9 bg-white/5 hover:bg-brand-lime hover:text-brand-slate rounded-full flex items-center justify-center transition-all duration-300 border border-white/10" aria-label="Email">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 1: Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-brand-lime">Navigation</h4>
            <ul className="space-y-2.5 text-sm text-gray-400 font-light">
              <li>
                <a href="#home" className="hover:text-brand-lime transition-colors">Home</a>
              </li>
              <li>
                <a href="#fitur" className="hover:text-brand-lime transition-colors">Key Features</a>
              </li>
              <li>
                <a href="#ulasan" className="hover:text-brand-lime transition-colors">Student Reviews</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-brand-lime transition-colors">FAQ</a>
              </li>
            </ul>
          </div>

          {/* Column 2: Legal */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-brand-blue">Legal</h4>
            <ul className="space-y-2.5 text-sm text-gray-400 font-light">
              <li>
                <a href="#privacy" className="hover:text-brand-blue transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#terms" className="hover:text-brand-blue transition-colors">Terms &amp; Conditions</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-300">Contact</h4>
            <ul className="space-y-2.5 text-sm text-gray-400 font-light">
              <li className="flex items-center">
                <span className="text-brand-lime mr-2 font-bold">•</span>
                <a href="mailto:pdbl2026a2@gmail.com" className="hover:text-brand-lime transition-colors">pdbl2026a2@gmail.com</a>
              </li>
              <li className="flex items-center">
                <span className="text-brand-blue mr-2 font-bold">•</span>
                <span>Surabaya, Indonesia</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider line */}
        <div className="h-px bg-white/5 mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 font-light">
            &copy; {new Date().getFullYear()} BudJet Finance. All Rights Reserved.
          </p>

          {/* Scroll to Top Trigger */}
          <button
            onClick={scrollToTop}
            className="group inline-flex items-center justify-center px-4 py-2 border border-white/10 rounded-full text-xs font-bold text-gray-300 hover:text-brand-lime hover:border-brand-lime transition-all duration-300 bg-white/5 hover:bg-white/10 shadow-inner"
          >
            Back to Top
            <ArrowUp className="ml-1.5 w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  )
}
