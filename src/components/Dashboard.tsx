import React from 'react';
import { BarChart3, TrendingUp, TrendingDown, AlertTriangle, Users, MapPin } from 'lucide-react';

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

interface DashboardProps {
  reports: Report[];
}

const Dashboard: React.FC<DashboardProps> = ({ reports }) => {
  // Calculate statistics
  const totalReports = reports.length;
  const thisMonth = reports.filter(r => {
    const reportDate = new Date(r.date);
    const now = new Date();
    return reportDate.getMonth() === now.getMonth() && reportDate.getFullYear() === now.getFullYear();
  }).length;

  const severityStats = {
    high: reports.filter(r => r.severity === 'high').length,
    medium: reports.filter(r => r.severity === 'medium').length,
    low: reports.filter(r => r.severity === 'low').length
  };

  const typeStats = reports.reduce((acc, report) => {
    acc[report.type] = (acc[report.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topTypes = Object.entries(typeStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  const timeStats = reports.reduce((acc, report) => {
    if (report.time) {
      const hour = parseInt(report.time.split(':')[0]);
      const period = hour < 6 ? 'Night (12-6 AM)' :
                   hour < 12 ? 'Morning (6 AM-12 PM)' :
                   hour < 18 ? 'Afternoon (12-6 PM)' :
                   'Evening (6 PM-12 AM)';
      acc[period] = (acc[period] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Safety Insights</h1>
          <p className="text-gray-600">
            Analyze patterns and trends to better understand safety challenges in your community.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reports</p>
                <p className="text-2xl font-bold text-gray-900">{totalReports}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">All time submissions</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">{thisMonth}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Recent activity</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Severity</p>
                <p className="text-2xl font-bold text-red-600">{severityStats.high}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Require immediate attention</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Community Impact</p>
                <p className="text-2xl font-bold text-purple-600">89%</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Feel safer after reporting</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Incident Types Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Most Common Incident Types</h3>
            <div className="space-y-4">
              {topTypes.map(([type, count], index) => (
                <div key={type} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-700">{index + 1}.</span>
                    <span className="text-sm text-gray-900">{type}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="bg-gray-200 rounded-full h-2 w-24">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(count / totalReports) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Severity Distribution */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Severity Distribution</h3>
            <div className="space-y-4">
              {Object.entries(severityStats).map(([severity, count]) => (
                <div key={severity} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      severity === 'high' ? 'bg-red-500' :
                      severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <span className="text-sm text-gray-900 capitalize">{severity} Severity</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">{count}</span>
                    <span className="text-xs text-gray-500">
                      ({Math.round((count / totalReports) * 100)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Time Distribution */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Time of Day Distribution</h3>
            <div className="space-y-4">
              {Object.entries(timeStats).map(([period, count]) => (
                <div key={period} className="flex items-center justify-between">
                  <span className="text-sm text-gray-900">{period}</span>
                  <div className="flex items-center space-x-2">
                    <div className="bg-gray-200 rounded-full h-2 w-20">
                      <div
                        className="bg-purple-600 h-2 rounded-full"
                        style={{ width: `${(count / totalReports) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Safety Recommendations */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Safety Recommendations</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <p className="text-sm text-gray-700">
                  Increased security presence needed in Downtown District during evening hours
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                <p className="text-sm text-gray-700">
                  Consider better lighting in Transit Hub areas
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <p className="text-sm text-gray-700">
                  University Campus shows improvement with recent safety measures
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                <p className="text-sm text-gray-700">
                  High-severity incidents require immediate community response plan
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <MapPin className="h-6 w-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Help Make Your Community Safer</h3>
              <p className="text-blue-800 mb-4">
                These insights are only as strong as our community participation. Every report helps create a clearer picture
                of safety challenges and empowers local authorities to take targeted action.
              </p>
              <div className="flex flex-wrap gap-2 text-sm text-blue-700">
                <span className="bg-blue-100 px-2 py-1 rounded">Share anonymously</span>
                <span className="bg-blue-100 px-2 py-1 rounded">Help identify patterns</span>
                <span className="bg-blue-100 px-2 py-1 rounded">Support your community</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;