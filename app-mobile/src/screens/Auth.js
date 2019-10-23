import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome';
import AuthInput from '../components/Authinput';
import axios from 'axios';
import Toast, { DURATION } from 'react-native-easy-toast';
import Loading from '../components/Loading';
import backgroundImage from '../../assets/imgs/Background2.png';
import { userLogout } from '../redux/actions/userDataActions';
import { connect } from 'react-redux';
import { Container, Header, Content, Form, Item, Picker } from 'native-base';

class Auth extends Component {
  state = {
    stageNew: false,
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    loading: false
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
        const { userLogoutAction } = this.props;
        userLogoutAction(true);
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

    // const login = await axios.post(
    //   'https://stackovercampus.herokuapp.com/login',
    //   {
    //     email: this.state.email.trim().toLowerCase(),
    //     password: this.state.password
    //   }
    // ).catch();
    // console.log(login.data);
    // this.setState({ loading: false });

    // if (login.data == 'Ok') {
    //   const { userLogoutAction } = this.props;
    //   await userLogoutAction(true);
    //   this.props.navigation.navigate('Home');
    // } else {
    //   this.refs.toast.show('Senha incorreta!', 2000, () => {
    //     // something you want to do at close
    //   });
    // }
  };

  signup = async () => {};

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

          <Item picker>
            <Picker
              mode="dropdown"
              style={{ width: undefined, color: '#FFF' }}
              selectedValue={this.state.selected2}
            >
              <Picker.Item label="Wallet" value="key0" />
              <Picker.Item label="ATM Card" value="key1" />
              <Picker.Item label="Debit Card" value="key2" />
              <Picker.Item label="Credit Card" value="key3" />
              <Picker.Item label="Net Banking" value="key4" />
            </Picker>
          </Item>
          {/* <Picker
            selectedValue={this.state.language}
            style={{ height: 50, width: '100%', marginTop: 10, marginLeft: 10 }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ language: itemValue })
            }
            prompt="Teste"
            itemStyle={{ textAlign: 'center' }}
          >
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker> */}
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

        {/* <View style={{ width: 220, flexDirection: 'column' }}>
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
        </View> */}
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
  userLogoutAction: userLogout
};

export default connect(
  null,
  mapDispatchToProps
)(Auth);
