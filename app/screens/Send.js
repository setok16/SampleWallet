import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StatusBar, ScrollView, Modal, Image, Alert, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import { BarCodeScanner, Permissions } from 'expo';

import { Container } from '../components/Container';
import { Panel } from '../components/Panel';
import { SubContainer } from '../components/SubContainer';
import { InputBox } from '../components/InputBox';
import { Button } from '../components/Button';
import { CameraButton } from '../components/CameraButton';
import { CurrencyPicker } from '../components/CurrencyPicker';

import { decrementBalance, getInitialConversion } from '../actions/wallet';

const styles = EStyleSheet.create({
  text: {
    color: '$white',
    fontWeight: '200',
  },
  modalText: {
    color: '$gray',
    fontWeight: '200',
  },
  smallText: {
    color: '$lightGray',
    fontSize: 10,
    alignSelf: 'flex-end',
    paddingBottom: 5,
    fontWeight: '200',
  },
});

class Send extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    toFixed: PropTypes.func,
    rates: PropTypes.object,
    balance: PropTypes.number,
    navigation: PropTypes.object,
  }

  constructor(props) {
    super(props);
    // Must initialize state objects to avoid null error
    this.state = {
      receiver: '',
      amount: null,
      transactionFee: 0,
      totalAmount: 0,
      modalVisible: false,
      hasCameraPermission: null,
      lastScannedUrl: null,
      currency: 'ADA',
    };
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    this.props.dispatch(getInitialConversion);
  }

  // Function toggles modal's visible state
  setModalVisible = (modalVisible) => {
    this.setState({ modalVisible });
  }

  handleReceiverChange = (receiver) => {
    this.setState({ lastScannedUrl: null });
    this.setState({ receiver });
  }

  // Sets state.amount, state.transactionFee, state.totalAmount on change
  handleAmountChange = (amount) => {
    this.setState({ amount });
    // Assuming we charge a 3% fee
    const transactionFee = amount * 0.03;
    this.setState({ transactionFee });
    const totalAmount = parseFloat(amount) + transactionFee;
    this.setState({ totalAmount });
  }

  handleButtonPress = () => {
    Alert.alert(
      'Confirmation',
      `Receiver: ${this.state.receiver
      }\n\nAmount to be sent: ${this.state.amount
      }${this.state.currency === 'ADA' ? ' ₳' : ' ¥'
      }\n\nAmount withdrawn: ${this.state.totalAmount
      }${this.state.currency === 'ADA' ? ' ₳' : ' ¥'}`,
      [
        { text: 'Cancel' },
        {
          text: 'Send',
          onPress: () => {
            if (((this.state.currency === 'ADA' ? this.props.balance : this.props.balance * this.props.rates.JPY) - this.state.totalAmount) < 0) {
              Alert.alert(
                'Insufficient Balance',
                `Your balance is insufficient for this transaction\nBalance:
                ${this.state.currency === 'ADA' ?
                  `${this.props.balance} ₳` :
                  `${(this.props.balance * this.props.rates.JPY).toFixed(0)} ¥`}\nTotal Due: ${this.state.totalAmount}${this.state.currency === 'ADA' ? ' ₳' : ' ¥'}`,
                [
                  { text: 'Ok' },
                ],
                { cancelable: false },
              );
            } else {
              let withdrawAmount = this.state.totalAmount;
              if (this.state.currency === 'JPY') {
                withdrawAmount /= this.props.rates.JPY;
              }
              this.props.dispatch(decrementBalance(withdrawAmount));
              this.props.navigation.goBack();
            }
          },
        },
      ],
      { cencelable: false },
    );
  }

  handleBarCodeRead = (result) => {
    if (result.data !== this.state.lastScannedUrl) {
      if (result.data.charAt(0) === '$') { // If the QR code is compound with other data
        // Process the compound string to create three separate values
        const subUrl = result.data.substr(1); // Take away the $ sign from beginning of result.data
        const QRInfo = subUrl.split(':');
        // QRInfo[0] = {receiverAddress}, QRInfo[1] = {amount}, QRInfo[2] = {currency}
        this.setState({ receiver: QRInfo[0] });
        this.setState({ amount: QRInfo[1] });
        this.setState({ currency: QRInfo[2] });
        this.handleAmountChange(QRInfo[1]); // Updating the transactionFee and totalAmount
      } else {
        this.setState({ receiver: result.data });
      }
      this.setState({ lastScannedUrl: result.data });
    }
    this.setModalVisible(false);
  }

  handleCameraPress = () => {
    // Makes the camera modal pop up
    this.setModalVisible(true);
  }

  handlePickerValueChange = (itemValue) => {
    this.setState({ currency: itemValue.label });
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <Container>
        <StatusBar translucent={false} barStyle="default" />
        <ScrollView style={{ flex: 1, paddingTop: 10 }}>

          {/* This might have to become a separate component for cleaner code */}
          <Modal
            animationType="fade"
            transparent={false}
            presentationStyle="overFullScreen"
            visible={this.state.modalVisible}
            onRequestClose={() => this.setModalVisible(!this.state.modalVisible)}
          >
            <View style={{ alignItems: 'center' }}>
              <BarCodeScanner
                onBarCodeRead={this.handleBarCodeRead}
                style={{
                    height: Dimensions.get('window').height - 100,
                    width: Dimensions.get('window').width,
                  }}
              >
                <Image
                  source={require('../images/reticle.png')}
                  style={{
                    tintColor: '#FFF',
                    width: Dimensions.get('window').width - 50,
                    height: Dimensions.get('window').width - 50,
                    alignSelf: 'center',
                    top: Dimensions.get('window').height * 0.16,
                  }}
                />
              </BarCodeScanner>
            </View>
            <View style={{
 alignItems: 'center', backgroundColor: '#434343', height: 100, paddingTop: 10,
}}
            >
              <Text style={styles.text}>Line up the QR code to your device&apos;s camera</Text>
              <Button text="Cancel" onPress={() => this.setModalVisible(!this.state.modalVisible)} />
            </View>
          </Modal>

          <Panel
            type="send"
            mainText="Balance"
            subText={this.state.currency === 'ADA' ? `${this.props.balance.toFixed(7)} ₳` : `${(this.props.balance * this.props.rates.JPY).toFixed(0)} ¥`}
            disabled
          />
          <SubContainer>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.text}>Receiver:  </Text>
              <CameraButton style={{ alignSelf: 'center' }} onPress={this.handleCameraPress} />
            </View>
            <InputBox onChangeText={this.handleReceiverChange} value={this.state.receiver} placeholder="Wallet Address" />
            <Text style={styles.text}>Amount:</Text>
            <InputBox onChangeText={this.handleAmountChange} value={!this.state.amount ? null : this.state.amount.toString()} keyboardType="numeric" placeholder={this.state.currency === 'ADA' ? '0.0000000' : '0'} />
            <CurrencyPicker
              onChange={this.handlePickerValueChange}
              initValue={this.state.currency}
            />
            <Text style={styles.smallText}>+{this.state.currency === 'ADA' ? `${this.state.transactionFee.toFixed(7)} ₳` : `${this.state.transactionFee.toFixed(0)} ¥`} (Transaction Fee)</Text>
            <Text style={styles.text}>Total Withdrawn: {!this.state.totalAmount ? 0 : this.state.currency === 'ADA' ? `${this.state.totalAmount.toFixed(7)} ₳` : `${this.state.totalAmount.toFixed(0)} ¥`}</Text>
            <View style={{ left: -10, alignSelf: 'flex-start' }}>
              <Button text="Next" onPress={this.handleButtonPress} style={{ paddingTop: 10 }} />
            </View>
          </SubContainer>
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const props = {
    balance: state.wallet.balance,
    numTransactions: state.wallet.numTransactions,
    lastTransactionDate: state.wallet.lastTransactionDate,
    rates: state.wallet.rates,
  };
  return props;
};

export default connect(mapStateToProps)(Send);
