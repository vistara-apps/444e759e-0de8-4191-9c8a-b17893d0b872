import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
}

export function generateMockData() {
  const mockDeliveries: any[] = [
    {
      requestId: '1',
      senderWalletAddress: '0x1234...5678',
      packageDetails: {
        description: 'Electronics package',
        weight: 2.5,
        dimensions: { length: 30, width: 20, height: 10 }
      },
      pickupLocation: {
        address: '123 Main St, San Francisco, CA',
        lat: 37.7749,
        lng: -122.4194
      },
      deliveryLocation: {
        address: '456 Oak Ave, Oakland, CA',
        lat: 37.8044,
        lng: -122.2711
      },
      desiredDeliveryTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
      status: 'open',
      guaranteedDeliveryWindow: true,
      createdAt: new Date(Date.now() - 30 * 60 * 1000)
    },
    {
      requestId: '2',
      senderWalletAddress: '0x9876...5432',
      packageDetails: {
        description: 'Documents',
        weight: 0.5,
        dimensions: { length: 25, width: 18, height: 2 }
      },
      pickupLocation: {
        address: '789 Pine St, San Francisco, CA',
        lat: 37.7849,
        lng: -122.4094
      },
      deliveryLocation: {
        address: '321 Elm St, Berkeley, CA',
        lat: 37.8715,
        lng: -122.2730
      },
      desiredDeliveryTime: new Date(Date.now() + 4 * 60 * 60 * 1000),
      status: 'bidding',
      guaranteedDeliveryWindow: false,
      createdAt: new Date(Date.now() - 45 * 60 * 1000)
    }
  ];

  const mockBids: any[] = [
    {
      bidId: '1',
      deliveryRequestId: '1',
      courierWalletAddress: '0xabcd...efgh',
      offeredPrice: 15.50,
      etaEstimate: new Date(Date.now() + 90 * 60 * 1000),
      status: 'active',
      courierRating: 4.8,
      courierName: 'Alex Chen',
      vehicleType: 'bike',
      createdAt: new Date(Date.now() - 15 * 60 * 1000)
    },
    {
      bidId: '2',
      deliveryRequestId: '1',
      courierWalletAddress: '0x1111...2222',
      offeredPrice: 18.00,
      etaEstimate: new Date(Date.now() + 60 * 60 * 1000),
      status: 'active',
      courierRating: 4.9,
      courierName: 'Maria Rodriguez',
      vehicleType: 'car',
      createdAt: new Date(Date.now() - 10 * 60 * 1000)
    }
  ];

  return { mockDeliveries, mockBids };
}
