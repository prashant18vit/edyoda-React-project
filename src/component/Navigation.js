import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from 'react-router-dom';
const Navigation = () => {
  return (
    <div>
      <nav className="nav nav-pills nav-fill bg-info text-white">
        <Link className='nav-item nav-link text-white' to="/orders">Orders</Link>
          
        <Link className="nav-item nav-link text-white" to="/products">
        Products
        </Link>
        <Link className="nav-item nav-link text-white" to="/users">
          User Listing
        </Link>
        <Link className="nav-item nav-link text-white" to="/">
          Home
        </Link>
        
      </nav>
    </div>
  );
};

export default Navigation;
