'use client';

import { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Mock data for demonstration
const mockPnlData = [
  { time: '09:00', pnl: 0 },
  { time: '10:00', pnl: 0.12 },
  { time: '11:00', pnl: -0.05 },
  { time: '12:00', pnl: 0.23 },
  { time: '13:00', pnl: 0.45 },
  { time: '14:00', pnl: 0.32 },
  { time: '15:00', pnl: 0.67 },
  { time: '16:00', pnl: 0.89 },
];

const mockTradeData = [
  { id: 1, pair: 'SOL/USDC', side: 'buy', amount: 0.5, price: 152.34, timestamp: '2025-04-04 10:15', status: 'completed', pnl: 0.12 },
  { id: 2, pair: 'SOL/USDC', side: 'sell', amount: 0.3, price: 153.21, timestamp: '2025-04-04 11:30', status: 'completed', pnl: 0.08 },
  { id: 3, pair: 'SOL/USDC', side: 'buy', amount: 0.7, price: 151.89, timestamp: '2025-04-04 13:45', status: 'completed', pnl: 0.15 },
];

interface PerformanceDashboardProps {
  allocatedCapital?: number;
  maxDrawdown?: number;
  profitTarget?: number;
  slippage?: number;
}

export default function PerformanceDashboard({
  allocatedCapital = 100,
  maxDrawdown = 20,
  profitTarget = 30,
  slippage = 0.5
}: PerformanceDashboardProps) {
  const [activeTab, setActiveTab] = useState<'livePnL' | 'openPositions' | 'recentTrades' | 'account'>('livePnL');
  const [botStatus, setBotStatus] = useState<'ready' | 'running' | 'stopped'>('ready');

  const totalPnl = mockPnlData.length > 0 ? mockPnlData[mockPnlData.length - 1].pnl : 0;

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex mb-4 border-b border-gray-700">
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'livePnL' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400 hover:text-gray-300'}`}
          onClick={() => setActiveTab('livePnL')}
        >
          Live PnL
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'openPositions' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400 hover:text-gray-300'}`}
          onClick={() => setActiveTab('openPositions')}
        >
          Open Positions
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'recentTrades' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400 hover:text-gray-300'}`}
          onClick={() => setActiveTab('recentTrades')}
        >
          Recent Trades
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'account' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400 hover:text-gray-300'}`}
          onClick={() => setActiveTab('account')}
        >
          Account
        </button>
      </div>

      <div className="mt-4">
        {activeTab === 'livePnL' && (
          <div>
            <div className="mb-4 flex items-center">
              <h3 className="text-xl font-bold text-white">Live PnL</h3>
              <span className={`ml-4 text-2xl font-bold ${totalPnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {totalPnl >= 0 ? '+' : ''}{totalPnl.toFixed(2)} SOL
              </span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockPnlData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151' }}
                    labelStyle={{ color: '#F9FAFB' }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="pnl" 
                    stroke="#10B981" 
                    activeDot={{ r: 8 }} 
                    name="PnL (SOL)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'openPositions' && (
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Open Positions</h3>
            {mockTradeData.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Pair</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Side</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Amount</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Entry Price</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Current PnL</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {mockTradeData.map((trade) => (
                      <tr key={trade.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{trade.pair}</td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${trade.side === 'buy' ? 'text-green-500' : 'text-red-500'}`}>
                          {trade.side.toUpperCase()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{trade.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">${trade.price.toFixed(2)}</td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${trade.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {trade.pnl >= 0 ? '+' : ''}{trade.pnl.toFixed(2)} SOL
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">No open positions</div>
            )}
          </div>
        )}

        {activeTab === 'recentTrades' && (
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Recent Trades</h3>
            {mockTradeData.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Time</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Pair</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Side</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Amount</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Price</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">PnL</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {mockTradeData.map((trade) => (
                      <tr key={trade.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{trade.timestamp}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{trade.pair}</td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${trade.side === 'buy' ? 'text-green-500' : 'text-red-500'}`}>
                          {trade.side.toUpperCase()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{trade.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">${trade.price.toFixed(2)}</td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${trade.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {trade.pnl >= 0 ? '+' : ''}{trade.pnl.toFixed(2)} SOL
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">No recent trades</div>
            )}
          </div>
        )}

        {activeTab === 'account' && (
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Account</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="text-sm text-gray-400">Allocated Capital</div>
                <div className="text-xl font-bold text-white">{allocatedCapital} SOL</div>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="text-sm text-gray-400">Max Drawdown</div>
                <div className="text-xl font-bold text-white">{maxDrawdown}%</div>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="text-sm text-gray-400">Profit Target</div>
                <div className="text-xl font-bold text-white">{profitTarget}%</div>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="text-sm text-gray-400">Slippage</div>
                <div className="text-xl font-bold text-white">{slippage}%</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${
              botStatus === 'running' ? 'bg-green-500' : 
              botStatus === 'ready' ? 'bg-yellow-500' : 'bg-red-500'
            }`}></div>
            <span className="text-gray-300">
              Bot {botStatus === 'running' ? 'running' : botStatus === 'ready' ? 'not ready' : 'stopped'}
            </span>
          </div>
          <button
            onClick={() => setBotStatus(botStatus === 'running' ? 'stopped' : 'running')}
            className={`px-4 py-2 rounded-md font-medium ${
              botStatus === 'running' 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
            disabled={botStatus === 'ready'}
          >
            {botStatus === 'running' ? 'Stop Bot' : 'Start Bot'}
          </button>
        </div>
      </div>
    </div>
  );
}
