import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';

function Theme(props) {
  const screenWidth = Math.round(Dimensions.get('window').width);
  return (
    <View
      style={{
        width: '50%'
      }}
    >
      <TouchableOpacity
        style={{
          height: 80,
          backgroundColor: '#34495e',
          justifyContent: 'center',
          marginLeft: 10,
          marginRight: 10,
          borderRadius: 10,
          marginTop: 10
        }}
        onPress={() =>
          props.navigation.navigate('ListOfPosts', { id: props.themeName })
        }
      >
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: '#FFF'
          }}
        >
          {props.themeName}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default withNavigation(Theme);
