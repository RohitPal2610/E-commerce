import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [maxPrice, setMaxPrice] = useState(100000);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=100&skip=0")
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setFiltered(data.products);
      })
      .catch(err => console.error("Failed to fetch products:", err));
  }, []);

  useEffect(() => {
    let updated = products.filter((p) =>
      (selectedCategory ? p.category === selectedCategory : true) &&
      p.price <= maxPrice
    );
    setFiltered(updated);
  }, [selectedCategory, maxPrice, products]);

  const handleLogout = () => {
    localStorage.removeItem('activeUser');
    navigate('/login');
  };

  return (
    <>
      <nav className="flex justify-between items-center px-8 py-4 bg-purple-800 text-white shadow-md">
        <div className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>🏠 Home</div>
        
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 rounded-md text-black outline-none"
          onChange={(e) => {
            const value = e.target.value.toLowerCase();
            const filteredSearch = products.filter(p => p.title.toLowerCase().includes(value));
            setFiltered(filteredSearch);
          }}
        />

        <div className="flex gap-4 text-lg items-center">
          <div className="hover:underline cursor-pointer" onClick={() => navigate('/cart')}>🛒 Cart</div>

          <div className="cursor-pointer">
            📂 Category
            <select
              className="ml-2 px-2 py-1 text-black rounded"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="smartphones">Smartphones</option>
              <option value="laptops">Laptops</option>
              <option value="fragrances">Fragrances</option>
              <option value="skincare">Skincare</option>
              <option value="groceries">Groceries</option>
              <option value="home-decoration">Home Decoration</option>
              <option value="furniture">Furniture</option>
              <option value="tops">Tops</option>
              <option value="womens-dresses">Womens Dresses</option>
              <option value="womens-shoes">Womens Shoes</option>
              <option value="mens-shirts">Mens Shirts</option>
              <option value="mens-shoes">Mens Shoes</option>
              <option value="mens-watches">Mens Watches</option>
              <option value="womens-watches">Womens Watches</option>
              <option value="womens-bags">Womens Bags</option>
              <option value="womens-jewellery">Womens Jewellery</option>
              <option value="sunglasses">Sunglasses</option>
              <option value="automotive">Automotive</option>
              <option value="motorcycle">Motorcycle</option>
              <option value="lighting">Lighting</option>
            </select>
          </div>

          <div>
            💰 Max Price:
            <input
              type="range"
              min="0"
              max="2000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="ml-2"
            />
            <span className="ml-2">₹{maxPrice}</span>
          </div>

          <button
            onClick={handleLogout}
            className="ml-4 bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
          >
            🚪 Logout
          </button>
        </div>
      </nav>

      <main className="p-10 bg-gradient-to-l from-purple-500 to-blue-950 min-h-screen text-white">
        <h2 className="text-3xl font-bold mb-6 text-center text-yellow-300">🛍️ Product List</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filtered.map((product) => (
            <Card
              key={product.id}
              title={product.title}
              category={product.category}
              image={product.thumbnail}
              price={product.price}
              product={product}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
