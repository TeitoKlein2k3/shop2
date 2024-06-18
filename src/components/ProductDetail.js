import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../store/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    brand: '',
    name: '',
    description: '',
    category: '',
    price: '',
    image: '',
  });
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`https://api-exercise-sopi.vercel.app/api/v1/products/${id}`)
      .then(response => response.json())
      .then(data => {
        setProduct({
          brand: data.data.brand,
          name: data.data.name,
          description: data.data.description,
          category: data.data.category,
          price: data.data.price,
          image: data.data.image,
        });
      });
  }, [id]);

  const addToCartHandler = () => {
    dispatch(addItemToCart({
      brand: product.brand,
      id: product._id,
      price: product.price,
      name: product.name,
      category: product.category,
      image: product.image,
    }));
    toast.success(`${product.name} added to cart!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="product-detail-container">
      <div className="product-image-container">
        <div className="product-image1" style={{ backgroundImage: `url(${product.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
      </div>
      <div className="product-details">
        <p className="product-brand">{product.brand}</p>
        <h1 className="product-name">{product.name}</h1>
        <p className="product-description">"{product.description}"</p>
        <p className="product-category">Category: {product.category}</p>
        <Link to="/" className="go-home-link">
          Go Home
        </Link>
        <p className="product-price1">${product.price}</p>
        <button
          onClick={addToCartHandler}
          className="add-to-cart-button"
        >
          Add to Cart
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductDetail;
