
import React, { Component } from 'react';
import { Text, FlatList, StatusBar } from 'react-native';
import Moment from 'moment';

import { Container } from '../components/Container';
import { Panel } from '../components/Panel';
import transactions from '../data/transactions';

class Transactions extends Component {
  render() {
    return (
      <Container>
        <StatusBar transcucent={false} barStyle="default" />
        <FlatList
          data={transactions}
          renderItem={({ item }) => (
            <Panel
              type='transactions'
              mainText={item.type}
              upperText={Moment(item.date).format('YYYY/MM/DD hh:mm')}
              subText={item.amount.toFixed(7).toString()+' ₳'}
              disabled={true}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          style={{paddingTop:10}}
        >
        </FlatList>
      </Container>
    );
  }
}

export default Transactions;
