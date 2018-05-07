import React, { Component } from 'react';
import { Text, View, StatusBar } from 'react-native';

class Receive extends Component {
  render() {
    return (
      <View>
        <StatusBar translucent={false} barStyle="default"/>
        <View style={{ padding: 30, alignItems: 'center' }}>
          <Text>Demo receive page</Text>
        </View>
      </View>

    );
  }
}

export default Receive;
