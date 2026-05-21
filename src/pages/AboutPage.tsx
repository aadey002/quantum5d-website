import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Award, Users, Target, CheckCircle, Phone, Mail, TrendingUp, DollarSign } from 'lucide-react'
import { SEO } from '../components/SEO'

export function AboutPage() {
  // Structured data for Dr. Oriaifo and the organization
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://quantum5dconsulting.com/about#dr-oriaifo",
        "name": "Dr. Adetoro Oriaifo",
        "jobTitle": "Founder & Principal Consultant",
        "worksFor": {
          "@type": "Organization",
          "name": "Quantum 5D Consulting"
        },
        "hasCredential": [
          "Doctor of Pharmacy (PharmD)",
          "340B Program Optimization Specialist",
          "Minority & Woman-Owned Business Certified"
        ],
        "description": "Over 15 years of pharmacy experience with specialized expertise in 340B program optimization",
        "image": "https://quantum5dconsulting.com/images/team/dr-oriaifo-professional.jpg",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+1-410-921-3989",
          "email": "info@quantum5dconsulting.com",
          "contactType": "Professional"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://quantum5dconsulting.com/about#organization",
        "name": "Quantum 5D Consulting",
        "founder": {
          "@id": "https://quantum5dconsulting.com/about#dr-oriaifo"
        },
        "description": "Leading pharmacy consulting firm specializing in 340B program optimization, regulatory compliance, and operational excellence",
        "serviceType": "Pharmacy Consulting"
      }
    ]
  }
  return (
    <div className="min-h-screen">
      <SEO 
        title="About Dr. Adetoro Oriaifo - Quantum 5D Consulting Founder"
        description="Meet Dr. Adetoro Oriaifo, PharmD, founder of Quantum 5D Consulting. Expert in 340B program optimization with 15+ years pharmacy management experience."
        path="/about"
        image="/images/team/dr-oriaifo-professional.jpg"
        structuredData={structuredData}
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About Quantum 5D Consulting - 340B Experts
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-4xl mx-auto">
              Leading pharmacy consulting firm specializing in 340B program optimization, regulatory compliance, and operational excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Founder - Dr. Adetoro Oriaifo, PharmD
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Leading pharmacy consulting with over 15 years of expertise and proven results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <img 
                src="/images/team/dr-oriaifo-professional.jpg" 
                alt="Dr. Adetoro Oriaifo, PharmD - Founder and Principal Consultant at Quantum 5D Consulting with 15+ years pharmacy experience" 
                className="w-64 h-64 rounded-full mx-auto lg:mx-0 mb-6 object-cover shadow-lg"
              />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Dr. Adetoro Oriaifo, PharmD</h3>
              <p className="text-lg text-purple-600 font-semibold mb-4">Founder & Principal Consultant</p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-center lg:justify-start space-x-2">
                  <Phone className="h-5 w-5 text-purple-600" />
                  <span className="text-gray-700 font-medium">(410) 921-3989</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-2">
                  <Mail className="h-5 w-5 text-purple-600" />
                  <span className="text-gray-700">info@quantum5dconsulting.com</span>
                </div>
              </div>
            </div>
            
            <div>
              <p className="text-lg text-gray-600 mb-6">
                Founded Quantum 5D Consulting, emerging from a vision to help healthcare organizations maximize their pharmacy potential while ensuring compliance with complex regulatory requirements. With over 15 years of pharmacy experience and specialized expertise in 340B program optimization, Dr. Oriaifo recognized significant opportunities many organizations were missing.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Dr. Adetoro Oriaifo brings over 15 years of comprehensive pharmacy experience to Quantum 5D Consulting. As a Doctor of Pharmacy (PharmD) with specialized expertise in 340B program optimization, she has dedicated her career to helping healthcare organizations maximize their pharmacy potential.
              </p>
              <p className="text-lg text-gray-600">
                Her unique perspective as a minority, pharmacist, and woman-owned business leader allows her to understand the diverse challenges facing today's healthcare organizations and provide tailored solutions that deliver measurable results.
              </p>
              
              <div className="mt-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Qualifications & Certifications</h4>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-purple-600" />
                    <span>Doctor of Pharmacy (PharmD)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-purple-600" />
                    <span>15+ Years Pharmacy Experience</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-purple-600" />
                    <span>340B Program Optimization Specialist</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-purple-600" />
                    <span>Minority & Woman-Owned Business Certified</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Statistics */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Proven 340B Consulting Track Record
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our results speak for themselves - delivering measurable value across healthcare organizations nationwide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">$6M+</h3>
              <p className="text-gray-600">340B Savings Generated</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">$1.3M+</h3>
              <p className="text-gray-600">Additional Revenue Created</p>
            </div>
            

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">98%</h3>
              <p className="text-gray-600">Client Satisfaction Rate</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">15+</h3>
              <p className="text-gray-600">Years Expertise</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Expert 340B & Pharmacy Consulting Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From 340B optimization to regulatory compliance, we provide end-to-end solutions for your pharmacy operations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">340B Program Optimization</h3>
              <p className="text-gray-600 text-sm">Maximize savings and ensure compliance</p>
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Pharmacy Operations Management</h3>
              <p className="text-gray-600 text-sm">Streamline workflows and improve efficiency</p>
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Regulatory Compliance Consulting</h3>
              <p className="text-gray-600 text-sm">Navigate complex regulatory requirements</p>
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Specialty Pharmacy Accreditation</h3>
              <p className="text-gray-600 text-sm">Achieve and maintain accreditation standards</p>
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Performance Analytics & Reporting</h3>
              <p className="text-gray-600 text-sm">Data-driven insights for better decisions</p>
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Staff Training & Development</h3>
              <p className="text-gray-600 text-sm">Build competent, confident teams</p>
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Policy Development & Implementation</h3>
              <p className="text-gray-600 text-sm">Create robust operational frameworks</p>
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Audit Preparation & Support</h3>
              <p className="text-gray-600 text-sm">Ensure readiness for regulatory audits</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide our work and define our commitment to excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Excellence</h3>
              <p className="text-gray-600">Commitment to delivering exceptional results and exceeding client expectations through continuous improvement and innovation.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Integrity</h3>
              <p className="text-gray-600">Honest, transparent, and ethical practices in all our client relationships, building trust through consistent action.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Innovation</h3>
              <p className="text-gray-600">Continuously evolving our methodologies to address emerging industry challenges and deliver cutting-edge solutions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Pharmacy Operations?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
            Let's discuss how our expertise can help your organization achieve its goals and maximize its potential.
          </p>
          <div className="space-x-4">
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 bg-white text-purple-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <span>Schedule Consultation</span>
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center space-x-2 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-900 transition-colors"
            >
              <span>View Our Services</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}