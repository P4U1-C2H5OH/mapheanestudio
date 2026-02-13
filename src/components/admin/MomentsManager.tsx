import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Edit2, Trash2, Save, X, Heart, Eye, Calendar,
  MapPin, Tag as TagIcon, Image as ImageIcon, Type, AlignLeft
} from 'lucide-react';
import { artistMoments as initialMoments, ArtistMoment, MomentType } from '../../data/moments';

interface CustomField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'date' | 'select' | 'image';
  value: any;
  options?: string[];
}

export function MomentsManager() {
  const [moments, setMoments] = useState([...initialMoments]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<ArtistMoment>>({});
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [showAddField, setShowAddField] = useState(false);

  const handleCreate = () => {
    setIsCreating(true);
    setFormData({
      title: '',
      date: new Date().toISOString().split('T')[0],
      type: 'studio',
      excerpt: '',
      content: '',
      media: [],
      tags: [],
      featured: false
    });
    setCustomFields([]);
  };

  const handleSave = () => {
    if (isCreating) {
      const newMoment: ArtistMoment = {
        ...formData,
        id: Math.max(...moments.map(m => m.id)) + 1,
      } as ArtistMoment;
      setMoments([...moments, newMoment]);
      setIsCreating(false);
    } else if (editingId) {
      setMoments(moments.map(m => 
        m.id === editingId ? { ...m, ...formData } : m
      ));
      setEditingId(null);
    }
    setFormData({});
    setCustomFields([]);
  };

  const handleEdit = (moment: ArtistMoment) => {
    setEditingId(moment.id);
    setFormData(moment);
    setCustomFields([]);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this moment?')) {
      setMoments(moments.filter(m => m.id !== id));
    }
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    setFormData({});
    setCustomFields([]);
  };

  const addCustomField = (type: CustomField['type']) => {
    const newField: CustomField = {
      id: Date.now().toString(),
      label: '',
      type,
      value: type === 'textarea' ? '' : type === 'date' ? new Date().toISOString().split('T')[0] : ''
    };
    setCustomFields([...customFields, newField]);
    setShowAddField(false);
  };

  const removeCustomField = (id: string) => {
    setCustomFields(customFields.filter(f => f.id !== id));
  };

  const updateCustomField = (id: string, updates: Partial<CustomField>) => {
    setCustomFields(customFields.map(f => 
      f.id === id ? { ...f, ...updates } : f
    ));
  };

  const isEditing = isCreating || editingId !== null;

  // Mock interaction data
  const getInteractionCount = (momentId: number) => {
    return Math.floor(Math.random() * 50) + 10;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted">{moments.length} total moments</p>
        </div>
        {!isEditing && (
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-6 py-3 bg-sage text-white hover:bg-sage/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Create New Moment</span>
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
            className="bg-white border border-charcoal/10 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-2xl text-charcoal">
                  {isCreating ? 'Create New Moment' : 'Edit Moment'}
                </h3>
                <button onClick={handleCancel} className="text-muted hover:text-charcoal">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Basic Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">Title *</label>
                    <input
                      type="text"
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-charcoal/20 focus:border-sage focus:outline-none"
                      placeholder="Moment title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">Type *</label>
                    <select
                      value={formData.type || 'studio'}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as MomentType })}
                      className="w-full px-4 py-2 border border-charcoal/20 focus:border-sage focus:outline-none"
                    >
                      <option value="studio">Studio</option>
                      <option value="exhibition">Exhibition</option>
                      <option value="process">Process</option>
                      <option value="travel">Travel</option>
                      <option value="inspiration">Inspiration</option>
                      <option value="personal">Personal</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">Date</label>
                    <input
                      type="date"
                      value={formData.date || ''}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-2 border border-charcoal/20 focus:border-sage focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">Location</label>
                    <input
                      type="text"
                      value={formData.location || ''}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-2 border border-charcoal/20 focus:border-sage focus:outline-none"
                      placeholder="City, Country"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">Mood</label>
                    <input
                      type="text"
                      value={formData.mood || ''}
                      onChange={(e) => setFormData({ ...formData, mood: e.target.value })}
                      className="w-full px-4 py-2 border border-charcoal/20 focus:border-sage focus:outline-none"
                      placeholder="e.g., Hopeful, Reflective"
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.featured || false}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="w-5 h-5 text-sage"
                      />
                      <span className="text-sm font-medium text-charcoal">Featured Moment</span>
                    </label>
                  </div>
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Excerpt</label>
                  <input
                    type="text"
                    value={formData.excerpt || ''}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="w-full px-4 py-2 border border-charcoal/20 focus:border-sage focus:outline-none"
                    placeholder="Short teaser (20-40 words)"
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Content *</label>
                  <textarea
                    value={formData.content || ''}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={8}
                    className="w-full px-4 py-2 border border-charcoal/20 focus:border-sage focus:outline-none resize-none"
                    placeholder="Tell your story... (300-800 words)"
                  />
                  <p className="text-xs text-muted mt-1">
                    {(formData.content || '').split(' ').length} words
                  </p>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Tags</label>
                  <input
                    type="text"
                    value={(formData.tags || []).join(', ')}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) 
                    })}
                    className="w-full px-4 py-2 border border-charcoal/20 focus:border-sage focus:outline-none"
                    placeholder="studio, process, clay (comma-separated)"
                  />
                </div>

                {/* Custom Fields */}
                {customFields.length > 0 && (
                  <div className="border-t border-charcoal/10 pt-6">
                    <h4 className="text-sm uppercase tracking-wider text-muted font-medium mb-4">Custom Fields</h4>
                    <div className="space-y-4">
                      {customFields.map((field) => (
                        <div key={field.id} className="flex gap-4 items-start">
                          <div className="flex-1 grid grid-cols-2 gap-4">
                            <input
                              type="text"
                              value={field.label}
                              onChange={(e) => updateCustomField(field.id, { label: e.target.value })}
                              className="px-4 py-2 border border-charcoal/20 focus:border-sage focus:outline-none"
                              placeholder="Field label"
                            />
                            {field.type === 'textarea' ? (
                              <textarea
                                value={field.value}
                                onChange={(e) => updateCustomField(field.id, { value: e.target.value })}
                                className="px-4 py-2 border border-charcoal/20 focus:border-sage focus:outline-none resize-none"
                                rows={2}
                                placeholder="Field value"
                              />
                            ) : (
                              <input
                                type={field.type}
                                value={field.value}
                                onChange={(e) => updateCustomField(field.id, { value: e.target.value })}
                                className="px-4 py-2 border border-charcoal/20 focus:border-sage focus:outline-none"
                                placeholder="Field value"
                              />
                            )}
                          </div>
                          <button
                            onClick={() => removeCustomField(field.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add Custom Field */}
                <div className="border-t border-charcoal/10 pt-6">
                  {!showAddField ? (
                    <button
                      onClick={() => setShowAddField(true)}
                      className="text-sm text-sage hover:text-sage/80 transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Custom Field
                    </button>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => addCustomField('text')} className="px-4 py-2 bg-charcoal/5 hover:bg-charcoal/10 transition-colors text-sm flex items-center gap-2">
                        <Type className="w-4 h-4" />
                        Text
                      </button>
                      <button onClick={() => addCustomField('textarea')} className="px-4 py-2 bg-charcoal/5 hover:bg-charcoal/10 transition-colors text-sm flex items-center gap-2">
                        <AlignLeft className="w-4 h-4" />
                        Long Text
                      </button>
                      <button onClick={() => addCustomField('date')} className="px-4 py-2 bg-charcoal/5 hover:bg-charcoal/10 transition-colors text-sm flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Date
                      </button>
                      <button onClick={() => setShowAddField(false)} className="px-4 py-2 text-muted hover:text-charcoal transition-colors text-sm">
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-charcoal/10">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-3 bg-sage text-white hover:bg-sage/90 transition-colors"
                >
                  <Save className="w-5 h-5" />
                  {isCreating ? 'Publish Moment' : 'Save Changes'}
                </button>
                <button
                  onClick={handleCancel}
                  className="px-6 py-3 border border-charcoal/20 text-charcoal hover:border-charcoal/40 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Moments List */}
      <div className="bg-white border border-charcoal/10">
        <div className="px-6 py-4 border-b border-charcoal/10">
          <h3 className="font-serif text-xl text-charcoal">Published Moments</h3>
        </div>

        <div className="divide-y divide-charcoal/10">
          {moments.map((moment) => {
            const interactions = getInteractionCount(moment.id);
            
            return (
              <div key={moment.id} className="px-6 py-4 hover:bg-charcoal/5 transition-colors group">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-serif text-lg text-charcoal">{moment.title}</h4>
                      {moment.featured && (
                        <span className="px-2 py-0.5 bg-terracotta/10 text-terracotta text-xs uppercase tracking-wider">
                          Featured
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted mb-2">
                      <span className="capitalize">{moment.type}</span>
                      <span>•</span>
                      <span>{new Date(moment.date).toLocaleDateString()}</span>
                      {moment.location && (
                        <>
                          <span>•</span>
                          <span>{moment.location}</span>
                        </>
                      )}
                    </div>

                    <div className="flex items-center gap-6 text-sm text-muted">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{interactions} views</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span>{Math.floor(interactions * 0.3)} likes</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(moment)}
                      className="p-2 hover:bg-charcoal/10 rounded transition-colors"
                    >
                      <Edit2 className="w-5 h-5 text-charcoal" />
                    </button>
                    <button
                      onClick={() => handleDelete(moment.id)}
                      className="p-2 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
