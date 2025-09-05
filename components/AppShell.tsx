'use client';

import { ReactNode } from 'react';
import { Search, Bell, User, Menu } from 'lucide-react';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar } from '@coinbase/onchainkit/identity';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-blue-500 to-cyan-400">
      {/* Header */}
      <header className="glass-card mx-4 mt-4 p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-white text-shadow">
              Shipit
            </h1>
            <span className="text-sm text-white text-opacity-80">
              Decentralized package delivery marketplace
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="glass-button p-2">
              <Search className="w-5 h-5" />
            </button>
            <button className="glass-button p-2">
              <Bell className="w-5 h-5" />
            </button>
            
            <Wallet>
              <ConnectWallet>
                <div className="flex items-center space-x-2 glass-button">
                  <Avatar className="w-6 h-6" />
                  <Name className="text-sm font-medium" />
                </div>
              </ConnectWallet>
            </Wallet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 pb-8">
        {children}
      </main>
    </div>
  );
}
