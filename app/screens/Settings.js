import React, { Component } from 'react';
import { Text, View, StatusBar } from 'react-native';

class Settings extends Component {
  render() {
    return (
      <View>
        <StatusBar translucent={false} barStyle="default"/>
        <View style={{ padding: 30, alignItems: 'center' }}>
          <Text>Demo Settings page</Text>
        </View>
      </View>
    );
  }
}

export default Settings;
