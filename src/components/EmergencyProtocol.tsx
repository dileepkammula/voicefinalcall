import React, { useState, useEffect } from 'react';
import { Phone, MapPin, MessageSquare, Users, Clock, AlertTriangle, X } from 'lucide-react';

interface EmergencyProtocolProps {
  trigger: string;
  onClose: () => void;
}

const EmergencyProtocol: React.FC<EmergencyProtocolProps> = ({ trigger, onClose }) => {
  const [countdown, setCountdown] = useState(10);
  const [isActive, setIsActive] = useState(true);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  useEffect(() => {
    if (countdown > 0 && isActive) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && isActive) {
      // Auto-execute emergency protocol
      executeEmergencyAction('auto-alert');
    }
  }, [countdown, isActive]);

  const executeEmergencyAction = (action: string) => {
    setSelectedAction(action);
    setIsActive(false);

    switch (action) {
      case 'call-911':
        // In a real implementation, this would integrate with device calling capabilities
        window.open('tel:911', '_self');
        break;
      case 'send-location':
        // Send location to emergency contacts
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            // In real implementation, send to emergency contacts
            console.log(`Emergency location: ${latitude}, ${longitude}`);
          });
        }
        break;
      case 'silent-alert':
        // Send silent alert to emergency contacts
        console.log('Silent alert sent to emergency contacts');
        break;
      case 'auto-alert':
        // Default action when countdown reaches zero
        console.log('Auto emergency alert activated');
        break;
    }
  };

  const cancelEmergency = () => {
    setIsActive(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="bg-red-600 text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle size={24} />
              <h2 className="text-lg font-bold">EMERGENCY PROTOCOL ACTIVATED</h2>
            </div>
            {!isActive && (
              <button onClick={onClose} className="text-white hover:text-gray-200">
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        <div className="p-6">
          {isActive ? (
            <>
              {/* Countdown */}
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-red-600 mb-2">{countdown}</div>
                <p className="text-gray-700">
                  Voice trigger detected: <strong>"{trigger}"</strong>
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Emergency services will be contacted automatically in {countdown} seconds
                </p>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  onClick={() => executeEmergencyAction('call-911')}
                  className="flex flex-col items-center p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Phone size={24} className="mb-1" />
                  <span className="text-sm font-medium">Call 911</span>
                </button>

                <button
                  onClick={() => executeEmergencyAction('send-location')}
                  className="flex flex-col items-center p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <MapPin size={24} className="mb-1" />
                  <span className="text-sm font-medium">Send Location</span>
                </button>

                <button
                  onClick={() => executeEmergencyAction('silent-alert')}
                  className="flex flex-col items-center p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <MessageSquare size={24} className="mb-1" />
                  <span className="text-sm font-medium">Silent Alert</span>
                </button>

                <button
                  onClick={() => executeEmergencyAction('contact-network')}
                  className="flex flex-col items-center p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Users size={24} className="mb-1" />
                  <span className="text-sm font-medium">Alert Network</span>
                </button>
              </div>

              {/* Cancel Button */}
              <button
                onClick={cancelEmergency}
                className="w-full py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                Cancel Emergency Protocol
              </button>
            </>
          ) : (
            <>
              {/* Action Executed */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Emergency Action Executed</h3>
                <p className="text-gray-600">
                  {selectedAction === 'call-911' && 'Calling emergency services...'}
                  {selectedAction === 'send-location' && 'Location sent to emergency contacts'}
                  {selectedAction === 'silent-alert' && 'Silent alert sent to your safety network'}
                  {selectedAction === 'auto-alert' && 'Automatic emergency alert activated'}
                  {selectedAction === 'contact-network' && 'Emergency contacts have been notified'}
                </p>
              </div>

              {/* Next Steps */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h4 className="font-medium text-blue-900 mb-2">What happens next:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Emergency services have been contacted</li>
                  <li>• Your location has been shared</li>
                  <li>• Safety network has been alerted</li>
                  <li>• Continue to stay safe and follow emergency guidance</li>
                </ul>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Close
              </button>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-3 rounded-b-lg">
          <div className="flex items-center space-x-2 text-xs text-gray-600">
            <Clock size={12} />
            <span>Activated at {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyProtocol;