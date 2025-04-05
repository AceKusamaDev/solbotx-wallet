'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import StrategyConfig from '@/components/StrategyConfig';
import TradingChart from '@/components/TradingChart';
import PerformanceDashboard from '@/components/PerformanceDashboard';
import { StrategyParams } from '@/components/BotControl';

// Dynamically import BotControl with no SSR to prevent wallet-related issues
const BotControl = dynamic(() => import('@/components/BotControl'), { ssr: false });

export default function Home() {
  const [connected, setConnected] = useState(false);
  const [currentSymbol] = useState('SOLUSD');
  const [strategyParams, setStrategyParams] = useState<StrategyParams>({
    type: 'Multi-indicator',
    indicators: [
      { type: 'SMA', parameters: { period: 14 } },
      { type: 'RSI', parameters: { period: 30 } },
      { type: 'MACD', parameters: { fast: 12, slow: 26 } }
    ],
    amount: 0.5,
    pair: 'SOL/USDC',
    action: 'buy'
  });

  // Check if wallet is connected
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (typeof window !== 'undefined' && window.phantom?.solana) {
        try {
          // Check if already connected
          const isPhantomConnected = window.phantom.solana.isConnected;
          setConnected(isPhantomConnected);
        } catch (error) {
          console.error('Error checking wallet connection:', error);
          setConnected(false);
        }
      }
    };
    
    checkWalletConnection();
    
    // Set up event listener for wallet connection changes
    const handleWalletConnectionChange = () => {
      if (window.phantom?.solana) {
        setConnected(window.phantom.solana.isConnected);
      }
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('phantomConnectionChanged', handleWalletConnectionChange);
      
      return () => {
        window.removeEventListener('phantomConnectionChanged', handleWalletConnectionChange);
      };
    }
  }, []);

  // Update strategy params when config changes
  const handleStrategyUpdate = (newParams: any) => {
    setStrategyParams(newParams);
  };

  return (
    <div className="flex flex-col space-y-8">
      {!connected && (
        <div className="fixed top-0 left-0 right-0 z-50 p-4 bg-blue-600">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-white font-medium">
                Connect your wallet to start trading
              </span>
            </div>
          </div>
        </div>
      )}
      
      <div className="pt-16">
        <h1 className="text-3xl font-bold">SolBotX AI Trading Bot</h1>
        
        {!connected ? (
          <div className="bg-gray-800 p-8 rounded-lg text-center mt-8">
            <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
            <p className="text-gray-400 mb-6">
              Please connect your Phantom wallet to start using the SolBotX trading bot.
            </p>
            <p className="text-gray-400">
              Click the Connect Wallet button in the top right corner.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
              <div className="lg:col-span-1">
                <StrategyConfig onStrategyUpdate={handleStrategyUpdate} />
                <div className="mt-6">
                  <BotControl strategyParams={strategyParams} />
                </div>
              </div>
              <div className="lg:col-span-2">
                <TradingChart symbol={currentSymbol} />
              </div>
            </div>
            
            <div className="mt-8">
              <PerformanceDashboard 
                allocatedCapital={100}
                maxDrawdown={20}
                profitTarget={30}
                slippage={0.5}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Add type definition for Phantom wallet
declare global {
  interface Window {
    phantom?: {
      solana?: {
        isPhantom?: boolean;
        isConnected?: boolean;
        connect: () => Promise<{ publicKey: { toString: () => string } }>;
        disconnect: () => Promise<void>;
      };
    };
  }
}
