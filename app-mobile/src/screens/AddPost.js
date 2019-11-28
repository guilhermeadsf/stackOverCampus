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
import Toast from 'react-native-easy-toast';
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
      if (this.state.image.base64 != '') await this.postImageFireBase();
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
        () => {}
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
      .catch(err => {
        this.setState({ loading: false });
        console.log(err);
      });
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
        this.refs.toast.show('Erro interno!', 2000, () => {});
        this.setState({ loading: false });
      })
      .then(r => {
        console.log(r.data);
        this.refs.toast.show('Inserido com sucesso!', 2000, () => {});
      });
  };

  render() {
    const validations = [];

    validations.push(this.state.title);
    validations.push(this.state.description);
    validations.push(this.state.pickerTheme && this.state.pickerTheme != 'df');

    const validaForm = validations.reduce((all, v) => all && v);

    return (
      <View style={{ flex: 1, backgroundColor: '#ecf0f1' }}>
        <Header typeHeader={1} title='Criar Postagem' />
        <Loading status={this.state.loading} />
        <ScrollView>
          <View style={styles.container}>
            <Item stackedLabel style={styles.itemInputTitle}>
              <Label style={{ color: '#000' }}>Título da Postagem</Label>
              <Input
                onChangeText={value => this.setState({ title: value })}
                value={this.state.title}
              />
            </Item>
            <Textarea
              rowSpan={5}
              bordered
              placeholder='Digite uma descrição'
              placeholderTextColor='#000'
              style={{ width: '90%' }}
              onChangeText={value => this.setState({ description: value })}
              value={this.state.description}
            />
            <Picker
              selectedValue={this.state.pickerTheme}
              style={styles.pickerStyle}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ pickerTheme: itemValue })
              }
              mode='dropdown'
            >
              <Picker.Item label='Escolha o tema' value='df' />
              <Picker.Item label='Python' value='Python' />
              <Picker.Item label='Flutter' value='Flutter' />
              <Picker.Item label='GraphQL' value='GraphQL' />
              <Picker.Item label='VueJS' value='VueJS' />
              <Picker.Item label='JavaScript' value='JavaScript' />
              <Picker.Item label='Java' value='Java' />
              <Picker.Item label='MongoDB' value='MongoDB' />
              <Picker.Item label='Outros' value='Outros' />
            </Picker>
            <View style={styles.imageContainer}>
              <Image source={this.state.image} style={styles.image} />
            </View>
            <TouchableOpacity onPress={this.pickImage} style={styles.buttom}>
              <Text style={styles.buttomText}>Escolha a foto</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchableSaveStyle}
              onPress={() => this.save(validaForm)}
            >
              <Text style={styles.textSaveStyle}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Toast ref='toast' />
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
    padding: 20,
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
  },
  textSaveStyle: { fontSize: 15, fontFamily: 'Roboto', color: '#FFF' },
  touchableSaveStyle: {
    width: '70%',
    backgroundColor: '#34495e',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10
  },
  pickerStyle: {
    height: 50,
    width: '90%',
    color: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  itemInputTitle: { width: '90%', marginVertical: 10 }
});

const mapStateToProps = state => ({
  email: state.UserDataReducer.email,
  username: state.UserDataReducer.username
});

export default connect(mapStateToProps, null)(AddPhoto);
