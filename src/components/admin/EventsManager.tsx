import React, { useState } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { 
  Plus, Edit2, Trash2, Save, X, GripVertical, Eye, EyeOff,
  Calendar, MapPin, Users, DollarSign, Clock, Star
} from 'lucide-react';
import { events as initialEvents, Event, EventType } from '../../data/events';

export function EventsManager() {
  const [events, setEvents] = useState([...initialEvents]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<Event>>({});

  const handleCreate = () => {
    setIsCreating(true);
    setFormData({
      title: '',
      subtitle: '',
      type: 'exhibition',
      status: 'upcoming',
      description: '',
      theme: '',
      location: {
        venue: '',
        address: '',
        city: '',
        country: ''
      },
      schedule: {
        startDate: '',
        endDate: '',
        hours: {}
      },
      featured: false,
      images: ['/artportfolio.jpg'],
      highlights: [],
      tags: []
    });
  };

  const handleSave = () => {
    if (isCreating) {
      const newEvent: Event = {
        ...formData,
        id: Math.max(...events.map(e => e.id)) + 1,
      } as Event;
      setEvents([...events, newEvent]);
      setIsCreating(false);
    } else if (editingId) {
      setEvents(events.map(e => 
        e.id === editingId ? { ...e, ...formData } : e
      ));
      setEditingId(null);
    }
    setFormData({});
  };

  const handleEdit = (event: Event) => {
    setEditingId(event.id);
    setFormData(event);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(e => e.id !== id));
    }
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    setFormData({});
  };

  const toggleFeatured = (id: number) => {
    setEvents(events.map(e =>
      e.id === id ? { ...e, featured: !e.featured } : e
    ));
  };

  const isEditing = isCreating || editingId !== null;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getTypeColor = (type: EventType) => {
    const colors: Record<EventType, string> = {
      exhibition: 'bg-terracotta/10 text-terracotta',
      workshop: 'bg-sage/10 text-sage',
      talk: 'bg-clay/10 text-clay',
      fair: 'bg-gold/10 text-gold',
      private: 'bg-charcoal/10 text-charcoal'
    };
    return colors[type];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted">{events.length} total events</p>
        </div>
        {!isEditing && (
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold to-terracotta text-white hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>Create New Event</span>
          </button>
        )}
      </div>

      {/* Editor Panel */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white border border-charcoal/10 shadow-lg overflow-hidden"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-serif text-3xl text-charcoal">
                  {isCreating ? 'Create New Event' : 'Edit Event'}
                </h3>
                <button
                  onClick={handleCancel}
                  className="text-muted hover:text-charcoal transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-8">
                {/* Basic Info */}
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-muted font-medium mb-4 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Event Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Event Title *
                      </label>
                      <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-3 border border-charcoal/20 focus:border-gold focus:outline-none text-lg"
                        placeholder="e.g., Terre et Lumière"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Subtitle
                      </label>
                      <input
                        type="text"
                        value={formData.subtitle || ''}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        className="w-full px-4 py-3 border border-charcoal/20 focus:border-gold focus:outline-none"
                        placeholder="e.g., Clay and Light: A Dialogue"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Event Type *
                      </label>
                      <select
                        value={formData.type || 'exhibition'}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value as EventType })}
                        className="w-full px-4 py-3 border border-charcoal/20 focus:border-gold focus:outline-none"
                      >
                        <option value="exhibition">Exhibition</option>
                        <option value="workshop">Workshop</option>
                        <option value="talk">Artist Talk</option>
                        <option value="fair">Art Fair</option>
                        <option value="private">Private Event</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Status
                      </label>
                      <select
                        value={formData.status || 'upcoming'}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                        className="w-full px-4 py-3 border border-charcoal/20 focus:border-gold focus:outline-none"
                      >
                        <option value="upcoming">Upcoming</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="past">Past</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Start Date *
                      </label>
                      <input
                        type="date"
                        value={formData.schedule?.startDate || ''}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          schedule: { ...formData.schedule!, startDate: e.target.value } 
                        })}
                        className="w-full px-4 py-3 border border-charcoal/20 focus:border-gold focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        End Date *
                      </label>
                      <input
                        type="date"
                        value={formData.schedule?.endDate || ''}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          schedule: { ...formData.schedule!, endDate: e.target.value } 
                        })}
                        className="w-full px-4 py-3 border border-charcoal/20 focus:border-gold focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-muted font-medium mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Location
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Venue Name *
                      </label>
                      <input
                        type="text"
                        value={formData.location?.venue || ''}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          location: { ...formData.location!, venue: e.target.value } 
                        })}
                        className="w-full px-4 py-3 border border-charcoal/20 focus:border-gold focus:outline-none"
                        placeholder="e.g., Galerie Mondapart"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        value={formData.location?.address || ''}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          location: { ...formData.location!, address: e.target.value } 
                        })}
                        className="w-full px-4 py-3 border border-charcoal/20 focus:border-gold focus:outline-none"
                        placeholder="Street address"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        value={formData.location?.city || ''}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          location: { ...formData.location!, city: e.target.value } 
                        })}
                        className="w-full px-4 py-3 border border-charcoal/20 focus:border-gold focus:outline-none"
                        placeholder="City"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Country *
                      </label>
                      <input
                        type="text"
                        value={formData.location?.country || ''}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          location: { ...formData.location!, country: e.target.value } 
                        })}
                        className="w-full px-4 py-3 border border-charcoal/20 focus:border-gold focus:outline-none"
                        placeholder="Country"
                      />
                    </div>
                  </div>
                </div>

                {/* Description & Theme */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Description *
                    </label>
                    <textarea
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={6}
                      className="w-full px-4 py-3 border border-charcoal/20 focus:border-gold focus:outline-none resize-none"
                      placeholder="Describe the event in detail..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Theme / Concept
                    </label>
                    <textarea
                      value={formData.theme || ''}
                      onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 border border-charcoal/20 focus:border-gold focus:outline-none resize-none"
                      placeholder="What does this event explore?"
                    />
                  </div>
                </div>

                {/* Tags & Featured */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Tags
                    </label>
                    <input
                      type="text"
                      value={(formData.tags || []).join(', ')}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) 
                      })}
                      className="w-full px-4 py-3 border border-charcoal/20 focus:border-gold focus:outline-none"
                      placeholder="exhibition, paris, contemporary (comma-separated)"
                    />
                  </div>

                  <div className="flex items-end">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.featured || false}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="w-5 h-5 text-gold"
                      />
                      <span className="text-sm font-medium text-charcoal flex items-center gap-2">
                        <Star className="w-4 h-4 text-gold" />
                        Featured Event
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 mt-8 pt-8 border-t border-charcoal/10">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-gold to-terracotta text-white hover:shadow-lg transition-all"
                >
                  <Save className="w-5 h-5" />
                  {isCreating ? 'Create Event' : 'Save Changes'}
                </button>
                <button
                  onClick={handleCancel}
                  className="px-8 py-3 border-2 border-charcoal/20 text-charcoal hover:border-charcoal/40 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Events List */}
      <div className="bg-white border border-charcoal/10 shadow-sm">
        <div className="px-6 py-4 border-b border-charcoal/10 flex items-center justify-between">
          <h3 className="font-serif text-2xl text-charcoal">Events</h3>
          <p className="text-sm text-muted">Drag to reorder</p>
        </div>

        <Reorder.Group axis="y" values={events} onReorder={setEvents} className="divide-y divide-charcoal/10">
          {events.map((event) => (
            <Reorder.Item key={event.id} value={event}>
              <div className="px-6 py-5 hover:bg-charcoal/5 transition-colors group">
                <div className="flex items-start gap-4">
                  {/* Drag Handle */}
                  <button className="cursor-grab active:cursor-grabbing text-muted hover:text-charcoal transition-colors mt-1">
                    <GripVertical className="w-5 h-5" />
                  </button>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-serif text-xl text-charcoal">{event.title}</h4>
                          {event.featured && (
                            <Star className="w-5 h-5 text-gold fill-gold" />
                          )}
                        </div>
                        {event.subtitle && (
                          <p className="text-sm text-muted italic mb-2">{event.subtitle}</p>
                        )}
                      </div>
                      <span className={`px-3 py-1 text-xs font-medium uppercase tracking-wider ${getTypeColor(event.type)}`}>
                        {event.type}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-muted">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(event.schedule.startDate)} - {formatDate(event.schedule.endDate)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location.city}, {event.location.country}</span>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        event.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                        event.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {event.status}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => toggleFeatured(event.id)}
                      className="p-2 hover:bg-gold/10 rounded transition-colors"
                      title={event.featured ? 'Remove from featured' : 'Mark as featured'}
                    >
                      <Star className={`w-5 h-5 ${event.featured ? 'text-gold fill-gold' : 'text-muted'}`} />
                    </button>
                    
                    <button
                      onClick={() => handleEdit(event)}
                      className="p-2 hover:bg-charcoal/10 rounded transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-5 h-5 text-charcoal" />
                    </button>
                    
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="p-2 hover:bg-red-50 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    </div>
  );
}
