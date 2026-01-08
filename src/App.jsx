import React, { useState } from 'react';
import { products } from './data/products';
import ProductCard from './components/ProductCard';
import CartSummary from './components/CartSummary';
import CheckoutForm from './components/CheckoutForm';
import { Utensils } from 'lucide-react';

function App() {
  const [cart, setCart] = useState({});

  const handleAdd = (id) => {
    setCart(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleRemove = (id) => {
    setCart(prev => {
      const newQty = (prev[id] || 0) - 1;
      if (newQty <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: newQty };
    });
  };

  const handleCheckout = (userData) => {
    // 1. Format the cart items
    const cartItems = Object.entries(cart)
      .map(([id, qty]) => {
        const product = products.find(p => p.id === parseInt(id));
        return `${qty} x ${product.name}`;
      })
      .join('\n');

    // 2. Calculate Total
    const totalPrice = Object.entries(cart).reduce((total, [id, qty]) => {
      const product = products.find(p => p.id === parseInt(id));
      return total + (product.price * qty);
    }, 0);

    // 3. Construct the message
    const message = `Hello! I would like to order:

${cartItems}

Total: $${totalPrice.toFixed(2)}

My Details:
Name: ${userData.name}
Address: ${userData.address}
Phone: ${userData.phone}`;

    // 4. Encode and Redirect
    // NOTE: Replace [MY_PHONE_NUMBER] with your actual number in production
    const phoneNumber = "1234567890";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.location.href = whatsappUrl;
  };

  return (
    <div className="min-h-screen bg-rose-50/50 pb-24 font-sans text-gray-900">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-rose-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-center gap-2">
          <div className="bg-rose-100 p-2 rounded-full text-rose-600">
            <Utensils size={24} />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-orange-400 bg-clip-text text-transparent">
            Grandma's Kitchen
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-12">
        {/* Intro */}
        <section className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-gray-800">Homemade with Love 🌸</h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            Authentic, home-cooked meals prepared fresh every day.
            Choose your favorites and order directly via WhatsApp!
          </p>
        </section>

        {/* Menu */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 mb-6">
            <h3 className="text-xl font-bold text-gray-800">Our Menu ✨</h3>
            <div className="h-px bg-rose-200 flex-1"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                quantity={cart[product.id] || 0}
                onAdd={() => handleAdd(product.id)}
                onRemove={() => handleRemove(product.id)}
              />
            ))}
          </div>
        </section>

        {/* Checkout Form */}
        <CheckoutForm
          cart={cart}
          products={products}
          onSubmit={handleCheckout}
        />
      </main>

      {/* Cart Summary Fixed Footer */}
      <CartSummary cart={cart} products={products} />
    </div>
  );
}

export default App;
