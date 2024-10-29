import React, { useState } from 'react';
import { ShoppingCart, Coffee, Pizza, History, BarChart3, Plus } from 'lucide-react';
import { ProductGrid } from './components/ProductGrid';
import { Cart } from './components/Cart';
import { PaymentModal } from './components/PaymentModal';
import { SalesHistory } from './components/SalesHistory';
import { DailyReport } from './components/DailyReport';
import { CustomItemModal } from './components/CustomItemModal';
import { products as initialProducts } from './data/products';
import { CartItem, Product, Sale, DailySummary } from './types';

function App() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showPayment, setShowPayment] = useState(false);
  const [showCustomItem, setShowCustomItem] = useState(false);
  const [activeTab, setActiveTab] = useState<'pos' | 'history' | 'report'>('pos');
  const [sales, setSales] = useState<Sale[]>([]);

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const handleAddToCart = (product: Product) => {
    setCartItems(items => {
      const existingItem = items.find(item => item.id === product.id);
      if (existingItem) {
        return items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...items, { ...product, quantity: 1 }];
    });
  };

  const handleAddCustomItem = (item: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...item,
      id: Math.random().toString(36).substr(2, 9),
    };
    setProducts(prev => [...prev, newProduct]);
    handleAddToCart(newProduct);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      handleRemoveItem(id);
      return;
    }
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    setShowPayment(true);
  };

  const handlePaymentComplete = (paymentMethod: string) => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const sale: Sale = {
      id: Math.random().toString(36).substr(2, 9),
      items: [...cartItems],
      total,
      paymentMethod,
      timestamp: new Date().toISOString(),
      status: 'completed'
    };
    setSales(prev => [sale, ...prev]);
    setCartItems([]);
    setShowPayment(false);
  };

  const handleRefund = (saleId: string) => {
    setSales(prev =>
      prev.map(sale =>
        sale.id === saleId
          ? { ...sale, status: 'refunded' }
          : sale
      )
    );
  };

  const getDailySummary = (): DailySummary => {
    const completedSales = sales.filter(sale => sale.status === 'completed');
    const totalSales = completedSales.reduce((sum, sale) => sum + sale.total, 0);
    
    const salesByCategory: Record<string, number> = {};
    const salesByPaymentMethod: Record<string, number> = {};

    completedSales.forEach(sale => {
      // Calculate sales by category
      sale.items.forEach(item => {
        salesByCategory[item.category] = (salesByCategory[item.category] || 0) + 
          (item.price * item.quantity);
      });

      // Calculate sales by payment method
      salesByPaymentMethod[sale.paymentMethod] = 
        (salesByPaymentMethod[sale.paymentMethod] || 0) + sale.total;
    });

    return {
      totalSales,
      totalOrders: completedSales.length,
      averageOrderValue: totalSales / (completedSales.length || 1),
      salesByCategory,
      salesByPaymentMethod
    };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Modern POS</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('pos')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg
                ${activeTab === 'pos' ? 'bg-blue-100 text-blue-800' : 'text-gray-600'}`}
            >
              <ShoppingCart size={20} />
              POS
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg
                ${activeTab === 'history' ? 'bg-blue-100 text-blue-800' : 'text-gray-600'}`}
            >
              <History size={20} />
              History
            </button>
            <button
              onClick={() => setActiveTab('report')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg
                ${activeTab === 'report' ? 'bg-blue-100 text-blue-800' : 'text-gray-600'}`}
            >
              <BarChart3 size={20} />
              Report
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'pos' && (
          <div className="flex gap-8">
            <div className="flex-1">
              <div className="mb-6 flex gap-4">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                    selectedCategory === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <ShoppingCart size={20} />
                  All Items
                </button>
                <button
                  onClick={() => setSelectedCategory('drinks')}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                    selectedCategory === 'drinks'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Coffee size={20} />
                  Drinks
                </button>
                <button
                  onClick={() => setSelectedCategory('food')}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                    selectedCategory === 'food'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Pizza size={20} />
                  Food
                </button>
                <button
                  onClick={() => setShowCustomItem(true)}
                  className="px-4 py-2 rounded-lg flex items-center gap-2 bg-green-600 text-white hover:bg-green-700"
                >
                  <Plus size={20} />
                  Custom Item
                </button>
              </div>
              
              <ProductGrid
                products={filteredProducts}
                onProductClick={handleAddToCart}
              />
            </div>

            <div className="w-96">
              <Cart
                items={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onCheckout={handleCheckout}
              />
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <SalesHistory sales={sales} onRefund={handleRefund} />
        )}

        {activeTab === 'report' && (
          <DailyReport summary={getDailySummary()} />
        )}
      </div>

      {showPayment && (
        <PaymentModal
          total={cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}
          onClose={() => setShowPayment(false)}
          onComplete={handlePaymentComplete}
        />
      )}

      {showCustomItem && (
        <CustomItemModal
          onClose={() => setShowCustomItem(false)}
          onAdd={handleAddCustomItem}
        />
      )}
    </div>
  );
}

export default App;