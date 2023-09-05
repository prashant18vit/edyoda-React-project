import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loggedIn: false,
      errorMessage: "",
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleLogin = () => {
    const { username, password } = this.state;
    if (username === password) {
      localStorage.setItem("loggedIn", "true");
      this.setState({ loggedIn: true, errorMessage: "" });
    } else {
      this.setState({ errorMessage: "Please enter valid credential!" });
    }
  };
  render() {
    const { username, password, loggedIn, errorMessage } = this.state;

    if (loggedIn) {
      alert("Login successfull")
      return <Navigate to="/orders" />;
    }

    return (
      <div className="login-page">
        <h1>Login</h1>
        <div className="form-group">
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <input
            type="text"
            name="username"
            placeholder="username"
            value={username}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={this.handleInputChange}
          />
        </div>
        <button className="btn btn-primary" onClick={this.handleLogin}>
          Login
        </button>
      </div>
    );
  }
}
export default LoginPage;
