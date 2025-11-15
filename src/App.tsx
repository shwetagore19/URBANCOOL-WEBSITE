import { useState } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'dashboard'>('landing');

  return (
    <div className="min-h-screen">
      {currentPage === 'landing' ? (
        <LandingPage onGetStarted={() => setCurrentPage('dashboard')} />
      ) : (
        <Dashboard onBackToHome={() => setCurrentPage('landing')} />
      )}
    </div>
  );
}
