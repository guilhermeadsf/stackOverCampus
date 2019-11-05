import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Picker } from 'react-native';
import Header from '../components/Header';
import { Item, Input, Label, Textarea } from 'native-base';
import DocumentPicker from 'react-native-document-picker';
var RNFS = require('react-native-fs');
import axios from 'axios';
import Toast, { DURATION } from 'react-native-easy-toast';
import Loading from '../components/Loading';

initialState = {
  title: '',
  orientando: '',
  orientador: '',
  description: '',
  filename: '',
  documentBase64: '',
  type: 'default',
  loading: false,
  documentUrl: ''
};

export default class AddDocuments extends Component {
  state = {
    ...initialState
  };

  pickDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
        readContent: true
      });

      this.setState({ loading: true });
      await RNFS.readFile(res.uri, 'base64').then(result => {
        console.log('Base64: ' + result);
        this.setState({ documentBase64: result });
      });
      this.setState({ loading: false });

      this.setState({ filename: res.name });
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size,
        res.content
      );
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  save = async validaForm => {
    if (validaForm) {
      this.setState({ loading: true });
      await this.postPdfFireBase();
      await this.insertDocument();
      this.setState({ loading: false });
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

  postPdfFireBase = async () => {
    await axios({
      url: 'uploadPdf',
      baseURL: 'https://us-central1-stackovercampus-8a3f6.cloudfunctions.net/',
      method: 'post',
      data: {
        document: this.state.documentBase64
      }
    })
      .then(res => this.setState({ documentUrl: res.data.documentUrl }))
      .catch(err => console.log(err));
  };

  insertDocument = async () => {
    await axios
      .post('https://stackovercampus.herokuapp.com/createAcademicWork', {
        tipo: this.state.type,
        titulo: this.state.title,
        orientando: this.state.orientando,
        orientador: this.state.orientador,
        descricao: this.state.description,
        academicWorkUrl: this.state.documentUrl
      })
      .catch(err => {
        this.refs.toast.show('Erro interno!', 2000, () => {
          // something you want to do at close
        });
      })
      .then(r => {
        console.log(r.data);
        this.refs.toast.show('Inserido com sucesso!', 2000, () => {
          // something you want to do at close
        });
        this.setState({
          ...initialState
        });
      });
  };

  render() {
    const validations = [];

    validations.push(this.state.title);
    validations.push(this.state.orientando);
    validations.push(this.state.orientador);
    validations.push(this.state.description);
    validations.push(this.state.documentBase64);

    const validaForm = validations.reduce((all, v) => all && v);

    return (
      <View style={{ flex: 1 }}>
        <Header title="Adicionar Trabalho" />
        <Loading status={this.state.loading} />
        <ScrollView>
          <View
            style={{
              flex: 1,
              alignItems: 'center'
            }}
          >
            <Picker
              selectedValue={this.state.type}
              style={{
                height: 50,
                width: '95%',
                color: '#000',
                marginVertical: 10
              }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ type: itemValue })
              }
              mode="dropdown"
            >
              <Picker.Item label="Tipo de trabalho" value="default" />
              <Picker.Item label="Trabalho de Conclusão de Curso" value="TCC" />
              <Picker.Item label="Artigo" value="Artigo" />
            </Picker>
            <Item stackedLabel style={{ width: '90%', marginVertical: 10 }}>
              <Label style={{ color: '#000' }}>Título do Trabalho</Label>
              <Input
                onChangeText={value => this.setState({ title: value })}
                value={this.state.title}
              />
            </Item>
            <Item stackedLabel style={{ width: '90%', marginVertical: 10 }}>
              <Label style={{ color: '#000' }}>Orientando</Label>
              <Input
                onChangeText={value => this.setState({ orientando: value })}
                value={this.state.orientando}
              />
            </Item>
            <Item stackedLabel style={{ width: '90%', marginVertical: 10 }}>
              <Label style={{ color: '#000' }}>Orientador</Label>
              <Input
                onChangeText={value => this.setState({ orientador: value })}
                value={this.state.orientador}
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
            <View style={{ flexDirection: 'row', width: '90%' }}>
              <Item rounded style={{ flex: 3, marginTop: 10, marginRight: 3 }}>
                <Input
                  placeholder="  Nome do arquivo"
                  value={this.state.filename}
                />
              </Item>
              <TouchableOpacity
                onPress={this.pickDocument}
                style={{
                  flex: 1,
                  marginTop: 10,
                  padding: 10,
                  backgroundColor: '#34495e',
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: '#FFF'
                  }}
                >
                  Upload
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                width: '70%',
                backgroundColor: '#34495e',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 15,
                marginVertical: 10,
                borderRadius: 10
              }}
              onPress={() => this.save(validaForm)}
            >
              <Text
                style={{ fontSize: 15, fontFamily: 'Roboto', color: '#FFF' }}
              >
                Salvar
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Toast ref="toast" />
      </View>
    );
  }
}
