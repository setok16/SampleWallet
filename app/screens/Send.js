import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StatusBar, ScrollView, TextInput, Modal, Image, TouchableHighlight, Alert, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import { BarCodeScanner, Permissions } from 'expo';

import { Container } from '../components/Container';
import { Panel } from '../components/Panel';
import { SubContainer } from '../components/SubContainer';
import { Button } from '../components/Button';
import { CameraButton } from '../components/CameraButton';
// Hard-coded transaction data
import transactions from '../data/transactions';

import { decrementBalance } from '../actions/wallet';

class Send extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
  }

  constructor (props) {
    super(props);
    // Must initialize state objects to avoid null error
    this.state = {
      receiver: '',
      amount: 0,
      transactionFee: 0,
      totalAmount: 0,
      modalVisible: false,
      hasCameraPermission: null,
      lastScannedUrl: null,
    }
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
  }

  // Function toggles modal's visible state
  setModalVisible = (modalVisible) => {
    this.setState({modalVisible})
  }

  handleReceiverChange = (receiver) => {
    this.setState({lastScannedUrl: null})
    this.setState({receiver});
  }

  // Sets state.amount, state.transactionFee, state.totalAmount on change
  handleAmountChange = (amount) => {
    this.setState({amount});
    // Assuming we charge a 3% fee
    let transactionFee = amount * 0.03;
    this.setState({transactionFee});
    let totalAmount = parseFloat(amount) + transactionFee;
    this.setState({totalAmount});
  }

  handleButtonPress = () => {
    Alert.alert(
      'Confirmation',
      'Receiver: ' + this.state.receiver +
      '\n Amount to be sent: ' + this.state.amount +
      ' ₳\nAmount withdrawn: ' + this.state.totalAmount + ' ₳',
      [
        { text: 'Cancel' },
        { text: 'Send', onPress: () => {
          if ((this.props.balance - this.state.totalAmount) < 0) {
            Alert.alert(
              'Insufficient Balance',
              'Your balance is insufficient for this transaction\nBalance: '
              + this.props.balance + ' ₳\nTotal Due: ' + this.state.totalAmount +' ₳',
              [
                { text: 'Ok' }
              ],
              { cancelable: false }
            );
          } else {
            this.props.dispatch(decrementBalance(this.state.totalAmount));
            this.props.navigation.goBack();
          }
        }}
      ],
      { cencelable: false }
    );
  }

  _handleBarCodeRead = (result) => {
    console.log('barcode read');
    if (result.data !== this.state.lastScannedUrl) {
      this.setState( {lastScannedUrl: result.data });
      this.setState( {receiver: result.data} );
    }
    this.setModalVisible(false);
  }
  /* We might need this later
  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  }
  */

  handleCameraPress = () => {
    // Makes the camera modal pop up
    this.setModalVisible(true);
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <Container>
          <StatusBar translucent={false} barStyle="default"/>
          <ScrollView style={{flex: 1, paddingTop: 10}}>

            {/* This might have to become a separate component for cleaner code */}
            <Modal
              animationType="fade"
              transparent={false}
              presentationStyle='overFullScreen'
              visible={this.state.modalVisible}
              onRequestClose={()=>this.setModalVisible(!this.state.modalVisible)}
            >
              <View style={{alignItems: 'center'}}>
                <BarCodeScanner
                  onBarCodeRead={this._handleBarCodeRead}
                  style={{
                    height: Dimensions.get('window').height-100,
                    width: Dimensions.get('window').width,
                  }}
                >
                  <Image
                    source={require('../images/reticle.png')}
                    style={{tintColor:'#FFF', width:Dimensions.get('window').width-50, height:Dimensions.get('window').width-50, alignSelf:'center', top:Dimensions.get('window').height*0.16}}
                  />
                </BarCodeScanner>
              </View>
              <View style={{alignItems: 'center',backgroundColor:'#434343', height:100, paddingTop:10}}>
                <Text style={styles.text}>Line up the QR code to your device's camera</Text>
                <Button text='Cancel' onPress={() => this.setModalVisible(!this.state.modalVisible)} />
              </View>
            </Modal>

            <Panel
              type='send'
              mainText='Balance'
              subText={this.props.balance + ' ₳'}
              disabled={true}
            />
            <SubContainer>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.text}>Receiver:   </Text>
                <CameraButton style={{alignSelf: 'center'}} onPress={this.handleCameraPress}/>
              </View>
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                onChangeText={this.handleReceiverChange}
                value={this.state.lastScannedUrl}
                placeholder='Wallet Address'
              />
              <Text style={styles.text}>Amount:</Text>
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                onChangeText={this.handleAmountChange}
                keyboardType='numeric'
                placeholder='0.0000000'
              />
              <Text style={styles.smallText}>+{this.state.transactionFee.toFixed(7)} ₳ (Transaction Fee)</Text>
              <Text style={styles.text}>Total Withdrawn: {!this.state.totalAmount ? 0 : this.state.totalAmount.toFixed(7)} ₳</Text>
              <Button text='Next' onPress={this.handleButtonPress} style={{paddingTop: 10}}/>
            </SubContainer>
          </ScrollView>
        </Container>
      );
    }
  }
}

const mapStateToProps = (state) => {
  const balance = state.wallet.balance;
  const numTransactions = state.wallet.numTransactions;
  const lastTransactionDate = state.wallet.lastTransactionDate;
  return {
    balance,
    numTransactions,
    lastTransactionDate,
  }
};

export default connect(mapStateToProps)(Send);

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
  input: {
    color: '$white',
    fontWeight: '200',
    borderWidth: 1,
    borderColor: '$gray',
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
    padding: 5,
  },
});
