import React, { useState } from 'react';
import { Package, MapPin, Mail, Phone, Calendar, DollarSign, Check, X } from 'lucide-react';

interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  shipping: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  items: {
    artworkId: number;
    title: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  paymentMethod: string;
}

// Mock orders data
const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ARO-2024-001',
    customer: {
      name: 'Marie Laurent',
      email: 'marie.laurent@email.com',
      phone: '+33 6 12 34 56 78'
    },
    shipping: {
      address: '15 Rue de la Paix',
      city: 'Paris',
      postalCode: '75002',
      country: 'France'
    },
    items: [
      {
        artworkId: 1,
        title: 'Ce Père Idéal',
        price: 4200,
        quantity: 1
      }
    ],
    total: 4250,
    status: 'pending',
    date: '2024-02-13T10:30:00',
    paymentMethod: 'Stripe'
  }
];

export function OrdersManager() {
  const [orders] = useState<Order[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
        <div className="bg-white border border-charcoal/10 p-4 lg:p-6">
          <p className="text-xs lg:text-sm text-muted mb-1">Total Orders</p>
          <p className="text-2xl lg:text-3xl font-serif text-charcoal">{orders.length}</p>
        </div>
        <div className="bg-white border border-charcoal/10 p-4 lg:p-6">
          <p className="text-xs lg:text-sm text-muted mb-1">Pending</p>
          <p className="text-2xl lg:text-3xl font-serif text-yellow-600">
            {orders.filter(o => o.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white border border-charcoal/10 p-4 lg:p-6">
          <p className="text-xs lg:text-sm text-muted mb-1">In Progress</p>
          <p className="text-2xl lg:text-3xl font-serif text-blue-600">
            {orders.filter(o => o.status === 'processing' || o.status === 'shipped').length}
          </p>
        </div>
        <div className="bg-white border border-charcoal/10 p-4 lg:p-6">
          <p className="text-xs lg:text-sm text-muted mb-1">Total Revenue</p>
          <p className="text-xl lg:text-3xl font-serif text-green-600 break-words">
            €{orders.reduce((sum, o) => sum + o.total, 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white border border-charcoal/10">
        <div className="px-4 lg:px-6 py-3 lg:py-4 border-b border-charcoal/10">
          <h3 className="font-serif text-xl lg:text-2xl text-charcoal">Recent Orders</h3>
        </div>

        {orders.length === 0 ? (
          <div className="p-12 text-center">
            <Package className="w-16 h-16 text-muted mx-auto mb-4" />
            <p className="text-muted text-lg">No orders yet</p>
            <p className="text-sm text-muted mt-2">Customer orders will appear here</p>
          </div>
        ) : (
          <div className="divide-y divide-charcoal/10">
            {orders.map((order) => (
              <div
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className="px-4 lg:px-6 py-4 hover:bg-charcoal/5 transition-colors cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                  <div className="min-w-0">
                    <h4 className="font-medium text-charcoal mb-1 break-words">
                      Order {order.orderNumber}
                    </h4>
                    <p className="text-sm text-muted truncate">{order.customer.name}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap self-start ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 lg:gap-6 text-xs lg:text-sm text-muted">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" />
                    <span className="truncate">{formatDate(order.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" />
                    <span>€{order.total.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" />
                    <span>{order.items.length} item(s)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div 
          className="fixed inset-0 bg-charcoal/50 z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedOrder(null)}
        >
          <div 
            className="bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-charcoal/10 flex items-center justify-between sticky top-0 bg-white">
              <div>
                <h3 className="font-serif text-2xl text-charcoal">Order {selectedOrder.orderNumber}</h3>
                <p className="text-sm text-muted">{formatDate(selectedOrder.date)}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-muted hover:text-charcoal transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h4 className="text-sm uppercase tracking-wider text-muted font-medium mb-3">Customer</h4>
                <div className="space-y-2 text-sm">
                  <p className="text-charcoal font-medium">{selectedOrder.customer.name}</p>
                  <div className="flex items-center gap-2 text-muted">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${selectedOrder.customer.email}`} className="hover:text-terracotta">
                      {selectedOrder.customer.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-muted">
                    <Phone className="w-4 h-4" />
                    <span>{selectedOrder.customer.phone}</span>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="pt-6 border-t border-charcoal/10">
                <h4 className="text-sm uppercase tracking-wider text-muted font-medium mb-3">Shipping Address</h4>
                <div className="flex items-start gap-2 text-sm text-charcoal">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p>{selectedOrder.shipping.address}</p>
                    <p>{selectedOrder.shipping.city}, {selectedOrder.shipping.postalCode}</p>
                    <p>{selectedOrder.shipping.country}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="pt-6 border-t border-charcoal/10">
                <h4 className="text-sm uppercase tracking-wider text-muted font-medium mb-3">Items</h4>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-charcoal/10 last:border-0">
                      <div>
                        <p className="font-medium text-charcoal">{item.title}</p>
                        <p className="text-sm text-muted">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-charcoal">€{item.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Total */}
              <div className="pt-6 border-t border-charcoal/10">
                <div className="flex items-center justify-between text-lg">
                  <span className="font-medium text-charcoal">Total</span>
                  <span className="font-serif text-2xl text-terracotta">€{selectedOrder.total.toLocaleString()}</span>
                </div>
                <p className="text-sm text-muted mt-2">Payment via {selectedOrder.paymentMethod}</p>
              </div>

              {/* Status Update */}
              <div className="pt-6 border-t border-charcoal/10">
                <h4 className="text-sm uppercase tracking-wider text-muted font-medium mb-3">Update Status</h4>
                <div className="flex flex-wrap gap-2">
                  {(['pending', 'processing', 'shipped', 'delivered', 'cancelled'] as const).map((status) => (
                    <button
                      key={status}
                      className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                        selectedOrder.status === status
                          ? getStatusColor(status)
                          : 'bg-charcoal/5 text-charcoal hover:bg-charcoal/10'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-charcoal/10 flex items-center gap-4 bg-charcoal/5">
              <button className="flex-1 px-6 py-3 bg-terracotta text-white hover:bg-terracotta/90 transition-colors">
                Mark as Shipped
              </button>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="px-6 py-3 border border-charcoal/20 text-charcoal hover:border-charcoal/40 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
