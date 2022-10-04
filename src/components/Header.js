import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  totalSum = () => {
    const { expenses } = this.props;
    let total = 0;
    expenses.forEach(({ exchangeRates, value, currency }) => {
      const convertedValue = value * exchangeRates[currency].ask;
      total += convertedValue;
    });
    return total.toFixed(2);
  };

  render() {
    const { user } = this.props;
    return (
      <>
        <div>Header</div>
        <div>
          <span data-testid="email-field">{ user }</span>
          <span data-testid="total-field">
            { this.totalSum() }
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  user: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps)(Header);
