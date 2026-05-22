import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Users, Award, TrendingUp, BookOpen, Calendar, Phone, Mail, Star, CheckCircle, DollarSign, Target, Zap, Trophy, Calculator } from 'lucide-react'
import { NewsletterSignup } from '../components/NewsletterSignup'
import { SEO } from '../components/SEO'
import { fetchBlogPosts, BlogPost } from '../services/blogApi'

export function HomePage() {
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadFeaturedPosts = async () => {
      try {
        const response = await fetchBlogPosts(1, 3)
        if (response.success) {
          setFeaturedPosts(response.data.posts)
        }
      } catch (error) {
        console.error('Failed to load featured posts:', error)
      } finally {
        setLoading(false)
      }
    }

    loadFeaturedPosts()
  }, [])

  const testimonials = [
    {
      name: "Sarah Johnson",
      title: "Pharmacy Director, Regional FQHC",
      quote: "Working with Quantum 5D completely transformed our 340B program. Their comprehensive audit identified over $2M in missed savings opportunities, and their strategic implementation helped us achieve 340B optimization that exceeded our most optimistic projections. The team's expertise and attention to detail is unmatched.",
      rating: 5,
      company: "15-location FQHC Network",
      result: "$2M+ in identified savings"
    },
    {
      name: "Michael Chen",
      title: "Chief Financial Officer, Community Hospital",
      quote: "Dr. Oriaifo's strategic approach and deep regulatory knowledge helped us navigate complex HRSA compliance requirements while optimizing our pharmacy operations. We achieved significant cost reductions and improved operational efficiency - exactly what we needed to strengthen our financial position.",
      rating: 5,
      company: "250-bed Community Hospital",
      result: "30% cost reduction achieved"
    },
    {
      name: "Lisa Rodriguez",
      title: "Operations Manager, Independent Pharmacy Chain",
      quote: "The Quantum 5D team's practical solutions and deep understanding of regulatory requirements made our HRSA audit preparation seamless. Their comprehensive approach to compliance management has given us complete confidence in our 340B program operations.",
      rating: 5,
      company: "8-location Pharmacy Chain",
      result: "100% HRSA compliance achieved"
    }
  ]

  const caseStudies = [
    {
      title: "Large FQHC Network",
      client: "Less than 20% of drug purchases were 340B vs. 80% retail, with unlisted providers in TPA resulting in disqualified claims",
      result: "$6M in 340B savings over 3 years",
      improvement: "Cost per prescription reduced from $86 to $67, 340B spend increased to 74%"
    },
    {
      title: "Independent Pharmacy Chain",
      client: "Contract pharmacy network audit revealed nearly one-third of locations had no active dispensing and were non-compliant with HRSA requirements",
      result: "100% HRSA compliance achieved",
      improvement: "Network optimization and compliance achieved within 6 months"
    },
    {
      title: "Community Health Center",
      client: "Establishing internal specialty pharmacy for HIV/HEP-C patients to improve outcomes and maximize 340B savings",
      result: "$1.3M annual revenue increase over 3 years",
      improvement: "ACHC accreditation achieved with zero findings, 100% treatment completion"
    }
  ]

  const credentials = [
    "PharmD - Doctor of Pharmacy",
    "340B Program Specialist",
    "Pharmacy Operations Expert",
    "Regulatory Compliance Consultant",
    "Minority & Woman-Owned Business Certified"
  ]

  // Structured data for organization
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Quantum 5D Consulting",
    "url": "https://quantum5dconsulting.com",
    "logo": "https://quantum5dconsulting.com/images/logo.png",
    "description": "Pharmacy consulting firm specializing in 340B optimization, compliance, and buildouts."
  }

  return (
    <div className="min-h-screen">
      <SEO 
        title="Pharmacy Consulting Experts | 340B Program, Compliance & Workforce Strategy"
        description="Quantum 5D Consulting helps covered entities optimize 340B programs, improve HRSA compliance, build operational pharmacies, and train pharmacy staff nationwide."
        path="/"
        image="/images/hero/pharmacy-consulting-hero.jpg"
        structuredData={structuredData}
        googleAnalyticsId="G-1KGZ0633K4"
      />
      {/* Hero Section */}
      <section className="relative bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="lg:pr-8">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Expert Pharmacy Consulting for 340B Optimization & Compliance
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 mb-4 leading-relaxed">
                Quantum 5D Consulting partners with healthcare providers to deliver results-driven strategies in 340B optimization, HRSA compliance, pharmacy operations, and workforce development.
              </p>
              <p className="text-lg font-semibold text-purple-700 mb-8">Delivering quantum leap ROI</p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center space-x-2 bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors text-center"
                >
                  <span>Schedule Your Free Consultation →</span>
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center space-x-2 border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-purple-600 hover:text-white transition-colors text-center"
                >
                  <span>Free 340B Assessment</span>
                </Link>
              </div>
            </div>
            
            {/* Right Column - Image */}
            <div className="lg:pl-8">
              <div className="relative">
                <img 
                  src="/images/hero/pharmacy-consulting-hero.jpg" 
                  alt="Professional pharmacy consultant reviewing 340B program optimization strategies with healthcare team" 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proven Results Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Proven 340B Consulting Results That Speak for Themselves
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our track record demonstrates our commitment to delivering exceptional value to healthcare organizations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center bg-white p-6 rounded-lg shadow-md border border-purple-100">
              <div className="text-4xl font-bold text-purple-600 mb-2">$6M+</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">340B Program Savings</h3>
              <p className="text-gray-600">Total savings achieved for our clients through optimized 340B programs</p>
            </div>
            
            <div className="text-center bg-white p-6 rounded-lg shadow-md border border-purple-100">
              <div className="text-4xl font-bold text-purple-600 mb-2">$1.3M+</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Additional Pharmacy Revenue</h3>
              <p className="text-gray-600">Additional revenue generated through our pharmacy optimization strategies</p>
            </div>
            
            <div className="text-center bg-white p-6 rounded-lg shadow-md border border-purple-100">
              <div className="flex items-center justify-center mb-2">
                <span className="text-5xl font-bold text-purple-600">50+</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Healthcare Organizations Served</h3>
              <p className="text-gray-600">FQHCs, hospitals, and pharmacies we've successfully partnered with</p>
            </div>
            
            <div className="text-center bg-white p-6 rounded-lg shadow-md border border-purple-100">
              <div className="text-4xl font-bold text-purple-600 mb-2">98%</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Client Satisfaction & Retention Rate</h3>
              <p className="text-gray-600">Client retention rate and satisfaction with our consulting services</p>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-purple-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Calculate Your 340B Savings Potential
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
            Discover how much your organization could save with optimized 340B program management.
          </p>
          <Link
            to="/contact?service=340B%20ROI%20Calculator&open=true"
            className="inline-flex items-center justify-center space-x-2 bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            <Calculator className="h-5 w-5" />
            <span>Free ROI Assessment →</span>
          </Link>
        </div>
      </section>

      {/* What Our Clients Say Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Real Results from Clients We've Helped Transform
            </h2>
            <p className="text-xl text-gray-600">Hear directly from healthcare leaders who have experienced the Quantum 5D difference</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg border border-purple-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic leading-relaxed">"{testimonial.quote}"</p>
                <div className="border-t border-gray-100 pt-4">
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500 mb-2">{testimonial.title}</p>
                  <p className="text-sm text-purple-600 font-medium">{testimonial.company}</p>
                  <div className="mt-2 bg-purple-50 px-3 py-1 rounded-full inline-block">
                    <span className="text-xs font-semibold text-purple-700">{testimonial.result}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Case Studies Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Proven Case Studies: Real Results for Real Clients
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how we've helped healthcare organizations achieve dramatic improvements in their 340B programs and pharmacy operations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg border border-purple-100">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{study.title}</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Challenge:</h4>
                    <p className="text-gray-600 text-sm">{study.client}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-600 mb-2">Result:</h4>
                    <p className="text-purple-700 font-bold text-lg">{study.result}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Impact:</h4>
                    <p className="text-gray-600 text-sm">{study.improvement}</p>
                  </div>
                </div>
                <Link 
                  to="/case-studies" 
                  className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium mt-4"
                >
                  Read Full Case Study <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/case-studies"
              className="inline-flex items-center space-x-2 bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              <span>View All Case Studies</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Dr. Adetoro Oriaifo Credentials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Led by Dr. Adetoro Oriaifo, PharmD
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              15+ years of pharmacy expertise with specialized focus on 340B program optimization and regulatory compliance
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-6">Professional Qualifications</h3>
                <div className="space-y-4">
                  {credentials.map((credential, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-purple-200 flex-shrink-0" />
                      <span className="text-purple-100">{credential}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Quantum 5D?</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Award className="h-8 w-8 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Minority, Woman & Pharmacist-Owned</h4>
                    <p className="text-gray-600">Certified minority and woman-owned business with deep pharmaceutical industry expertise and commitment to diversity in healthcare consulting.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Trophy className="h-8 w-8 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Proven Track Record</h4>
                    <p className="text-gray-600">50+ healthcare organizations served with 98% client satisfaction rate and millions in documented savings generated.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Shield className="h-8 w-8 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Comprehensive Expertise</h4>
                    <p className="text-gray-600">End-to-end pharmacy consulting from 340B optimization to workforce development, regulatory compliance, and operational excellence.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Credentials Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Professional Credentials & Certifications
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {credentials.map((credential, index) => (
              <div key={index} className="text-center bg-white p-6 rounded-lg shadow-sm">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-purple-600" />
                </div>
                <p className="text-gray-700 font-medium text-sm">{credential}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Core Services */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Services
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive pharmacy consulting solutions designed to optimize your operations, ensure compliance, and maximize your financial performance.
            </p>
          </div>
          
          {/* Core Service Areas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center bg-white p-6 rounded-lg shadow-lg border border-gray-100">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">340B Program Optimization</h3>
              <p className="text-gray-600 text-sm">Maximize savings and ensure compliance with strategic 340B program management.</p>
            </div>
            
            <div className="text-center bg-white p-6 rounded-lg shadow-lg border border-gray-100">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Pharmacy Buildout & Operations</h3>
              <p className="text-gray-600 text-sm">End-to-end pharmacy development from planning to operational excellence.</p>
            </div>
            
            <div className="text-center bg-white p-6 rounded-lg shadow-lg border border-gray-100">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Regulatory Compliance Consulting</h3>
              <p className="text-gray-600 text-sm">Stay HRSA-compliant with expert auditing and risk management support.</p>
            </div>
            
            <div className="text-center bg-white p-6 rounded-lg shadow-lg border border-gray-100">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Workforce Development Programs</h3>
              <p className="text-gray-600 text-sm">MATC-approved pharmacy technician training and career development.</p>
            </div>
          </div>
          
          {/* Why Quantum 5D? Section */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Why Quantum 5D?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center bg-purple-50 p-8 rounded-lg">
                <Award className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Minority, Woman, and Pharmacist-Owned</h3>
                <p className="text-gray-600">Led by Dr. Adetoro Oriaifo, PharmD, with 15+ years of pharmacy experience and deep expertise in 340B program optimization.</p>
              </div>
              
              <div className="text-center bg-purple-50 p-8 rounded-lg">
                <Trophy className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Trusted by Healthcare Providers Nationwide</h3>
                <p className="text-gray-600">Serving 50+ healthcare organizations across the United States with a 98% client satisfaction rate.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real Results from Our Clients */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Real Results from Our Clients
            </h2>
            <p className="text-xl text-gray-600">
              See how we've helped healthcare organizations save millions and streamline their pharmacy operations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{study.title}</h3>
                <p className="text-sm text-gray-600 mb-4 italic">{study.client}</p>
                <div className="text-2xl font-bold text-purple-600 mb-4">{study.result}</div>
                <p className="text-gray-600">{study.improvement}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p><a href="/case-studies" className="inline-flex items-center space-x-2 bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors">View all case studies →</a></p>
          </div>
        </div>
      </section>

      {/* Calculate Your Potential 340B Savings Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Calculate Your Potential 340B Savings
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Use our ROI calculator to discover how much you could save with optimized 340B program management.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              <Calculator className="h-5 w-5" />
              <span>Calculate My Savings</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Meet Our Principal Consultant */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Column */}
            <div className="lg:order-2">
              <div className="relative">
                <img 
                  src="/images/team/dr-oriaifo-professional.jpg" 
                  alt="Dr. Adetoro Oriaifo, PharmD - Founder and Principal Consultant at Quantum 5D Consulting specializing in 340B program optimization" 
                  className="w-full max-w-md mx-auto lg:max-w-full rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 to-transparent rounded-lg"></div>
              </div>
            </div>
            
            {/* Text Column */}
            <div className="lg:order-1 lg:pr-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Meet Our Principal Consultant
              </h2>
              <h3 className="text-xl text-purple-600 font-semibold mb-6">
                Dr. Adetoro Oriaifo, PharmD - Founder & Principal Consultant
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Dr. Adetoro Oriaifo, PharmD, brings extensive experience in 340B consulting, operational strategy, and pharmacy leadership.
              </p>
              <div className="space-y-3 mb-8">
                <h4 className="font-semibold text-gray-900">Credentials:</h4>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-600">Doctor of Pharmacy (PharmD)</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-600">340B Program Specialist</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-600">Minority & Woman-Owned Business Certified</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-600">15+ Years Healthcare Experience</span>
                  </li>
                </ul>
              </div>
              <p><a href="/about" className="inline-flex items-center space-x-2 bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors">Learn more about our team →</a></p>
            </div>
          </div>
        </div>
      </section>

      {/* Resources & Insights */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Resources & Insights
            </h2>
            <p className="text-xl text-gray-600">
              Stay up to date with industry trends, HRSA compliance updates, and best practices in pharmacy management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <p><a href="/blog" className="inline-flex items-center space-x-2 bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors">Visit our blog →</a></p>
              <p><a href="/resources" className="inline-flex items-center space-x-2 border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-purple-600 hover:text-white transition-colors">Access resources →</a></p>
            </div>
          </div>
          
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <NewsletterSignup />
          </div>
        </div>
      </section>

      {/* Ready to Optimize Your Pharmacy Strategy? */}
      <section className="py-16 lg:py-20 bg-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Optimize Your Pharmacy Strategy?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
            Partner with Quantum 5D Consulting to achieve excellence in 340B optimization, compliance, and pharmacy operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <p><a href="/contact" className="inline-flex items-center justify-center space-x-2 bg-white text-purple-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">Schedule a Free Consultation →</a></p>
            <p><a href="/contact" className="inline-flex items-center justify-center space-x-2 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-900 transition-colors">Free 340B Assessment</a></p>
          </div>
        </div>
      </section>
    </div>
  )
}