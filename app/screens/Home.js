import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StatusBar, ScrollView } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import Moment from 'moment';

import { Container } from '../components/Container';
import { TopBar } from '../components/TopBar';
import { Header } from '../components/Header';
import { Panel } from '../components/Panel';
import { BigPanel } from '../components/BigPanel';
// Hard-coded transaction data
import transactions from '../data/transactions';

class Home extends Component {

  static propTypes = {
    navigation: PropTypes.object,
  }

  // Temp code for calculating hard-coded transactions
  calculateBalance = (arr) => {
    let balance = 0;
    for (i = 0; i < arr.length; i++) {
      if (arr[i].type =='Received')
        balance += arr[i].amount;
      else
        balance -= arr[i].amount;
    }
    return balance;
  }

  calculateNumTransactions = (arr) => {
    let num = 0;
    for (i = 0; i < arr.length; i++) {
      num++;
    }
    return num;
  }

  getLastTransactionDate = (arr) => {
    return Moment(arr[0].date.toString()).format('YYYY/MM/DD HH:mm');
  }

  handleMenuPress = () => {
    console.log('Menu Pressed');
    this.props.navigation.navigate('DrawerToggle');
  }

  /* // No longer needed... I think
  handlePanelPress = () => {
    console.log('Panel Pressed');
  }
  */

  handleWalletPress = () => {
    //this.props.navigation.navigate('Wallet');
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
        <TopBar/>
        <StatusBar translucent={false} barStyle="light-content" />
        <Header onPress={this.handleMenuPress} headerText='MY ADA WALLET'/>
        <ScrollView style={{flex: 1, paddingTop: 10, flexDirection: 'column'}}>
          <View style={{justifyContent:'center', flexDirection: 'column'}}>
            <BigPanel
              type='home'
              onPress={this.handleWalletPress}
              mainText='Wallet'
              subText={this.calculateBalance(transactions).toFixed(7).toString()+' ₳'}
              smallText1={'Total Transactions:\t' + this.calculateNumTransactions(transactions).toString()}
              smallText2={'Latest Transaction:\t' + this.getLastTransactionDate(transactions).toString()}
              disabled={true}
            />
          <Panel type='home' onPress={this.handleSendPress} mainText='Send' subText='Select to send' />
            <Panel type='home' onPress={this.handleReceivePress} mainText='Receive' subText='Select to receive' />
            <Panel type='home' onPress={this.handleTransactionsPress} mainText='Transactions' subText='View your transactions' />
            <Panel type='home' onPress={this.handleSettingsPress} mainText='Settings' subText='Change settings' />
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

const mapStateToProps = (state) => {

}

export default Home;
