import React, { useState } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { 
  Plus, Edit2, Trash2, Save, X, GripVertical, Eye, EyeOff,
  Image as ImageIcon, DollarSign, Tag, Info
} from 'lucide-react';
import { artworks as initialArtworks, Artwork } from '../../data/artworks';

export function GalleryManager() {
  const [artworks, setArtworks] = useState([...initialArtworks]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<Artwork>>({});

  const handleCreate = () => {
    setIsCreating(true);
    setFormData({
      title: '',
      dimensions: '',
      technique: '',
      medium: 'Painting',
      status: 'Available',
      price: 0,
      description: '',
      cropPosition: '50% 50%',
      offsetClass: 'mt-0',
      images: ['/artportfolio.jpg'],
      year: new Date().getFullYear(),
      tags: []
    });
  };

  const handleSave = () => {
    if (isCreating) {
      const newArtwork: Artwork = {
        ...formData,
        id: Math.max(...artworks.map(a => a.id)) + 1,
      } as Artwork;
      setArtworks([...artworks, newArtwork]);
      setIsCreating(false);
    } else if (editingId) {
      setArtworks(artworks.map(a => 
        a.id === editingId ? { ...a, ...formData } : a
      ));
      setEditingId(null);
    }
    setFormData({});
  };

  const handleEdit = (artwork: Artwork) => {
    setEditingId(artwork.id);
    setFormData(artwork);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this artwork?')) {
      setArtworks(artworks.filter(a => a.id !== id));
    }
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    setFormData({});
  };

  const toggleStatus = (id: number) => {
    setArtworks(artworks.map(a =>
      a.id === id ? { ...a, status: a.status === 'Available' ? 'Sold' : 'Available' } : a
    ));
  };

  const isEditing = isCreating || editingId !== null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted">{artworks.length} total artworks</p>
        </div>
        {!isEditing && (
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-6 py-3 bg-terracotta text-white hover:bg-terracotta/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Artwork</span>
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
                  {isCreating ? 'Create New Artwork' : 'Edit Artwork'}
                </h3>
                <button
                  onClick={handleCancel}
                  className="text-muted hover:text-charcoal transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <h4 className="text-sm uppercase tracking-wider text-muted font-medium">Basic Information</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-charcoal/20 focus:border-terracotta focus:outline-none"
                      placeholder="Artwork title"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Medium *
                      </label>
                      <select
                        value={formData.medium || 'Painting'}
                        onChange={(e) => setFormData({ ...formData, medium: e.target.value as any })}
                        className="w-full px-4 py-2 border border-charcoal/20 focus:border-terracotta focus:outline-none"
                      >
                        <option value="Painting">Painting</option>
                        <option value="Drawing">Drawing</option>
                        <option value="Clay Model">Clay Model</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Year
                      </label>
                      <input
                        type="number"
                        value={formData.year || new Date().getFullYear()}
                        onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 border border-charcoal/20 focus:border-terracotta focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Dimensions
                    </label>
                    <input
                      type="text"
                      value={formData.dimensions || ''}
                      onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                      className="w-full px-4 py-2 border border-charcoal/20 focus:border-terracotta focus:outline-none"
                      placeholder="e.g., 100cm x 120cm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Technique
                    </label>
                    <input
                      type="text"
                      value={formData.technique || ''}
                      onChange={(e) => setFormData({ ...formData, technique: e.target.value })}
                      className="w-full px-4 py-2 border border-charcoal/20 focus:border-terracotta focus:outline-none"
                      placeholder="e.g., Oil on canvas"
                    />
                  </div>
                </div>

                {/* Pricing & Status */}
                <div className="space-y-4">
                  <h4 className="text-sm uppercase tracking-wider text-muted font-medium">Pricing & Availability</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Price (M) *
                    </label>
                    <input
                      type="number"
                      value={formData.price || 0}
                      onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                      className="w-full px-4 py-2 border border-charcoal/20 focus:border-terracotta focus:outline-none"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status || 'Available'}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full px-4 py-2 border border-charcoal/20 focus:border-terracotta focus:outline-none"
                    >
                      <option value="Available">Available</option>
                      <option value="Sold">Sold</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Image Position
                    </label>
                    <input
                      type="text"
                      value={formData.cropPosition || '50% 50%'}
                      onChange={(e) => setFormData({ ...formData, cropPosition: e.target.value })}
                      className="w-full px-4 py-2 border border-charcoal/20 focus:border-terracotta focus:outline-none"
                      placeholder="50% 50%"
                    />
                    <p className="text-xs text-muted mt-1">CSS object-position (e.g., "50% 30%")</p>
                  </div>
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-charcoal/20 focus:border-terracotta focus:outline-none resize-none"
                    placeholder="Describe the artwork, inspiration, technique..."
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-charcoal/10">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-3 bg-terracotta text-white hover:bg-terracotta/90 transition-colors"
                >
                  <Save className="w-5 h-5" />
                  <span>{isCreating ? 'Create Artwork' : 'Save Changes'}</span>
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

      {/* Artworks List */}
      <div className="bg-white border border-charcoal/10">
        <div className="px-6 py-4 border-b border-charcoal/10 flex items-center justify-between">
          <h3 className="font-serif text-xl text-charcoal">Artworks</h3>
          <p className="text-sm text-muted">Drag to reorder</p>
        </div>

        <Reorder.Group axis="y" values={artworks} onReorder={setArtworks} className="divide-y divide-charcoal/10">
          {artworks.map((artwork) => (
            <Reorder.Item key={artwork.id} value={artwork}>
              <div className="px-6 py-4 hover:bg-charcoal/5 transition-colors group">
                <div className="flex items-center gap-4">
                  {/* Drag Handle */}
                  <button className="cursor-grab active:cursor-grabbing text-muted hover:text-charcoal transition-colors">
                    <GripVertical className="w-5 h-5" />
                  </button>

                  {/* Thumbnail */}
                  <img
                    src={artwork.images[0]}
                    alt={artwork.title}
                    className="w-16 h-16 object-cover"
                    style={{ objectPosition: artwork.cropPosition }}
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-lg text-charcoal truncate">{artwork.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted">
                      <span>{artwork.medium}</span>
                      <span>•</span>
                      <span>M{artwork.price.toLocaleString()}</span>
                      <span>•</span>
                      <span className={artwork.status === 'Available' ? 'text-sage' : 'text-muted'}>
                        {artwork.status}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => toggleStatus(artwork.id)}
                      className="p-2 hover:bg-charcoal/10 rounded transition-colors"
                      title={artwork.status === 'Available' ? 'Mark as Sold' : 'Mark as Available'}
                    >
                      {artwork.status === 'Available' ? (
                        <Eye className="w-5 h-5 text-sage" />
                      ) : (
                        <EyeOff className="w-5 h-5 text-muted" />
                      )}
                    </button>
                    
                    <button
                      onClick={() => handleEdit(artwork)}
                      className="p-2 hover:bg-charcoal/10 rounded transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-5 h-5 text-charcoal" />
                    </button>
                    
                    <button
                      onClick={() => handleDelete(artwork.id)}
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
