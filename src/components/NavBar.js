import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css'; 

const NavBar = ({ cartCount }) => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/?page=1');
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const ShoppingBagIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-bag" viewBox="0 0 16 16">
      <path d="M8 1a2 2 0 0 1 2 2v2H6V3a2 2 0 0 1 2-2zm3 4V3a3 3 0 1 0-6 0v2H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11zm-1 1v1.5a.5.5 0 0 0 1 0V6h1.639a.5.5 0 0 1 .494.426l1.028 6.851A1.5 1.5 0 0 1 12.678 15H3.322a1.5 1.5 0 0 1-1.483-1.723l1.028-6.851A.5.5 0 0 1 3.36 6H5v1.5a.5.5 0 1 0 1 0V6h4z"/>
    </svg>
  );

  return (
    <nav>
      <ul className="left">
        <li><Link to="/" onClick={handleHomeClick}>Home</Link></li>
      </ul>
      <ul className="right">
        <li>
          <Link to="/cart" onClick={handleCartClick}>
            <ShoppingBagIcon />
            {cartCount > 0 && <span>({cartCount})</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
