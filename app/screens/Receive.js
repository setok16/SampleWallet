import React, { Component } from 'react';
import { Text, Image, View, StatusBar, ScrollView, Clipboard, TextInput, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import QRCode from 'react-native-qrcode';

import { Container } from '../components/Container';
import { Panel } from '../components/Panel';
import { SubContainer } from '../components/SubContainer';
import { Button } from '../components/Button';
// Hard-coded account data
import addresses from '../data/addresses';

class Receive extends Component {

  constructor (props) {
    super(props);
    this.state = {
      addressIndex: 0,
      address: addresses[0],
    }
  }

  handleClipboardButton = () => {
    Clipboard.setString(this.state.address);
    Alert.alert(
      'Notice',
      'Copied to clipboard',
      [
        { text: 'Ok' }
      ],
      { cancelable: false }
    )
  }

  handleAddressChange = () => {
    // TODO: This is temporary for mock. This stupid logic must change
    const index = this.state.addressIndex ? 0 : 1;
    this.setState({addressIndex: this.state.addressIndex ? 0 : 1});
    this.setState({address: addresses[index]});
  }

  render() {
    return (
      <Container>
        <StatusBar translucent={false} barStyle="default"/>
        <ScrollView style={{flex: 1, paddingTop: 10}}>
          <SubContainer>
            <Text style={styles.text}>Your wallet address:</Text>
            <View style={{left:-15}}>
              <Button text={this.state.address} onPress={this.handleClipboardButton}/>
            </View>
            <View style={{paddingBottom:10}}>
              <QRCode
                value={this.state.address}
                size={150}
                bgColor='black'
                fgColor='white'
              />
            </View>
            <Text style={styles.text}>To protect your identity, you are recommended to change your wallet address for each transaction.</Text>
            <View style={{flexDirection:'column', paddingTop:10, flex:1}}>
              <TextInput
                style={styles.input}
                ref={input => { this.textInput= input}}
                underlineColorAndroid="transparent"
                onChangeText={this.handleAmountChange}
                secureTextEntry={true}
                placeholder='Password'
              />
            <View style={{flex:0.5, alignSelf:'flex-start', left:-10}}>
              <Button text='Create new address' onPress={this.handleAddressChange}/>
            </View>
            </View>
          </SubContainer>
        </ScrollView>
      </Container>
    );
  }
}

export default Receive;

const styles = EStyleSheet.create({
  text: {
    color: '$white',
    fontWeight: '200',
  },
  input: {
    color: '$white',
    fontWeight: '200',
    borderWidth: 1,
    borderColor: '$gray',
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
    padding: 5,
    flex: 0.5,
  },
});
