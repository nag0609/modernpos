export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
}

export interface Sale {
  id: string;
  items: CartItem[];
  total: number;
  paymentMethod: string;
  timestamp: string;
  status: 'completed' | 'refunded';
}

export interface DailySummary {
  totalSales: number;
  totalOrders: number;
  averageOrderValue: number;
  salesByCategory: Record<string, number>;
  salesByPaymentMethod: Record<string, number>;
}