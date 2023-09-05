import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Navigation from './Navigation';
class OrderListingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      selectedStatus: 'All', 
    };
  }

  componentDidMount() {
  
    this.fetchOrders();
  }

  fetchOrders() {
  
    fetch('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders')
      .then((response) => response.json())
      .then((data) => {
        console.log("O:",data);
        this.setState({ orders: data });
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }

  handleStatusFilterChange = (event) => {
    const selectedStatus = event.target.value;
    this.setState({ selectedStatus });
  }

  render() {
    const { orders, selectedStatus } = this.state;

    
    const filteredOrders = selectedStatus === 'All'
      ? orders
      : orders.filter((order) => order.orderStatus === selectedStatus);

    return (
      <div className="order-listing-page">
        <Navigation/>
        <h1>Order Listing</h1>
        <label htmlFor="statusFilter">Filter by Status:</label>
        <select
          id="statusFilter"
          value={selectedStatus}
          onChange={this.handleStatusFilterChange}
        >
          <option value="All">All</option>
          <option value="New">New</option>
          <option value="Packed">Packed</option>
          <option value="InTransit">In Transit</option>
          <option value="Delivered">Delivered</option>
        </select>

        <table className='table'>
          <thead className="thead-dark">
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Status</th>
          
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customerName}</td>
                <td>{order.orderStatus}</td>
              
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default OrderListingPage;