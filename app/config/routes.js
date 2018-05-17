import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { StatusBar } from 'react-native';

import Home from '../screens/Home';
import Wallet from '../screens/Wallet';
import Send from '../screens/Send';
import Receive from '../screens/Receive';
import Transactions from '../screens/Transactions';
import Settings from '../screens/Settings';

import MenuItem1 from '../screens/MenuItem1';

const HomeStack = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header: () => null,
    },
  },
  Wallet: {
    screen: Wallet,
    navigationOptions: {
      headerTitle: 'Wallet',
    },
  },
  Send: {
    screen: Send,
    navigationOptions: {
      headerTitle: 'Send',
    },
  },
  Receive: {
    screen: Receive,
    navigationOptions: {
      headerTitle: 'Receive',
    },
  },
  Transactions: {
    screen: Transactions,
    navigationOptions: {
      headerTitle: 'Transactions',
    },
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      headerTitle: 'Settings',
    },
  },
}, {
  headerMode: 'screen', // Makes page transition smoother
});

/* const DrawerStack = DrawerNavigator({
  MenuItem1: {
    screen: MenuItem1,
    navigationOptions: {
      headerTitle: 'Menu Option 1',
    },
  },
}, {
  drawerPosition: 'left',
}); */

export default DrawerNavigator({
  Home: {
    screen: HomeStack,
  },
  MenuItem1: {
    screen: MenuItem1,
  },
}, {
  mode: 'modal',
  cardStyle: { paddingTop: StatusBar.currentHeight },
  headerMode: 'none',
});
