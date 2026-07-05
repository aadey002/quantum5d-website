import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Calendar, User, Tag, ArrowLeft, AlertCircle } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { Helmet } from 'react-helmet-async'
import { fetchBlogPostBySlug, BlogPost } from '../services/blogApi'

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (slug) {
      loadBlogPost(slug)
    }
  }, [slug])

  const loadBlogPost = async (postSlug: string) => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetchBlogPostBySlug(postSlug)

      if (response.success) {
        setPost(response.data)
      } else {
        console.log('Blog post error:', response.error)
        setError(response.error?.message || 'Failed to load blog post')
      }
    } catch (err: any) {
      console.log('Blog post exception:', err)
      setError(err.message || 'Failed to load blog post')
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

  const buildArticleJsonLd = (blogPost: BlogPost) => {
    const baseUrl = 'https://quantum5dconsulting.com'
    return JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: blogPost.title,
      description: blogPost.seo.description || blogPost.excerpt,
      datePublished: blogPost.publishedAt,
      dateModified: blogPost.publishedAt,
      url: baseUrl + '/blog/' + blogPost.slug,
      image: blogPost.featuredImage || baseUrl + '/logo.png',
      author: {
        '@type': 'Person',
        name: 'Dr. Adetoro Oriaifo',
        jobTitle: 'Chief Pharmacy Officer',
        url: baseUrl + '/about'
      },
      publisher: {
        '@type': 'Organization',
        name: 'Quantum 5D Consulting',
        url: baseUrl,
        logo: {
          '@type': 'ImageObject',
          url: baseUrl + '/logo.png'
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': baseUrl + '/blog/' + blogPost.slug
      }
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading article...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {error === 'Blog post not found' ? 'Article Not Found' : 'Sample Article Unavailable'}
            </h2>
            <p className="text-gray-600 mb-4">
              {error === 'Blog post not found'
                ? 'The article you\'re looking for doesn\'t exist or has been moved.'
                : 'We\'re currently experiencing technical difficulties with our blog system. Please check our main blog page for available articles.'}
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Back to Blog</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const pageTitle = post.seo.title || (post.title + ' | Quantum 5D Consulting')
  const pageDescription = post.seo.description || post.excerpt
  const baseUrl = 'https://quantum5dconsulting.com'
  const pageUrl = baseUrl + '/blog/' + post.slug
  const pageImage = post.featuredImage || baseUrl + '/logo.png'

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={pageUrl} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={pageImage} />
        <meta property="og:site_name" content="Quantum 5D Consulting" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={pageImage} />

        <meta name="author" content="Dr. Adetoro Oriaifo" />
        <script type="application/ld+json">{buildArticleJsonLd(post)}</script>
      </Helmet>

      {/* Back Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium"
          >
            <ArrowLeft size={16} />
            <span>Back to Blog & Resources</span>
          </Link>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Article Header */}
          <div className="p-8 pb-6 border-b">
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center space-x-1">
                <User size={16} />
                <span>Dr. Adetoro Oriaifo, PharmD</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar size={16} />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">
                {post.category}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex items-center space-x-2 mt-6">
                <Tag size={16} className="text-gray-400" />
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Article Body */}
          <div className="p-8">
            {post.content.trim().startsWith('<') ? (
              <div
                className="prose prose-lg max-w-none prose-headings:text-purple-800 prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            ) : (
              <div className="prose prose-lg max-w-none prose-headings:text-purple-800 prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>
            )}
          </div>

          {/* Article Footer */}
          <div className="p-8 pt-6 border-t bg-gray-50">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Ready to Optimize Your Pharmacy Operations?
              </h3>
              <p className="text-gray-600 mb-4">
                Contact our team for a free consultation and discover how we can help your organization achieve its goals.
              </p>
              <div className="space-x-4">
                <Link
                  to="/contact?service=Blog%20Inquiry&openModal=true"
                  className="inline-block bg-purple-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-purple-700 transition-colors"
                >
                  Schedule Consultation
                </Link>
                <Link
                  to="/services"
                  className="inline-block border border-purple-600 text-purple-600 px-6 py-3 rounded-md font-semibold hover:bg-purple-50 transition-colors"
                >
                  View Services
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles CTA */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Explore More Expert Insights
          </h3>
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium"
          >
            <span>View All Articles</span>
            <ArrowLeft size={16} className="transform rotate-180" />
          </Link>
        </div>
      </article>
    </div>
  )
}
