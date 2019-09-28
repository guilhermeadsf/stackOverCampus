import React, { Component } from 'react';
import { View, Text, StatusBar, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import backButton from '../../assets/imgs/return.png';

function Header(props) {
  return props.typeHeader ? (
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
          justifyContent: 'center',
          flexDirection: 'row'
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 16
          }}
        >
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Image source={backButton} style={{ width: 20, height: 20 }} />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 3, justifyContent: 'center' }}>
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

        <View style={{ flex: 1 }}></View>
      </View>
    </LinearGradient>
  ) : (
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

export default withNavigation(Header);
