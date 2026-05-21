import { supabase } from '../lib/supabase'

export interface BlogPost {
  id: number
  title: string
  content: string
  excerpt: string
  slug: string
  featuredImage?: string
  is_featured: boolean
  seo: {
    title: string
    description: string
    keywords: string[]
  }
  category: string
  tags: string[]
  publishedAt: string
  createdAt: string
  url: string
}

export interface BlogListResponse {
  success: boolean
  data: {
    posts: BlogPost[]
    pagination: {
      page: number
      limit: number
      total: number
      hasMore: boolean
    }
  }
}

export interface BlogPostResponse {
  success: boolean
  data: BlogPost
  error?: {
    code: string
    message: string
  }
}

// Transform database post to BlogPost format
const transformPost = (dbPost: any): BlogPost => {
  return {
    id: dbPost.id,
    title: dbPost.title,
    content: dbPost.content,
    excerpt: dbPost.excerpt || dbPost.content?.substring(0, 200) + '...' || '',
    slug: dbPost.slug,
    featuredImage: dbPost.featured_image_url,
    is_featured: dbPost.is_featured || false,
    seo: {
      title: dbPost.seo_title || dbPost.title,
      description: dbPost.seo_description || dbPost.excerpt || '',
      keywords: dbPost.seo_keywords || []
    },
    category: dbPost.category || 'General',
    tags: dbPost.tags || [],
    publishedAt: dbPost.published_at || dbPost.created_at,
    createdAt: dbPost.created_at,
    url: `/blog/${dbPost.slug}`
  }
}

// Fetch blog posts with pagination
export const fetchBlogPosts = async (page: number = 1, limit: number = 10): Promise<BlogListResponse> => {
  try {
    console.log('Fetching blog posts from database...');
    
    // Get total count
    const { count, error: countError } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'published')
    
    if (countError) {
      console.error('Error getting count:', countError);
      throw countError;
    }
    
    // Get posts with pagination
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1)
    
    if (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
    
    const posts = (data || []).map(transformPost)
    const total = count || 0
    
    console.log(`Successfully fetched ${posts.length} posts`);
    
    return {
      success: true,
      data: {
        posts,
        pagination: {
          page,
          limit,
          total,
          hasMore: page * limit < total
        }
      }
    }
    
  } catch (error) {
    console.error('Failed to fetch blog posts:', error)
    
    // Return mock data as fallback
    console.log('Using mock blog posts as fallback:', error)
    return {
      success: false,
      data: {
        posts: MOCK_BLOG_POSTS,
        pagination: {
          page: 1,
          limit: 10,
          total: MOCK_BLOG_POSTS.length,
          hasMore: false
        }
      }
    }
  }
}

// Fetch a single blog post by slug
export const fetchBlogPostBySlug = async (slug: string): Promise<BlogPostResponse> => {
  try {
    console.log(`Fetching blog post by slug: ${slug}`);
    
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()
    
    if (error) {
      console.error('Error fetching post by slug:', error);
      throw error;
    }
    
    const post = transformPost(data)
    
    console.log(`Successfully fetched post: ${post.title}`);
    
    return {
      success: true,
      data: post
    }
    
  } catch (error) {
    console.error(`Failed to fetch blog post by slug ${slug}:`, error)
    
    // Try to find in mock data
    const mockPost = MOCK_BLOG_POSTS.find(p => p.slug === slug)
    if (mockPost) {
      console.log('Using mock blog post as fallback');
      return {
        success: true,
        data: mockPost
      }
    }
    
    return {
      success: false,
      data: {} as BlogPost,
      error: {
        code: 'POST_NOT_FOUND',
        message: 'Blog post not found'
      }
    }
  }
}

// Mock data for fallback when the API is not available
const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 6,
    title: 'Purpose of Contract Pharmacies',
    content: `<p>According to the HRSA 1996 Guidance on contract pharmacy partnerships, the goal of partnering with contract pharmacies is to allow Covered Entities (CE) dispense outpatient 340B discounted drugs at other pharmacies outside their four walls to generate 340B savings to help:</p>`,
    excerpt: 'Learn about the purpose and types of contract pharmacies in 340B programs.',
    slug: 'purpose-of-contract-pharmacies',
    is_featured: false,
    seo: {
      title: 'Purpose of Contract Pharmacies - 340B Program Guide',
      description: 'Understanding contract pharmacy partnerships in 340B programs',
      keywords: ['340B', 'contract pharmacy', 'HRSA']
    },
    category: '340B Program',
    tags: ['340B', 'Contract Pharmacy'],
    publishedAt: '2025-01-15T10:00:00Z',
    createdAt: '2025-01-15T09:00:00Z',
    url: '/blog/purpose-of-contract-pharmacies'
  }
]