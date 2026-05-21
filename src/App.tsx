import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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

function App() {
  React.useEffect(() => {
    // Initialize floating ball functionality
    const ball = document.getElementById('minimax-floating-ball');
    if (!ball) return;

    // Initial animation
    ball.style.opacity = '0';
    ball.style.transform = 'translateY(20px)';

    setTimeout(() => {
      ball.style.opacity = '1';
      ball.style.transform = 'translateY(0)';
    }, 500);

    // Handle logo click
    const ballContent = ball.querySelector('.minimax-ball-content');
    if (ballContent) {
      ballContent.addEventListener('click', function (e) {
        e.stopPropagation();
        window.open('https://agent.minimax.io/agent', '_blank');
        ball.style.transform = 'scale(0.95)';
        setTimeout(() => {
          ball.style.transform = 'scale(1)';
        }, 100);
      });
    }

    // Handle close button click
    const closeIcon = ball.querySelector('.minimax-close-icon');
    if (closeIcon) {
      closeIcon.addEventListener('click', function (e) {
        e.stopPropagation();
        ball.style.opacity = '0';
        ball.style.transform = 'translateY(20px)';

        setTimeout(() => {
          ball.style.display = 'none';
        }, 300);
      });
    }
  }, []);

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
        </Routes>
        <Footer />
        
        {/* MiniMax floating ball */}
        <div id="minimax-floating-ball">
          <div className="minimax-ball-content">
            <div className="minimax-logo-wave"></div>
            <span className="minimax-ball-text">Created by MiniMax Agent</span>
          </div>
          <div className="minimax-close-icon">×</div>
        </div>
        </div>
      </Router>
    </HelmetProvider>
  )
}

export default App