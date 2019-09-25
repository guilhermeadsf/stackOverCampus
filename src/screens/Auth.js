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
import backgroundImage from '../../assets/imgs/login.jpg';
import googleLogin from '../../assets/imgs/googleLogin.png';
import facebookLogin from '../../assets/imgs/facebookLogin.png';

export default class Auth extends Component {
  state = {
    stageNew: false,
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  signin = async () => {};

  signup = async () => {};

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
        <View style={{ flexDirection: 'row' }}>
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
                resizeMode: 'contain'
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ borderWidth: 1, borderColor: '#FFF' }}>
            <Image
              source={facebookLogin}
              style={{ width: 140, height: 120, resizeMode: 'contain' }}
            />
          </TouchableOpacity>
        </View>
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
    fontSize: 35,
    marginBottom: 50
  },
  subtitle: {
    fontFamily: 'Roboto',
    color: '#FFF',
    fontSize: 20
  },
  formContainer: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 20,
    width: '90%'
  },
  input: {
    marginTop: 10,
    backgroundColor: '#FFF'
  },
  button: {
    backgroundColor: '#080',
    marginTop: 10,
    padding: 10,
    alignItems: 'center'
  },
  buttonText: {
    fontFamily: 'Roboto',
    color: '#FFF',
    fontSize: 20
  }
});
