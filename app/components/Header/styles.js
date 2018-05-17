
import EstyleSheet from 'react-native-extended-stylesheet';

const styles = EstyleSheet.create({
  container: {
    backgroundColor: '$darkGray',
    alignItems: 'center',
    // flex: 1,
    flexDirection: 'row',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: 70,
    /*
    // TopBar component takes care of status bar difference
    // and colors the status bar black.
    '@media ios': {
      paddingTop: 35,
    },
    '@media android': {
      paddingTop: StatusBar.currentHeight, // Android specific
    }, */
  },
  button: {
    // position: 'absolute',
    // alignSelf: 'flex-start',
    flex: 0.15,
  },
  menu: {
    margin: 20,
    width: 30,
    height: 25,
    tintColor: '$white',
  },
  text: {
    flex: 0.85,
    fontWeight: '300',
    fontSize: 20,
    margin: 20,
    marginTop: 20,
    color: '$white',
    alignSelf: 'center',
  },
});

export default styles;
