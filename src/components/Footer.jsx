import { ArrowUp, Mail, X, Shield, FileText } from 'lucide-react'
import { useState } from 'react'

export default function Footer() {
  const [legalModal, setLegalModal] = useState(null) // 'privacy' | 'terms' | null

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const gmailLink = "https://mail.google.com/mail/?view=cm&fs=1&to=pdbl2026a2@gmail.com"

  return (
    <>
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
                <a 
                  href="https://github.com/LaluFarki/BudJet_APP.git" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-9 h-9 bg-white/5 hover:bg-brand-lime hover:text-brand-slate rounded-full flex items-center justify-center transition-all duration-300 border border-white/10 shadow-sm" 
                  title="View Source on GitHub"
                  aria-label="GitHub"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                </a>
                <a 
                  href={gmailLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-9 h-9 bg-white/5 hover:bg-brand-lime hover:text-brand-slate rounded-full flex items-center justify-center transition-all duration-300 border border-white/10 shadow-sm" 
                  title="Contact via Gmail"
                  aria-label="Email"
                >
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
                  <a href="#simulator" className="hover:text-brand-lime transition-colors">Budget Simulator</a>
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
                  <button 
                    onClick={() => setLegalModal('privacy')} 
                    className="hover:text-brand-blue transition-colors text-left cursor-pointer"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setLegalModal('terms')} 
                    className="hover:text-brand-blue transition-colors text-left cursor-pointer"
                  >
                    Terms &amp; Conditions
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-300">Contact</h4>
              <ul className="space-y-2.5 text-sm text-gray-400 font-light">
                <li className="flex items-center">
                  <span className="text-brand-lime mr-2 font-bold">•</span>
                  <a href={gmailLink} target="_blank" rel="noopener noreferrer" className="hover:text-brand-lime transition-colors">pdbl2026a2@gmail.com</a>
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
              className="group inline-flex items-center justify-center px-4 py-2 border border-white/10 rounded-full text-xs font-bold text-gray-300 hover:text-brand-lime hover:border-brand-lime transition-all duration-300 bg-white/5 hover:bg-white/10 shadow-inner cursor-pointer"
            >
              Back to Top
              <ArrowUp className="ml-1.5 w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

        </div>
      </footer>

      {/* Interactive Legal Modal */}
      {legalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-slate/80 backdrop-blur-md animate-fade-in">
          <div className="bg-brand-slate border border-white/10 rounded-2xl max-w-2xl w-full max-h-[80vh] flex flex-col shadow-2xl overflow-hidden text-white relative">
            
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-white/10 flex justify-between items-center bg-white/5">
              <div className="flex items-center space-x-3">
                {legalModal === 'privacy' ? (
                  <Shield className="w-6 h-6 text-brand-lime" />
                ) : (
                  <FileText className="w-6 h-6 text-brand-blue" />
                )}
                <h3 className="text-xl font-bold tracking-tight">
                  {legalModal === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
                </h3>
              </div>
              <button 
                onClick={() => setLegalModal(null)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm text-gray-300 font-light leading-relaxed">
              {legalModal === 'privacy' ? (
                <>
                  <p className="text-gray-400 italic">Effective Date: May 2026</p>
                  <div>
                    <h4 className="font-bold text-white mb-2 text-base flex items-center">
                      <span className="text-brand-lime mr-2">1.</span> Information Collection
                    </h4>
                    <p>
                      BudJet collects financial transaction inputs, custom budget goals, and optional voice input data strictly to provide AI-driven expense categorization and personal financial summaries.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-2 text-base flex items-center">
                      <span className="text-brand-lime mr-2">2.</span> Voice &amp; AI Processing
                    </h4>
                    <p>
                      Voice recordings and text commands are processed in real-time to extract monetary values and expense categories. We do not store raw audio files or use personal financial entries to train public generative AI models.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-2 text-base flex items-center">
                      <span className="text-brand-lime mr-2">3.</span> Data Protection &amp; Security
                    </h4>
                    <p>
                      All sensitive student budget details and account credentials are encrypted in transit and at rest. We utilize robust industry standards to ensure your financial privacy remains secure.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-2 text-base flex items-center">
                      <span className="text-brand-lime mr-2">4.</span> Third-Party Disclosure
                    </h4>
                    <p>
                      We strictly do not sell, rent, or trade user personal data to third parties, advertisers, or credit scoring agencies.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-gray-400 italic">Last Updated: May 2026</p>
                  <div>
                    <h4 className="font-bold text-white mb-2 text-base flex items-center">
                      <span className="text-brand-blue mr-2">1.</span> Acceptance of Terms
                    </h4>
                    <p>
                      By accessing and using the BudJet financial application, you agree to comply with these Terms &amp; Conditions. BudJet is designed as a personal financial assistance tool for students and individuals.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-2 text-base flex items-center">
                      <span className="text-brand-blue mr-2">2.</span> Accuracy of AI Assistant
                    </h4>
                    <p>
                      While our AI features strive for high accuracy in automated expense tracking, users are encouraged to verify recognized totals and categorized items. BudJet is not liable for incidental discrepancies in personal recording.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-2 text-base flex items-center">
                      <span className="text-brand-blue mr-2">3.</span> User Responsibilities
                    </h4>
                    <p>
                      You are responsible for safeguarding your login credentials and maintaining the confidentiality of your account session. Any unauthorized use should be reported to our support team immediately.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-2 text-base flex items-center">
                      <span className="text-brand-blue mr-2">4.</span> Service Modifications
                    </h4>
                    <p>
                      We continuously enhance BudJet with new features, AI integrations, and UI refinements. We reserve the right to modify or discontinue experimental features with prior notice.
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-white/10 bg-white/5 flex justify-end">
              <button 
                onClick={() => setLegalModal(null)}
                className="px-5 py-2 rounded-xl bg-brand-lime text-brand-slate font-bold text-sm hover:bg-brand-lime/90 transition-all cursor-pointer shadow-md hover:shadow-brand-lime/20"
              >
                I Understand
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  )
}

