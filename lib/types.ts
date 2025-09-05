export interface User {
  walletAddress: string;
  isCourier: boolean;
  rating: number;
  vehicleType?: 'bike' | 'car' | 'truck' | 'van';
  farcasterId?: string;
  name?: string;
  avatar?: string;
}

export interface DeliveryRequest {
  requestId: string;
  senderWalletAddress: string;
  packageDetails: {
    description: string;
    weight: number;
    dimensions: {
      length: number;
      width: number;
      height: number;
    };
  };
  pickupLocation: {
    address: string;
    lat: number;
    lng: number;
  };
  deliveryLocation: {
    address: string;
    lat: number;
    lng: number;
  };
  desiredDeliveryTime: Date;
  status: 'open' | 'bidding' | 'awarded' | 'in_progress' | 'completed' | 'cancelled';
  guaranteedDeliveryWindow?: boolean;
  finalPrice?: number;
  courierWalletAddress?: string;
  createdAt: Date;
}

export interface Bid {
  bidId: string;
  deliveryRequestId: string;
  courierWalletAddress: string;
  offeredPrice: number;
  etaEstimate: Date;
  status: 'active' | 'accepted' | 'rejected';
  courierRating: number;
  courierName?: string;
  vehicleType?: string;
  createdAt: Date;
}

export interface MarketMetrics {
  totalEarnings: number;
  activeDeliveries: number;
  completedDeliveries: number;
  averageRating: number;
  totalCouriers: number;
  averageDeliveryTime: number;
}
