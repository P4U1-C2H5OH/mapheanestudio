import React from 'react';
import { Image, Sparkles, ShoppingBag, Heart, TrendingUp, Users } from 'lucide-react';
import { artworks } from '../../data/artworks';
import { artistMoments } from '../../data/moments';

export function DashboardOverview() {
  const totalArtworks = artworks.length;
  const availableArtworks = artworks.filter(a => a.status === 'Available').length;
  const totalMoments = artistMoments.length;
  const totalRevenue = artworks
    .filter(a => a.status === 'Sold')
    .reduce((sum, a) => sum + a.price, 0);

  const stats = [
    {
      label: 'Total Artworks',
      value: totalArtworks,
      icon: Image,
      color: 'bg-terracotta',
      subtext: `${availableArtworks} available`
    },
    {
      label: 'Artist Moments',
      value: totalMoments,
      icon: Sparkles,
      color: 'bg-sage',
      subtext: 'Stories published'
    },
    {
      label: 'Total Revenue',
      value: `M${totalRevenue.toLocaleString()}`,
      icon: TrendingUp,
      color: 'bg-clay',
      subtext: 'From sold artworks'
    },
    {
      label: 'Pending Orders',
      value: '0',
      icon: ShoppingBag,
      color: 'bg-gold',
      subtext: 'Awaiting fulfillment'
    }
  ];

  const recentActivity = [
    { action: 'New moment published', item: 'First Light in the New Studio', time: '2 hours ago', type: 'moment' },
    { action: 'Artwork sold', item: 'Loulou', time: '1 day ago', type: 'sale' },
    { action: 'New artwork added', item: 'Horizon Éternel', time: '3 days ago', type: 'artwork' },
    { action: 'Moment liked', item: 'Hands Deep in Earth', time: '5 days ago', type: 'interaction' }
  ];

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white border border-charcoal/10 p-4 lg:p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-3 lg:mb-4">
                <div className={`${stat.color} w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
              </div>
              <p className="text-xs lg:text-sm text-muted mb-1">{stat.label}</p>
              <p className="text-2xl lg:text-3xl font-serif text-charcoal mb-1 break-words">{stat.value}</p>
              <p className="text-xs text-muted">{stat.subtext}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white border border-charcoal/10 overflow-hidden">
        <div className="px-4 lg:px-6 py-3 lg:py-4 border-b border-charcoal/10">
          <h3 className="font-serif text-xl lg:text-2xl text-charcoal">Recent Activity</h3>
        </div>
        <div className="divide-y divide-charcoal/10">
          {recentActivity.map((activity, index) => (
            <div key={index} className="px-4 lg:px-6 py-3 lg:py-4 hover:bg-charcoal/5 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm lg:text-base text-charcoal font-medium mb-1">{activity.action}</p>
                  <p className="text-xs lg:text-sm text-muted truncate">{activity.item}</p>
                </div>
                <span className="text-xs text-muted whitespace-nowrap">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <button className="bg-terracotta text-white p-4 lg:p-6 hover:bg-terracotta/90 transition-colors text-left group">
          <Image className="w-6 h-6 lg:w-8 lg:h-8 mb-3 lg:mb-4 group-hover:scale-110 transition-transform" />
          <h4 className="font-serif text-lg lg:text-xl mb-2">Add New Artwork</h4>
          <p className="text-xs lg:text-sm text-white/80">Upload and publish a new piece</p>
        </button>

        <button className="bg-sage text-white p-4 lg:p-6 hover:bg-sage/90 transition-colors text-left group">
          <Sparkles className="w-6 h-6 lg:w-8 lg:h-8 mb-3 lg:mb-4 group-hover:scale-110 transition-transform" />
          <h4 className="font-serif text-lg lg:text-xl mb-2">Create Moment</h4>
          <p className="text-xs lg:text-sm text-white/80">Share a new story or experience</p>
        </button>

        <button className="bg-clay text-white p-4 lg:p-6 hover:bg-clay/90 transition-colors text-left group sm:col-span-2 lg:col-span-1">
          <ShoppingBag className="w-6 h-6 lg:w-8 lg:h-8 mb-3 lg:mb-4 group-hover:scale-110 transition-transform" />
          <h4 className="font-serif text-lg lg:text-xl mb-2">View Orders</h4>
          <p className="text-xs lg:text-sm text-white/80">Manage customer purchases</p>
        </button>
      </div>

      {/* Top Performing Artworks */}
      <div className="bg-white border border-charcoal/10 overflow-hidden">
        <div className="px-4 lg:px-6 py-3 lg:py-4 border-b border-charcoal/10">
          <h3 className="font-serif text-xl lg:text-2xl text-charcoal">Top Artworks</h3>
        </div>
        <div className="p-4 lg:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
            {artworks.slice(0, 3).map((artwork) => (
              <div key={artwork.id} className="flex gap-3 p-3 border border-charcoal/10 hover:border-terracotta/50 transition-colors">
                <img
                  src={artwork.images[0]}
                  alt={artwork.title}
                  className="w-16 h-16 lg:w-20 lg:h-20 object-cover flex-shrink-0"
                  style={{ objectPosition: artwork.cropPosition }}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-sm lg:text-base text-charcoal truncate">{artwork.title}</p>
                  <p className="text-xs lg:text-sm text-muted truncate">{artwork.medium}</p>
                  <p className="text-xs lg:text-sm font-medium text-terracotta">M{artwork.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
