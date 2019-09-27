import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

export default function CardPost(props) {
  return (
    <View
      style={{
        flex: 1,
        marginTop: 10,
        marginHorizontal: 15,
        height: 100,
        backgroundColor: '#000',
        borderRadius: 20
      }}
    >
      <TouchableOpacity>
        <View style={{ height: '50%', justifyContent: 'center' }}>
          <Text
            style={{
              color: '#FFF',
              fontSize: 16,
              fontFamily: 'Roboto',
              textAlign: 'center'
            }}
          >
            {props.postname}
          </Text>
        </View>
        <View
          style={{
            height: '50%',
            backgroundColor: '#FFF',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            justifyContent: 'flex-end'
          }}
        >
          <Text
            style={{
              color: '#000',
              fontSize: 14,
              fontFamily: 'Roboto',
              textAlign: 'center',
              marginBottom: 5
            }}
          >
            {props.username}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}