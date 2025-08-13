import React, { useState } from 'react';
import { MapPin, Shield, BarChart3, FileText, Users, AlertTriangle, MessageSquare } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import ReportForm from './components/ReportForm';
import MapVisualization from './components/MapVisualization';
import Dashboard from './components/Dashboard';
import Resources from './components/Resources';
import CommunityStories from './components/CommunityStories';
import VoiceEmergency from './components/VoiceEmergency';
import EmergencyProtocol from './components/EmergencyProtocol';
import LiveLocationTracker from './components/LiveLocationTracker';
import SubmittedReports from './components/SubmittedReports';
import { Report } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [emergencyTrigger, setEmergencyTrigger] = useState<string | null>(null);
  const [reports, setReports] = useState<Report[]>([
    {
      id: 1,
      type: 'Verbal Harassment',
      location: { lat: 40.7128, lng: -74.0060, address: 'Downtown Manhattan' },
      date: '2024-01-15',
      time: '18:30',
      severity: 'medium'
    },
    {
      id: 2,
      type: 'Sexual Harassment',
      location: { lat: 40.7589, lng: -73.9851, address: 'Central Park Area' },
      date: '2024-01-14',
      time: '20:15',
      severity: 'high'
    },
    {
      id: 3,
      type: 'Cyberbullying',
      location: { lat: 40.6782, lng: -73.9442, address: 'Brooklyn Heights' },
      date: '2024-01-13',
      time: '14:20',
      severity: 'low'
    },
    {
      id: 4,
      type: 'Stalking',
      location: { lat: 40.7505, lng: -73.9934, address: 'Times Square' },
      date: '2024-01-12',
      time: '19:45',
      severity: 'high'
    }
  ]);

  const addReport = (newReport: Omit<Report, 'id' | 'date'>) => {
    const report = {
      ...newReport,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0]
    };
    setReports(prev => [...prev, report]);
  };

  const handleEmergencyTriggered = (trigger: string) => {
    setEmergencyTrigger(trigger);
  };

  const closeEmergencyProtocol = () => {
    setEmergencyTrigger(null);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'report':
        return <ReportForm onSubmit={addReport} onCancel={() => setActiveTab('home')} />;
      case 'map':
        return <MapVisualization reports={reports} />;
      case 'dashboard':
        return <Dashboard reports={reports} />;
      case 'resources':
        return <Resources />;
      case 'stories':
        return <CommunityStories />;
      case 'voice-safety':
        return <VoiceEmergency onEmergencyTriggered={handleEmergencyTriggered} />;
      case 'live-location':
        return <LiveLocationTracker onLocationUpdate={(location) => console.log('Location update:', location)} />;
      case 'submitted-reports':
        return <SubmittedReports reports={reports} />;
      default:
        return <Hero onReportClick={() => setActiveTab('report')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="pb-8">
        {renderContent()}
      </main>

      {/* Emergency Protocol Modal */}
      {emergencyTrigger && (
        <EmergencyProtocol 
          trigger={emergencyTrigger} 
          onClose={closeEmergencyProtocol} 
        />
      )}

      {/* Quick Stats Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-gray-600">
              <FileText size={14} />
              <span>{reports.length} Reports</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-600">
              <MessageSquare size={14} />
              <span>Community Stories</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-600">
              <Users size={14} />
              <span>Anonymous & Safe</span>
            </div>
          </div>
          <div className="text-gray-500">
            Your privacy is protected
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;