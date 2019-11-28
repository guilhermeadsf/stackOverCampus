import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
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
        <TouchableOpacity style={styles.touchableOptionSelect} disabled={true}>
          <Text style={styles.titleStyle}>Temas</Text>
        </TouchableOpacity>
      )}

      {props.temaStatus == 1 && (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#1abc9c', '#2980b9']}
          style={styles.linearStyle}
        >
          <TouchableOpacity
            style={styles.touchableOptionNotSelect}
            onPress={() => props.navigation.navigate('Home')}
          >
            <Text style={styles.titleStyle}>Temas</Text>
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
            style={styles.touchableOptionNotSelect}
            onPress={() => props.navigation.navigate('ListOfWorks')}
          >
            <Text style={styles.titleStyle}>Trabalhos</Text>
          </TouchableOpacity>
        </LinearGradient>
      )}

      {props.trabalhoStatus == 0 && (
        <TouchableOpacity style={styles.touchableOptionSelect} disabled={true}>
          <Text style={styles.titleStyle}>Trabalhos</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  touchableOptionSelect: {
    width: '30%',
    height: 40,
    backgroundColor: '#7f8c8d',
    marginRight: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleStyle: { color: '#FFF', fontSize: 12, fontFamily: 'Roboto' },
  linearStyle: {
    width: '30%',
    borderRadius: 5,
    marginRight: 5
  },
  touchableOptionNotSelect: {
    flex: 1,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default withNavigation(MenuOptions);
