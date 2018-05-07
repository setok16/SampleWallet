import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StatusBar, ScrollView } from 'react-native';
import { DrawerNavigator } from 'react-navigation';

import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { TopBar } from '../components/TopBar';

class MenuItem1 extends Component {

  handleMenuPress = () => {
    //TODO The side menu will create an error on press
    console.log('Menu Pressed');
    this.props.navigation.navigate('DrawerOpen');
  }

  render() {
    return (
      <Container>
        <StatusBar translucent={false} barStyle="light-content" />
        <Header onPress={this.handleMenuPress} headerText='MY ADA WALLET'/>
        <ScrollView style={{position:'absolute', top:100, bottom:-100, paddingTop: 20}}>
          <Text>Demo Menu Item page</Text>
        </ScrollView>
      </Container>
    );
  }
}

export default MenuItem1;
