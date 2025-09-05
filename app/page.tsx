'use client';

import { useState, useEffect } from 'react';
import { AppShell } from '@/components/AppShell';
import { DeliveryCard } from '@/components/DeliveryCard';
import { BidItem } from '@/components/BidItem';
import { MetricCard } from '@/components/MetricCard';
import { ChartCard } from '@/components/ChartCard';
import { LocationMap } from '@/components/LocationMap';
import { Badge } from '@/components/Badge';
import { DeliveryRequest, Bid, MarketMetrics } from '@/lib/types';
import { generateMockData, formatCurrency } from '@/lib/utils';
import { 
  DollarSign, 
  Truck, 
  Package, 
  Star, 
  Users, 
  Clock,
  Plus,
  Filter,
  TrendingUp
} from 'lucide-react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';

export default function HomePage() {
  const [deliveries, setDeliveries] = useState<DeliveryRequest[]>([]);
  const [bids, setBids] = useState<Bid[]>([]);
  const [selectedDelivery, setSelectedDelivery] = useState<string | null>(null);
  const [userMode, setUserMode] = useState<'sender' | 'courier'>('courier');
  const [showBidModal, setShowBidModal] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  
  const { setFrameReady } = useMiniKit();

  // Mock market metrics
  const metrics: MarketMetrics = {
    totalEarnings: 14987,
    activeDeliveries: 23,
    completedDeliveries: 156,
    averageRating: 4.8,
    totalCouriers: 89,
    averageDeliveryTime: 45
  };

  // Mock chart data
  const chartData = [12, 19, 15, 25, 22, 18, 28];
  const chartLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  useEffect(() => {
    setFrameReady();
    const { mockDeliveries, mockBids } = generateMockData();
    setDeliveries(mockDeliveries);
    setBids(mockBids);
  }, [setFrameReady]);

  const handleBid = (deliveryId: string) => {
    setSelectedDelivery(deliveryId);
    setShowBidModal(true);
  };

  const handleSubmitBid = () => {
    if (!selectedDelivery || !bidAmount) return;
    
    const newBid: Bid = {
      bidId: Date.now().toString(),
      deliveryRequestId: selectedDelivery,
      courierWalletAddress: '0x1234...5678',
      offeredPrice: parseFloat(bidAmount),
      etaEstimate: new Date(Date.now() + 90 * 60 * 1000),
      status: 'active',
      courierRating: 4.7,
      courierName: 'You',
      vehicleType: 'bike',
      createdAt: new Date()
    };
    
    setBids(prev => [...prev, newBid]);
    setShowBidModal(false);
    setBidAmount('');
    setSelectedDelivery(null);
  };

  const handleAcceptBid = (bidId: string) => {
    setBids(prev => prev.map(bid => 
      bid.bidId === bidId 
        ? { ...bid, status: 'accepted' as const }
        : bid
    ));
  };

  const getDeliveryBids = (deliveryId: string) => {
    return bids.filter(bid => bid.deliveryRequestId === deliveryId);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white text-shadow mb-2">
              The Shipit
            </h2>
            <p className="text-white text-opacity-80">
              Decentralized package delivery marketplace
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setUserMode(userMode === 'sender' ? 'courier' : 'sender')}
              className="glass-button"
            >
              Switch to {userMode === 'sender' ? 'Courier' : 'Sender'}
            </button>
            <button className="btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              {userMode === 'sender' ? 'Post Delivery' : 'Find Jobs'}
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Earnings"
            value={formatCurrency(metrics.totalEarnings)}
            subtitle="This month"
            icon={DollarSign}
            trend={{ value: 12.5, isPositive: true }}
          />
          <MetricCard
            title="Active Deliveries"
            value={metrics.activeDeliveries}
            subtitle="In progress"
            icon={Truck}
            trend={{ value: 8.2, isPositive: true }}
          />
          <MetricCard
            title="Completed"
            value={metrics.completedDeliveries}
            subtitle="All time"
            icon={Package}
            trend={{ value: 15.3, isPositive: true }}
          />
          <MetricCard
            title="Rating"
            value={`${metrics.averageRating}/5.0`}
            subtitle="Average rating"
            icon={Star}
            trend={{ value: 2.1, isPositive: true }}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Deliveries */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">
                {userMode === 'sender' ? 'Your Deliveries' : 'Available Jobs'}
              </h3>
              <div className="flex items-center space-x-2">
                <Badge variant="new">{deliveries.length} active</Badge>
                <button className="glass-button p-2">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {deliveries.map((delivery) => (
                <DeliveryCard
                  key={delivery.requestId}
                  delivery={delivery}
                  variant={userMode}
                  bids={getDeliveryBids(delivery.requestId)}
                  onBid={handleBid}
                  onViewBids={(id) => setSelectedDelivery(id)}
                />
              ))}
            </div>
          </div>

          {/* Right Column - Stats & Map */}
          <div className="space-y-4">
            {/* Location Map */}
            {deliveries.length > 0 && (
              <LocationMap
                pickupLocation={deliveries[0].pickupLocation}
                deliveryLocation={deliveries[0].deliveryLocation}
              />
            )}
            
            {/* Chart */}
            <ChartCard
              title="Weekly Earnings"
              data={chartData}
              labels={chartLabels}
            />
            
            {/* Additional Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <MetricCard
                title="Couriers"
                value={metrics.totalCouriers}
                icon={Users}
              />
              <MetricCard
                title="Avg Time"
                value={`${metrics.averageDeliveryTime}m`}
                icon={Clock}
              />
            </div>
          </div>
        </div>

        {/* Bids Section */}
        {selectedDelivery && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">
              Bids for Delivery #{selectedDelivery}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getDeliveryBids(selectedDelivery).map((bid) => (
                <BidItem
                  key={bid.bidId}
                  bid={bid}
                  variant={bid.status === 'accepted' ? 'accepted' : 'active'}
                  onAccept={handleAcceptBid}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bid Modal */}
      {showBidModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="glass-card p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-white mb-4">
              Place Your Bid
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Bid Amount (USD)
                </label>
                <input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder="Enter your bid..."
                  className="glass-input w-full"
                  step="0.01"
                  min="0"
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={handleSubmitBid}
                  className="flex-1 btn-primary"
                  disabled={!bidAmount}
                >
                  Submit Bid
                </button>
                <button
                  onClick={() => setShowBidModal(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
