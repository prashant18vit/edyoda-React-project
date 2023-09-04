import React, { Component } from 'react';
import Navigation from './Navigation';

class ProductListingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      showExpired: false, // Initial filter for expired products
      showLowStock: false, // Initial filter for low stock products
    };
  }

  componentDidMount() {
    // Make an API call to fetch products on page load
    this.fetchProducts();
  }

  fetchProducts() {
    // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
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

    // Filter products based on expiration and stock
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
              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.medicineName}</td>
                <td>{product.expiryDate}</td>
                <td>{product.stock}</td>
                {/* Add more table data fields as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ProductListingPage;