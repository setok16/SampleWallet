import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StatusBar, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { Container } from '../components/Container';
import { TopBar } from '../components/TopBar';
import { Header } from '../components/Header';
import { Panel } from '../components/Panel';
import { BigPanel } from '../components/BigPanel';

import {
  calculateBalance,
  calculateNumTransactions,
  getLastTransactionDate,
  getInitialConversion,
  getBalance,
} from '../actions/wallet';

class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    balance: PropTypes.number,
    isFetching: PropTypes.bool,
    numTransactions: PropTypes.number,
    lastTransactionDate: PropTypes.string,
    rates: PropTypes.object,
  }

  componentWillMount() {
    // Building props (Must be used to attach data from store to this.props)
    this.props.dispatch(getInitialConversion());
    this.props.dispatch(calculateBalance());
    this.props.dispatch(calculateNumTransactions());
    this.props.dispatch(getLastTransactionDate());
    this.props.dispatch(getBalance('5afeaf28ad2ee36685f5c932'));
  }

  handleWalletPress = () => {
    // Button still secretly active and logs this.props
    this.props.dispatch(getInitialConversion());
    console.log(this.props);
  }

  handleMenuPress = () => {
    console.log('Menu Pressed');
    this.props.navigation.navigate('DrawerToggle');
  }

  handleSendPress = () => {
    this.props.navigation.navigate('Send');
  }

  handleReceivePress = () => {
    this.props.navigation.navigate('Receive');
  }

  handleTransactionsPress = () => {
    this.props.navigation.navigate('Transactions');
  }

  handleSettingsPress = () => {
    this.props.navigation.navigate('Settings');
  }

  render() {
    return (
      <Container>
        <TopBar />
        <StatusBar translucent={false} barStyle="light-content" />
        <Header onPress={this.handleMenuPress} headerText="MY ADA WALLET" />
        <ScrollView style={{ flex: 1, paddingTop: 10, flexDirection: 'column' }}>
          <View style={{ justifyContent: 'center', flexDirection: 'column' }}>
            <BigPanel
              type="home"
              onPress={this.handleWalletPress}
              mainText="Main Wallet"
              subUpperText={`${(this.props.balance * 1).toFixed(7)} ₳`}
              subLowerText={(this.props.isFetching ? ' loading...' : ` ${(this.props.balance * this.props.rates.JPY).toFixed(0)} ¥`)}
              smallText1={`Total Transactions:\t${this.props.numTransactions}`}
              smallText2={`Latest Transaction:\t${this.props.lastTransactionDate}`}
              disabled
            />
            <Panel type="home" onPress={this.handleSendPress} mainText="Send" subText="Select to send" />
            <Panel type="home" onPress={this.handleReceivePress} mainText="Receive" subText="Select to receive" />
            <Panel type="home" onPress={this.handleTransactionsPress} mainText="Transactions" subText="View your transactions" />
            <Panel type="home" onPress={this.handleSettingsPress} mainText="Settings" subText="Change settings" />
            <Text style={{ padding: 25, color: '#FFF', fontWeight: '200' }}>
              This application and its content is copyright of BUSINESS - © BUSINESS 2018.
              {'\n'}
              All rights reserved.
            </Text>
          </View>
        </ScrollView>
      </Container>
    );
  }
}

// Allows us to use information from store as this.props in this component
const mapStateToProps = (state) => {
  const props = {
    balance: state.wallet.balance,
    numTransactions: state.wallet.numTransactions,
    lastTransactionDate: state.wallet.lastTransactionDate,
    isFetching: state.wallet.isFetching,
    rateUpdateDate: state.wallet.rateUpdateDate,
    rates: state.wallet.rates,
    walletId: state.wallet.walletId,
  };
  return props;
};

export default connect(mapStateToProps)(Home);
