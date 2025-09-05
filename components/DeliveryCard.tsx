'use client';

import { DeliveryRequest, Bid } from '@/lib/types';
import { formatCurrency, getTimeAgo, calculateDistance } from '@/lib/utils';
import { MapPin, Clock, Package, Star, Truck } from 'lucide-react';
import { Badge } from './Badge';

interface DeliveryCardProps {
  delivery: DeliveryRequest;
  variant?: 'sender' | 'courier';
  bids?: Bid[];
  onBid?: (deliveryId: string) => void;
  onViewBids?: (deliveryId: string) => void;
}

export function DeliveryCard({ 
  delivery, 
  variant = 'courier', 
  bids = [], 
  onBid, 
  onViewBids 
}: DeliveryCardProps) {
  const distance = calculateDistance(
    delivery.pickupLocation.lat,
    delivery.pickupLocation.lng,
    delivery.deliveryLocation.lat,
    delivery.deliveryLocation.lng
  );

  const lowestBid = bids.length > 0 
    ? Math.min(...bids.map(bid => bid.offeredPrice))
    : null;

  const highestRatedBid = bids.length > 0
    ? bids.reduce((prev, current) => 
        prev.courierRating > current.courierRating ? prev : current
      )
    : null;

  return (
    <div className="glass-card p-6 hover:bg-opacity-15 transition-all duration-200 animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white bg-opacity-20 rounded-lg">
            <Package className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-lg">
              {delivery.packageDetails.description}
            </h3>
            <p className="text-white text-opacity-70 text-sm">
              {delivery.packageDetails.weight}kg • {getTimeAgo(delivery.createdAt)}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge variant={delivery.status === 'open' ? 'new' : 'default'}>
            {delivery.status}
          </Badge>
          {delivery.guaranteedDeliveryWindow && (
            <Badge variant="top">Premium</Badge>
          )}
        </div>
      </div>

      {/* Route Information */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-3">
          <MapPin className="w-4 h-4 text-green-400" />
          <span className="text-white text-sm">
            {delivery.pickupLocation.address}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <MapPin className="w-4 h-4 text-red-400" />
          <span className="text-white text-sm">
            {delivery.deliveryLocation.address}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <Truck className="w-4 h-4 text-blue-400" />
          <span className="text-white text-sm">
            {distance.toFixed(1)} km • Est. {Math.ceil(distance * 3)} min
          </span>
        </div>
      </div>

      {/* Delivery Time */}
      <div className="flex items-center space-x-2 mb-4">
        <Clock className="w-4 h-4 text-yellow-400" />
        <span className="text-white text-sm">
          Deliver by: {delivery.desiredDeliveryTime.toLocaleString()}
        </span>
      </div>

      {/* Bidding Information */}
      {variant === 'sender' && bids.length > 0 && (
        <div className="bg-white bg-opacity-10 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white text-sm font-medium">
              {bids.length} bid{bids.length !== 1 ? 's' : ''} received
            </span>
            {lowestBid && (
              <span className="text-green-400 font-semibold">
                From {formatCurrency(lowestBid)}
              </span>
            )}
          </div>
          {highestRatedBid && (
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-white text-sm">
                Top courier: {highestRatedBid.courierRating}/5.0
              </span>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="text-white text-opacity-70 text-sm">
          ID: {delivery.requestId}
        </div>
        
        <div className="flex space-x-2">
          {variant === 'courier' && delivery.status === 'open' && (
            <button
              onClick={() => onBid?.(delivery.requestId)}
              className="btn-primary text-sm px-4 py-2"
            >
              Place Bid
            </button>
          )}
          
          {variant === 'sender' && bids.length > 0 && (
            <button
              onClick={() => onViewBids?.(delivery.requestId)}
              className="btn-secondary text-sm px-4 py-2"
            >
              View Bids ({bids.length})
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
