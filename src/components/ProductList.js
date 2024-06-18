import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../store/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProductList.css';
import addToCartImage from '../images/cart icon.jpg';

const ProductList = ({ incrementCartCount }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const limit = 20;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = parseInt(params.get('page') || '1', 10);
    setCurrentPage(page);
  }, [location.search]);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api-exercise-sopi.vercel.app/api/v1/products?limit=${limit}&page=${currentPage}`)
      .then(response => response.json())
      .then(data => {
        setProducts(data.data.listProduct);
        setTotalPages(data.data.totalPage);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      navigate(`/?page=${currentPage + 1}`);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      navigate(`/?page=${currentPage - 1}`);
    }
  };

  const handleAddToCart = (productId) => {
    const selectedProduct = products.find(product => product._id === productId);
    if (selectedProduct) {
      dispatch(addItemToCart({
        brand: selectedProduct.brand,
        id: selectedProduct._id,
        price: selectedProduct.price,
        name: selectedProduct.name,
        category: selectedProduct.category,
        image: selectedProduct.image,
      }));
      incrementCartCount();
      toast.success(`${selectedProduct.name} added to cart!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } else {
      console.error(`Product with ID ${productId} not found`);
    }
  };

  return (
    <div>
      <h1>PRODUCTS</h1>
      {loading ? (
        <div className="loading-animation">
          <i className="fas fa-spinner fa-spin"></i> Loading...
        </div>
      ) : (
        <>
          <ul className="product-grid">
            {products.map(product => (
              <li key={product._id} className="product-item">
                <Link to={`/products/${product._id}`} className="product-link">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <div className="product-name">{product.name}</div>
                </Link>
                <div className="product-price-cart">
                  <div className="product-price">
                    <span style={{ color: '#E42B75' }}>$</span>
                    <span style={{ color: '#000000' }}>{product.price}</span>
                  </div>
                  <img 
                    src={addToCartImage} 
                    alt="Add to Cart" 
                    className="add-to-cart-image" 
                    onClick={() => handleAddToCart(product._id)} 
                  />
                </div>
              </li>
            ))}
          </ul>
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span> Page {currentPage} of {totalPages} </span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default ProductList;
