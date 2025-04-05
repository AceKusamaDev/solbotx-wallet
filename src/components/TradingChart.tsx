'use client';

export default function TradingChart({ symbol = 'SOLUSD' }: { symbol?: string }) {
  return (
    <div className="h-[500px] w-full bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
      <div className="text-center p-6">
        <h3 className="text-xl font-bold text-white mb-4">Trading Chart</h3>
        <p className="text-gray-400 mb-6">
          This is a demo version with simulated chart functionality.
        </p>
        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="text-sm text-gray-400">Symbol</div>
          <div className="text-xl font-bold text-white">{symbol}</div>
        </div>
        
        {/* Simulated chart display */}
        <div className="mt-8 h-64 bg-gray-700 rounded-lg p-4 flex flex-col">
          <div className="flex justify-between mb-4">
            <span className="text-green-500">$153.80</span>
            <span className="text-gray-400">24h: +2.4%</span>
          </div>
          
          {/* Simple chart visualization */}
          <div className="flex-1 flex items-end">
            <div className="w-1/12 h-[20%] bg-green-500 mx-0.5"></div>
            <div className="w-1/12 h-[30%] bg-red-500 mx-0.5"></div>
            <div className="w-1/12 h-[25%] bg-green-500 mx-0.5"></div>
            <div className="w-1/12 h-[40%] bg-green-500 mx-0.5"></div>
            <div className="w-1/12 h-[35%] bg-red-500 mx-0.5"></div>
            <div className="w-1/12 h-[45%] bg-green-500 mx-0.5"></div>
            <div className="w-1/12 h-[60%] bg-green-500 mx-0.5"></div>
            <div className="w-1/12 h-[50%] bg-red-500 mx-0.5"></div>
            <div className="w-1/12 h-[70%] bg-green-500 mx-0.5"></div>
            <div className="w-1/12 h-[90%] bg-green-500 mx-0.5"></div>
            <div className="w-1/12 h-[80%] bg-green-500 mx-0.5"></div>
            <div className="w-1/12 h-[100%] bg-green-500 mx-0.5"></div>
          </div>
          
          <div className="flex justify-between mt-4">
            <span className="text-gray-400">09:00</span>
            <span className="text-gray-400">16:00</span>
          </div>
        </div>
      </div>
    </div>
  );
}
