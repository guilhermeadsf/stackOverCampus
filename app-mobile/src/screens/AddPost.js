import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  ScrollView,
  Picker
} from 'react-native';
import { connect } from 'react-redux';
import { Item, Input, Label, Textarea } from 'native-base';
import Header from '../components/Header';
import axios from 'axios';
import Toast, { DURATION } from 'react-native-easy-toast';
import Loading from '../components/Loading';
import ImagePicker from 'react-native-image-picker';

class AddPhoto extends React.Component {
  state = {
    image: '',
    title: '',
    pickerTheme: '',
    description: '',
    loading: false,
    imageUrl: ''
  };

  pickImage = () => {
    ImagePicker.showImagePicker(
      {
        title: 'Escolha a imagem',
        maxHeight: 600,
        maxWidth: 800
      },
      res => {
        if (!res.didCancel) {
          this.setState({ image: { uri: res.uri, base64: res.data } });
        }
      }
    );
  };

  save = async validaForm => {
    if (validaForm) {
      this.setState({ loading: true });
      await this.postImageFireBase();
      await this.insertPost();
      this.setState({
        image: '',
        title: '',
        pickerTheme: '',
        description: '',
        loading: false,
        imageUrl: ''
      });
    } else {
      this.refs.toast.show(
        'Todos os dados devem estar preenchidos!',
        2000,
        () => {
          // something you want to do at close
        }
      );
    }
  };

  postImageFireBase = async () => {
    await axios({
      url: 'uploadImage',
      baseURL: 'https://us-central1-stackovercampus-8a3f6.cloudfunctions.net/',
      method: 'post',
      data: {
        image: this.state.image.base64
      }
    })
      .then(res => this.setState({ imageUrl: res.data.imageUrl }))
      .catch(err => console.log(err));
  };

  insertPost = async () => {
    axios
      .post('https://stackovercampus.herokuapp.com/createPost', {
        title: this.state.title,
        emailUser: this.props.email,
        description: this.state.description,
        imageUrl: this.state.imageUrl,
        theme: this.state.pickerTheme,
        username: this.props.username
      })
      .catch(err => {
        console.log(err);
        this.refs.toast.show('Erro interno!', 2000, () => {
          // something you want to do at close
        });
      })
      .then(r => {
        console.log(r.data);
        this.refs.toast.show('Inserido com sucesso!', 2000, () => {
          // something you want to do at close
        });
      });
  };

  render() {
    const validations = [];

    validations.push(this.state.title);
    validations.push(this.state.description);
    validations.push(this.state.pickerTheme && this.state.pickerTheme != 'df');
    validations.push(this.state.image);

    const validaForm = validations.reduce((all, v) => all && v);

    return (
      <View style={{ flex: 1, backgroundColor: '#ecf0f1' }}>
        <Header title="Criar Postagem" />
        <Loading status={this.state.loading} />
        <ScrollView>
          <View style={styles.container}>
            <Item stackedLabel style={{ width: '90%', marginVertical: 10 }}>
              <Label style={{ color: '#000' }}>Título da Postagem</Label>
              <Input
                onChangeText={value => this.setState({ title: value })}
                value={this.state.title}
              />
            </Item>
            <Textarea
              rowSpan={5}
              bordered
              placeholder="Digite uma descrição"
              placeholderTextColor="#000"
              style={{ width: '90%' }}
              onChangeText={value => this.setState({ description: value })}
              value={this.state.description}
            />
            <Picker
              selectedValue={this.state.pickerTheme}
              style={{
                height: 50,
                width: '90%',
                color: '#000',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
              }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ pickerTheme: itemValue })
              }
              mode="dropdown"
            >
              <Picker.Item label="Escolha o tema" value="df" />
              <Picker.Item label="Python" value="Python" />
              <Picker.Item label="Flutter" value="Flutter" />
            </Picker>
            <View style={styles.imageContainer}>
              <Image source={this.state.image} style={styles.image} />
            </View>
            <TouchableOpacity onPress={this.pickImage} style={styles.buttom}>
              <Text style={styles.buttomText}>Escolha a foto</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.save(validaForm)}
              disabled={this.props.loading}
              style={[
                styles.buttom,
                { marginTop: 20 },
                this.props.loading ? styles.buttonDisabled : null
              ]}
            >
              <Text style={styles.buttomText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Toast ref="toast" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    marginTop: Platform.OS === 'ios' ? 30 : 10,
    fontWeight: 'bold'
  },
  imageContainer: {
    width: '90%',
    height: Dimensions.get('window').width / 2,
    backgroundColor: '#FFF',
    marginTop: 10
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'center'
  },
  buttom: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#34495e',
    borderRadius: 10
  },
  buttomText: {
    fontSize: 15,
    color: '#FFF'
  },
  input: {
    marginTop: 20,
    width: '90%'
  },
  buttonDisabled: {
    backgroundColor: '#AAA'
  }
});

const mapStateToProps = state => ({
  email: state.UserDataReducer.email,
  username: state.UserDataReducer.username
});

export default connect(
  mapStateToProps,
  null
)(AddPhoto);
