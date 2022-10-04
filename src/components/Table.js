import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeItem } from '../redux/actions';

class Table extends Component {
  handleClick = (id) => {
    const { expenses, dispatch } = this.props;
    const newState = expenses.filter((element) => element.id !== id);
    dispatch(removeItem(newState));
  };

  render() {
    const { expenses } = this.props;
    return (
      <>
        <thead>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </thead>
        <tbody>
          {
            expenses.map((element) => (
              <tr key={ element.id }>
                <td>{element.description}</td>
                <td>{element.tag}</td>
                <td>{element.method}</td>
                <td>{Number(element.value).toFixed(2)}</td>
                <td>{element.exchangeRates[element.currency].name}</td>
                <td>
                  {Number((element.exchangeRates[element.currency].ask))
                    .toFixed(2) }

                </td>
                <td>
                  {Number(element.exchangeRates[element.currency].ask * element.value)
                    .toFixed(2) }

                </td>
                <td>{(element.exchangeRates[element.currency].codein)}</td>
                <td>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => this.handleClick(element.id) }
                  >
                    Remover

                  </button>
                </td>
              </tr>

            ))
          }
        </tbody>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf,
}.isRequired;

export default connect(mapStateToProps)(Table);
