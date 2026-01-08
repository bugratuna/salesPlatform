import React from 'react';
import { ShoppingBag } from 'lucide-react';

export default function CartSummary({ cart, products }) {
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(cart).reduce((total, [id, qty]) => {
    const product = products.find(p => p.id === parseInt(id));
    return total + (product ? product.price * qty : 0);
  }, 0);

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 border-t border-rose-100 z-50">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-rose-100 p-2 rounded-full text-rose-600 relative">
            <ShoppingBag size={24} />
            <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-xl font-bold text-gray-800">${totalPrice.toFixed(2)}</p>
          </div>
        </div>
        <button
          onClick={() => document.getElementById('checkout-section').scrollIntoView({ behavior: 'smooth' })}
          className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition-colors flex items-center gap-2"
        >
          Go to Checkout 🌸
        </button>
      </div>
    </div>
  );
}
