import React from 'react';
import { withNavigation } from 'react-navigation';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function Theme(props) {
  return (
    <View
      style={{
        width: '50%'
      }}
    >
      <TouchableOpacity
        style={styles.touchableStyle}
        onPress={() =>
          props.navigation.navigate('ListOfPosts', { id: props.themeName })
        }
      >
        <Text style={styles.textStyle}>{props.themeName}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  touchableStyle: {
    height: 80,
    backgroundColor: '#34495e',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    marginTop: 10
  },
  textStyle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#FFF'
  }
});

export default withNavigation(Theme);
