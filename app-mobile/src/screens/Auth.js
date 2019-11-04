import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Picker,
  Keyboard
} from 'react-native';
import AuthInput from '../components/Authinput';
import axios from 'axios';
import Toast, { DURATION } from 'react-native-easy-toast';
import Loading from '../components/Loading';
import backgroundImage from '../../assets/imgs/Background2.png';
import { userLogout, addEmail } from '../redux/actions/userDataActions';
import { connect } from 'react-redux';

class Auth extends Component {
  state = {
    stageNew: false,
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    loading: false,
    language: 'default'
  };

  signin = async () => {
    console.log(this.state.email.trim().toLowerCase());
    console.log(this.state.password);
    this.setState({ loading: true });

    axios
      .post('https://stackovercampus.herokuapp.com/login', {
        email: this.state.email.trim().toLowerCase(),
        password: this.state.password
      })
      .then(response => {
        console.log(response.data);
        this.setState({ loading: false });
        const { userLogoutAction, addEmailInRedux } = this.props;
        userLogoutAction(true);
        addEmailInRedux(this.state.email);
        this.props.navigation.navigate('Home');
      })
      .catch(error => {
        console.log('Erro!');
        this.refs.toast.show('Senha incorreta!', 2000, () => {
          // something you want to do at close
        });
        this.setState({ loading: false });
        console.log(error);
      });
  };

  signup = async () => {
    console.log(this.state.language);
    this.setState({ loading: true });
    if (this.state.language != 'default') {
      console.log('Teste');
      axios
        .post('https://stackovercampus.herokuapp.com/createUser', {
          name: this.state.name.trim(),
          password: this.state.password,
          email: this.state.email.trim().toLowerCase(),
          course: this.state.language.trim()
        })
        .then(response => {
          console.log(response.data);
          this.setState({ loading: false });
          const { userLogoutAction } = this.props;
          userLogoutAction(true);
          this.props.navigation.navigate('Home');
        })
        .catch(error => {
          console.log('Erro!');
          this.refs.toast.show(
            'Erro interno, verifique com o admin!',
            2000,
            () => {
              // something you want to do at close
            }
          );
          this.setState({ loading: false });
          console.log(error);
        });
    } else {
      await Keyboard.dismiss();
      this.setState({ loading: false });
      this.refs.toast.show('Curso não selecionado!', 2000, () => {
        // something you want to do at close
      });
    }
  };

  signinOrSignup = () => {
    if (this.state.stageNew) {
      this.signup();
    } else {
      this.signin();
    }
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
        <Loading status={this.state.loading} />
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

          {this.state.stageNew && (
            <Picker
              selectedValue={this.state.language}
              style={{
                height: 50,
                color: '#FFF',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
              }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ language: itemValue })
              }
              mode="dropdown"
            >
              <Picker.Item label="Escolha seu curso" value="default" />
              <Picker.Item label="Sistemas de Informação" value="S.I" />
              <Picker.Item label="Licenciatura em Química" value="quim" />
              <Picker.Item
                label="Ciência e Tecnologia de Alimentos"
                value="tecalim"
              />
            </Picker>
          )}

          <TouchableOpacity
            disabled={!validaForm}
            onPress={this.signinOrSignup}
          >
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

        <Toast ref="toast" />
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

const mapDispatchToProps = {
  userLogoutAction: userLogout,
  addEmailInRedux: addEmail
};

export default connect(
  null,
  mapDispatchToProps
)(Auth);
