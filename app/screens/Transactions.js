
import React, { Component } from 'react';
import { FlatList, StatusBar } from 'react-native';
import Moment from 'moment';

import { Container } from '../components/Container';
import { TransactionPanel } from '../components/TransactionPanel';
import transactions from '../data/transactions';

class Transactions extends Component {
  render() {
    return (
      <Container>
        <StatusBar transcucent={false} barStyle="default" />
        <FlatList
          data={transactions}
          renderItem={({ item }) => (
            <TransactionPanel
              mainText={item.type}
              upperText={Moment(item.date).format('YYYY/MM/DD hh:mm')}
              subUpperText={`${item.amount.toFixed(7).toString()} ₳`}
              subLowerText={`${(item.amount * item.rate.JYP).toFixed(0)} ¥`}
              disabled
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </Container>
    );
  }
}

export default Transactions;
