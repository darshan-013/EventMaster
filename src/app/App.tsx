import { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import EventForm from './components/EventForm';
import EventList from './components/EventList';
import UpcomingEvents from './components/UpcomingEvents';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'event-list':
        return <EventList />;
      case 'upcoming-events':
        return <UpcomingEvents />;
      case 'create-event':
        return <EventForm onNavigate={setCurrentPage} />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}
