import React, { useState } from 'react'
import { Send, CheckCircle, AlertCircle, User, Mail, Building, Phone, MessageSquare } from 'lucide-react'
import { submitContactForm, ContactFormData } from '../services/contactApi'

interface ContactFormProps {
  className?: string
  variant?: 'full' | 'compact'
  onSuccess?: () => void
  onSubmitSuccess?: () => void
}

export function ContactForm({ className = '', variant = 'full', onSuccess, onSubmitSuccess }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    subject: '',
    source: 'website'
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error')
      setMessage('Please fill in all required fields')
      return
    }

    setStatus('loading')
    
    try {
      const result = await submitContactForm({
        ...formData,
        subject: formData.subject || `New inquiry from ${formData.name}`,
        source: 'website'
      })
      
      if (result.success) {
        setStatus('success')
        setMessage('Thank you for your message! We\'ll get back to you within 24 hours.')
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          message: '',
          subject: '',
          source: 'website'
        })
        onSuccess?.()
        onSubmitSuccess?.()
      } else {
        setStatus('error')
        setMessage(result.error?.message || 'Failed to send message. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('An error occurred. Please try again later.')
    }
  }

  const handleChange = (field: keyof ContactFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
  }

  if (status === 'success') {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-lg p-6 text-center ${className}`}>
        <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-green-900 mb-2">Message Sent Successfully!</h3>
        <p className="text-green-700">{message}</p>
        <button
          onClick={() => {
            setStatus('idle')
            setMessage('')
          }}
          className="mt-4 text-green-600 hover:text-green-800 font-medium"
        >
          Send Another Message
        </button>
      </div>
    )
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <User className="h-4 w-4" />
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange('name')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Mail className="h-4 w-4" />
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange('email')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="john@company.com"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="company" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Building className="h-4 w-4" />
              Company
            </label>
            <input
              type="text"
              id="company"
              value={formData.company}
              onChange={handleChange('company')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Your Company Name"
            />
          </div>

          <div>
            <label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Phone className="h-4 w-4" />
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleChange('phone')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="(555) 123-4567"
            />
          </div>
        </div>

        {variant === 'full' && (
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              value={formData.subject}
              onChange={handleChange('subject')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="How can we help you?"
            />
          </div>
        )}

        <div>
          <label htmlFor="message" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <MessageSquare className="h-4 w-4" />
            Message *
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={handleChange('message')}
            rows={variant === 'compact' ? 4 : 6}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            placeholder="Tell us about your project or how we can help..."
            required
          />
        </div>

        {status === 'error' && (
          <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-md">
            <AlertCircle className="h-4 w-4" />
            <span>{message}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-purple-600 text-white py-3 px-6 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {status === 'loading' ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              Sending...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Send Message
            </>
          )}
        </button>

        <p className="text-xs text-gray-500 text-center">
          We typically respond within 24 hours during business days.
        </p>
      </form>
    </div>
  )
}