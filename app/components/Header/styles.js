
import EstyleSheet from 'react-native-extended-stylesheet';
import { StatusBar } from 'react-native';

const styles = EstyleSheet.create({
  container: {
    backgroundColor: '$darkGray',
    flex: 1,
    flexDirection: 'row',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: 100,
    '@media ios': {
      paddingTop: 35,
    },
    '@media android': {
      paddingTop: StatusBar.currentHeight+5, // Android specific
    },
  },
  button: {
    //position: 'absolute',
    alignSelf: 'flex-start',
    flex: 0.4,
  },
  menu: {
    margin: 20,
    width: 25,
    height: 25,
    tintColor: '$lightGray',
  },
  text: {
    flex: 1,
    fontSize: 20,
    margin: 20,
    color: '$lightGray',
    alignSelf: 'center',
  },
});

export default styles;
