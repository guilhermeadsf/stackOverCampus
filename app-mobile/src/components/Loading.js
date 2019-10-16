import React from 'react';
import { View, Dimensions, ActivityIndicator, Modal } from 'react-native';

export default function Loading(props) {
  const { width } = Dimensions.get('window');
  return (
    <Modal animationType="slide" transparent={true} visible={props.status}>
      <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
        <View
          style={{
            height: 50,
            width: width * 0.2,
            backgroundColor: '#FFF',
            justifyContent: 'center',
            alignContent: 'center',
            borderRadius: 5
          }}
        >
          <ActivityIndicator size="large" color="#1abc9c" />
        </View>
      </View>
    </Modal>
  );
}
