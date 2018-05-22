import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    backgroundColor: '$darkGray',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    borderWidth: 0.5,
    borderColor: '$border',
    borderRadius: 5,
  },
  text: {
    color: '$white',
    fontWeight: '200',
  },
});
