import React, { Component } from 'react';
import { Text, Image, View, StatusBar, ScrollView, Clipboard, TextInput, Alert, KeyboardAvoidingView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import QRCode from 'react-native-qrcode';
import { connect } from 'react-redux';

import { Container } from '../components/Container';
import { Panel } from '../components/Panel';
import { SubContainer } from '../components/SubContainer';
import { Button } from '../components/Button';
// Hard-coded account data
import addresses from '../data/addresses';

import { getNewAddress } from '../actions/wallet';

class Receive extends Component {

  constructor (props) {
    super(props);
  }

  handleClipboardButton = () => {
    Clipboard.setString(this.props.address);
    Alert.alert(
      'Copied',
      'Address copied to clipboard',
      [
        { text: 'Ok' }
      ],
      { cancelable: false }
    )
  }

  handleAddressChange = () => {
    this.props.dispatch(getNewAddress());
  }

  render() {
    return (
      <Container>
        <StatusBar translucent={false} barStyle="default"/>
        <ScrollView style={{flex: 1, paddingTop: 10}}>
          <KeyboardAvoidingView style={{marginBottom:200}}behavior='padding' enabled>
            <SubContainer>
              <Text style={styles.text}>Your wallet address:</Text>
              <View style={{left:-15}}>
                <Button text={this.props.address} onPress={this.handleClipboardButton}/>
              </View>
              <View style={{paddingBottom:10}}>
                <QRCode
                  value={this.props.address}
                  size={300}
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
          </KeyboardAvoidingView>
        </ScrollView>
      </Container>
    );
  }
}


const mapStateToProps = (state) => {
  const address = state.addresses.address;
  return {
    address,
  };
};

export default connect(mapStateToProps)(Receive);

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
