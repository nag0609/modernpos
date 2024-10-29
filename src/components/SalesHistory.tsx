import React from 'react';
import { Clock, RefreshCcw } from 'lucide-react';
import { Sale } from '../types';

interface SalesHistoryProps {
  sales: Sale[];
  onRefund: (saleId: string) => void;
}

export function SalesHistory({ sales, onRefund }: SalesHistoryProps) {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Sales History</h2>
        <Clock size={20} className="text-gray-500" />
      </div>

      <div className="divide-y">
        {sales.map((sale) => (
          <div key={sale.id} className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="text-sm text-gray-500">
                  {new Date(sale.timestamp).toLocaleString()}
                </span>
                <div className="font-medium">Order #{sale.id.slice(-4)}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-blue-600">
                  ${sale.total.toFixed(2)}
                </div>
                <div className="text-sm text-gray-500">
                  {sale.paymentMethod}
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-600 mb-2">
              {sale.items.map((item) => (
                <div key={item.id}>
                  {item.quantity}x {item.name}
                </div>
              ))}
            </div>

            {sale.status === 'completed' && (
              <button
                onClick={() => onRefund(sale.id)}
                className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
              >
                <RefreshCcw size={14} />
                Refund
              </button>
            )}
            {sale.status === 'refunded' && (
              <span className="text-sm text-gray-500">Refunded</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}