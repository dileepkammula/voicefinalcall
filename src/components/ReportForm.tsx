import React, { useState } from 'react';
import { MapPin, Calendar, Clock, AlertTriangle, Shield, ArrowLeft } from 'lucide-react';

interface ReportFormProps {
  onSubmit: (report: any) => void;
  onCancel: () => void;
}

const ReportForm: React.FC<ReportFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    location: '',
    date: '',
    time: '',
    severity: 'medium',
    anonymous: true
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const incidentTypes = [
    'Sexual Harassment',
    'Verbal Harassment', 
    'Physical Harassment',
    'Cyberbullying',
    'Stalking',
    'Discrimination',
    'Workplace Harassment',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if required fields are filled for current step
    if (currentStep === 1 && (!formData.type || !formData.severity)) {
      return;
    }
    
    if (currentStep === 2 && (!formData.location || !formData.date)) {
      return;
    }
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      return;
    }
    
    onSubmit({
      ...formData,
      location: {
        address: formData.location,
        lat: 40.7128 + (Math.random() - 0.5) * 0.1,
        lng: -74.0060 + (Math.random() - 0.5) * 0.1
      }
    });
    
    // Reset form
    setFormData({
      type: '',
      description: '',
      location: '',
      date: '',
      time: '',
      severity: 'medium',
      anonymous: true
    });
    setCurrentStep(1);
    onCancel();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                What type of incident occurred? *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {incidentTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, type })}
                    className={`p-3 text-left rounded-lg border transition-colors ${
                      formData.type === type
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Severity Level *
              </label>
              <div className="flex space-x-4">
                {[
                  { value: 'low', label: 'Low', color: 'green' },
                  { value: 'medium', label: 'Medium', color: 'yellow' },
                  { value: 'high', label: 'High', color: 'red' }
                ].map((severity) => (
                  <button
                    key={severity.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, severity: severity.value })}
                    className={`flex-1 p-3 rounded-lg border transition-colors ${
                      formData.severity === severity.value
                        ? `border-${severity.color}-500 bg-${severity.color}-50`
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {severity.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Location (General Area) *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Downtown, Near Central Park, University Campus"
                  required
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Provide a general area to help identify patterns without revealing specific addresses
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                  Date *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    id="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                  Approximate Time
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="time"
                    id="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Share any additional details that might help (optional)"
              />
              <p className="mt-1 text-sm text-gray-500">
                Only include information you're comfortable sharing anonymously
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-green-800">Your Privacy is Protected</h3>
                  <p className="text-sm text-green-700 mt-1">
                    This report is completely anonymous. No personal information is collected or stored.
                    Your contribution helps create safer communities for everyone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onCancel}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Report an Incident</h1>
          <p className="text-gray-600">
            Your report helps create safer communities. All information is completely anonymous.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 mt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : onCancel()}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {currentStep > 1 ? 'Previous' : 'Cancel'}
            </button>
            
            <button
              type="submit"
              disabled={
                (currentStep === 1 && (!formData.type || !formData.severity)) ||
                (currentStep === 2 && (!formData.location || !formData.date)) ||
                (currentStep === 3 && false) // No required fields in step 3
              }
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {currentStep === totalSteps ? 'Submit Report' : 'Next'}
            </button>
          </div>
        </form>

        {/* Support Notice */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-800">Need Immediate Help?</h3>
              <p className="text-sm text-blue-700 mt-1">
                If you're in immediate danger, please contact emergency services (911) or a local crisis hotline.
                This platform is for community awareness and not for emergency response.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportForm;