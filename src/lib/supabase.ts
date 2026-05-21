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
    const response = await fetch(`${supabaseUrl}/functions/v1/resource-download-tracker?action=track-download`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`
      },
      body: JSON.stringify({
        ...data,
        ipAddress: await getClientIP(),
        userAgent: navigator.userAgent,
        referrerUrl: document.referrer || window.location.href
      })
    });

    if (!response.ok) {
      console.warn('Failed to track download, proceeding without tracking');
      return { success: true, fallback: true };
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.warn('Error tracking download, proceeding without tracking:', error);
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
