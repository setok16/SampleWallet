import { DrawerNavigator } from 'react-navigation';

import { Home } from '../screens/Home';

const Drawer = DrawerNavigator({
  Home: {
    screen: Home,
  },
});

export default Drawer;
