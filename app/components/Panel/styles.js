import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

//const imageWidth = Dimensions.get('window').width / 2;

export default EStyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    paddingLeft: 20,
    paddingRight: 20,
    height: 80,
    marginTop: 10,
    //flex: 1,
  },
  container: {
    backgroundColor: '$darkGray',
    marginBottom: 10,
    borderRadius: 10,
    alignSelf: 'stretch',
    height: 70,
  },
  subContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    //justifyContent: 'center', // Can also be 'center'
  },
  icon: {
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
