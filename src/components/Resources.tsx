import React from 'react';
import { Phone, ExternalLink, Heart, Shield, Users, BookOpen, AlertTriangle } from 'lucide-react';

const Resources: React.FC = () => {
  const emergencyContacts = [
    {
      name: "Emergency Services",
      number: "911",
      description: "For immediate danger or emergencies",
      available: "24/7"
    },
    {
      name: "National Sexual Assault Hotline",
      number: "1-800-656-4673",
      description: "Free, confidential support for survivors",
      available: "24/7"
    },
    {
      name: "Crisis Text Line",
      number: "Text HOME to 741741",
      description: "Free, 24/7 crisis counseling via text",
      available: "24/7"
    },
    {
      name: "National Domestic Violence Hotline",
      number: "1-800-799-7233",
      description: "Confidential support for domestic violence",
      available: "24/7"
    }
  ];

  const supportResources = [
    {
      title: "Know Your Rights",
      description: "Understanding your legal rights in harassment situations",
      icon: Shield,
      link: "#"
    },
    {
      title: "Safety Planning",
      description: "Creating personal safety strategies and plans",
      icon: Heart,
      link: "#"
    },
    {
      title: "Community Support Groups",
      description: "Connect with local support networks",
      icon: Users,
      link: "#"
    },
    {
      title: "Educational Resources",
      description: "Learn about harassment prevention and response",
      icon: BookOpen,
      link: "#"
    }
  ];

  const preventionTips = [
    "Trust your instincts if something feels wrong",
    "Stay aware of your surroundings, especially in isolated areas",
    "Keep emergency contacts easily accessible on your phone",
    "Consider traveling with others when possible",
    "Report suspicious behavior to appropriate authorities",
    "Document incidents with dates, times, and locations when safe to do so"
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Support & Resources</h1>
          <p className="text-gray-600">
            Find help, support, and information to stay safe and empowered.
          </p>
        </div>

        {/* Emergency Notice */}
        <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-red-900 mb-2">In Case of Emergency</h3>
              <p className="text-red-800 mb-3">
                If you are in immediate danger, do not use this website. Call emergency services immediately.
              </p>
              <div className="flex flex-wrap gap-2">
                <a href="tel:911" className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                  Call 911
                </a>
                <a href="sms:741741&body=HOME" className="bg-red-100 text-red-800 px-4 py-2 rounded-lg font-semibold hover:bg-red-200 transition-colors">
                  Text 741741
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Emergency Contacts */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Phone className="h-6 w-6 text-blue-600 mr-2" />
                Crisis Support Contacts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{contact.name}</h3>
                    <a
                      href={contact.number.startsWith('Text') ? `sms:741741&body=HOME` : `tel:${contact.number.replace(/[^\d]/g, '')}`}
                      className="text-lg font-bold text-blue-600 hover:text-blue-800"
                    >
                      {contact.number}
                    </a>
                    <p className="text-sm text-gray-600 mt-1">{contact.description}</p>
                    <p className="text-xs text-green-600 font-medium mt-1">Available: {contact.available}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Resources */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Support Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {supportResources.map((resource, index) => {
                  const Icon = resource.icon;
                  return (
                    <a
                      key={index}
                      href={resource.link}
                      className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                    >
                      <div className="flex items-start space-x-3">
                        <Icon className="h-6 w-6 text-blue-600 mt-1" />
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-900">
                            {resource.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                          <div className="flex items-center text-blue-600 text-sm mt-2">
                            <span>Learn more</span>
                            <ExternalLink size={14} className="ml-1" />
                          </div>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Safety Tips Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Safety Tips</h3>
              <ul className="space-y-3">
                {preventionTips.map((tip, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Digital Safety</h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>• Use private/incognito browsing when accessing resources</p>
                  <p>• Clear browser history if safety is a concern</p>
                  <p>• Consider using a public computer or phone</p>
                  <p>• Create safety plans for online harassment</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Get Involved</h4>
                <div className="space-y-2">
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Volunteer with Us
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                    Subscribe to Updates
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Legal Support</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Free legal aid organizations</li>
                <li>• Understanding restraining orders</li>
                <li>• Workplace harassment rights</li>
                <li>• Title IX resources</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Mental Health</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Trauma-informed counseling</li>
                <li>• Support groups</li>
                <li>• PTSD resources</li>
                <li>• Mindfulness and coping strategies</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Community</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Local advocacy groups</li>
                <li>• Peer support networks</li>
                <li>• Educational workshops</li>
                <li>• Volunteer opportunities</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;