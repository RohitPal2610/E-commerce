import React from 'react';

const Card = ({ title, category, image, price, product }) => {
  const handleAddToCart = () => {
    const email = localStorage.getItem("activeUser");
    if (!email) {
      alert("Please login first!");
      return;
    }

    let cart = JSON.parse(localStorage.getItem(`cart_${email}`)) || [];
    const exists = cart.find((item) => item.id === product.id);
    if (!exists) {
      cart.push({ ...product, quantity: 1 });
      localStorage.setItem(`cart_${email}`, JSON.stringify(cart));
      alert("✅ Added to cart!");
    } else {
      alert("⚠️ Already in cart!");
    }
  };

  return (
    <div className="bg-white/90 p-4 rounded-lg shadow-md hover:shadow-xl transition flex flex-col justify-between h-full text-gray-800">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-contain mb-4"
      />
      <div className="flex-grow">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-sm text-purple-800 capitalize">📂 {category}</p>
        <p className="text-blue-900 font-bold text-lg mt-2">₹{price}</p>
      </div>
      <button
        onClick={handleAddToCart}
        className="mt-4 bg-yellow-400 text-black font-semibold py-2 rounded hover:bg-yellow-500 transition"
      >
        🛒 Add to Cart
      </button>
    </div>
  );
};

export default Card;