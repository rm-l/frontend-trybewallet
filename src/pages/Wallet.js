import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <>
        <Header />
        <div>
          <span data-testid="email-field">{ user }</span>
          <span data-testid="total-field">0</span>
          <span data-testid="header-currency-field">BRL</span>

        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
});

Wallet.propTypes = {
  user: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
