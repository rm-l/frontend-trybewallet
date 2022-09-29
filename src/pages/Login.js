import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import loginAction from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    buttonDisabled: true,
  };

  handleChange = (event) => {
    const { target } = event;
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    this.setState(
      { [name]: value },
      () => this.buttonValidation(),
    );
  };

  buttonValidation = () => {
    const { email, password } = this.state;
    const mimEmail = 4;
    const mimPassword = 6;
    const regex = /\S+@\S+\.\S+/;
    if (
      (password.length >= mimPassword)
      && (email.length >= mimEmail)
      && (regex.test(email))

    ) {
      this.setState({
        buttonDisabled: false,
      });
    } else {
      this.setState({
        buttonDisabled: true,
      });
    }
  };

  handleClick = () => {
    const { dispatch } = this.props;
    const { email } = this.state;
    dispatch(loginAction(email));
  };

  render() {
    const { email, password, buttonDisabled } = this.state;
    return (
      <form>
        <label htmlFor="email">
          Email:
          <input
            name="email"
            id="email"
            data-testid="email-input"
            onChange={ this.handleChange }
            value={ email }
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            name="password"
            id="password"
            data-testid="password-input"
            type="password"
            onChange={ this.handleChange }
            value={ password }
          />
        </label>
        <Link to="/carteira">
          <button
            type="button"
            disabled={ buttonDisabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </Link>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
