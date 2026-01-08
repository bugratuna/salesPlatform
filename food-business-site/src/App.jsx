import React, { useState } from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import { products } from './data/products';
import ProductCard from './components/ProductCard';
import CheckoutForm from './components/CheckoutForm';

// Replace with your actual phone number
const MY_PHONE_NUMBER = '15551234567';

function App() {
  const [cart, setCart] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: ''
  });

  const addToCart = (id) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id) => {
    setCart(prev => {
      const newQuantity = (prev[id] || 0) - 1;
      if (newQuantity <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: newQuantity };
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((total, [id, qty]) => {
      const product = products.find(p => p.id === parseInt(id));
      return total + (product ? product.price * qty : 0);
    }, 0);
  };

  const handleOrder = (e) => {
    e.preventDefault();

    if (Object.keys(cart).length === 0) {
        alert("Your cart is empty! Please add some delicious items. 🌸");
        return;
    }

    if (!formData.name || !formData.address || !formData.phone) {
        alert("Please fill in all your details so we can deliver your goodies! ✨");
        return;
    }

    const cartItems = Object.entries(cart).map(([id, qty]) => {
      const product = products.find(p => p.id === parseInt(id));
      return `${qty} x ${product.name}`;
    }).join('\n');

    const total = getTotalPrice().toFixed(2);

    const message = `Hello! I would like to order:

${cartItems}

Total: $${total}

My Details:
Name: ${formData.name}
Address: ${formData.address}
Phone: ${formData.phone}`;

    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${MY_PHONE_NUMBER}?text=${encodedMessage}`;

    window.location.href = url;
  };

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-orange-100">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="bg-rose-100 p-2 rounded-full text-rose-500">
                <Heart size={24} fill="currentColor" />
            </span>
            <h1 className="text-2xl font-serif font-bold text-gray-800">Grandma's Kitchen</h1>
          </div>
          <div className="relative">
            <ShoppingBag className="text-gray-600" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-12">

        {/* Hero Section */}
        <section className="text-center space-y-4">
            <h2 className="text-4xl font-serif font-bold text-gray-800">Homemade with Love 🌸</h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
                Authentic, home-cooked meals prepared fresh daily. From our kitchen to your table. ✨
            </p>
        </section>

        {/* Product List */}
        <section>
          <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-6">Our Menu 🍽️</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                quantity={cart[product.id] || 0}
                onAdd={addToCart}
                onRemove={removeFromCart}
              />
            ))}
          </div>
        </section>

        {/* Checkout Section */}
        {totalItems > 0 && (
            <section className="animate-fade-in-up">
                <form onSubmit={handleOrder} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <CheckoutForm formData={formData} onChange={handleFormChange} />

                    <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100 sticky top-24">
                        <h3 className="text-xl font-serif font-semibold text-gray-800 mb-4">Order Summary ✨</h3>
                        <div className="space-y-2 mb-4">
                            {Object.entries(cart).map(([id, qty]) => {
                                const product = products.find(p => p.id === parseInt(id));
                                return (
                                    <div key={id} className="flex justify-between text-sm text-gray-700">
                                        <span>{qty} x {product.name}</span>
                                        <span>${(product.price * qty).toFixed(2)}</span>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="border-t border-rose-200 pt-4 flex justify-between font-bold text-lg text-gray-800 mb-6">
                            <span>Total</span>
                            <span>${getTotalPrice().toFixed(2)}</span>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-rose-200 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
                        >
                            <span>Order on WhatsApp</span>
                            <span className="text-xl">📱</span>
                        </button>
                    </div>
                </form>
            </section>
        )}
      </main>

      <footer className="bg-orange-100 py-8 mt-12 text-center text-gray-600 text-sm">
        <p>© 2024 Grandma's Kitchen. Made with 💖</p>
      </footer>
    </div>
  );
}

export default App;
