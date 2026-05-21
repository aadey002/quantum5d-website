import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Download, FileText, BookOpen, ExternalLink, Share2 } from 'lucide-react'
import { EmailCollectionModal } from '../components/EmailCollectionModal'
import { NewsletterSignup } from '../components/NewsletterSignup'
import { SEO } from '../components/SEO'

export function ResourcesPage() {
  const [selectedResource, setSelectedResource] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [downloadingId, setDownloadingId] = useState<number | null>(null)
  const resources = [
    {
      id: 1,
      title: "340B Savings Calculator & ROI Analysis Tool",
      description: "Comprehensive Excel-based solution for 340B program optimization with advanced calculations, ROI projections, and contract pharmacy analysis tools.",
      type: "Excel Tool",
      category: "340B Optimization",
      pages: "Interactive Tool",
      downloadUrl: "/resources/340B-Savings-Calculator-ROI-Analysis-Tool.pdf"
    },
    {
      id: 2,
      title: "Pharmacy Technician Career Development Guide",
      description: "Complete professional growth pathways guide with certification requirements, advancement opportunities, salary benchmarks, and training resources for pharmacy technicians.",
      type: "Career Guide",
      category: "Workforce Development",
      pages: "50+ pages",
      downloadUrl: "/resources/Pharmacy-Technician-Career-Development-Guide.pdf"
    },
    {
      id: 3,
      title: "Regulatory Compliance Training Manual",
      description: "Essential training manual for healthcare professionals covering DEA, FDA, and state regulations with practical examples and assessment tools.",
      type: "Training Manual",
      category: "Compliance",
      pages: "60+ pages",
      downloadUrl: "/resources/Regulatory-Compliance-Training-Manual.pdf"
    },
    {
      id: 4,
      title: "340B Program Compliance Checklist",
      description: "Comprehensive audit readiness and compliance framework with detailed HRSA requirements, preparation steps, and best practices checklist.",
      type: "PDF Checklist",
      category: "340B Compliance",
      pages: "30+ pages",
      downloadUrl: "/resources/340B-Program-Compliance-Checklist.pdf"
    },
    {
      id: 5,
      title: "Pharmacy Regulatory Compliance Training Manual",
      description: "Advanced compliance strategies for modern pharmacy operations with updated regulatory requirements, case studies, and implementation guidelines.",
      type: "Training Manual",
      category: "Compliance",
      pages: "70+ pages",
      downloadUrl: "/resources/Pharmacy-Regulatory-Compliance-Training-Manual.pdf"
    },
    {
      id: 6,
      title: "Pharmacy Workflow Optimization Guide",
      description: "Efficiency enhancement and process improvement strategies with workflow analysis templates, optimization techniques, and performance metrics.",
      type: "Operations Guide",
      category: "Operations",
      pages: "45+ pages",
      downloadUrl: "/resources/Pharmacy-Workflow-Optimization-Guide.pdf"
    }
  ]

  const complianceTemplates = [
    {
      id: 101,
      title: "340B Program Narrative Template 2023",
      description: "Comprehensive 340B program narrative template for 2023 compliance reporting and annual program submissions to meet HRSA reporting requirements.",
      type: "PDF Template",
      category: "340B Reporting",
      pages: "Template",
      downloadUrl: "/resources/340b-narrative-template-2023.pdf"
    },
    {
      id: 102,
      title: "Contract Pharmacy Diversion Prevention Template",
      description: "Template for establishing diversion prevention controls in contract pharmacy arrangements with comprehensive compliance protocols.",
      type: "PDF Template",
      category: "Contract Pharmacy",
      pages: "Template",
      downloadUrl: "/resources/340b-contract-pharmacy-diversion-prevention-template.pdf"
    },
    {
      id: 103,
      title: "Contract Pharmacy Duplicate Discounts Audit Template",
      description: "Comprehensive audit template for preventing duplicate discounts in contract pharmacy operations with verification procedures.",
      type: "PDF Template",
      category: "Contract Pharmacy",
      pages: "Template",
      downloadUrl: "/resources/340b-contract-pharmacy-duplicate-discounts-audit-template.pdf"
    },
    {
      id: 104,
      title: "Independent Audit RFP Response Checklist",
      description: "Checklist for responding to independent audit request for proposals with comprehensive preparation guidelines.",
      type: "PDF Checklist",
      category: "340B Auditing",
      pages: "Checklist",
      downloadUrl: "/resources/340b-independent-audit-rfp-response-checklist.pdf"
    },
    {
      id: 105,
      title: "Sample Attestation Letter to HRSA OPA",
      description: "Sample attestation letter template for HRSA Office of Pharmacy Affairs communications and compliance confirmations.",
      type: "PDF Template",
      category: "HRSA Communications",
      pages: "Template",
      downloadUrl: "/resources/340b-sample-attestation-letter-hrsa-opa-alternate.pdf"
    },
    {
      id: 106,
      title: "Alternative HRSA OPA Attestation Letter",
      description: "Alternative sample attestation letter template for HRSA OPA with varied communication scenarios and use cases.",
      type: "PDF Template",
      category: "HRSA Communications",
      pages: "Template",
      downloadUrl: "/resources/340b-sample-attestation-letter-hrsa-opa-alternate.pdf"
    },
    {
      id: 107,
      title: "Medicaid Exclusion File Checklist",
      description: "Detailed checklist for maintaining Medicaid exclusion files and ensuring proper documentation of excluded prescriptions.",
      type: "PDF Checklist",
      category: "Medicaid Compliance",
      pages: "Checklist",
      downloadUrl: "/resources/340b-medicaid-exclusion-file-checklist.pdf"
    },
    {
      id: 108,
      title: "Self-Audit Policy & Procedure Template",
      description: "Template for establishing internal self-audit policies and procedures with comprehensive internal audit frameworks.",
      type: "PDF Template",
      category: "340B Auditing",
      pages: "Template",
      downloadUrl: "/resources/340b-self-audit-policy-procedure-template.pdf"
    },
    {
      id: 109,
      title: "State Medicaid Agency Approval Letter",
      description: "Sample letter template for state Medicaid agency approval requests and formal communications with state agencies.",
      type: "PDF Template",
      category: "Medicaid Communications",
      pages: "Template",
      downloadUrl: "/resources/340b-sample-medicaid-agency-approval-letter.pdf"
    }
  ]

  const insightArticles = [
    {
      id: 1,
      title: "2025 340B Program Changes: What Healthcare Organizations Need to Know",
      description: "Comprehensive analysis of recent 340B regulatory updates, compliance requirements, and implementation strategies for covered entities.",
      category: "340B Compliance",
      readTime: "8 min read",
      publishedDate: "December 15, 2024",
      author: "Dr. Adetoro Oriaifo, PharmD",
      type: "Expert Article",
      downloadUrl: "/resources/2025-340B-Program-Changes-Article.pdf"
    },
    {
      id: 2,
      title: "Maximizing ROI from Pharmacy Technology Investments",
      description: "Expert strategies for selecting, implementing, and optimizing pharmacy management systems to achieve measurable returns on technology investments.",
      category: "Operations",
      readTime: "12 min read",
      publishedDate: "November 28, 2024",
      author: "Dr. Adetoro Oriaifo, PharmD",
      type: "Expert Article",
      downloadUrl: "/resources/maximizing-roi-pharmacy-technology-investments.pdf"
    },
    {
      id: 3,
      title: "Building High-Performance Pharmacy Teams: A Workforce Development Strategy",
      description: "Proven methodologies for recruiting, training, and retaining top pharmacy talent while building a culture of excellence and continuous improvement.",
      category: "Workforce Development",
      readTime: "10 min read",
      publishedDate: "November 10, 2024",
      author: "Dr. Adetoro Oriaifo, PharmD",
      type: "Expert Article",
      downloadUrl: "/resources/building-high-performance-pharmacy-teams.pdf"
    },
    {
      id: 4,
      title: "Specialty Pharmacy Accreditation: A Step-by-Step Implementation Guide",
      description: "Complete roadmap for achieving and maintaining specialty pharmacy accreditation, including timeline, requirements, and best practices.",
      category: "Compliance",
      readTime: "15 min read",
      publishedDate: "October 22, 2024",
      author: "Dr. Adetoro Oriaifo, PharmD",
      type: "Expert Article",
      downloadUrl: "/resources/Specialty-Pharmacy-Accreditation-Implementation-Guide.pdf"
    },
    {
      id: 5,
      title: "Cost Reduction Strategies for Hospital Pharmacy Operations",
      description: "Data-driven approaches to reducing pharmacy operational costs while maintaining quality care and regulatory compliance.",
      category: "Operations",
      readTime: "9 min read",
      publishedDate: "October 5, 2024",
      author: "Dr. Adetoro Oriaifo, PharmD",
      type: "Expert Article",
      downloadUrl: "/resources/Cost-Reduction-Strategies-Hospital-Pharmacy-Operations.pdf"
    },
    {
      id: 6,
      title: "The Future of 340B: Trends and Predictions for Healthcare Organizations",
      description: "Industry analysis and expert predictions on the evolution of 340B programs, regulatory changes, and strategic considerations for covered entities.",
      category: "340B Strategy",
      readTime: "11 min read",
      publishedDate: "September 18, 2024",
      author: "Dr. Adetoro Oriaifo, PharmD",
      type: "Expert Article",
      downloadUrl: "/resources/Future-of-340B-Trends-and-Predictions.pdf"
    }
  ]

  const externalResources = [
    {
      title: "HRSA 340B Program Guidelines",
      description: "Official guidelines from the Health Resources and Services Administration.",
      url: "https://www.hrsa.gov/opa",
      organization: "HRSA"
    },
    {
      title: "FDA Pharmacy Compounding Regulations",
      description: "Current FDA regulations on pharmacy compounding practices.",
      url: "https://www.fda.gov/drugs/human-drug-compounding/human-drug-compounding-laws",
      organization: "FDA"
    },
    {
      title: "DEA Controlled Substances Information",
      description: "DEA resources for controlled substance handling and compliance.",
      url: "https://www.deadiversion.usdoj.gov/",
      organization: "DEA"
    }
  ]

  return (
    <div className="min-h-screen">
      <SEO 
        title="Free Pharmacy Tools & Templates - Quantum 5D Consulting"
        description="Download 30+ free pharmacy resources including 340B calculators, compliance checklists, training manuals, and expert guides from leading pharmacy consultants."
        path="/resources"
        image="/images/services/regulatory-compliance.jpg"
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Pharmacy Resources & Tools
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-4xl mx-auto">
              Access expert-created tools, templates, and guides to optimize your pharmacy operations and ensure compliance.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 bg-white text-purple-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <span>Request Custom Resources</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Free Downloadable Resources
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professionally developed tools and guides to help you improve your pharmacy operations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource) => (
              <div key={resource.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                      {resource.category}
                    </span>
                    <FileText className="h-6 w-6 text-gray-400" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {resource.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {resource.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-gray-500 block">{resource.type}</span>
                      <span className="text-xs text-gray-400">{resource.pages}</span>
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedResource(resource)
                        setIsModalOpen(true)
                      }}
                      className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 340B Compliance Templates */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              340B Compliance Templates
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional templates and checklists for complete 340B program compliance, auditing, and regulatory requirements.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {complianceTemplates.map((template) => (
              <div key={template.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {template.category}
                    </span>
                    <FileText className="h-6 w-6 text-gray-400" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {template.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {template.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-gray-500 block">{template.type}</span>
                      <span className="text-xs text-gray-400">{template.pages}</span>
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedResource(template)
                        setIsModalOpen(true)
                      }}
                      className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* External Resources */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              External Resources & References
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Important regulatory and industry resources from official organizations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {externalResources.map((resource, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {resource.title}
                  </h3>
                  <ExternalLink className="h-5 w-5 text-gray-400 mt-1" />
                </div>
                
                <p className="text-gray-600 mb-4">
                  {resource.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-purple-600">{resource.organization}</span>
                  <a 
                    href={resource.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium"
                  >
                    <span>Visit Site</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insight Articles */}
      <section className="py-20 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Expert Insights & Articles
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              In-depth analysis and practical guidance from our pharmacy consulting experts.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {insightArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-4 border-purple-600 overflow-hidden">
                {/* Purple Header with Logo */}
                <div className="bg-gradient-to-r from-purple-800 to-purple-600 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <img src="/images/logo.png" alt="Quantum 5D Consulting - Expert Pharmacy Consulting Services Logo" className="h-8 w-auto" />
                    <span className="text-white text-xs font-medium bg-purple-900 px-2 py-1 rounded">
                      {article.readTime}
                    </span>
                  </div>
                  <span className="inline-block bg-white text-purple-800 px-3 py-1 rounded-full text-xs font-semibold">
                    {article.category}
                  </span>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {article.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600 border-t border-gray-100 pt-4">
                      <p className="font-semibold text-purple-800">{article.author}</p>
                      <p className="text-xs">{article.publishedDate}</p>
                    </div>
                    <div className="flex items-center space-x-2 mt-4">
                      <button
                        onClick={() => {
                          if (navigator.share) {
                            navigator.share({
                              title: article.title,
                              text: article.description,
                              url: window.location.origin + '/blog'
                            })
                          } else {
                            navigator.clipboard.writeText(window.location.origin + '/blog')
                            alert('Link copied to clipboard!')
                          }
                        }}
                        className="flex-1 inline-flex items-center justify-center space-x-1 text-gray-600 hover:text-purple-600 font-medium transition-colors border border-gray-300 hover:border-purple-600 rounded-md py-2 px-3 text-sm"
                      >
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedResource(article)
                          setIsModalOpen(true)
                        }}
                        className="flex-1 inline-flex items-center justify-center space-x-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-colors rounded-md py-2 px-3 text-sm"
                      >
                        <Download className="h-4 w-4" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-purple-50 rounded-2xl p-8 text-center">
            <BookOpen className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Stay Updated with New Resources
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Subscribe to receive notifications when we publish new tools, guides, and industry insights.
            </p>
            <div className="max-w-md mx-auto">
              <NewsletterSignup 
                size="medium"
                placeholder="Enter your email"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Custom Resources for Your Organization?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
            Our team can create customized tools, templates, and training materials tailored to your specific needs.
          </p>
          <div className="space-x-4">
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 bg-white text-purple-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <span>Discuss Custom Solutions</span>
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/contact?type=assessment"
              className="inline-flex items-center space-x-2 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-900 transition-colors"
            >
              <span>Get Free Assessment</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
            <div className="text-sm text-gray-600 leading-relaxed space-y-4">
              <p className="text-justify">
                <strong>Disclaimer:</strong> These audit forms and checklists are provided as general resources for pharmacy quality assurance. They should be customized to your specific practice setting and requirements. Implementation should be in accordance with all applicable laws, regulations, and professional standards.
              </p>
              <div className="text-center pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  © 2025 Quantum 5D Consulting. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Email Collection Modal */}
      {selectedResource && (
        <EmailCollectionModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedResource(null)
          }}
          resource={selectedResource}
          onDownloadStart={() => {
            setDownloadingId(selectedResource.id)
            setTimeout(() => setDownloadingId(null), 2000)
          }}
        />
      )}
    </div>
  )
}