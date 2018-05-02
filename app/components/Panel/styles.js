import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const imageWidth = Dimensions.get('window').width / 2;

export default EStyleSheet.create({
  container: {
    backgroundColor: '$darkGray',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    //flex: 0.1,
    alignSelf: 'stretch',
  },
  subContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    //flex: 0.2,
    height: null,
    width: 30,
    resizeMode: 'contain',
    tintColor: '$white',
  },
  textContainer: {
    flex: 1,
    paddingLeft: 20,
  },
  mainText: {
    color: '$white',
    fontSize: 20,
  },
  subText: {
    color: '$white',
    fontSize: 15,
  },
});
