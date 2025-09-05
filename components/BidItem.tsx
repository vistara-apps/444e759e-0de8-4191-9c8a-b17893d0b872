'use client';

import { Bid } from '@/lib/types';
import { formatCurrency, getTimeAgo } from '@/lib/utils';
import { Star, Clock, Truck, User } from 'lucide-react';
import { Badge } from './Badge';

interface BidItemProps {
  bid: Bid;
  variant?: 'active' | 'accepted';
  onAccept?: (bidId: string) => void;
  onReject?: (bidId: string) => void;
}

export function BidItem({ bid, variant = 'active', onAccept, onReject }: BidItemProps) {
  const getVehicleIcon = (vehicleType?: string) => {
    switch (vehicleType) {
      case 'bike':
        return '🚲';
      case 'car':
        return '🚗';
      case 'truck':
        return '🚛';
      case 'van':
        return '🚐';
      default:
        return '🚗';
    }
  };

  return (
    <div className="glass-card p-4 hover:bg-opacity-15 transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white bg-opacity-20 rounded-lg">
            <User className="w-4 h-4 text-white" />
          </div>
          <div>
            <h4 className="font-medium text-white">
              {bid.courierName || 'Anonymous Courier'}
            </h4>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="text-white text-opacity-70 text-xs">
                  {bid.courierRating}/5.0
                </span>
              </div>
              <span className="text-white text-opacity-50 text-xs">•</span>
              <span className="text-white text-opacity-70 text-xs">
                {getVehicleIcon(bid.vehicleType)} {bid.vehicleType}
              </span>
            </div>
          </div>
        </div>
        
        <Badge variant={variant === 'accepted' ? 'top' : 'new'}>
          {bid.status}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-3">
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-bold text-green-400">
            {formatCurrency(bid.offeredPrice)}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-blue-400" />
          <span className="text-white text-sm">
            ETA: {bid.etaEstimate.toLocaleTimeString()}
          </span>
        </div>
      </div>

      <div className="text-white text-opacity-70 text-xs mb-3">
        Bid placed {getTimeAgo(bid.createdAt)}
      </div>

      {variant === 'active' && (
        <div className="flex space-x-2">
          <button
            onClick={() => onAccept?.(bid.bidId)}
            className="flex-1 btn-primary text-sm py-2"
          >
            Accept Bid
          </button>
          <button
            onClick={() => onReject?.(bid.bidId)}
            className="flex-1 btn-secondary text-sm py-2"
          >
            Decline
          </button>
        </div>
      )}
    </div>
  );
}
