'use client';

import { MapPin } from 'lucide-react';

interface LocationMapProps {
  pickupLocation: { lat: number; lng: number; address: string };
  deliveryLocation: { lat: number; lng: number; address: string };
  className?: string;
}

export function LocationMap({ pickupLocation, deliveryLocation, className }: LocationMapProps) {
  return (
    <div className={`glass-card p-4 ${className}`}>
      <h3 className="text-white font-medium mb-4">Delivery Route</h3>
      
      {/* Simplified map representation */}
      <div className="relative bg-white bg-opacity-10 rounded-lg h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-20" />
        
        {/* Pickup location */}
        <div className="absolute top-4 left-4 flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-green-400" />
          <div className="bg-black bg-opacity-50 rounded px-2 py-1">
            <span className="text-white text-xs">Pickup</span>
          </div>
        </div>
        
        {/* Delivery location */}
        <div className="absolute bottom-4 right-4 flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-red-400" />
          <div className="bg-black bg-opacity-50 rounded px-2 py-1">
            <span className="text-white text-xs">Delivery</span>
          </div>
        </div>
        
        {/* Route line */}
        <svg className="absolute inset-0 w-full h-full">
          <line
            x1="20%"
            y1="20%"
            x2="80%"
            y2="80%"
            stroke="white"
            strokeWidth="2"
            strokeDasharray="5,5"
            opacity="0.7"
          />
        </svg>
        
        {/* Mock location pins */}
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <MapPin className="w-4 h-4 text-blue-400" />
        </div>
        <div className="absolute top-2/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
          <MapPin className="w-4 h-4 text-purple-400" />
        </div>
      </div>
      
      <div className="mt-3 space-y-2 text-sm">
        <div className="flex items-center space-x-2">
          <MapPin className="w-3 h-3 text-green-400" />
          <span className="text-white text-opacity-80 truncate">
            {pickupLocation.address}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="w-3 h-3 text-red-400" />
          <span className="text-white text-opacity-80 truncate">
            {deliveryLocation.address}
          </span>
        </div>
      </div>
    </div>
  );
}
