import React, { useState } from 'react';
import { CreditCard, Wallet, Banknote, X } from 'lucide-react';
import { PaymentMethod } from '../types';

const PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'card', name: 'Credit Card', icon: 'CreditCard' },
  { id: 'cash', name: 'Cash', icon: 'Banknote' },
  { id: 'wallet', name: 'Digital Wallet', icon: 'Wallet' },
];

interface PaymentModalProps {
  total: number;
  onClose: () => void;
  onComplete: (paymentMethod: string) => void;
}

export function PaymentModal({ total, onClose, onComplete }: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [processing, setProcessing] = useState(false);

  const handlePayment = async () => {
    if (!selectedMethod) return;
    
    setProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    setProcessing(false);
    onComplete(selectedMethod);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'CreditCard': return <CreditCard className="w-6 h-6" />;
      case 'Banknote': return <Banknote className="w-6 h-6" />;
      case 'Wallet': return <Wallet className="w-6 h-6" />;
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Payment</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="mb-6">
          <div className="text-2xl font-bold text-center mb-6">
            Total: ${total.toFixed(2)}
          </div>

          <div className="space-y-3">
            {PAYMENT_METHODS.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`w-full p-4 rounded-lg border-2 flex items-center gap-3
                  ${selectedMethod === method.id 
                    ? 'border-blue-600 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300'}`}
              >
                {getIcon(method.icon)}
                <span className="font-medium">{method.name}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={!selectedMethod || processing}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold
                   hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {processing ? 'Processing...' : 'Complete Payment'}
        </button>
      </div>
    </div>
  );
}