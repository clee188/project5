import React from 'react';
import {
  Box,
  Button,
  TextField,
  Typography
} from '@mui/material';
import axios from 'axios';

/**
 * LoginRegister Component
 * Handles user login and (eventually) registration.
 */
class LoginRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginName: '',
      errorMessage: '',
    };
  }

  // Handle input changes
  handleInputChange = (event) => {
    this.setState({ loginName: event.target.value });
  };

  // Handle Login submission
  handleLoginSubmit = (event) => {
    event.preventDefault();

    axios.post('/admin/login', { login_name: this.state.loginName })
      .then((response) => {
        // Success! We pass the user object up to the parent (App/PhotoShare)
        // This function should update 'userIsLoggedIn' in photoShare.jsx
        this.props.onLoginSuccess(response.data);
      })
      .catch((err) => {
        console.error("Login failed:", err);
        this.setState({ errorMessage: "Invalid login name. Please try again." });
      });
  };

  render() {
  return (
    <div className="login-register-container">
      <div className="login-form-box">
        <Typography variant="h4">Login</Typography>

        <TextField
          /* ... existing props ... */
        />

        {this.state.errorMessage && (
          <div className="login-error-text">
            {this.state.errorMessage}
          </div>
        )}

        <Button
          /* ... existing props ... */
        >
          Login
        </Button>
      </div>
    </div>
  );
  }
}

export default LoginRegister;
