import React, { useState } from 'react';
import { MapPin, Filter, TrendingUp, AlertTriangle } from 'lucide-react';

interface Report {
  id: number;
  type: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  date: string;
  time: string;
  severity: string;
}

interface MapVisualizationProps {
  reports: Report[];
}

const MapVisualization: React.FC<MapVisualizationProps> = ({ reports }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');

  const filterOptions = [
    'all',
    'Sexual Harassment',
    'Verbal Harassment',
    'Physical Harassment',
    'Cyberbullying',
    'Stalking',
    'Discrimination',
    'Workplace Harassment'
  ];

  const filteredReports = reports.filter(report => {
    const typeMatch = selectedFilter === 'all' || report.type === selectedFilter;
    const severityMatch = selectedSeverity === 'all' || report.severity === selectedSeverity;
    return typeMatch && severityMatch;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const hotspots = [
    { area: 'Downtown District', count: 12, trend: '+23%' },
    { area: 'University Campus', count: 8, trend: '-15%' },
    { area: 'Transit Hub', count: 15, trend: '+45%' },
    { area: 'Entertainment District', count: 6, trend: '+12%' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Safety Map & Insights</h1>
          <p className="text-gray-600">
            Visualize incident patterns to identify hotspots and trends in your community.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Filter size={20} className="mr-2" />
                Filters
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Incident Type
                  </label>
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {filterOptions.map(option => (
                      <option key={option} value={option}>
                        {option === 'all' ? 'All Types' : option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Severity
                  </label>
                  <select
                    value={selectedSeverity}
                    onChange={(e) => setSelectedSeverity(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Severities</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Legend</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>High Severity</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span>Medium Severity</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Low Severity</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Map Area */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Incident Locations</h3>
              
              {/* Simulated Map */}
              <div className="relative bg-gray-100 rounded-lg h-96 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
                  {/* Grid lines to simulate map */}
                  <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                                     linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}></div>

                  {/* Incident markers */}
                  {filteredReports.map((report, index) => (
                    <div
                      key={report.id}
                      className={`absolute w-4 h-4 rounded-full ${getSeverityColor(report.severity)} border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-125 transition-transform`}
                      style={{
                        left: `${20 + (index * 15) % 70}%`,
                        top: `${25 + (index * 12) % 50}%`
                      }}
                      title={`${report.type} - ${report.location.address}`}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
                        {report.type}
                      </div>
                    </div>
                  ))}

                  {/* Heat zones */}
                  <div className="absolute top-16 left-20 w-24 h-24 bg-red-300 rounded-full opacity-30"></div>
                  <div className="absolute top-40 right-32 w-16 h-16 bg-yellow-300 rounded-full opacity-30"></div>
                  <div className="absolute bottom-32 left-1/3 w-20 h-20 bg-orange-300 rounded-full opacity-30"></div>
                </div>

                <div className="absolute bottom-4 right-4 text-sm text-gray-600 bg-white px-2 py-1 rounded shadow">
                  {filteredReports.length} incidents shown
                </div>
              </div>
            </div>

            {/* Hotspots Analysis */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp size={20} className="mr-2" />
                Identified Hotspots
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {hotspots.map((hotspot, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{hotspot.area}</h4>
                      <span className={`text-sm px-2 py-1 rounded ${
                        hotspot.trend.startsWith('+') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {hotspot.trend}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin size={16} />
                      <span>{hotspot.count} incidents reported</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Reports */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Recent Reports</h3>
              <div className="space-y-3">
                {filteredReports.slice(-3).reverse().map((report) => (
                  <div key={report.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-3 h-3 rounded-full mt-2 ${getSeverityColor(report.severity)}`}></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">{report.type}</h4>
                        <span className="text-sm text-gray-500">{report.date}</span>
                      </div>
                      <p className="text-sm text-gray-600">{report.location.address}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapVisualization;