import React from 'react';
import { Shield, MapPin, Users, Lock } from 'lucide-react';

interface HeroProps {
  onReportClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onReportClick }) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Main Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
            Safe. Anonymous.
            <span className="text-blue-600 block">Empowering.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Create safer communities by sharing your experiences anonymously. 
            Help identify patterns, support others, and drive positive change.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={onReportClick}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Report an Incident
            </button>
            <div className="flex flex-col sm:flex-row gap-2">
              <button 
                onClick={() => window.location.hash = '#voice-safety'}
                className="text-blue-600 font-semibold text-lg hover:text-blue-800 transition-colors"
              >
                Voice Safety →
              </button>
              <button 
                onClick={() => window.location.hash = '#live-location'}
                className="text-green-600 font-semibold text-lg hover:text-green-800 transition-colors"
              >
                Live Tracking →
              </button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Lock className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">100% Anonymous</h3>
              <p className="text-gray-600 text-sm">No personal information required. Your privacy is our priority.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Community Driven</h3>
              <p className="text-gray-600 text-sm">Collective data helps identify patterns and create safer spaces.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <MapPin className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Actionable Insights</h3>
              <p className="text-gray-600 text-sm">Data visualization helps authorities take targeted action.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">2,847</div>
              <div className="text-gray-600">Reports Submitted</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">156</div>
              <div className="text-gray-600">Hotspots Identified</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">89%</div>
              <div className="text-gray-600">Feel Safer Reporting</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;