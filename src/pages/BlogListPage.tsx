import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, User, ArrowRight, AlertCircle } from 'lucide-react'
import { fetchBlogPosts, BlogPost } from '../services/blogApi'
import { NewsletterSignup } from '../components/NewsletterSignup'
import { SEO } from '../components/SEO'

export function BlogListPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    loadBlogPosts()
  }, [])

  const loadBlogPosts = async (pageNum = 1) => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetchBlogPosts(pageNum, 10)
      
      if (response.success) {
        // Sort posts to put featured posts first
        const sortedPosts = response.data.posts.sort((a, b) => {
          if (a.is_featured && !b.is_featured) return -1
          if (!a.is_featured && b.is_featured) return 1
          return new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime()
        })
        setPosts(sortedPosts)
        setHasMore(response.data.pagination.hasMore)
        setPage(pageNum)
      } else {
        setError('Failed to load blog posts')
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load blog posts')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Blog structured data
  const blogStructuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Quantum 5D Blog",
    "url": "https://quantum5dconsulting.com/blog",
    "description": "Expert insights into pharmacy consulting, 340B optimization, and regulatory compliance."
  }

  if (loading && posts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading blog posts...</p>
          </div>
        </div>
      </div>
    )
  }

  // The error state will only show if there are no posts to display
  // If we have mock data available, we'll continue to show that instead of an error
  if (error && posts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Using Sample Blog Content</h2>
            <p className="text-gray-600 mb-4">We're currently displaying sample content while our blog database is being updated.</p>
            <button
              onClick={() => loadBlogPosts()}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Pharmacy Consulting Insights & 340B Compliance Tips | Quantum 5D Blog"
        description="Explore expert insights from Quantum 5D Consulting on 340B optimization, regulatory compliance, and pharmacy technician development. Stay informed with the latest pharmacy strategies."
        path="/blog"
        image="/images/services/regulatory-compliance.jpg"
        structuredData={blogStructuredData}
        googleAnalyticsId="G-1KGZ0633K4"
      />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-900 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Latest Insights on 340B Optimization & Pharmacy Consulting
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Explore expert insights from Quantum 5D Consulting on 340B optimization, regulatory compliance, and pharmacy technician development.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Featured Articles Section */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Featured Articles
          </h2>
          
          {/* Dynamic Featured Posts */}
          {posts.length > 0 ? (
            <>
              {/* Display featured posts prominently */}
              {posts.filter(post => post.is_featured).length > 0 && (
                <div className="mb-12">
                  {posts.filter(post => post.is_featured).map((post) => (
                    <div key={post.id} className="relative bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-xl shadow-lg border-2 border-purple-200 mb-8 hover:shadow-xl transition-all duration-300">
                      {/* Featured Badge */}
                      <div className="absolute top-4 right-4 bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold z-10">
                        FEATURED
                      </div>
                      
                      <div className="flex flex-col lg:flex-row gap-8">
                        {/* Image */}
                        {post.featuredImage && (
                          <div className="lg:w-1/3">
                            <img 
                              src={post.featuredImage} 
                              alt={post.title}
                              className="w-full h-64 lg:h-48 object-cover rounded-lg shadow-md"
                            />
                          </div>
                        )}
                        
                        {/* Content */}
                        <div className={post.featuredImage ? 'lg:w-2/3' : 'w-full'}>
                          <div className="mb-4">
                            <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                              {post.category}
                            </span>
                          </div>
                          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                            <Link to={`/blog/${post.slug}`} className="hover:text-purple-600 transition-colors">
                              {post.title}
                            </Link>
                          </h3>
                          <p className="text-gray-700 text-lg mb-6 leading-relaxed line-clamp-3">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                              <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                            </div>
                            <Link 
                              to={`/blog/${post.slug}`} 
                              className="inline-flex items-center bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                            >
                              Read Full Article
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Regular Articles Grid */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {posts.filter(post => post.is_featured).length > 0 ? 'More Articles' : 'Latest Articles'}
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.filter(post => !post.is_featured).map((post) => (
                  <div key={post.id} className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                    {post.featuredImage && (
                      <img 
                        src={post.featuredImage} 
                        alt={post.title}
                        className="w-full h-48 object-cover rounded-lg mb-6"
                      />
                    )}
                    <div className="mb-4">
                      <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      <Link to={`/blog/${post.slug}`} className="hover:text-purple-600 transition-colors">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                      </div>
                      <Link to={`/blog/${post.slug}`} className="text-purple-600 hover:text-purple-700 font-medium">
                        Read more →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Fallback static content when API is not available */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Static Featured Article - Pharmacy Consulting */}
              <div className="md:col-span-2 lg:col-span-3 relative bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-xl shadow-lg border-2 border-purple-200 mb-8">
                <div className="absolute top-4 right-4 bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold z-10">
                  FEATURED
                </div>
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-1/3">
                    <img 
                      src="/images/services/340b-program.jpg" 
                      alt="Top 10 Pharmacy Consulting Firms Revolutionizing 340B Programs in 2025"
                      className="w-full h-64 lg:h-48 object-cover rounded-lg shadow-md"
                    />
                  </div>
                  <div className="lg:w-2/3">
                    <div className="mb-4">
                      <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                        340B Consulting
                      </span>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                      <Link to="/blog/top-10-pharmacy-consulting-firms-revolutionizing-340b-programs-2025" className="hover:text-purple-600 transition-colors">
                        Top 10 Pharmacy Consulting Firms Revolutionizing 340B Programs in 2025
                      </Link>
                    </h3>
                    <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                      Comprehensive analysis of the leading 340B consulting firms helping healthcare organizations navigate regulatory complexity while maximizing financial benefits in 2025's challenging environment.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        <span>Dr. Adetoro Oriaifo, PharmD • August 27, 2025</span>
                      </div>
                      <Link 
                        to="/blog/top-10-pharmacy-consulting-firms-revolutionizing-340b-programs-2025" 
                        className="inline-flex items-center bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                      >
                        Read Full Article
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Other static articles in smaller cards */}
              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <img 
                  src="/images/services/340b-program.jpg" 
                  alt="340B manufacturer restrictions and their impact on covered entities" 
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />
                <div className="mb-4">
                  <span className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold mb-2">
                    NEW
                  </span>
                  <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium ml-2">
                    340B Compliance
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Manufacturer Restrictions: Impact on Covered Entities
                </h3>
                <p className="text-gray-600 mb-6">
                  Learn how 340B manufacturer restrictions from AstraZeneca, Sanofi, Novartis, and Eli Lilly impact covered entities' access to discounted medications.
                </p>
                <div className="text-sm text-gray-500 mb-4">
                  <span>Dr. Adetoro Oriaifo, PharmD • August 15, 2025</span>
                </div>
                <Link to="/blog/manufacturer-restrictions-impact" className="text-purple-600 hover:text-purple-700 font-medium">
                  Read about manufacturer restrictions →
                </Link>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <img 
                  src="/images/services/pharmacy-buildout-real.png" 
                  alt="Onsite pharmacy setup with 340B pharmacy management consultant guidance" 
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />
                <div className="mb-4">
                  <span className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold mb-2">
                    NEW
                  </span>
                  <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium ml-2">
                    Pharmacy Operations
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Opening an Onsite Pharmacy? Why You Need a 340B Pharmacy Management Consultant
                </h3>
                <p className="text-gray-600 mb-6">
                  Discover why hiring a 340B pharmacy management consultant is essential for successfully setting up and managing an onsite pharmacy.
                </p>
                <div className="text-sm text-gray-500 mb-4">
                  <span>Dr. Adetoro Oriaifo, PharmD • August 15, 2025</span>
                </div>
                <Link to="/blog/onsite-pharmacy-consultant" className="text-purple-600 hover:text-purple-700 font-medium">
                  Learn about pharmacy consulting →
                </Link>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <img 
                  src="/images/services/regulatory-compliance.jpg" 
                  alt="340B program optimization guide with strategies for healthcare organizations" 
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Ultimate Guide to 340B Program Optimization
                </h3>
                <p className="text-gray-600 mb-6">
                  Learn how to increase savings, improve compliance, and streamline 340B operations in your healthcare organization.
                </p>
                <Link to="/blog/340b-program-optimization-guide" className="text-purple-600 hover:text-purple-700 font-medium">
                  Read the full 340B optimization guide →
                </Link>
              </div>
            </div>
          )}
        </section>

        {/* Get More Resources & Templates Section */}
        <section className="mb-16 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
            Get More Resources & Templates
          </h2>
          <p className="text-xl text-gray-600 mb-8 text-center">
            Download checklists, assessment templates, and practical tools to optimize your pharmacy operations.
          </p>
          <div className="text-center">
            <p>
              <a href="/resources" className="inline-flex items-center space-x-2 bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                Browse all resources →
              </a>
            </p>
          </div>
        </section>

        {/* Need Help With Your Pharmacy Strategy? CTA */}
        <section className="bg-purple-900 text-white p-8 rounded-lg">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Need Help With Your Pharmacy Strategy?
          </h2>
          <p className="text-xl text-purple-100 mb-8 text-center">
            Schedule a free consultation with our experts to discuss 340B optimization, regulatory compliance, or staff development.
          </p>
          <div className="text-center">
            <p>
              <a href="/contact" className="inline-flex items-center space-x-2 bg-white text-purple-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Schedule Free Consultation →
              </a>
            </p>
          </div>
        </section>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gray-100 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Stay Updated with Industry Insights</h3>
          <p className="text-gray-600 mb-6">
            Subscribe to receive monthly expert insights and industry updates delivered to your inbox.
          </p>
          <div className="max-w-md mx-auto">
            <NewsletterSignup 
              size="medium"
              placeholder="Enter your email"
              className="blog-newsletter"
            />
          </div>
        </div>
      </div>
    </div>
  )
}