import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, BookOpen, Clock, Award, Users } from 'lucide-react'
import { SEO } from '../components/SEO'

export function ApprenticeshipPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    pharmacyName: '',
    contactName: '',
    email: '',
    phone: '',
    pharmacyType: '',
    apprenticesNeeded: '',
    operationsGoals: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic would go here
    console.log('Partnership application submitted:', formData)
    alert('Thank you! Your partnership application has been submitted. We will contact you soon.')
  }

  return (
    <div className="min-h-screen">
      <SEO 
        title="MATC-Approved Pharmacy Technician Training - Quantum 5D"
        description="Join our Maryland Apprenticeship and Training Council approved pharmacy technician program. Earn while you learn with structured career path and PTCB certification support."
        path="/apprenticeship"
        image="/images/services/workforce-development.jpg"
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-purple-200 text-sm uppercase tracking-wide mb-4">MATC-Approved Program</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Pharmacy Technician Apprenticeship Program
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-4xl mx-auto">
              Build tomorrow's healthcare workforce today through our Maryland Apprenticeship and Training Council (MATC) approved program connecting skilled technicians with forward-thinking pharmacy employers.
            </p>
            <div className="space-x-4">
              <a
                href="#partner-signup"
                className="inline-flex items-center space-x-2 bg-white text-purple-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                <span>Become a Partner Pharmacy</span>
                <ArrowRight size={20} />
              </a>
              <a
                href="#program-details"
                className="inline-flex items-center space-x-2 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-900 transition-colors"
              >
                <span>Learn About the Program</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* State-Approved Excellence */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              State-Approved Excellence
            </h2>
            <div className="w-20 h-1 bg-purple-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Our Pharmacy Technician Apprenticeship Program is officially approved by the{' '}
              <strong>Maryland Apprenticeship and Training Council (MATC)</strong>, ensuring the highest standards of training quality, compliance with federal apprenticeship standards, and nationally recognized credentials.
            </p>
          </div>
        </div>
      </section>

      {/* Program Benefits */}
      <section id="program-details" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Program Benefits
            </h2>
            <div className="w-20 h-1 bg-purple-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our apprenticeship program creates value for all stakeholders through structured training, proven outcomes, and sustainable workforce development.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* For Pharmacy Technicians */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">For Pharmacy Technicians</h3>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-lg font-semibold text-purple-900 mb-2">Structured Career Path</h4>
                  <p className="text-gray-600">Clear progression from apprentice to certified pharmacy technician with defined milestones</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-lg font-semibold text-purple-900 mb-2">Earn While You Learn</h4>
                  <p className="text-gray-600">Progressive wage increases throughout the program, avoiding student loan debt</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-lg font-semibold text-purple-900 mb-2">PTCB Certification Support</h4>
                  <p className="text-gray-600">Comprehensive preparation for Pharmacy Technician Certification Board examination</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-lg font-semibold text-purple-900 mb-2">Professional Mentorship</h4>
                  <p className="text-gray-600">Direct guidance from experienced pharmacists and senior technicians</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-lg font-semibold text-purple-900 mb-2">Healthcare Benefits</h4>
                  <p className="text-gray-600">Many partner sites offer comprehensive benefits packages</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-lg font-semibold text-purple-900 mb-2">Job Security</h4>
                  <p className="text-gray-600">High demand for certified pharmacy technicians across healthcare settings</p>
                </div>
              </div>
            </div>

            {/* For Pharmacy Employers */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">For Pharmacy Employers</h3>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-lg font-semibold text-purple-900 mb-2">Skilled Workforce</h4>
                  <p className="text-gray-600">Access to well-trained, competent pharmacy technicians ready to contribute</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-lg font-semibold text-purple-900 mb-2">Reduced Turnover</h4>
                  <p className="text-gray-600">85% retention rate compared to traditional hiring approaches</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-lg font-semibold text-purple-900 mb-2">Cost-Effective Training</h4>
                  <p className="text-gray-600">Structured program reduces internal training costs and time investment</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-lg font-semibold text-purple-900 mb-2">Customized Training</h4>
                  <p className="text-gray-600">Program tailored to your specific pharmacy operations and procedures</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-lg font-semibold text-purple-900 mb-2">Tax Incentives</h4>
                  <p className="text-gray-600">Potential federal and state tax benefits for apprenticeship participation</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-lg font-semibold text-purple-900 mb-2">Future Leadership</h4>
                  <p className="text-gray-600">Develop internal candidates for supervisory and management roles</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Features & Structure */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Program Features & Structure
            </h2>
            <div className="w-20 h-1 bg-purple-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive curriculum designed to meet industry standards and employer needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center bg-white p-8 rounded-lg shadow-md">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Comprehensive Curriculum</h3>
              <p className="text-gray-600">Pharmacy law, drug classifications, dosage calculations, inventory management, 340B compliance</p>
            </div>
            
            <div className="text-center bg-white p-8 rounded-lg shadow-md">
              <div className="text-5xl mb-4">🕐</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Flexible Schedule</h3>
              <p className="text-gray-600">Part-time and full-time options to accommodate different pharmacy settings and student needs</p>
            </div>
            
            <div className="text-center bg-white p-8 rounded-lg shadow-md">
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">MATC Certification</h3>
              <p className="text-gray-600">State certification leading to national recognition and enhanced career opportunities</p>
            </div>
            
            <div className="text-center bg-white p-8 rounded-lg shadow-md">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Ongoing Support</h3>
              <p className="text-gray-600">Continuous mentorship, career guidance, and professional development opportunities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Become a Partner Pharmacy */}
      <section id="partner-signup" className="py-20 bg-purple-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Become a Partner Pharmacy
            </h2>
            <div className="w-20 h-1 bg-white mx-auto mb-6"></div>
            <p className="text-lg text-purple-100 max-w-3xl mx-auto">
              Join our network of forward-thinking pharmacy employers committed to developing the next generation of skilled pharmacy technicians.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white text-gray-900 p-8 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="pharmacyName" className="block text-sm font-medium text-gray-700 mb-2">
                  Pharmacy Name *
                </label>
                <input
                  type="text"
                  id="pharmacyName"
                  name="pharmacyName"
                  required
                  value={formData.pharmacyName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Contact Name *
                </label>
                <input
                  type="text"
                  id="contactName"
                  name="contactName"
                  required
                  value={formData.contactName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="pharmacyType" className="block text-sm font-medium text-gray-700 mb-2">
                  Pharmacy Type *
                </label>
                <select
                  id="pharmacyType"
                  name="pharmacyType"
                  required
                  value={formData.pharmacyType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                >
                  <option value="">Select pharmacy type</option>
                  <option value="Community Pharmacy">Community Pharmacy</option>
                  <option value="Hospital Pharmacy">Hospital Pharmacy</option>
                  <option value="FQHC Pharmacy">FQHC Pharmacy</option>
                  <option value="Chain Pharmacy">Chain Pharmacy</option>
                  <option value="Specialty Pharmacy">Specialty Pharmacy</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="apprenticesNeeded" className="block text-sm font-medium text-gray-700 mb-2">
                  Apprentices Needed Annually *
                </label>
                <select
                  id="apprenticesNeeded"
                  name="apprenticesNeeded"
                  required
                  value={formData.apprenticesNeeded}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                >
                  <option value="">Select number</option>
                  <option value="1-2 apprentices">1-2 apprentices</option>
                  <option value="3-5 apprentices">3-5 apprentices</option>
                  <option value="6-10 apprentices">6-10 apprentices</option>
                  <option value="More than 10 apprentices">More than 10 apprentices</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="operationsGoals" className="block text-sm font-medium text-gray-700 mb-2">
                Pharmacy Operations & Training Goals *
              </label>
              <textarea
                id="operationsGoals"
                name="operationsGoals"
                required
                rows={4}
                value={formData.operationsGoals}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Describe your pharmacy's operations, training needs, and goals for the apprenticeship program..."
              />
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Submit Partnership Application
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Learn More About Our Apprenticeship Program?
          </h2>
          <div className="w-20 h-1 bg-purple-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Contact Dr. Adetoro Oriaifo to discuss how our MATC-approved program can benefit your pharmacy and help build tomorrow's healthcare workforce.
          </p>
          <div className="space-x-4">
            <Link
              to="/contact?service=Apprenticeship%20Consultation&open=true"
              className="inline-flex items-center space-x-2 bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              <span>Schedule Consultation</span>
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/contact?service=General%20Inquiry&open=true"
              className="inline-flex items-center space-x-2 border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-purple-600 hover:text-white transition-colors"
            >
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
