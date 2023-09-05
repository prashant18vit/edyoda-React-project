import React, { Component } from 'react';
import Navigation from './Navigation';

class ProductListingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      showExpired: false, 
      showLowStock: false, 
    };
  }

  componentDidMount() {
 
    this.fetchProducts();
  }

  fetchProducts() {
    
    fetch('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products')
      .then((response) => response.json())
      .then((data) => {
        console.log("P:",data);
        this.setState({ products: data });
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }

  handleExpiredFilterChange = () => {
    this.setState((prevState) => ({
      showExpired: !prevState.showExpired,
    }));
  }

  handleLowStockFilterChange = () => {
    this.setState((prevState) => ({
      showLowStock: !prevState.showLowStock,
    }));
  }

  render() {
    const { products, showExpired, showLowStock } = this.state;

  
    const filteredProducts = products.filter((product) => {
      const isExpired = new Date(product.expiryDate) < new Date();
      const isLowStock = product.stock < 100;

      return (!showExpired || !isExpired) && (!showLowStock || !isLowStock);
    });

    return (
      <div className="product-listing-page">
        <Navigation/>
        <h1>Product Listing</h1>
        <div class="row">
    <div class="col">
        <label>
          <input
            className='form-check-input position-static'
            type="checkbox"
            checked={showExpired}
            onChange={this.handleExpiredFilterChange}
          />
          Show Expired Products
    
        </label>
          </div>
          <div class="col">
    
        <label>
          <input
          className='form-check-input position-static'
          type="checkbox"
          checked={showLowStock}
          onChange={this.handleLowStockFilterChange}
          />
          Show Low Stock Products
        </label>
            </div>
</div>
        <table className='table'>
          <thead className="thead-dark">
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Expiry Date</th>
              <th>Stock</th>
             
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.medicineName}</td>
                <td>{product.expiryDate}</td>
                <td>{product.stock}</td>
             
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ProductListingPage;