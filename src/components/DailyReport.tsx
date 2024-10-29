import React from 'react';
import { BarChart3, PieChart, TrendingUp, CreditCard } from 'lucide-react';
import { DailySummary } from '../types';

interface DailyReportProps {
  summary: DailySummary;
}

export function DailyReport({ summary }: DailyReportProps) {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Daily Report</h2>
        <BarChart3 size={20} className="text-gray-500" />
      </div>

      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={20} className="text-blue-600" />
            <h3 className="font-semibold text-gray-800">Sales Overview</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Sales</span>
              <span className="font-bold">${summary.totalSales.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Orders</span>
              <span className="font-bold">{summary.totalOrders}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Average Order</span>
              <span className="font-bold">${summary.averageOrderValue.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <PieChart size={20} className="text-green-600" />
            <h3 className="font-semibold text-gray-800">Sales by Category</h3>
          </div>
          <div className="space-y-2">
            {Object.entries(summary.salesByCategory).map(([category, amount]) => (
              <div key={category} className="flex justify-between">
                <span className="text-gray-600 capitalize">{category}</span>
                <span className="font-bold">${amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <CreditCard size={20} className="text-purple-600" />
            <h3 className="font-semibold text-gray-800">Payment Methods</h3>
          </div>
          <div className="space-y-2">
            {Object.entries(summary.salesByPaymentMethod).map(([method, amount]) => (
              <div key={method} className="flex justify-between">
                <span className="text-gray-600 capitalize">{method}</span>
                <span className="font-bold">${amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}