import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import { fetchWithThunk } from '../redux/actions';
import Table from '../components/Table';

class Wallet extends React.Component {
  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchWithThunk());
  }

  render() {
    return (
      <>
        <Header />
        <WalletForm />
        <Table />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
});

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Wallet);
