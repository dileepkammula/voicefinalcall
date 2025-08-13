import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Power, Users, Share2, Shield, Settings, Clock, Battery } from 'lucide-react';

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
  address?: string;
}

interface LiveLocationTrackerProps {
  onLocationUpdate?: (location: LocationData) => void;
}

const LiveLocationTracker: React.FC<LiveLocationTrackerProps> = ({ onLocationUpdate }) => {
  const [isTracking, setIsTracking] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shareCode, setShareCode] = useState<string | null>(null);
  const [trustedContacts, setTrustedContacts] = useState<string[]>([]);
  const [trackingDuration, setTrackingDuration] = useState(0);
  const [batteryOptimized, setBatteryOptimized] = useState(true);
  const [updateInterval, setUpdateInterval] = useState(30); // seconds

  const watchIdRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Check if geolocation is supported
    setIsSupported('geolocation' in navigator);
  }, []);

  useEffect(() => {
    // Update tracking duration
    if (isTracking) {
      intervalRef.current = setInterval(() => {
        setTrackingDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setTrackingDuration(0);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isTracking]);

  const generateShareCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    try {
      // In a real implementation, you would use a geocoding service
      // For demo purposes, we'll return a mock address
      return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    } catch (error) {
      return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    }
  };

  const startTracking = async () => {
    if (!isSupported) {
      setError('Geolocation is not supported by this browser');
      return;
    }

    try {
      // Request permission and get initial position
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: !batteryOptimized,
          timeout: 10000,
          maximumAge: batteryOptimized ? 60000 : 0
        });
      });

      const locationData: LocationData = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: Date.now()
      };

      // Get address
      locationData.address = await reverseGeocode(locationData.latitude, locationData.longitude);

      setCurrentLocation(locationData);
      setIsTracking(true);
      setError(null);
      setShareCode(generateShareCode());

      // Start continuous tracking
      watchIdRef.current = navigator.geolocation.watchPosition(
        async (position) => {
          const newLocationData: LocationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: Date.now(),
            address: await reverseGeocode(position.coords.latitude, position.coords.longitude)
          };

          setCurrentLocation(newLocationData);
          onLocationUpdate?.(newLocationData);
        },
        (error) => {
          console.error('Location tracking error:', error);
          setError(`Tracking error: ${error.message}`);
        },
        {
          enableHighAccuracy: !batteryOptimized,
          timeout: 15000,
          maximumAge: batteryOptimized ? updateInterval * 1000 : 0
        }
      );

      onLocationUpdate?.(locationData);
    } catch (error: any) {
      setError(`Failed to start tracking: ${error.message}`);
    }
  };

  const stopTracking = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }

    setIsTracking(false);
    setCurrentLocation(null);
    setShareCode(null);
    setError(null);
  };

  const shareLocation = () => {
    if (!currentLocation || !shareCode) return;

    const shareUrl = `${window.location.origin}/track/${shareCode}`;
    const shareText = `I'm sharing my live location for safety. Track me here: ${shareUrl}`;

    if (navigator.share) {
      navigator.share({
        title: 'Live Location Share',
        text: shareText,
        url: shareUrl
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Location share link copied to clipboard!');
    }
  };

  const addTrustedContact = () => {
    const contact = prompt('Enter trusted contact (email or phone):');
    if (contact && contact.trim() && !trustedContacts.includes(contact.trim())) {
      setTrustedContacts([...trustedContacts, contact.trim()]);
    }
  };

  const removeTrustedContact = (contact: string) => {
    setTrustedContacts(trustedContacts.filter(c => c !== contact));
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  if (!isSupported) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <MapPin className="h-6 w-6 text-yellow-600 mt-1" />
              <div>
                <h3 className="font-semibold text-yellow-900">Location Services Unavailable</h3>
                <p className="text-yellow-800 mt-1">
                  Your browser doesn't support location services. Please use a modern browser like Chrome, Firefox, or Safari.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Live Location Tracking</h1>
          <p className="text-gray-600">
            Share your real-time location with trusted contacts for enhanced safety and peace of mind.
          </p>
        </div>

        {/* Main Control Panel */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full ${isTracking ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
              <h2 className="text-xl font-semibold text-gray-900">
                {isTracking ? 'Location Tracking Active' : 'Location Tracking Inactive'}
              </h2>
            </div>
            
            <button
              onClick={isTracking ? stopTracking : startTracking}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                isTracking
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              <Power size={20} />
              <span>{isTracking ? 'Stop Tracking' : 'Start Tracking'}</span>
            </button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* Current Location Info */}
          {currentLocation && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
                  <MapPin size={18} className="mr-2" />
                  Current Location
                </h3>
                <p className="text-blue-800 text-sm mb-1">
                  <strong>Coordinates:</strong> {currentLocation.latitude.toFixed(6)}, {currentLocation.longitude.toFixed(6)}
                </p>
                <p className="text-blue-800 text-sm mb-1">
                  <strong>Address:</strong> {currentLocation.address}
                </p>
                <p className="text-blue-800 text-sm mb-1">
                  <strong>Accuracy:</strong> ±{Math.round(currentLocation.accuracy)}m
                </p>
                <p className="text-blue-800 text-sm">
                  <strong>Last Updated:</strong> {new Date(currentLocation.timestamp).toLocaleTimeString()}
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-2 flex items-center">
                  <Clock size={18} className="mr-2" />
                  Tracking Status
                </h3>
                <p className="text-green-800 text-sm mb-1">
                  <strong>Duration:</strong> {formatDuration(trackingDuration)}
                </p>
                <p className="text-green-800 text-sm mb-1">
                  <strong>Share Code:</strong> {shareCode}
                </p>
                <p className="text-green-800 text-sm mb-1">
                  <strong>Update Interval:</strong> {updateInterval}s
                </p>
                <p className="text-green-800 text-sm">
                  <strong>Battery Mode:</strong> {batteryOptimized ? 'Optimized' : 'High Accuracy'}
                </p>
              </div>
            </div>
          )}

          {/* Share Controls */}
          {isTracking && shareCode && (
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Share2 size={18} className="mr-2" />
                Share Location
              </h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={shareLocation}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Share2 size={16} />
                  <span>Share Link</span>
                </button>
                <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg">
                  <span className="text-sm text-gray-600">Share Code:</span>
                  <span className="font-mono font-bold text-gray-900">{shareCode}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Settings Panel */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <Settings size={18} className="mr-2" />
            Tracking Settings
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Update Interval: {updateInterval} seconds
              </label>
              <input
                type="range"
                min="10"
                max="300"
                step="10"
                value={updateInterval}
                onChange={(e) => setUpdateInterval(parseInt(e.target.value))}
                className="w-full"
                disabled={isTracking}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>10s (High Battery)</span>
                <span>300s (Low Battery)</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Battery size={18} className="text-gray-600" />
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={batteryOptimized}
                    onChange={(e) => setBatteryOptimized(e.target.checked)}
                    disabled={isTracking}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">Battery Optimization</span>
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Reduces accuracy to save battery life
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trusted Contacts */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 flex items-center">
              <Users size={18} className="mr-2" />
              Trusted Contacts ({trustedContacts.length})
            </h3>
            <button
              onClick={addTrustedContact}
              className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
            >
              Add Contact
            </button>
          </div>

          {trustedContacts.length > 0 ? (
            <div className="space-y-2">
              {trustedContacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <span className="text-gray-900">{contact}</span>
                  <button
                    onClick={() => removeTrustedContact(contact)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              No trusted contacts added yet. Add contacts to automatically share your location during emergencies.
            </p>
          )}
        </div>

        {/* Privacy Notice */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">Privacy & Security</h4>
              <p className="text-sm text-blue-800 mt-1">
                Your location data is processed locally and only shared with people you explicitly choose. 
                Location tracking can be stopped at any time, and no data is permanently stored on our servers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveLocationTracker;