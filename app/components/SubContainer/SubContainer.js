import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text, Image } from 'react-native';

import styles from './styles';

//const SubContainer = (props) => {
class SubContainer extends Component {
  render () {
    const containerStyles = [styles.container];
    if (this.props.modalMode) {
      containerStyles.push(styles.modalContainer);
    }
    return (
      <View style={containerStyles}>
        { this.props.children }
      </View>
    );

  }
}


SubContainer.propTypes = {
  type: PropTypes.string,
  onPress: PropTypes.func,
  mainText: PropTypes.string,
  subText: PropTypes.string,
  smallText1: PropTypes.string,
  smallText2: PropTypes.string,
  disabled: PropTypes.bool,
}

export default SubContainer;
