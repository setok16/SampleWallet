import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StatusBar, ScrollView, TextInput, Modal, TouchableHighlight, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';

import { Container } from '../components/Container';
import { Panel } from '../components/Panel';
import { SubContainer } from '../components/SubContainer';
import { Button } from '../components/Button';
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
    }
  }

  // Function toggles modal's visible state
  setModalVisible = (modalVisible) => {
    this.setState({modalVisible})
  }

  handleReceiverChange = (receiver) => {
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
    console.log('Button Pressed!')
    console.log('Receiver: '+this.state.receiver+'\nAmount: '+this.state.totalAmount);
    // Makes the modal pop up
    this.setModalVisible(true);
    console.log(this.props);
  }

  render() {
    return (
      <Container>
        <StatusBar translucent={false} barStyle="default"/>
        <ScrollView style={{flex: 1, paddingTop: 10}}>

          <Modal
            animationType="fade"
            transparent={true}
            presentationStyle='overFullScreen'
            visible={this.state.modalVisible}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}
          >
            <View style={{paddingTop:200, alignSelf:'center'}}>
              <SubContainer modalMode={true}>
                  <Text style={{color:'#353535'}}>Receiver: {this.state.receiver}</Text>
                  <Text style={{color:'#353535'}}>Amount to be sent: {this.state.amount}</Text>
                  <Text style={{color:'#353535'}}>Amount withdrawn: {this.state.totalAmount}</Text>
                  <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <Button
                      text=' Send '
                      onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                        if ((this.props.balance - this.state.totalAmount) < 0) {
                          // If insufficient balance
                          Alert.alert(
                            'Insufficient Balance',
                            'Your balance is insufficient for this transaction\nBalance: '
                            + this.props.balance + ' ₳\nTotal Due: ' + this.state.totalAmount +' ₳',
                            [
                              { text: 'Ok' }
                            ],
                            { cancelable: false }
                          )
                        } else {
                          this.props.dispatch(decrementBalance(this.state.amount));
                        }
                        this.props.navigation.goBack();
                    }}/>
                    <Button
                      text='Cancel'
                      onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                        //this.props.navigation.goBack();
                    }}/>
                  </View>
              </SubContainer>
            </View>
          </Modal>

          <Panel
            type='send'
            mainText='Balance'
            subText={this.props.balance + ' ₳'}
            disabled={true}
          />
          <SubContainer>
            <Text style={styles.text}>Receiver:</Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              onChangeText={this.handleReceiverChange}
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
