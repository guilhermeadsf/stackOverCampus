import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  Dimensions,
  StyleSheet
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import backButton from '../../assets/imgs/return.png';
import exitButton from '../../assets/imgs/logout.png';
import { userLogout } from '../redux/actions/userDataActions';
import { connect } from 'react-redux';

const heightHeader = Math.round(Dimensions.get('window').height) * 0.08;

function Header(props) {
  exitApp = async () => {
    const { userLogoutAction } = props;
    await userLogoutAction(false);
    props.navigation.navigate('Auth');
  };

  return props.typeHeader ? (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={['#1abc9c', '#2980b9']}
      style={styles.linearStyle}
    >
      <StatusBar
        translucent
        barStyle='light-content'
        backgroundColor='transparent'
      />
      <View style={styles.viewContainer}>
        <View style={styles.viewBackButton}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Image source={backButton} style={styles.buttonImage} />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 3, justifyContent: 'center' }}>
          <Text style={styles.viewTitle}>{props.title}</Text>
        </View>

        <View style={styles.viewExitButton}>
          <TouchableOpacity onPress={exitApp}>
            <Image source={exitButton} style={styles.buttonImage} />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  ) : (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={['#1abc9c', '#2980b9']}
      style={styles.linearStyle}
    >
      <StatusBar
        translucent
        barStyle='light-content'
        backgroundColor='transparent'
      />
      <View style={styles.viewContainer}>
        <View
          style={{
            flex: 1
          }}
        />
        <View style={styles.viewTitleIfOnlyExitButtom}>
          <Text style={styles.viewTitle}>{props.title}</Text>
        </View>

        <View style={styles.viewExitButton}>
          <TouchableOpacity onPress={exitApp}>
            <Image source={exitButton} style={styles.buttonImage} />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearStyle: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15
  },
  viewBackButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16
  },
  viewExitButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16
  },
  buttonImage: { width: 20, height: 20 },
  viewTitle: {
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: 22,
    marginTop: 15,
    fontWeight: '500'
  },
  viewContainer: {
    width: '100%',
    height: heightHeader,
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  viewTitleIfOnlyExitButtom: { flex: 3, justifyContent: 'center' }
});

const mapDispatchToProps = {
  userLogoutAction: userLogout
};

export default connect(null, mapDispatchToProps)(withNavigation(Header));
