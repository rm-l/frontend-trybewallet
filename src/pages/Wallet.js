import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import { fetchWithThunk } from '../redux/actions';
// import getCurrencesFromAPI from '../components/requestAPI';

class Wallet extends React.Component {
  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchWithThunk());
    // const result = await getCurrencesFromAPI();
    // console.log(result);
  }

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
        <WalletForm />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
});

Wallet.propTypes = {
  user: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Wallet);
