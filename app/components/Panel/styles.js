import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

//const imageWidth = Dimensions.get('window').width / 2;

export default EStyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    paddingLeft: 20,
    paddingRight: 20,
    height: 70,
    marginTop: 10,
  },
  container: {
    backgroundColor: '$darkGray',
    marginBottom: 10,
    borderRadius: 10,
    alignSelf: 'stretch',
    height: 65,
    borderWidth: 1,
    borderColor: '$border',
  },
  disabledContainer: {
    backgroundColor: '$nonPressableGray',
  },
  subContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
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
    flexDirection: 'column',
  },
  upperContainer: {
    flexDirection: 'row',
  },
  mainText: {
    flex: 0.6,
    color: '$white',
    fontWeight: '200',
    fontSize: 20,
  },
  subText: {
    color: '$white',
    fontWeight: '200',
    fontSize: 15,
  },
  upperText: {
    flex: 0.4,
    alignSelf: 'center',
    color: '$white',
    fontWeight: '200',
    fontSize: 10,
  }
});
