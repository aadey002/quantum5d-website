import React, { useState } from 'react'
import { Mail, CheckCircle, AlertCircle } from 'lucide-react'
import { subscribeToNewsletter } from '../lib/supabase'

interface NewsletterSignupProps {
  className?: string
  size?: 'small' | 'medium' | 'large'
  showName?: boolean
  showOrganization?: boolean
  placeholder?: string
}

export function NewsletterSignup({ 
  className = '', 
  size = 'medium', 
  showName = false, 
  showOrganization = false,
  placeholder = 'Enter your email'
}: NewsletterSignupProps) {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    organization: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setStatus('idle')
    setMessage('')
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.email) {
      setStatus('error')
      setMessage('Email address is required')
      return
    }

    if (!validateEmail(formData.email)) {
      setStatus('error')
      setMessage('Please enter a valid email address')
      return
    }

    setIsSubmitting(true)
    setStatus('idle')
    setMessage('')

    try {
      await subscribeToNewsletter({
        email: formData.email,
        name: formData.name || undefined,
        organization: formData.organization || undefined,
        interests: ['Newsletter Subscription']
      })

      setStatus('success')
      setMessage('Thank you for subscribing! Check your email for confirmation.')
      setFormData({ email: '', name: '', organization: '' })
    } catch (err: any) {
      setStatus('error')
      if (err.message?.includes('already subscribed')) {
        setMessage('This email is already subscribed to our newsletter.')
      } else {
        setMessage(err.message || 'Failed to subscribe. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const sizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  }

  const inputSizeClasses = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-4 py-3 text-base',
    large: 'px-6 py-4 text-lg'
  }

  return (
    <div className={`${className}`}>
      {status === 'success' ? (
        <div className="flex items-center space-x-2 text-green-600">
          <CheckCircle className="h-5 w-5" />
          <span className={sizeClasses[size]}>{message}</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {showName && (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your name"
              className={`w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${inputSizeClasses[size]}`}
            />
          )}
          
          {showOrganization && (
            <input
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleInputChange}
              placeholder="Your organization"
              className={`w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${inputSizeClasses[size]}`}
            />
          )}
          
          <div className="flex space-x-2">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder={placeholder}
              className={`flex-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${inputSizeClasses[size]}`}
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center ${inputSizeClasses[size]} min-w-[100px]`}
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  Subscribe
                </>
              )}
            </button>
          </div>
          
          {status === 'error' && (
            <div className="flex items-center space-x-2 text-red-600">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">{message}</span>
            </div>
          )}
        </form>
      )}
    </div>
  )
}
