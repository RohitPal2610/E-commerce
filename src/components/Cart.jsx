import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("activeUser");
    if (!email) {
      alert("Login first to view cart.");
      navigate("/login");
      return;
    }
    const savedCart = JSON.parse(localStorage.getItem(`cart_${email}`)) || [];
    setCart(savedCart);
  }, [navigate]);

  const saveCart = (updatedCart) => {
    const email = localStorage.getItem("activeUser");
    setCart(updatedCart);
    localStorage.setItem(`cart_${email}`, JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updated = cart.filter(item => item.id !== id);
    saveCart(updated);
  };

  const updateQuantity = (id, change) => {
    const updated = cart.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + change;
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    });
    saveCart(updated);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen p-10 bg-gradient-to-l from-purple-500 to-blue-950 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🛒 Your Cart</h1>
        <button
          onClick={() => navigate('/home')}
          className="px-4 py-2 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-500"
        >
          ⬅️ Back to Home
        </button>
      </div>

      {cart.length === 0 ? (
        <p className="text-lg">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cart.map(item => (
            <div key={item.id} className="bg-white text-black p-4 rounded shadow-md flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src={item.thumbnail} alt={item.title} className="w-24 h-24 object-contain" />
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-sm text-gray-600">₹{item.price} × {item.quantity}</p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-2 py-1 bg-purple-700 text-white rounded"
                    >
                      ➖
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-2 py-1 bg-purple-700 text-white rounded"
                    >
                      ➕
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-600 font-bold text-lg hover:underline"
              >
                ❌ Remove
              </button>
            </div>
          ))}

          <div className="text-right text-xl font-bold text-yellow-300">
            Total: ₹{totalPrice.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
