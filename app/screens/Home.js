import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StatusBar, ScrollView } from 'react-native';
import { DrawerNavigator } from 'react-navigation';

import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { Panel } from '../components/Panel';

class Home extends Component {

  static propTypes = {
    navigation: PropTypes.object,
  }

  handleMenuPress = () => {
    console.log('Menu Pressed');
    this.props.navigation.navigate('DrawerToggle');
  }

  handlePanelPress = () => {
    console.log('Panel Pressed');
  }

  handleWalletPress = () => {
    this.props.navigation.navigate('Wallet');
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
        <StatusBar translucent={false} barStyle="light-content" />
        <Header onPress={this.handleMenuPress} headerText='MY ADA WALLET'/>
        <ScrollView style={{flex: 1, paddingTop: 10, flexDirection: 'column'}}>
          <View style={{justifyContent:'center', flexDirection: 'column'}}>
            <Panel onPress={this.handleWalletPress} mainText='Wallet' subText='0.0000000A' />
            <Panel onPress={this.handleSendPress} mainText='Send' subText='Select to send' />
            <Panel onPress={this.handleReceivePress} mainText='Receive' subText='Select to receive' />
            <Panel onPress={this.handleTransactionsPress} mainText='Transactions' subText='View your transactions' />
            <Panel onPress={this.handleSettingsPress} mainText='Settings' subText='Change settings' />
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
