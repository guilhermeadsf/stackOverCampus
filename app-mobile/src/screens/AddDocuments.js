import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import { Item, Input, Label, Textarea } from 'native-base';
import DocumentPicker from 'react-native-document-picker';
var RNFS = require('react-native-fs');
import axios from 'axios';

export default class AddDocuments extends Component {
  state = {
    title: '',
    orientando: '',
    orientador: '',
    description: '',
    filename: ''
  };

  pickDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
        readContent: true
      });

      RNFS.readFile(res.uri, 'base64').then(result => {
        console.log('Base64: ' + result);
        axios({
          url: 'uploadPdf',
          baseURL:
            'https://us-central1-stackovercampus-8a3f6.cloudfunctions.net/',
          method: 'post',
          data: {
            document: result
          }
        }).catch(err => console.log(err));
      });

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

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header title="Adicionar Trabalho" />
        <ScrollView>
          <View
            style={{
              flex: 1,
              alignItems: 'center'
            }}
          >
            <Item stackedLabel style={{ width: '90%', marginVertical: 10 }}>
              <Label style={{ color: '#000' }}>Título do Trabalho</Label>
              <Input onChangeText={value => this.setState({ title: value })} />
            </Item>
            <Item stackedLabel style={{ width: '90%', marginVertical: 10 }}>
              <Label style={{ color: '#000' }}>Orientando</Label>
              <Input
                onChangeText={value => this.setState({ orientando: value })}
              />
            </Item>
            <Item stackedLabel style={{ width: '90%', marginVertical: 10 }}>
              <Label style={{ color: '#000' }}>Orientador</Label>
              <Input
                onChangeText={value => this.setState({ orientador: value })}
              />
            </Item>
            <Textarea
              rowSpan={5}
              bordered
              placeholder="Digite uma descrição"
              placeholderTextColor="#000"
              style={{ width: '90%' }}
              onChangeText={value => this.setState({ description: value })}
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
          </View>
        </ScrollView>
      </View>
    );
  }
}
