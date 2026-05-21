import React, { useState, useEffect } from 'react'
import { ArrowRight, Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle, X } from 'lucide-react'
import { ContactForm } from '../components/ContactForm'
import { useLocation } from 'react-router-dom'
import { SEO } from '../components/SEO'

export function ContactPage() {
  // Structured data for contact information
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "Quantum 5D Consulting",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+1-410-921-3989",
          "contactType": "Customer Service",
          "email": "info@quantum5dconsulting.com",
          "areaServed": "US",
          "availableLanguage": "English",
          "hoursAvailable": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "08:00",
            "closes": "18:00"
          }
        }
      ]
    }
  }
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedConsultation, setSelectedConsultation] = useState('')
  const location = useLocation()
  
  useEffect(() => {
    // Check for URL parameters
    const searchParams = new URLSearchParams(location.search)
    const serviceParam = searchParams.get('service')
    const typeParam = searchParams.get('type')
    const shouldOpen = searchParams.get('open') === 'true'
    
    if (serviceParam && shouldOpen) {
      setSelectedConsultation(serviceParam)
      setIsModalOpen(true)
    }
    
    if (typeParam === 'assessment') {
      setSelectedConsultation('Free Assessment')
      setIsModalOpen(true)
    }
  }, [location])

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: "(410) 921-3989",
      description: "Call us directly for immediate assistance"
    },
    {
      icon: Mail,
      label: "Email",
      value: "info@quantum5dconsulting.com",
      description: "Send us an email and we'll respond within 4 hours"
    },
    {
      icon: MapPin,
      label: "Service Area",
      value: "Nationwide Services",
      description: "Serving healthcare organizations across the United States"
    },
    {
      icon: Clock,
      label: "Business Hours",
      value: "Monday-Friday: 8:00 AM - 6:00 PM EST",
      description: "Saturday: 9:00 AM - 2:00 PM EST • Sunday: Closed"
    }
  ]

  const responseCommitments = [
    {
      type: "Phone Calls",
      time: "Within 2 hours",
      description: "During business hours"
    },
    {
      type: "Email Inquiries",
      time: "Within 4 hours",
      description: "Business days only"
    },
    {
      type: "Project Proposals",
      time: "Within 24 hours",
      description: "Detailed response with next steps"
    },
    {
      type: "Emergency Support",
      time: "Within 1 hour",
      description: "For existing clients with urgent needs"
    }
  ]

  const consultationTypes = [
    {
      title: "340B Program Assessment",
      duration: "60 minutes",
      description: "Comprehensive review of your current 340B program with immediate recommendations",
      features: [
        "Current program evaluation",
        "Compliance gap analysis",
        "Savings opportunity identification",
        "Implementation roadmap"
      ]
    },
    {
      title: "Regulatory Compliance Review",
      duration: "45 minutes",
      description: "Assessment of your regulatory compliance status and risk areas",
      features: [
        "Compliance status evaluation",
        "Risk assessment",
        "Priority recommendations",
        "Action plan development"
      ]
    },
    {
      title: "Operational Efficiency Analysis",
      duration: "90 minutes",
      description: "Deep dive into your pharmacy operations to identify optimization opportunities",
      features: [
        "Workflow analysis",
        "Technology assessment",
        "Staff productivity review",
        "Cost reduction opportunities"
      ]
    }
  ]

  return (
    <div className="min-h-screen">
      <SEO 
        title="Contact Quantum 5D Consulting - Free Pharmacy Consultation"
        description="Get your free pharmacy consultation today. Call (410) 921-3989 or email info@quantum5dconsulting.com for 340B optimization, compliance, and operations support."
        path="/contact"
        image="/images/team/dr-oriaifo-professional.jpg"
        structuredData={structuredData}
        googleAnalyticsId="G-1KGZ0633K4"
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Contact Our 340B Consulting Experts
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-4xl mx-auto">
              Schedule your free consultation and discover how we can help transform your pharmacy operations.
            </p>
            <div className="flex items-center justify-center space-x-8 text-purple-100">
              <div className="flex items-center space-x-2">
                <Phone className="h-6 w-6" />
                <span className="text-xl font-semibold">(410) 921-3989</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-6 w-6" />
                <span className="text-xl">info@quantum5dconsulting.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pharmacy Consulting Contact Information
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multiple ways to reach us - choose what works best for you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon
              return (
                <div key={index} className="text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.label}</h3>
                  <p className="text-lg font-medium text-purple-600 mb-2">{info.value}</p>
                  <p className="text-sm text-gray-600">{info.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Response Time Commitments */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our 340B Consulting Response Time Commitments
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We pride ourselves on quick, professional responses to all inquiries.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {responseCommitments.map((commitment, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{commitment.type}</h3>
                <div className="text-2xl font-bold text-purple-600 mb-2">{commitment.time}</div>
                <p className="text-sm text-gray-600">{commitment.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Consultation Options */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Free 340B & Pharmacy Consultation Options
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the consultation type that best fits your immediate needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {consultationTypes.map((consultation, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{consultation.title}</h3>
                <div className="text-purple-600 font-medium mb-4">{consultation.duration}</div>
                <p className="text-gray-600 mb-6">{consultation.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">What's Included:</h4>
                  <ul className="space-y-2">
                    {consultation.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-purple-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button
                  onClick={() => {
                    setSelectedConsultation(consultation.title)
                    setIsModalOpen(true)
                  }}
                  className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  Schedule This Consultation
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Send Us a Message
            </h2>
            <p className="text-xl text-gray-600">
              Fill out the form below and we'll get back to you within 4 hours during business days.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            {isSubmitted ? (
              <div className="text-center py-12">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h3>
                <p className="text-gray-600 mb-6">
                  Thank you for contacting Quantum 5D Consulting. We'll review your message and respond within 4 hours during business days.
                </p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p>Need immediate assistance? Call us at (410) 921-3989</p>
                  <p>Or email us directly at info@quantum5dconsulting.com</p>
                </div>
              </div>
            ) : (
              <ContactForm onSubmitSuccess={() => setIsSubmitted(true)} />
            )}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-purple-50 rounded-2xl p-8 text-center">
            <AlertCircle className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Need Urgent Assistance?
            </h2>
            <p className="text-gray-600 mb-6">
              For existing clients with urgent 340B compliance or regulatory issues, we offer emergency consultation services.
            </p>
            <div className="space-y-4">
              <div>
                <div className="text-lg font-semibold text-purple-600 mb-2">
                  Emergency Hotline: (410) 921-3989
                </div>
                <p className="text-sm text-gray-500">
                  Available 24/7 for existing clients with active service agreements
                </p>
              </div>
              <div>
                <div className="text-lg font-semibold text-purple-600 mb-2">
                  Priority Email: info@quantum5dconsulting.com
                </div>
                <p className="text-sm text-gray-500">
                  Mark subject line as "URGENT" for expedited response within 1 hour
                </p>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => {
                    setSelectedConsultation('340B Program Assessment')
                    setIsModalOpen(true)
                  }}
                  className="inline-flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  <span>Schedule 340B Assessment</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
            Don't wait - schedule your free consultation today and take the first step toward optimizing your pharmacy operations.
          </p>
          <div className="space-x-4">
            <button
              onClick={() => {
                setSelectedConsultation('Free Consultation')
                setIsModalOpen(true)
              }}
              className="inline-flex items-center space-x-2 bg-white text-purple-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <Phone size={20} />
              <span>Schedule Free Consultation</span>
            </button>
            <button
              onClick={() => {
                setSelectedConsultation('Email Inquiry')
                setIsModalOpen(true)
              }}
              className="inline-flex items-center space-x-2 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-900 transition-colors"
            >
              <Mail size={20} />
              <span>Send Email</span>
            </button>
          </div>
        </div>
      </section>

      {/* Consultation Scheduling Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900">
                Schedule {selectedConsultation} Consultation
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 mb-6">
                Please provide your information below and we'll get back to you within 24 hours to schedule your consultation.
              </p>
              
              <div className="mb-6 bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">Consultation Details:</h4>
                <p className="text-purple-700 mb-1"><strong>Type:</strong> {selectedConsultation}</p>
                <p className="text-purple-700 mb-1"><strong>Format:</strong> Virtual or Phone (Your preference)</p>
                <p className="text-purple-700"><strong>Duration:</strong> 30-60 minutes</p>
              </div>
              
              <ContactForm 
                variant="compact" 
                onSubmitSuccess={() => {
                  setIsModalOpen(false)
                  window.scrollTo(0, 0)
                  setIsSubmitted(true)
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}