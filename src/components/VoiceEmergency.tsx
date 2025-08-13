import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Shield, Volume2, Settings, AlertTriangle } from 'lucide-react';

interface VoiceEmergencyProps {
  onEmergencyTriggered: (trigger: string) => void;
}

const VoiceEmergency: React.FC<VoiceEmergencyProps> = ({ onEmergencyTriggered }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [customTriggers, setCustomTriggers] = useState(['help me', 'emergency', 'safe word']);
  const [sensitivity, setSensitivity] = useState(0.7);
  const [isEnabled, setIsEnabled] = useState(false);

  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const defaultTriggers = [
    'help',
    'emergency',
    'help me',
    'call for help',
    'i need help',
    'safe word',
    'danger',
    'assistance needed'
  ];

  const allTriggers = [...defaultTriggers, ...customTriggers];

  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onend = () => {
        setIsListening(false);
        // Restart listening if enabled
        if (isEnabled) {
          setTimeout(() => {
            try {
              recognition.start();
            } catch (error) {
              console.log('Recognition restart failed:', error);
            }
          }, 1000);
        }
      };

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript.toLowerCase().trim();
          const confidence = event.results[i][0].confidence;

          if (event.results[i].isFinal) {
            finalTranscript += transcript;
            setConfidence(confidence);
          } else {
            interimTranscript += transcript;
          }
        }

        const currentTranscript = finalTranscript || interimTranscript;
        setTranscript(currentTranscript);

        // Check for trigger words
        if (finalTranscript && event.results[event.resultIndex][0].confidence >= sensitivity) {
          checkForTriggers(finalTranscript);
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setIsEnabled(false);
          alert('Microphone access denied. Please enable microphone permissions for voice safety features.');
        }
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isEnabled, sensitivity]);

  const checkForTriggers = (text: string) => {
    const foundTrigger = allTriggers.find(trigger => 
      text.includes(trigger.toLowerCase())
    );

    if (foundTrigger) {
      onEmergencyTriggered(foundTrigger);
      // Visual feedback
      setTranscript(`🚨 TRIGGER DETECTED: "${foundTrigger}"`);
      
      // Clear transcript after delay
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setTranscript('');
      }, 3000);
    }
  };

  const toggleListening = async () => {
    if (!isSupported) {
      alert('Voice recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (!isEnabled) {
      try {
        // Request microphone permission
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setIsEnabled(true);
        recognitionRef.current?.start();
      } catch (error) {
        alert('Microphone access is required for voice safety features. Please enable microphone permissions.');
      }
    } else {
      setIsEnabled(false);
      recognitionRef.current?.stop();
    }
  };

  const addCustomTrigger = () => {
    const trigger = prompt('Enter a custom safety trigger phrase:');
    if (trigger && trigger.trim() && !customTriggers.includes(trigger.trim().toLowerCase())) {
      setCustomTriggers([...customTriggers, trigger.trim().toLowerCase()]);
    }
  };

  const removeCustomTrigger = (trigger: string) => {
    setCustomTriggers(customTriggers.filter(t => t !== trigger));
  };

  if (!isSupported) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-yellow-800">Voice Recognition Unavailable</h3>
            <p className="text-sm text-yellow-700 mt-1">
              Your browser doesn't support voice recognition. Please use Chrome, Edge, or Safari for voice safety features.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Voice Safety Assistant</h3>
        </div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
        >
          <Settings size={20} />
        </button>
      </div>

      <p className="text-gray-600 mb-4">
        Activate hands-free emergency alerts by speaking predefined trigger phrases. 
        Your device will listen for safety keywords and immediately initiate emergency protocols.
      </p>

      {/* Main Controls */}
      <div className="flex items-center justify-center mb-6">
        <button
          onClick={toggleListening}
          className={`flex items-center space-x-3 px-6 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 ${
            isEnabled
              ? 'bg-red-600 text-white hover:bg-red-700 shadow-lg'
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
          }`}
        >
          {isEnabled ? <MicOff size={24} /> : <Mic size={24} />}
          <span>
            {isEnabled ? 'Voice Safety Active' : 'Activate Voice Safety'}
          </span>
        </button>
      </div>

      {/* Status Indicator */}
      <div className="text-center mb-4">
        <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
          isEnabled
            ? isListening
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
            : 'bg-gray-100 text-gray-600'
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            isEnabled
              ? isListening
                ? 'bg-green-500 animate-pulse'
                : 'bg-yellow-500'
              : 'bg-gray-400'
          }`}></div>
          <span>
            {isEnabled
              ? isListening
                ? 'Listening for safety triggers...'
                : 'Restarting listener...'
              : 'Voice safety disabled'
            }
          </span>
        </div>
      </div>

      {/* Live Transcript */}
      {transcript && (
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <Volume2 size={16} className="text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Detected Speech:</span>
          </div>
          <p className="text-sm text-gray-900 font-mono">{transcript}</p>
          {confidence > 0 && (
            <p className="text-xs text-gray-500 mt-1">
              Confidence: {Math.round(confidence * 100)}%
            </p>
          )}
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <div className="border-t border-gray-200 pt-4 mt-4">
          <h4 className="font-medium text-gray-900 mb-3">Voice Safety Settings</h4>
          
          {/* Sensitivity */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Detection Sensitivity: {Math.round(sensitivity * 100)}%
            </label>
            <input
              type="range"
              min="0.3"
              max="1"
              step="0.1"
              value={sensitivity}
              onChange={(e) => setSensitivity(parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Less Sensitive</span>
              <span>More Sensitive</span>
            </div>
          </div>

          {/* Default Triggers */}
          <div className="mb-4">
            <h5 className="text-sm font-medium text-gray-700 mb-2">Default Safety Triggers</h5>
            <div className="flex flex-wrap gap-2">
              {defaultTriggers.map((trigger) => (
                <span
                  key={trigger}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  "{trigger}"
                </span>
              ))}
            </div>
          </div>

          {/* Custom Triggers */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h5 className="text-sm font-medium text-gray-700">Custom Safety Triggers</h5>
              <button
                onClick={addCustomTrigger}
                className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
              >
                Add Custom
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {customTriggers.map((trigger) => (
                <span
                  key={trigger}
                  className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full flex items-center space-x-1"
                >
                  <span>"{trigger}"</span>
                  <button
                    onClick={() => removeCustomTrigger(trigger)}
                    className="text-purple-600 hover:text-purple-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <h5 className="text-sm font-medium text-blue-900 mb-1">Privacy & Security</h5>
            <p className="text-xs text-blue-800">
              Voice processing happens locally on your device. No audio data is transmitted or stored on our servers. 
              Voice recognition only activates when you enable this feature.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceEmergency;