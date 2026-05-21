import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'
import { NewsletterSignup } from './NewsletterSignup'

export function Footer() {
  const navigate = useNavigate()
  
  const handleConsultationClick = (type: string) => {
    navigate(`/contact?service=${encodeURIComponent(type)}&open=true`)
  }
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info & CTA Buttons */}
          <div className="lg:col-span-1">
            {/* CTA Buttons */}
            <div className="mb-6 space-y-3">
              <button 
                onClick={() => handleConsultationClick('Free Consultation')}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors block w-full text-center shadow-lg"
              >
                Schedule Free Consultation
              </button>
              <button 
                onClick={() => handleConsultationClick('340B Program Assessment')}
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors block w-full text-center"
              >
                Free 340B Assessment
              </button>
            </div>
            
            {/* Company Info */}
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/images/logo.png" 
                alt="Quantum 5D Consulting - Expert Pharmacy Consulting Services Logo" 
                className="h-8 w-auto"
              />
              <div>
                <h3 className="text-lg font-bold">Quantum 5D Consulting, LLC</h3>
                <p className="text-xs text-purple-300">Delivering quantum leap ROI</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              ⭐ Minority, Pharmacist & Woman-Owned Business providing expert pharmacy consulting services nationwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/apprenticeship" className="text-gray-300 hover:text-white transition-colors">Apprenticeship Program</Link></li>
              <li><Link to="/case-studies" className="text-gray-300 hover:text-white transition-colors">Case Studies</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/resources" className="text-gray-300 hover:text-white transition-colors">Resources</Link></li>
              <li><Link to="/contact?service=Free%20Consultation&open=true" className="text-gray-300 hover:text-white transition-colors">Schedule Consultation</Link></li>
              <li><Link to="/contact?service=340B%20Program%20Assessment&open=true" className="text-gray-300 hover:text-white transition-colors">Free 340B Assessment</Link></li>
            </ul>
          </div>

          {/* Our Services - Extended List */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>340B Program Optimization</li>
              <li>340B Compliance Auditing</li>
              <li>340B Strategic Planning</li>
              <li>Pharmacy Management</li>
              <li>Regulatory Compliance</li>
              <li>Workforce Development</li>
              <li>Specialty Pharmacy</li>
              <li>Operations Optimization</li>
              <li>Quality Assurance</li>
              <li>Training & Education</li>
            </ul>
          </div>

          {/* Stay Connected & Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Connected</h4>
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-purple-400" />
                <a href="tel:+14109213989" className="text-gray-300 hover:text-white transition-colors">
                  (410) 921-3989
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-purple-400" />
                <span className="text-gray-300">info@quantum5dconsulting.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-purple-400" />
                <span className="text-gray-300">Nationwide Services</span>
              </div>
            </div>
            
            {/* Newsletter Signup */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <h5 className="text-sm font-semibold mb-2">Newsletter</h5>
              <p className="text-xs text-gray-400 mb-3">Stay ahead of industry trends</p>
              <div className="space-y-2">
                <NewsletterSignup 
                  size="small"
                  placeholder="Email Address"
                  className="newsletter-footer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            © 2025 Quantum 5D Consulting. All rights reserved. | 
            <Link to="/privacy" className="hover:text-white transition-colors"> Privacy Policy</Link> | 
            <Link to="/terms" className="hover:text-white transition-colors"> Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}