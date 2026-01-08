import React, { useState } from 'react';
import { Send } from 'lucide-react';

export default function CheckoutForm({ cart, products, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const cartItems = Object.entries(cart)
    .filter(([_, qty]) => qty > 0)
    .map(([id, qty]) => {
      const product = products.find(p => p.id === parseInt(id));
      return { ...product, qty };
    });

  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.qty), 0);

  if (cartItems.length === 0) {
    return (
      <div id="checkout-section" className="bg-white p-8 rounded-2xl shadow-sm text-center border border-rose-100">
        <p className="text-gray-500">Your cart is empty. Add some delicious food above! 🧁</p>
      </div>
    );
  }

  return (
    <div id="checkout-section" className="bg-white p-8 rounded-2xl shadow-lg border border-rose-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        Checkout 🧺
      </h2>

      <div className="mb-8 bg-rose-50 p-4 rounded-xl">
        <h3 className="font-semibold text-gray-700 mb-3">Order Summary</h3>
        <ul className="space-y-2 mb-4">
          {cartItems.map(item => (
            <li key={item.id} className="flex justify-between text-sm">
              <span className="text-gray-600">{item.qty} x {item.name}</span>
              <span className="font-medium text-gray-800">${(item.price * item.qty).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="border-t border-rose-200 pt-3 flex justify-between items-center">
          <span className="font-bold text-gray-700">Total</span>
          <span className="font-bold text-xl text-rose-600">${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-400 focus:ring focus:ring-rose-100 focus:outline-none transition-all"
            placeholder="Jane Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
          <textarea
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-400 focus:ring focus:ring-rose-100 focus:outline-none transition-all"
            placeholder="123 Delicious Lane..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-400 focus:ring focus:ring-rose-100 focus:outline-none transition-all"
            placeholder="+1 234 567 890"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-200 hover:shadow-xl transition-all flex items-center justify-center gap-2 mt-4"
        >
          <Send size={20} />
          Order via WhatsApp
        </button>
      </form>
    </div>
  );
}
