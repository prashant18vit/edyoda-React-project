import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import LoginPage from './component/LoginPage'
import OrderListingPage from './component/OrderListingPage';
import ProductListingPage from './component/ProductListingPage';
import UserListingPage from './component/UserListingPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/orders" element={<OrderListingPage/>} />
          <Route path="/products" element={<ProductListingPage/>} />
          <Route path="/users" element={<UserListingPage/>} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
