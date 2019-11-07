import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { withNavigation } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';

function MenuOptions(props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 5
      }}
    >
      {props.temaStatus == 0 && (
        <TouchableOpacity
          style={{
            width: '30%',
            height: 40,
            backgroundColor: '#7f8c8d',
            marginRight: 5,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          disabled={true}
        >
          <Text style={{ color: '#FFF', fontSize: 12, fontFamily: 'Roboto' }}>
            Temas
          </Text>
        </TouchableOpacity>
      )}

      {props.temaStatus == 1 && (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#1abc9c', '#2980b9']}
          style={{
            width: '30%',
            borderRadius: 5,
            marginRight: 5
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={() => props.navigation.navigate('Home')}
          >
            <Text style={{ color: '#FFF', fontSize: 12, fontFamily: 'Roboto' }}>
              Temas
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      )}

      {props.trabalhoStatus == 1 && (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#1abc9c', '#2980b9']}
          style={{
            width: '30%',
            borderRadius: 5
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={() => props.navigation.navigate('ListOfWorks')}
          >
            <Text style={{ color: '#FFF', fontSize: 12, fontFamily: 'Roboto' }}>
              Trabalhos
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      )}

      {props.trabalhoStatus == 0 && (
        <TouchableOpacity
          style={{
            width: '30%',
            height: 40,
            backgroundColor: '#7f8c8d',
            marginRight: 5,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          disabled={true}
        >
          <Text style={{ color: '#FFF', fontSize: 12, fontFamily: 'Roboto' }}>
            Trabalhos
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default withNavigation(MenuOptions);
