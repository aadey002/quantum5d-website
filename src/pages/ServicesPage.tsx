import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Shield, TrendingUp, Users, Award, DollarSign, FileText, Target } from 'lucide-react'
import { SEO } from '../components/SEO'

export function ServicesPage() {
  // Structured data for services
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Comprehensive 340B Pharmacy Consulting Services",
    "description": "Expert 340B program optimization, regulatory compliance, and pharmacy consulting services to maximize savings and ensure compliance for healthcare organizations.",
    "provider": {
      "@type": "Organization",
      "name": "Quantum 5D Consulting",
      "url": "https://quantum5dconsulting.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "United States"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-410-921-3989",
        "contactType": "customer service"
      }
    },
    "serviceType": "340B Program Consulting",
    "areaServed": "United States",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "340B Consulting Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "340B Program Optimization",
            "description": "Comprehensive 340B program management and compliance services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Regulatory Compliance Consulting",
            "description": "Healthcare regulatory compliance and audit preparation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Pharmacy Operations Management",
            "description": "Workflow optimization and operational efficiency improvement"
          }
        }
      ]
    }
  }

  const services = [
    {
      icon: Shield,
      image: "/images/services/340b-program.jpg",
      title: "340B Program Optimization",
      description: "Maximize your 340B savings with comprehensive program management, compliance auditing, and strategic optimization.",
      features: [
        "Comprehensive program audit and assessment",
        "Policy development and implementation",
        "Staff training and certification",
        "Ongoing compliance monitoring",
        "Savings optimization strategies",
        "Audit preparation and support"
      ],
      benefits: "Average $2.3M annual savings increase"
    },
    {
      icon: FileText,
      image: "/images/services/regulatory-compliance.jpg",
      title: "Regulatory Compliance Consulting",
      description: "Stay ahead of regulatory requirements with comprehensive compliance assessments and implementation support.",
      features: [
        "Regulatory gap analysis",
        "Compliance policy development",
        "Staff training programs",
        "Documentation management",
        "Audit preparation",
        "Ongoing compliance monitoring"
      ],
      benefits: "98% compliance success rate"
    },
    {
      icon: Users,
      image: "/images/services/workforce-development.jpg",
      title: "Workforce Development",
      description: "Build skilled pharmacy teams through apprenticeship programs and professional development initiatives.",
      features: [
        "Pharmacy technician apprenticeship programs",
        "Skills assessment and training",
        "Career development pathways",
        "Performance management systems",
        "Retention strategies",
        "Continuing education programs"
      ],
      benefits: "75% reduction in staff turnover"
    },
    {
      icon: TrendingUp,
      image: "/images/services/pharmacy-buildout-real.png",
      title: "Pharmacy Operations Management",
      description: "Streamline workflows and improve efficiency through comprehensive operational assessments and optimization.",
      features: [
        "Workflow analysis and optimization",
        "Technology integration",
        "Inventory management systems",
        "Quality assurance programs",
        "Performance metrics development",
        "Cost reduction strategies"
      ],
      benefits: "25% efficiency improvement average"
    },
    {
      icon: Award,
      title: "Specialty Pharmacy Accreditation",
      description: "Achieve and maintain accreditation standards for specialty pharmacy services.",
      features: [
        "Accreditation readiness assessment",
        "Documentation development",
        "Staff training and certification",
        "Quality management systems",
        "Ongoing compliance support",
        "Audit preparation assistance"
      ],
      benefits: "100% accreditation success rate"
    },
    {
      icon: Target,
      title: "Performance Analytics & Reporting",
      description: "Data-driven insights for better decision-making and operational excellence.",
      features: [
        "Key performance indicator development",
        "Dashboard creation and management",
        "Regular performance reporting",
        "Trend analysis and forecasting",
        "Benchmarking studies",
        "ROI analysis and optimization"
      ],
      benefits: "Data-driven decision improvements"
    }
  ]

  const packages = [
    {
      name: "Starter Package",
      price: "$15,000",
      duration: "3-month engagement",
      description: "Perfect for small to medium pharmacy operations looking to optimize specific areas.",
      features: [
        "Initial assessment and gap analysis",
        "Priority recommendations report",
        "Basic staff training (up to 10 staff)",
        "30-day implementation support",
        "Email support during engagement",
        "Final assessment and reporting"
      ],
      popular: false
    },
    {
      name: "Professional Package",
      price: "$35,000",
      duration: "6-month engagement",
      description: "Comprehensive solution for medium to large organizations seeking significant improvements.",
      features: [
        "Comprehensive audit and assessment",
        "Custom policy development",
        "Extensive staff training (up to 25 staff)",
        "90-day implementation support",
        "Weekly progress consultations",
        "Performance monitoring and reporting",
        "Phone and email support",
        "Follow-up assessment at 6 months"
      ],
      popular: true
    },
    {
      name: "Enterprise Package",
      price: "Custom Pricing",
      duration: "12+ month partnership",
      description: "Tailored solutions for large health systems and multi-location organizations.",
      features: [
        "Multi-site comprehensive assessment",
        "Enterprise-wide policy standardization",
        "Unlimited staff training",
        "Dedicated account management",
        "24/7 consultation access",
        "Ongoing compliance monitoring",
        "Custom reporting and analytics",
        "Quarterly business reviews",
        "Priority support and implementation"
      ],
      popular: false
    }
  ]

  return (
    <div className="min-h-screen">
      <SEO 
        title="Expert 340B Consulting & Pharmacy Optimization Services | Quantum 5D"
        description="Comprehensive 340B program optimization, regulatory compliance, and pharmacy consulting services. Maximize savings, ensure compliance, and improve operations with our proven expertise."
        path="/services"
        image="/images/services/340b-program.jpg"
        structuredData={structuredData}
        googleAnalyticsId="G-1KGZ0633K4"
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Comprehensive 340B Consulting & Pharmacy Optimization Services
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-4xl mx-auto">
              Expert consulting services to maximize your 340B program savings, ensure regulatory compliance, and optimize pharmacy operations for better patient outcomes.
            </p>
            <Link
              to="/contact?service=Free%20Consultation&open=true"
              className="inline-flex items-center space-x-2 bg-white text-purple-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <span>Get Free Consultation</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Services Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core 340B & Pharmacy Consulting Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions designed to optimize your pharmacy operations, maximize 340B savings, and ensure regulatory compliance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <div key={index} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  {service.image ? (
                    <img 
                      src={service.image} 
                      alt={`${service.title} - Professional pharmacy consulting services to improve operations and compliance`} 
                      className="w-full h-48 object-cover rounded-lg mb-6"
                    />
                  ) : (
                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="h-8 w-8 text-purple-600" />
                    </div>
                  )}
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 text-center">
                    {service.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-purple-600 mt-1 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-purple-50 p-3 rounded-lg mb-4">
                      <p className="text-sm font-semibold text-purple-800">{service.benefits}</p>
                    </div>
                    <Link
                      to={`/contact?service=${encodeURIComponent(service.title)}&open=true`}
                      className="text-purple-600 hover:text-purple-700 font-medium"
                    >
                      Learn About {service.title} →
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
          
          {/* Detailed Service Descriptions */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Detailed Service Offerings
            </h3>
            
            <div className="space-y-12">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  340B Program Optimization & Compliance Management
                </h3>
                <p className="text-gray-600 mb-4">
                  Our comprehensive 340B consulting services help healthcare organizations maximize drug purchase savings while maintaining full compliance with federal regulations. We provide end-to-end program management from initial assessment to ongoing optimization.
                </p>
                <p className="text-gray-600">
                  <Link to="/contact?service=340B%20Optimization&open=true" className="text-purple-600 hover:text-purple-700 font-medium">
                    Get expert 340B program optimization consultation →
                  </Link>
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Regulatory Compliance & Audit Preparation
                </h3>
                <p className="text-gray-600 mb-4">
                  Stay ahead of evolving healthcare regulations with our comprehensive compliance consulting. We help organizations prepare for audits, implement robust compliance systems, and maintain ongoing regulatory adherence.
                </p>
                <p className="text-gray-600">
                  <Link to="/contact?service=Compliance%20Consulting&open=true" className="text-purple-600 hover:text-purple-700 font-medium">
                    Schedule regulatory compliance assessment →
                  </Link>
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Pharmacy Operations & Workflow Optimization
                </h3>
                <p className="text-gray-600 mb-4">
                  Improve efficiency and reduce costs through comprehensive operational assessments and strategic workflow optimization. Our solutions enhance productivity while maintaining the highest standards of patient care.
                </p>
                <p className="text-gray-600">
                  <Link to="/contact?service=Operations%20Management&open=true" className="text-purple-600 hover:text-purple-700 font-medium">
                    Optimize your pharmacy operations today →
                  </Link>
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Workforce Development & Training Programs
                </h3>
                <p className="text-gray-600 mb-4">
                  Build a skilled, certified workforce through our comprehensive training and development programs. We offer apprenticeship programs, continuing education, and professional development initiatives tailored to your organization's needs.
                </p>
                <p className="text-gray-600">
                  <Link to="/contact?service=Workforce%20Development&open=true" className="text-purple-600 hover:text-purple-700 font-medium">
                    Develop your pharmacy workforce →
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Packages */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pharmacy Consulting Packages & Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the package that best fits your organization's needs and budget.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div key={index} className={`bg-white rounded-lg shadow-lg overflow-hidden ${pkg.popular ? 'ring-2 ring-purple-600 transform scale-105' : ''}`}>
                {pkg.popular && (
                  <div className="bg-purple-600 text-white text-center py-2 font-semibold">
                    Most Popular
                  </div>
                )}
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-purple-600 mb-2">{pkg.price}</div>
                  <p className="text-gray-500 mb-6">{pkg.duration}</p>
                  
                  <p className="text-gray-600 mb-6">{pkg.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link
                    to={`/contact?service=${encodeURIComponent(pkg.name)}&open=true`}
                    className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-colors ${
                      pkg.popular
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              All packages include a 100% satisfaction guarantee and post-implementation support.
            </p>
            <Link
              to="/contact?service=Custom%20Solution&open=true"
              className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium"
            >
              <span>Need a custom solution? Contact us for personalized pricing</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Quantum 5D for 340B & Pharmacy Consulting?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our proven methodology and expertise deliver measurable results for your organization.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">$6M+</h3>
              <p className="text-gray-600">In 340B Savings Generated</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">$1.3M+</h3>
              <p className="text-gray-600">Additional Revenue Created</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">98%</h3>
              <p className="text-gray-600">Client Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Proven 340B Consulting Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A systematic approach that ensures successful outcomes for every engagement.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Assessment</h3>
              <p className="text-gray-600">Comprehensive evaluation of current operations and identification of opportunities.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Strategy</h3>
              <p className="text-gray-600">Development of customized solutions and implementation roadmap.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Implementation</h3>
              <p className="text-gray-600">Hands-on support and guidance through the implementation process.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Optimization</h3>
              <p className="text-gray-600">Ongoing monitoring and optimization to ensure sustained results.</p>
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
            Schedule a free consultation to discuss your specific needs and learn how we can help you achieve your goals.
          </p>
          <div className="space-x-4">
            <Link
              to="/contact?service=Free%20Consultation&open=true"
              className="inline-flex items-center space-x-2 bg-white text-purple-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <span>Schedule Free Consultation</span>
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/case-studies"
              className="inline-flex items-center space-x-2 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-900 transition-colors"
            >
              <span>View Case Studies</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}