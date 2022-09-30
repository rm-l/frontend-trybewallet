import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    payment: 'Dinheiro',
    category: 'Alimentação',
  };

  handleChange = (event) => {
    const { target } = event;
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    this.setState(
      { [name]: value },
    );
  };

  render() {
    const { description, value, payment, category } = this.state;
    const { currencies } = this.props;
    return (
      <>
        <div>
          WalletForm
        </div>
        <form>
          <label htmlFor="value">
            Despesa:
            <input
              type="text"
              name="value"
              data-testid="value-input"
              onChange={ this.handleChange }
              value={ value }
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              name="description"
              data-testid="description-input"
              onChange={ this.handleChange }
              value={ description }
            />
          </label>
          <select
            data-testid="currency-input"
            name="currencies"
            onChange={ this.handleChange }
            value="USD"
          >
            {
              currencies.map((op) => (
                <option key={ op }>
                  {' '}
                  { op }
                </option>))
            }
          </select>
          <select
            data-testid="method-input"
            name="payment"
            onChange={ this.handleChange }
            value={ payment }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select
            data-testid="tag-input"
            name="category"
            onChange={ this.handleChange }
            value={ category }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
