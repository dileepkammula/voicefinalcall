import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Filter, Eye, BarChart3, AlertTriangle } from 'lucide-react';
import { Report } from '../types';

interface SubmittedReportsProps {
  reports: Report[];
}

const SubmittedReports: React.FC<SubmittedReportsProps> = ({ reports }) => {
  const [filterType, setFilterType] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const filteredReports = reports
    .filter(report => {
      const typeMatch = filterType === 'all' || report.type === filterType;
      const severityMatch = filterSeverity === 'all' || report.severity === filterSeverity;
      return typeMatch && severityMatch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'severity':
          const severityOrder = { high: 3, medium: 2, low: 1 };
          return (severityOrder[b.severity as keyof typeof severityOrder] || 0) - 
                 (severityOrder[a.severity as keyof typeof severityOrder] || 0);
        case 'type':
          return a.type.localeCompare(b.type);
        default:
          return 0;
      }
    });

  const incidentTypes = ['all', ...Array.from(new Set(reports.map(r => r.type)))];

  const getRecentActivity = () => {
    const today = new Date();
    const thisWeek = reports.filter(r => {
      const reportDate = new Date(r.date);
      const diffTime = today.getTime() - reportDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7;
    }).length;

    const thisMonth = reports.filter(r => {
      const reportDate = new Date(r.date);
      return reportDate.getMonth() === today.getMonth() && 
             reportDate.getFullYear() === today.getFullYear();
    }).length;

    return { thisWeek, thisMonth };
  };

  const { thisWeek, thisMonth } = getRecentActivity();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Submitted Reports</h1>
          <p className="text-gray-600">
            View all anonymously submitted incident reports and their impact on community safety.
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reports</p>
                <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">All time submissions</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-green-600">{thisWeek}</p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Recent activity</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-purple-600">{thisMonth}</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Monthly submissions</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Priority</p>
                <p className="text-2xl font-bold text-red-600">
                  {reports.filter(r => r.severity === 'high').length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Require attention</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Filter size={20} className="mr-2" />
                Filters & Sort
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Incident Type
                  </label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {incidentTypes.map(type => (
                      <option key={type} value={type}>
                        {type === 'all' ? 'All Types' : type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Severity
                  </label>
                  <select
                    value={filterSeverity}
                    onChange={(e) => setFilterSeverity(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Severities</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="date">Date (Newest First)</option>
                    <option value="severity">Severity (High to Low)</option>
                    <option value="type">Incident Type</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Quick Stats</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Filtered Results:</span>
                    <span className="font-medium">{filteredReports.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">High Priority:</span>
                    <span className="font-medium text-red-600">
                      {filteredReports.filter(r => r.severity === 'high').length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reports List */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">
                  Incident Reports ({filteredReports.length})
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Anonymous reports helping build safer communities
                </p>
              </div>

              <div className="divide-y divide-gray-200">
                {filteredReports.length > 0 ? (
                  filteredReports.map((report) => (
                    <div key={report.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold text-gray-900">{report.type}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(report.severity)}`}>
                              {getSeverityIcon(report.severity)} {report.severity.charAt(0).toUpperCase() + report.severity.slice(1)}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center space-x-1">
                              <Calendar size={14} />
                              <span>{report.date}</span>
                            </div>
                            {report.time && (
                              <div className="flex items-center space-x-1">
                                <Clock size={14} />
                                <span>{report.time}</span>
                              </div>
                            )}
                            <div className="flex items-center space-x-1">
                              <MapPin size={14} />
                              <span>{report.location.address}</span>
                            </div>
                          </div>

                          {report.description && (
                            <p className="text-gray-700 text-sm leading-relaxed mb-3">
                              {report.description.length > 150 
                                ? `${report.description.substring(0, 150)}...` 
                                : report.description
                              }
                            </p>
                          )}
                        </div>

                        <button
                          onClick={() => setSelectedReport(selectedReport?.id === report.id ? null : report)}
                          className="ml-4 p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <Eye size={18} />
                        </button>
                      </div>

                      {/* Expanded Details */}
                      {selectedReport?.id === report.id && (
                        <div className="mt-4 pt-4 border-t border-gray-200 bg-gray-50 -mx-6 px-6 py-4">
                          <h5 className="font-medium text-gray-900 mb-3">Full Report Details</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-gray-700">Report ID:</span>
                              <span className="ml-2 text-gray-600">#{report.id}</span>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Coordinates:</span>
                              <span className="ml-2 text-gray-600">
                                {report.location.lat.toFixed(4)}, {report.location.lng.toFixed(4)}
                              </span>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Submission Date:</span>
                              <span className="ml-2 text-gray-600">{report.date}</span>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Time of Incident:</span>
                              <span className="ml-2 text-gray-600">{report.time || 'Not specified'}</span>
                            </div>
                          </div>
                          
                          {report.description && (
                            <div className="mt-4">
                              <span className="font-medium text-gray-700">Full Description:</span>
                              <p className="mt-2 text-gray-600 leading-relaxed">{report.description}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Reports Found</h3>
                    <p className="text-gray-600">
                      No reports match your current filters. Try adjusting the filter criteria.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Impact Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <BarChart3 className="h-6 w-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Community Impact</h3>
              <p className="text-blue-800 mb-3">
                Every report contributes to building a safer community. These anonymous submissions help identify 
                patterns, inform safety measures, and empower collective action against harassment.
              </p>
              <div className="flex flex-wrap gap-2 text-sm text-blue-700">
                <span className="bg-blue-100 px-2 py-1 rounded">Anonymous & Safe</span>
                <span className="bg-blue-100 px-2 py-1 rounded">Pattern Recognition</span>
                <span className="bg-blue-100 px-2 py-1 rounded">Community Awareness</span>
                <span className="bg-blue-100 px-2 py-1 rounded">Actionable Data</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmittedReports;