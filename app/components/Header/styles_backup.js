
import EstyleSheet from 'react-native-extended-stylesheet';
import { StatusBar } from 'react-native';

const styles = EstyleSheet.create({
  container: {
    backgroundColor: '$darkGray',
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 0,
    height: 100,
    '@media ios': {
      paddingTop: 100,
    },
    '@media android': {
      paddingTop: StatusBar.currentHeight, // Android specific
    },
  },
  button: {
    position: 'absolute',
    top: 30,
  },
  menu: {
    position: 'absolute',
    margin: 20,
    top: 0,
    width: 25,
    height: 25,
    tintColor: '$lightGray',
  },
  text: {
    color: '$white',
    alignSelf: 'center',
  },
});

export default styles;
