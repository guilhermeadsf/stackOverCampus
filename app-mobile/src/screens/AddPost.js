import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  Platform,
  ScrollView,
  Picker
} from 'react-native';
import { connect } from 'react-redux';
import { addPost } from '../redux/actions/posts';
import { Item, Input, Label, Textarea } from 'native-base';
import Header from '../components/Header';
import ImagePicker from 'react-native-image-picker';

class AddPhoto extends React.Component {
  state = {
    image: null,
    title: '',
    theme: '',
    description: ''
  };

  componentDidUpdate = prevProps => {
    if (prevProps.loading && !this.props.loading) {
      this.setState({
        image: null,
        comment: ''
      });
      this.props.navigation.navigate('Menu');
    }
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

  save = async () => {
    this.props.onAddPost({
      title: this.state.title,
      emailUser: 'guilherme.adsf@hotmail.com',
      description: this.state.description,
      image: this.state.image,
      theme: this.state.theme
    });
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#ecf0f1' }}>
        <Header title="Criar Postagem" />
        <ScrollView>
          <View style={styles.container}>
            <Item stackedLabel style={{ width: '90%', marginVertical: 10 }}>
              <Label style={{ color: '#000' }}>Título da Postagem</Label>
              <Input onChangeText={value => this.setState({ title: value })} />
            </Item>
            <Textarea
              rowSpan={5}
              bordered
              placeholder="Digite uma descrição"
              placeholderTextColor="#000"
              style={{ width: '90%' }}
              onChangeText={value => this.setState({ description: value })}
            />
            <Picker
              selectedValue={this.state.theme}
              style={{
                height: 50,
                width: '90%',
                color: '#000',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
              }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ theme: itemValue })
              }
              mode="dropdown"
            >
              <Picker.Item label="Escolha o tema" value="default" />
              <Picker.Item label="Sistemas de Informação" value="S.I" />
              <Picker.Item label="Licenciatura em Química" value="quim" />
              <Picker.Item
                label="Ciência e Tecnologia de Alimentos"
                value="tecalim"
              />
            </Picker>
            <View style={styles.imageContainer}>
              <Image source={this.state.image} style={styles.image} />
            </View>
            <TouchableOpacity onPress={this.pickImage} style={styles.buttom}>
              <Text style={styles.buttomText}>Escolha a foto</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.save}
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

const mapDispatchToProps = dispatch => {
  return {
    onAddPost: post => dispatch(addPost(post))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AddPhoto);
