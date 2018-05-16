import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StatusBar, ScrollView } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import Moment from 'moment';
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
} from '../actions/wallet';

class Home extends Component {

  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
  }

  componentWillMount() {
    // Building props (Must be used to attach data from store to this.props)
    this.props.dispatch(getInitialConversion());
    this.props.dispatch(calculateBalance());
    this.props.dispatch(calculateNumTransactions());
    this.props.dispatch(getLastTransactionDate());
  }

  _handleWalletPress = () => {
    // Button still secretly active and logs this.props
    this.props.dispatch(getInitialConversion());
    console.log(this.props);
  }

  _handleMenuPress = () => {
    console.log('Menu Pressed');
    this.props.navigation.navigate('DrawerToggle');
  }

  _handleSendPress = () => {
    this.props.navigation.navigate('Send');
  }

  _handleReceivePress = () => {
    this.props.navigation.navigate('Receive');
  }

  _handleTransactionsPress = () => {
    this.props.navigation.navigate('Transactions');
  }

  _handleSettingsPress = () => {
    this.props.navigation.navigate('Settings');
  }

  render() {
    return (
      <Container>
        <TopBar/>
        <StatusBar translucent={false} barStyle="light-content" />
        <Header onPress={this._handleMenuPress} headerText='MY ADA WALLET'/>
        <ScrollView style={{flex: 1, paddingTop: 10, flexDirection: 'column'}}>
          <View style={{justifyContent:'center', flexDirection: 'column'}}>
            <BigPanel
              type='home'
              onPress={this._handleWalletPress}
              mainText='Main Wallet'
              subUpperText={(this.props.balance*1).toFixed(7)+' ₳'}
              subLowerText={(this.props.isFetching ? ' loading...' : ' '+(this.props.balance*this.props.rates.JPY).toFixed(0)+' ¥')}
              smallText1={'Total Transactions:\t' + this.props.numTransactions}
              smallText2={'Latest Transaction:\t' + this.props.lastTransactionDate}
              disabled={true}
            />
            <Panel type='home' onPress={this._handleSendPress} mainText='Send' subText='Select to send' />
            <Panel type='home' onPress={this._handleReceivePress} mainText='Receive' subText='Select to receive' />
            <Panel type='home' onPress={this._handleTransactionsPress} mainText='Transactions' subText='View your transactions' />
            <Panel type='home' onPress={this._handleSettingsPress} mainText='Settings' subText='Change settings' />
            <Text style={{padding: 25, color:'#FFF', fontWeight:'200'}}>
              This application and its content is copyright of BUSINESS - © BUSINESS 2018.
              {"\n"}
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
  const balance = state.wallet.balance;
  const numTransactions = state.wallet.numTransactions;
  const lastTransactionDate = state.wallet.lastTransactionDate;
  const isFetching = state.wallet.isFetching;
  const rateUpdateDate = state.wallet.rateUpdateDate;
  const rates = state.wallet.rates;
  return {
    balance,
    numTransactions,
    lastTransactionDate,
    isFetching,
    rateUpdateDate,
    rates,
  };
};

export default connect(mapStateToProps)(Home);
