import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Picker,
  Keyboard,
  Dimensions,
  ScrollView
} from 'react-native';
import AuthInput from '../components/Authinput';
import axios from 'axios';
import Toast, { DURATION } from 'react-native-easy-toast';
import Loading from '../components/Loading';
import backgroundImage from '../../assets/imgs/Background2.png';
import {
  userLogout,
  addEmail,
  addName,
  addCourse
} from '../redux/actions/userDataActions';
import { connect } from 'react-redux';

class Auth extends Component {
  state = {
    stageNew: false,
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    loading: false,
    courseName: 'default'
  };

  signin = async () => {
    await this.setState({ loading: true });

    axios
      .post('https://stackovercampus.herokuapp.com/login', {
        email: this.state.email.trim().toLowerCase(),
        password: this.state.password
      })
      .then(response => {
        console.log(response.data);
        this.setState({ loading: false });
        const {
          userLogoutAction,
          addEmailInRedux,
          addUserName,
          addCourse
        } = this.props;
        userLogoutAction(true);
        addEmailInRedux(this.state.email);
        addUserName(response.data.name);
        addCourse(response.data.course);
        this.props.navigation.navigate('Home');
      })
      .catch(error => {
        Keyboard.dismiss();
        this.setState({ loading: false });
        if (error.response) {
          if (error.response.status == 400) {
            this.refs.toast.show('Senha incorreta!', 4000, () => {
              // something you want to do at close
            });
          } else {
            this.refs.toast.show(
              'Erro interno, contate um Administrador!',
              4000,
              () => {
                // something you want to do at close
              }
            );
          }
        } else {
          this.refs.toast.show('Verifique sua conexão!', 4000, () => {
            // something you want to do at close
          });
        }
      });
  };

  signup = async () => {
    console.log(this.state.courseName);
    this.setState({ loading: true });
    if (this.state.courseName != 'default') {
      console.log('Teste');
      axios
        .post('https://stackovercampus.herokuapp.com/createUser', {
          name: this.state.name.trim(),
          password: this.state.password,
          email: this.state.email.trim().toLowerCase(),
          course: this.state.courseName.trim()
        })
        .then(response => {
          console.log(response.data);
          this.setState({ loading: false });
          const {
            userLogoutAction,
            addEmailInRedux,
            addUserName,
            addCourse
          } = this.props;
          userLogoutAction(true);
          addEmailInRedux(this.state.email);
          addUserName(this.state.name);
          addCourse(this.state.courseName);
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
          barStyle='light-content'
          backgroundColor='transparent'
        />
        <Loading status={this.state.loading} />

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text style={this.state.stageNew ? styles.titleTwo : styles.title}>
              Stack Over Campus
            </Text>
            <View style={styles.formContainer}>
              <Text style={styles.subtitle}>
                {this.state.stageNew
                  ? 'Crie a sua conta'
                  : 'Informe seus dados'}
              </Text>
              {this.state.stageNew && (
                <AuthInput
                  icon='user'
                  placeholder='Nome'
                  style={styles.input}
                  value={this.state.name}
                  onChangeText={name => this.setState({ name })}
                />
              )}
              <AuthInput
                icon='at'
                placeholder='E-mail'
                style={styles.input}
                value={this.state.email}
                onChangeText={email => this.setState({ email: email.trim() })}
              />
              <AuthInput
                icon='lock'
                secureTextEntry={true}
                placeholder='Senha'
                style={styles.input}
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
              />
              {this.state.stageNew && (
                <AuthInput
                  icon='asterisk'
                  secureTextEntry={true}
                  placeholder='Confirme sua senha'
                  style={styles.input}
                  value={this.state.confirmPassword}
                  onChangeText={confirmPassword =>
                    this.setState({ confirmPassword })
                  }
                />
              )}

              {this.state.stageNew && (
                <Picker
                  selectedValue={this.state.courseName}
                  style={{
                    height: 50,
                    color: '#FFF',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center'
                  }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ courseName: itemValue })
                  }
                  mode='dropdown'
                >
                  <Picker.Item label='Escolha seu curso' value='default' />
                  <Picker.Item label='Sistemas de Informação' value='S.I' />
                  <Picker.Item label='Licenciatura em Química' value='quim' />
                  <Picker.Item
                    label='Ciência e Tecnologia de Alimentos'
                    value='tecalim'
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
          </View>
        </ScrollView>
        <Toast ref='toast' />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%'
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

  titleTwo: {
    fontFamily: 'Roboto',
    color: '#FFF',
    fontSize: 35,
    marginTop: Math.round(Dimensions.get('window').height) * 0.05,
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
  addEmailInRedux: addEmail,
  addUserName: addName,
  addCourse: addCourse
};

export default connect(null, mapDispatchToProps)(Auth);
