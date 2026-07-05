const API_BASE_URL = 'https://kolxfjisvizwayyrlzyx.supabase.co/functions/v1'
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvbHhmamlzdml6d2F5eXJsenl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxMzI0MzAsImV4cCI6MjA2NzcwODQzMH0.7dG4aLMWc25eXyMT4f1PkQgQtZiDzSntQW0Js-IDZ7c'

export interface ContactFormData {
  name: string
  email: string
  company?: string
  phone?: string
  message: string
  subject?: string
  source?: string
}

export interface NewsletterSignupData {
  email: string
  name?: string
  interests?: string[]
  source?: string
}

export interface ContactResponse {
  success: boolean
  data?: {
    id: string
    status: string
    message: string
  }
  error?: {
    code: string
    message: string
  }
}

export async function submitContactForm(formData: ContactFormData): Promise<ContactResponse> {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        organization: formData.company || '',
        email: formData.email,
        message: (formData.subject ? formData.subject + ': ' : '') + formData.message,
      })
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
      return {
        success: false,
        error: {
          code: 'SUBMIT_ERROR',
          message: result.error || 'Failed to send your message. Please try again.'
        }
      }
    }

    return {
      success: true,
      data: {
        id: 'lead-' + Date.now(),
        status: 'received',
        message: 'Thank you for your message! We will be in touch shortly.'
      }
    }
  } catch (error) {
    console.error('Contact form submission error:', error)
    return {
      success: false,
      error: {
        code: 'NETWORK_ERROR',
        message: 'Network error — please try again or call (410) 921-3989.'
      }
    }
  }
}

export async function signupNewsletter(signupData: NewsletterSignupData): Promise<ContactResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/subscriber-management-public`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ANON_KEY}`,
      },
      body: JSON.stringify({
        action: 'subscribe',
        ...signupData,
        source: signupData.source || 'website',
        subscribed_at: new Date().toISOString(),
        preferences: {
          email_frequency: 'weekly',
          content_types: signupData.interests || ['business_insights', 'industry_news'],
          marketing_emails: true
        }
      })
    })
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: { message: 'Unknown error' } }))
      
      // Handle duplicate email as success case
      if (response.status === 400 && errorData.error?.code === 'DUPLICATE_EMAIL') {
        return {
          success: true,
          data: {
            id: 'existing-' + Date.now(),
            status: 'already_subscribed',
            message: 'You are already subscribed to our newsletter. Thank you for your continued interest!'
          }
        }
      }
      
      console.warn('Failed to signup for newsletter via API, providing fallback')
      return {
        success: true,
        data: {
          id: 'fallback-' + Date.now(),
          status: 'subscribed',
          message: 'Thank you for your interest! Please contact us at info@quantum5dconsulting.com to subscribe to our newsletter.'
        }
      }
    }
    
    const result = await response.json()
    
    // Trigger welcome email sequence
    if (result.success) {
      try {
        await fetch(`${API_BASE_URL}/enhanced-email-automation?action=welcome-sequence`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ANON_KEY}`,
          },
          body: JSON.stringify({
            subscriberId: result.data?.id,
            subscriberEmail: signupData.email,
            subscriberName: signupData.name,
            customizations: {
              interests: signupData.interests,
              source: signupData.source
            }
          })
        })
      } catch (welcomeError) {
        console.warn('Welcome email sequence failed to trigger:', welcomeError)
      }
    }
    
    return result
  } catch (error) {
    console.warn('Newsletter signup error, providing fallback:', error)
    return {
      success: true,
      data: {
        id: 'fallback-' + Date.now(),
        status: 'subscribed',
        message: 'Thank you for your interest! Please contact us at info@quantum5dconsulting.com to subscribe to our newsletter.'
      }
    }
  }
}

export async function unsubscribeNewsletter(email: string, reason?: string): Promise<ContactResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/subscriber-management-public`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'unsubscribe',
        email,
        reason,
        unsubscribed_at: new Date().toISOString()
      })
    })
    
    if (!response.ok) {
      throw new Error(`Failed to unsubscribe: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error)
    return {
      success: false,
      error: {
        code: 'UNSUBSCRIBE_ERROR',
        message: error instanceof Error ? error.message : 'Failed to unsubscribe'
      }
    }
  }
}