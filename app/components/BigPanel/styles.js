import EStyleSheet from 'react-native-extended-stylesheet';

// const imageWidth = Dimensions.get('window').width / 2;

export default EStyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    paddingLeft: 20,
    paddingRight: 20,
    height: 160,
    marginTop: 10,
    marginBottom: 5,
  },
  container: {
    backgroundColor: '$darkGray',
    marginBottom: 10,
    borderRadius: 10,
    alignSelf: 'stretch',
    height: 160,
    borderWidth: 1,
    borderColor: '$border',
  },
  disabledContainer: {
    backgroundColor: '$nonPressableGray',
    borderColor: '$darkGray',
  },
  subContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    height: 160,
  },
  icon: {
    height: null,
    width: 30,
    resizeMode: 'contain',
    tintColor: '$white',
  },
  textContainer: {
    flex: 1,
    // paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainText: {
    color: '$white',
    fontWeight: '200',
    fontSize: 20,
  },
  subText: {
    color: '$white',
    fontWeight: '200',
    fontSize: 30,
  },
  subLowerText: {
    color: '$white',
    fontWeight: '200',
    fontSize: 20,
    left: -3,
  },
  smallText: {
    color: '$white',
    fontWeight: '200',
    fontSize: 15,
  },
});
