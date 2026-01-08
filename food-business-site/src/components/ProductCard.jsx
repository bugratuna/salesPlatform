import React from 'react';
import { Plus, Minus } from 'lucide-react';

export default function ProductCard({ product, quantity, onAdd, onRemove }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full border border-orange-100">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-serif font-semibold text-gray-800 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-4 flex-1">{product.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-bold text-rose-600">${product.price.toFixed(2)}</span>
          <div className="flex items-center space-x-3 bg-orange-50 rounded-full px-2 py-1">
            <button
              onClick={() => onRemove(product.id)}
              className="p-1 rounded-full hover:bg-orange-200 text-orange-700 transition-colors disabled:opacity-50"
              disabled={quantity === 0}
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            <span className="font-semibold w-4 text-center">{quantity}</span>
            <button
              onClick={() => onAdd(product.id)}
              className="p-1 rounded-full hover:bg-orange-200 text-orange-700 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
