
import EstyleSheet from 'react-native-extended-stylesheet';
import { StatusBar } from 'react-native';

const styles = EstyleSheet.create({
  container: {
    backgroundColor: '$black',
    //flex: 1,
    '@media ios': {
      height: 20,
      //height: StatusBar.currentHeight, // Android specific
    },
    '@media android': {
      height: StatusBar.currentHeight, // Android specific
    },
  },
});

export default styles;
