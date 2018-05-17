import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StatusBar, ScrollView, Clipboard, Alert, KeyboardAvoidingView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import QRCode from 'react-native-qrcode';
import { connect } from 'react-redux';

import { Container } from '../components/Container';
import { SubContainer } from '../components/SubContainer';
import { Button } from '../components/Button';
import { InputBox } from '../components/InputBox';
import { CurrencyPicker } from '../components/CurrencyPicker';

import { getNewAddress } from '../actions/wallet';

const styles = EStyleSheet.create({
  text: {
    color: '$white',
    fontWeight: '200',
  },
});

class Receive extends Component {
  static propTypes = {
    address: PropTypes.string,
    dispatch: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      amount: null,
      currency: 'ADA',
      QRstring: this.props.address,
    };
  }

  handleClipboardButton = () => {
    Clipboard.setString(this.props.address);
    Alert.alert(
      'Copied',
      'Address copied to clipboard',
      [
        { text: 'Ok' },
      ],
      { cancelable: false },
    );
  };

  handleAddressChange = () => {
    Alert.alert(
      'Confirm Address Change',
      'If you change your wallet address, you will not be able to receive funds from senders using your current address.',
      [
        {
          text: 'Ok',
          onPress: () => {
            this.props.dispatch(getNewAddress());
            if (this.state.amount) {
              const QRstring = `$${this.props.address}:${this.state.amount}:${this.state.currency}`;
              this.setState({ QRstring });
            } else {
              this.setState({ QRstring: this.props.address });
            }
          },
        },
        { text: 'Cancel' },
      ],
      { cancelable: false },
    );
  };

  handlePasswordInput = (password) => {
    console.log(password);
  }

  handleCurrencyChange = (itemValue) => {
    this.setState({ currency: itemValue.label });
    if (this.state.amount) {
      const QRstring = `$${this.props.address}:${this.state.amount}:${this.state.currency}`;
      this.setState({ QRstring });
    }
    console.log(this.state);
  }

  handleAmountChange = (amount) => {
    this.setState({ amount });
    let QRstring = `$${this.props.address}:${amount}:${this.state.currency}`;
    if (!amount) { // Incase user erases the amount, remove amount and currency data from QR code
      QRstring = this.props.address;
    }
    this.setState({ QRstring });
  }

  render() {
    return (
      <Container>
        <StatusBar translucent={false} barStyle="default" />
        <ScrollView style={{ flex: 1, paddingTop: 10 }}>
          <KeyboardAvoidingView style={{ marginBottom: 200 }}behavior="padding" enabled>
            <SubContainer>
              <Text style={styles.text}>Your wallet address:</Text>
              <View style={{ left: -10, alignSelf: 'flex-start' }}>
                <Button text={this.props.address} onPress={this.handleClipboardButton} />
              </View>
              <Text style={styles.text}>Receiving Amount (Optional):</Text>
              <InputBox onChangeText={this.handleAmountChange} keyboardType="numeric" placeholder="0.0000000" />
              <CurrencyPicker onChange={this.handleCurrencyChange} />
              <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                <QRCode
                  value={this.state.QRstring}
                  size={300}
                  bgColor="black"
                  fgColor="white"
                />
              </View>
              <Text style={styles.text}>
                To protect your identity, you are recommended to change your wallet address for each transaction.
              </Text>
              <View style={{ flexDirection: 'column', paddingTop: 10, flex: 1 }}>
                <InputBox onChangeText={this.handlePasswordInput} secureTextEntry placeholder="password" />
                <View style={{ flex: 0.5, alignSelf: 'flex-start', left: -10 }}>
                  <Button text="Create new address" onPress={this.handleAddressChange} />
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
  const props = {
    address: state.addresses.address,
  };
  return props;
};

export default connect(mapStateToProps)(Receive);
