import React, { useState } from 'react';
import { Heart, MessageCircle, Calendar, MapPin, Tag, ThumbsUp, Send, Filter } from 'lucide-react';
import { Story, Comment } from '../types';
import { defaultStories } from '../data/stories';

const CommunityStories: React.FC = () => {
  const [stories, setStories] = useState<Story[]>(defaultStories);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [newComment, setNewComment] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');

  const handleLikeStory = (storyId: number) => {
    setStories(prev => prev.map(story => 
      story.id === storyId 
        ? { ...story, likes: story.likes + 1 }
        : story
    ));
  };

  const handleLikeComment = (storyId: number, commentId: number) => {
    setStories(prev => prev.map(story => 
      story.id === storyId 
        ? {
            ...story,
            comments: story.comments.map(comment =>
              comment.id === commentId
                ? { ...comment, likes: comment.likes + 1 }
                : comment
            )
          }
        : story
    ));
  };

  const handleAddComment = (storyId: number) => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      content: newComment,
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      isSupport: true
    };

    setStories(prev => prev.map(story => 
      story.id === storyId 
        ? { ...story, comments: [...story.comments, comment] }
        : story
    ));

    setNewComment('');
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const filteredStories = stories.filter(story => {
    const typeMatch = filterType === 'all' || story.type === filterType;
    const severityMatch = filterSeverity === 'all' || story.severity === filterSeverity;
    return typeMatch && severityMatch;
  });

  const incidentTypes = ['all', ...Array.from(new Set(stories.map(s => s.type)))];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Stories</h1>
          <p className="text-gray-600">
            Real experiences shared anonymously to raise awareness and build support. Every story matters.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <Filter size={20} className="text-gray-600" />
            <h3 className="font-semibold text-gray-900">Filter Stories</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredStories.map((story) => (
            <div key={story.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              {/* Story Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{story.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>{story.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin size={14} />
                      <span>{story.location}</span>
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(story.severity)}`}>
                  {story.severity.charAt(0).toUpperCase() + story.severity.slice(1)}
                </span>
              </div>

              {/* Story Content */}
              <p className="text-gray-700 mb-4 leading-relaxed">
                {story.content.length > 200 
                  ? `${story.content.substring(0, 200)}...` 
                  : story.content
                }
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {story.tags.map((tag, index) => (
                  <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                    <Tag size={10} className="mr-1" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Story Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleLikeStory(story.id)}
                    className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <Heart size={16} />
                    <span className="text-sm">{story.likes}</span>
                  </button>
                  <button
                    onClick={() => setSelectedStory(selectedStory?.id === story.id ? null : story)}
                    className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <MessageCircle size={16} />
                    <span className="text-sm">{story.comments.length}</span>
                  </button>
                </div>
                <span className="text-xs text-gray-500">{story.type}</span>
              </div>

              {/* Comments Section */}
              {selectedStory?.id === story.id && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4">Community Support</h4>
                  
                  {/* Comments List */}
                  <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
                    {story.comments.map((comment) => (
                      <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-700 mb-2">{comment.content}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{comment.date}</span>
                          <button
                            onClick={() => handleLikeComment(story.id, comment.id)}
                            className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors"
                          >
                            <ThumbsUp size={12} />
                            <span className="text-xs">{comment.likes}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Comment */}
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share words of support..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddComment(story.id)}
                    />
                    <button
                      onClick={() => handleAddComment(story.id)}
                      className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <Send size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Support Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <Heart className="h-6 w-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Community Guidelines</h3>
              <p className="text-blue-800 mb-3">
                This is a safe space for sharing experiences and offering support. Please be respectful, 
                empathetic, and constructive in your comments.
              </p>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Offer support and validation, not judgment</li>
                <li>• Share resources and helpful information</li>
                <li>• Respect anonymity and privacy</li>
                <li>• Report inappropriate content</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityStories;