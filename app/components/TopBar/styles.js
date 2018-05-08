import EstyleSheet from 'react-native-extended-stylesheet';
import { StatusBar } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';

const styles = EstyleSheet.create({
  container: {
    //flex: 1,
    '@media ios': {
      height: 20,
      ...ifIphoneX({
        backgroundColor: '$gray',
      }, { // else
        backgroundColor: '$black',
      }),
    },
    '@media android': {
      height: StatusBar.currentHeight, // Android specific
    },
  },
});

export default styles;
