import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Image
} from 'react-native';
import AuthInput from '../components/Authinput';
import backgroundImage from '../../assets/imgs/Background2.png';
// import googleLogin from '../../assets/imgs/btnGoogle.png';
// import facebookLogin from '../../assets/imgs/btnFacebook.png';
import { SocialIcon } from 'react-native-elements';

export default class Auth extends Component {
  state = {
    stageNew: false,
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  signin = async () => { };

  signup = async () => { };

  signinOrSignup = () => {
    this.props.navigation.navigate('Home');
  };

  render() {
    const validations = [];

    validations.push(this.state.email && this.state.email.includes('@'));
    validations.push(this.state.password && this.state.password.length >= 6);

    if (this.state.stageNew) {
      validations.push(this.state.name && this.state.name.trim());
      validations.push(this.state.confirmPassword);
      validations.push(
        this.state.confirmPassword === this.state.confirmPassword
      );
    }

    const validaForm = validations.reduce((all, v) => all && v);

    return (
      <ImageBackground source={backgroundImage} style={styles.background}>
        <StatusBar
          translucent={true}
          barStyle="light-content"
          backgroundColor="transparent"
        />
        <Text style={styles.title}>Stack Over Campus</Text>
        <View style={styles.formContainer}>
          <Text style={styles.subtitle}>
            {this.state.stageNew ? 'Crie a sua conta' : 'Informe seus dados'}
          </Text>
          {this.state.stageNew && (
            <AuthInput
              icon="user"
              placeholder="Nome"
              style={styles.input}
              value={this.state.name}
              onChangeText={name => this.setState({ name })}
            />
          )}
          <AuthInput
            icon="at"
            placeholder="E-mail"
            style={styles.input}
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
          <AuthInput
            icon="lock"
            secureTextEntry={true}
            placeholder="Senha"
            style={styles.input}
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
          {this.state.stageNew && (
            <AuthInput
              icon="asterisk"
              secureTextEntry={true}
              placeholder="Confirme sua senha"
              style={styles.input}
              value={this.state.confirmPassword}
              onChangeText={confirmPassword =>
                this.setState({ confirmPassword })
              }
            />
          )}
          <TouchableOpacity disabled={validaForm} onPress={this.signinOrSignup}>
            <View
              style={[
                styles.button,
                !validaForm ? { backgroundColor: '#AAA' } : {}
              ]}
            >
              <Text style={styles.buttonText}>
                {this.state.stageNew ? 'Registrar' : 'Entrar'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ padding: 10 }}
          onPress={() => this.setState({ stageNew: !this.state.stageNew })}
        >
          <Text style={styles.buttonText}>
            {this.state.stageNew
              ? 'Já possui conta ?'
              : 'Ainda não possui conta ?'}
          </Text>
        </TouchableOpacity>

        <View style={{ width: '50%', flexDirection: 'column' }}>
            <SocialIcon
              //Social Icon using react-native-elements
              button
              //To make a button type Social Icon
              title="Logar com o Facebook"
              //Title of Social Button
              type="facebook"
              //Type of Social Icon
              onPress={() => {
                //Action to perform on press of Social Icon
                alert('facebook');
              }}
            />

            <SocialIcon
              //Social Icon using react-native-elements
              button
              //To make a button type Social Icon
              title="Logar com o Google"
              //Title of Social Button
              type="google"
              //Type of Social Icon
              onPress={() => {
                //Action to perform on press of Social Icon
                alert('google');
              }}
            />
          </View>

        {/* <View style={{ width: '50%', flexDirection: 'row' }}>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: '#FFF',
              marginRight: 10
            }}
          >
            <Image
              source={googleLogin}
              style={{
                width: 140,
                height: 120,
                resizeMode: 'contain'
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ borderWidth: 1, borderColor: '#FFF' }}>
            <Image
              source={facebookLogin}
              style={{
                width: 140,
                height: 120,
                resizeMode: 'contain'
              }}
            />
          </TouchableOpacity>
        </View> */}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  title: {
    fontFamily: 'Roboto',
    color: '#FFF',
    fontSize: 50,
    marginBottom: 50,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },

  subtitle: {
    fontFamily: 'Roboto',
    color: '#FFF',
    fontSize: 20
  },

  formContainer: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 20,
    width: '90%',
    borderRadius: 10
  },

  input: {
    marginTop: 10,
    backgroundColor: '#FFF'
  },

  button: {
    borderRadius: 50,
    backgroundColor: '#080',
    marginTop: 10,
    padding: 10,
    alignItems: 'center'
  },

  buttonText: {
    fontFamily: 'Roboto',
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  }
});
