import React from 'react';
import { Plus, Minus } from 'lucide-react';

export default function ProductCard({ product, quantity, onAdd, onRemove }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-1">{product.description}</p>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-rose-600">
            ${product.price}
          </span>

          <div className="flex items-center gap-3 bg-rose-50 rounded-full px-2 py-1">
            <button
              onClick={onRemove}
              disabled={quantity === 0}
              className={`p-1 rounded-full ${quantity > 0 ? 'bg-white text-rose-600 shadow-sm' : 'text-gray-300'} transition-colors`}
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            <span className="font-semibold text-gray-700 min-w-[20px] text-center">
              {quantity}
            </span>
            <button
              onClick={onAdd}
              className="p-1 rounded-full bg-rose-500 text-white shadow-sm hover:bg-rose-600 transition-colors"
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
