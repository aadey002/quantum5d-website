import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { BlogListPage } from './pages/BlogListPage'
import { BlogPostPage } from './pages/BlogPostPage'
import { IRAImpact340BPage } from './pages/IRAImpact340BPage'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { ServicesPage } from './pages/ServicesPage'
import { ContactPage } from './pages/ContactPage'
import { ApprenticeshipPage } from './pages/ApprenticeshipPage'
import { CaseStudiesPage } from './pages/CaseStudiesPage'
import { ResourcesPage } from './pages/ResourcesPage'
import { Navigation } from './components/Navigation'
import { Footer } from './components/Footer'
import './App.css'

function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
      <Link to="/" className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors">
        Back to Home
      </Link>
    </div>
  )
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-white">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/apprenticeship" element={<ApprenticeshipPage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/ira-impact-340b-entities" element={<IRAImpact340BPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<ContactPage />} />
          <Route path="/terms" element={<ContactPage />} />
          <Route path="/free-assessment" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
        </div>
      </Router>
    </HelmetProvider>
  )
}

export default App