import React, { Component } from "react";
import Navigation from "./Navigation";

class UserListingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      searchQuery: "",
      searchResults: [],
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers() {
    fetch("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users")
      .then((response) => response.json())
      .then((data) => {
        console.log("DF", data);
        this.setState({ users: data });
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }

  handleSearchInputChange = (event) => {
    const searchQuery = event.target.value;
    this.setState({ searchQuery });

    if (searchQuery.length >= 2) {
      this.performSearch(searchQuery);
    } else {
      this.setState({ searchResults: [] });
    }
  };

  performSearch(query) {
    fetch(
      `https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users?fullName=${query}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ searchResults: data });
      })
      .catch((error) => {
        console.error("Error performing user search:", error);
      });
  }

  handleResetClick = () => {
    this.setState({ searchQuery: "", searchResults: [] });
  };

  render() {
    const { searchQuery, searchResults } = this.state;
    const displayUsers =
      searchResults.length > 0 ? searchResults : this.state.users;

    return (
      <div className="user-listing-page">
        <Navigation />
        <h1>User Listing</h1>
        <input
          type="text"
          placeholder="Search by first or last name"
          value={searchQuery}
          onChange={this.handleSearchInputChange}
        />
        {searchQuery.length < 2 && (
          <div className="warning-message">
            Please enter at least 2 characters for search.
          </div>
        )}
        <button onClick={this.handleResetClick}>Reset</button>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Data of Birth</th>
            </tr>
          </thead>
          <tbody>
            {displayUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.fullName}</td>
                <td>{user.dob}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default UserListingPage;
