import React from 'react';

export default function CheckoutForm({ formData, onChange }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100">
      <h2 className="text-2xl font-serif font-semibold mb-4 text-gray-800">Your Details 🌸</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-rose-300 focus:border-rose-300 outline-none transition-all"
            placeholder="Jane Doe"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={onChange}
            rows="3"
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-rose-300 focus:border-rose-300 outline-none transition-all"
            placeholder="123 Blossom Lane, Garden City"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={onChange}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-rose-300 focus:border-rose-300 outline-none transition-all"
            placeholder="+1 234 567 8900"
            required
          />
        </div>
      </div>
    </div>
  );
}
