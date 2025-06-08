import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', price: '', image: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(res => setProducts(res.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const newProduct = await res.json();
      setProducts([...products, newProduct]);
      setShowModal(false);
      setForm({ name: '', price: '', image: '' });
    } catch (err) {
      console.error('Error adding product:', err);
    }
    setLoading(false);
  };
  return (
    <div className="App">
      <div className="header">
        <span>Product Store</span>
        <button onClick={() => setShowModal(true)}>Add Product</button>
      </div>
      {showModal && (
        <div className="modal" style={{
          position: 'fixed', alignSelf: 'center',width: '100vw', height: '100vh',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <form className='AddProductForm' style={{
          background: '#fff',
          padding: '32px 24px',
          borderRadius: '12px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
          minWidth: '420px',
          maxWidth: '90vw'
        }} onSubmit={handleSubmit}>
            <h2>Add Product</h2>
            <input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleInputChange}
              required
            /><br />
            <input
              name="price"
              placeholder="Price"
              type="number"
              value={form.price}
              onChange={handleInputChange}
              required
            /><br />
            <input
              name="image"
              placeholder="Image URL"
              value={form.image}
              onChange={handleInputChange}
            /><br />
            <button type="submit" style={{backgroundColor: "green"}}>Submit</button>
            <button type="button" style={{backgroundColor: "orange"}}onClick={() => setShowModal(false)}>Cancel</button>
          </form>
        </div>
      )}
      <div className="product-list">
        {products?.map((prod)=>(
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <div className="product">
              <img src={prod.image} alt={prod.name} />
              <h2>{prod.name}</h2>
              <p>Price: ${prod.price}</p>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default App;
