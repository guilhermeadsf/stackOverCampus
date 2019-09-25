import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function Header() {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={['#1abc9c', '#2980b9']}
      style={{
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15
      }}
    >
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />
      <View
        style={{
          width: '100%',
          height: 70,
          alignSelf: 'center',
          justifyContent: 'center'
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'Roboto',
            fontSize: 22,
            marginTop: 15,
            fontWeight: '500'
          }}
        >
          Stack Over Campus
        </Text>
      </View>
    </LinearGradient>
  );
}
