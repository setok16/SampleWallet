import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';

import styles from './styles';

// const SubContainer = (props) => {
class SubContainer extends Component {
  render() {
    const containerStyles = [styles.container];
    if (this.props.modalMode) {
      containerStyles.push(styles.modalContainer);
    }
    return (
      <TouchableOpacity activeOpacity={1}>
        <View style={containerStyles}>
          { this.props.children }
        </View>
      </TouchableOpacity>
    );
  }
}


SubContainer.propTypes = {
  modalMode: PropTypes.bool,
  children: PropTypes.array,
};

export default SubContainer;
