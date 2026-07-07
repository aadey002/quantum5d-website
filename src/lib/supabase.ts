import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kolxfjisvizwayyrlzyx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvbHhmamlzdml6d2F5eXJsenl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxMzI0MzAsImV4cCI6MjA2NzcwODQzMH0.7dG4aLMWc25eXyMT4f1PkQgQtZiDzSntQW0Js-IDZ7c'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Email collection and resource download tracking
export const trackResourceDownload = async (data: {
  email: string;
  name?: string;
  organization?: string;
  interests?: string[];
  resourceName: string;
  resourceType: string;
  resourceCategory: string;
  downloadUrl: string;
}) => {
  try {
    // Save as a lead via /api/contact
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.name || 'Resource Download',
        organization: data.organization || '',
        email: data.email,
        message: 'Resource download: ' + data.resourceName + ' (' + data.resourceType + ', ' + data.resourceCategory + ')',
      })
    });

    // Also track the download event
    fetch('/api/track-event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_type: 'resource_download',
        event_name: data.resourceName,
        site: 'quantum5dconsulting.com',
        metadata: { url: data.downloadUrl, email: data.email, category: data.resourceCategory }
      })
    }).catch(() => {});

    if (!response.ok) {
      return { success: true, fallback: true };
    }

    return await response.json();
  } catch (error) {
    console.warn('Error tracking download:', error);
    return { success: true, fallback: true };
  }
};

// Subscribe to newsletter
export const subscribeToNewsletter = async (data: {
  email: string;
  name?: string;
  organization?: string;
  role?: string;
  interests?: string[];
}) => {
  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/subscriber-management-public?action=subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      console.warn('Failed to subscribe to newsletter, proceeding with fallback');
      return { success: true, fallback: true, message: 'Thank you for your interest! Please contact us directly at info@quantum5dconsulting.com to subscribe.' };
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.warn('Error subscribing to newsletter, proceeding with fallback:', error);
    return { success: true, fallback: true, message: 'Thank you for your interest! Please contact us directly at info@quantum5dconsulting.com to subscribe.' };
  }
};

// Get client IP address (best effort)
const getClientIP = async (): Promise<string> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch {
    return '0.0.0.0';
  }
};
