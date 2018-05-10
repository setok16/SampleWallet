import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

//const imageWidth = Dimensions.get('window').width / 2;

export default EStyleSheet.create({
  wrapper: {
    //flexDirection: 'column',
  },
  container: {
    backgroundColor: '$nonPressableGray',
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '$darkGray',
  },
  modalContainer: {
    backgroundColor: '$white',
  },
});
