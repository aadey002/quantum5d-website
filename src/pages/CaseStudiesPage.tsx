import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, TrendingUp, DollarSign, CheckCircle, Users } from 'lucide-react'
import { SEO } from '../components/SEO'

export function CaseStudiesPage() {
  const caseStudies = [
    {
      id: 1,
      title: "Expanding Covered Entities Access to Medications without Additional Overhead Cost",
      client: "340B Covered Entity",
      challenge: "A Covered Entity was seeking additional cost savings to maximize pharmacy efficiencies, further stretch scarce federal resources and minimize pharmacy operational expenses. Less than 20% of annual drug purchases were from the 340B wholesaler account, with over 80% from retail accounts despite 90% of prescriptions being written by CE providers.",
      solution: "Conducted comprehensive audit of 340B program and TPA provider list. Discovered missing providers on TPA list and recommended Medicaid carve-in strategy. Worked with TPA to requalify missed 340B claims over 3 years and implemented program optimization.",
      results: [
        "$6 Million of 340B discounted drugs made available for purchase",
        "Reduced annual cost of goods per prescription from $86 to $67",
        "Total drug spend reduced by over $1 million in six months",
        "340B spend increased to 74%, retail spend reduced 26%"
      ],
      category: "340B Optimization"
    },
    {
      id: 2,
      title: "Covered Entity Overcomes Challenges of Contract Pharmacy Non-Compliance",
      client: "Large Contract Pharmacy Network",
      challenge: "CE had gone several years without appropriate oversight for its large contract pharmacy network. Audit uncovered that nearly a third of registered contract pharmacy locations had no active dispensations, and several were non-compliant with HRSA requirements with effective dates before PSA signing.",
      solution: "Conducted comprehensive audit of contract pharmacy operations across multiple split-billing systems. Removed inactive locations, addressed compliance issues, and developed focused contract pharmacy strategy based on e-prescribing data and prescription volume analysis.",
      results: [
        "Updated OPAIS database to remove all low/no volume locations",
        "Eliminated multiple contract pharmacy relationships and split-billing providers",
        "Created focused contract pharmacy strategy based on prescription data",
        "Established long-term success framework in six months"
      ],
      category: "Regulatory Compliance"
    },
    {
      id: 3,
      title: "Increase Organizational Financial Sustainability by Adding Ambulatory Pharmacy Services",
      client: "Non-profit Outpatient Opioid Detox and Urgent Care Center",
      challenge: "Organization needed to add an outpatient pharmacy service line to serve its patients and improve financial sustainability while advancing patient care quality.",
      solution: "Developed and implemented comprehensive business plan including pharmacy build-out, licensing (State board, CDS), computer software implementation, operations compliance (policies and procedures, workflow design), contract with drug supplier, and staff hiring and training.",
      results: [
        "Pharmacy licensed by all required agencies within 90 days",
        "Successfully implemented new pharmacy management system",
        "Trained staff and made pharmacy operational",
        "Increased patient and staff satisfaction significantly"
      ],
      category: "Pharmacy Operations"
    },
    {
      id: 4,
      title: "Expansion of Services by Adding New Clinic Sites",
      client: "Federally Qualified Health Center (FQHC)",
      challenge: "Local FQHC needed to expand services into two new locations to reach more eligible patients and provide more comprehensive services. Required navigation of complex HRSA Add a site to scope process and UDS Mapper requirements.",
      solution: "Assisted with complete HRSA Add a site to scope process, gathered required information and supportive documents, navigated UDS mapper to provide evidence supporting the request, and ensured proper submission in EHB.",
      results: [
        "Successfully completed Add a site to scope documentation",
        "Provided detailed UDS Mapper evidence and justification",
        "Quick turnaround for EHB application submission",
        "Received approval on first submission for both sites"
      ],
      category: "Business Expansion"
    },
    {
      id: 5,
      title: "Internal, Integrated Specialty Pharmacy Strategy Improves Patient Care",
      client: "Federally Qualified Health Center (FQHC)",
      challenge: "FQHC faced low HIV medication adherence and low HEP-C therapy completion rates. Needed to create internal integrated specialty pharmacy to serve HIV/HEP-C patient population and improve quality of care while increasing 340B savings.",
      solution: "Conducted pharmacy assessment, created comprehensive plan for new specialty pharmacy including location, software, staff, and training. Secured ACHC accreditation with zero findings within 6 months and implemented integrated workflow with clinical providers.",
      results: [
        "Immediate improvement in continuity of care with reduced patient loss",
        "100% increase in medical staff and patient satisfaction",
        "Over $1.3 million annually in HEP-C medication revenues for 3 years",
        "90% patient enrollment with treatment initiation, 100% completion rate",
        "SVR-12 return rate increased from <20% to 57%"
      ],
      category: "Specialty Pharmacy"
    }
  ]

  return (
    <div className="min-h-screen">
      <SEO 
        title="Proven 340B Success Stories & Results - Quantum 5D Consulting"
        description="Real case studies showing $6M+ in 340B savings generated, 98% compliance success rate, and transformational results for healthcare organizations nationwide."
        path="/case-studies"
        image="/images/services/340b-program.jpg"
        googleAnalyticsId="G-1KGZ0633K4"
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Success Stories & Case Studies
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-4xl mx-auto">
              Discover how our expert pharmacy consulting has helped organizations achieve remarkable results and transform their operations.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 bg-white text-purple-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <span>Discuss Your Project</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Results Overview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Proven Results Across Healthcare Organizations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our track record speaks for itself - measurable improvements in savings, compliance, and operational efficiency.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">$6M+</h3>
              <p className="text-gray-600">340B Savings Generated</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">98%</h3>
              <p className="text-gray-600">Compliance Success Rate</p>
            </div>
            

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">85%</h3>
              <p className="text-gray-600">Average Efficiency Improvement</p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Case Studies
            </h2>
            <p className="text-xl text-gray-600">
              Real-world examples of how we've helped organizations achieve their goals.
            </p>
          </div>
          
          <div className="space-y-12">
            {caseStudies.map((study, index) => (
              <div key={study.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
                        {study.category}
                      </span>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{study.title}</h3>
                      <p className="text-gray-600 font-medium">{study.client}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Challenge</h4>
                      <p className="text-gray-600">{study.challenge}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Solution</h4>
                      <p className="text-gray-600">{study.solution}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Results</h4>
                      <ul className="space-y-2">
                        {study.results.map((result, resultIndex) => (
                          <li key={resultIndex} className="flex items-start space-x-2">
                            <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5" />
                            <span className="text-gray-600">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Create Your Success Story?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
            Let's discuss how our proven strategies can help your organization achieve similar results.
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
              to="/free-assessment"
              className="inline-flex items-center space-x-2 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-900 transition-colors"
            >
              <span>Get Free Assessment</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}