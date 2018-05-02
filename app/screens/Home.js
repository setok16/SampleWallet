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

  handleHeaderPress() {
    //TODO The side menu will create an error on press
    console.log('Header Pressed');
    this.props.navigation.nagivate('DrawerNavigator');
  }

  handlePanelPress() {
    console.log('Panel Pressed');
  }

  render() {
    return (
      <Container>
        <StatusBar translucent={false} barStyle="light-content" />
        <Header onPress={this.handleHeaderPress} headerText='MY ADA WALLET'/>
        <ScrollView style={{position:'absolute', top:100, bottom:-100, paddingTop: 20}}>
          <Panel onPress={this.handlePanelPress} mainText='Wallet' subText='0.0000000A' />
          <Panel onPress={this.handlePanelPress} mainText='Send' subText='Select to send' />
          <Panel onPress={this.handlePanelPress} mainText='Receive' subText='Select to receive' />
          <Panel onPress={this.handlePanelPress} mainText='Transactions' subText='View your transactions' />
          <Panel onPress={this.handlePanelPress} mainText='Settings' subText='Change app and wallet settings' />
        </ScrollView>
      </Container>
    );
  }
}

export default Home;
