import React, { Component } from 'react';
import Header from '../components/Header';
import { Image, View, TouchableOpacity, Linking } from 'react-native';
import uuidv4 from 'uuid/v4';
import Loading from '../components/Loading';
import { Container, Content, Card, CardItem, Text } from 'native-base';

export default class WorkFull extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      document: [],
      documentUrl: ''
    };
  }

  componentDidMount = () => {
    this.setState({
      loading: true,
      document: this.props.navigation.getParam('obj'),
      documentUrl: this.props.navigation.getParam('obj').academicWorkUrl
    });

    this.setState({
      loading: false
    });
  };

  loadInBrowser = () => {
    Linking.openURL(this.state.documentUrl).catch(err =>
      console.error("Couldn't load page", err)
    );
  };

  render() {
    const { document } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Header title="Postagem" />
        <Loading status={this.state.loading} />
        <Container
          style={{
            flex: 1,
            marginTop: 10,
            marginHorizontal: 10
          }}
        >
          <Content padder>
            <Card style={{ flex: 0 }}>
              <CardItem header bordered style={{ alignSelf: 'center' }}>
                <Text style={{ fontSize: 20, fontFamily: 'Roboto' }}>
                  {document.titulo}
                </Text>
              </CardItem>
              <CardItem header bordered style={{ alignSelf: 'center' }}>
                <Text style={{ fontSize: 20, fontFamily: 'Roboto' }}>
                  {document.descricao}
                </Text>
              </CardItem>
              <CardItem footer bordered style={{ alignSelf: 'flex-end' }}>
                <Text style={{ fontWeight: 'bold', fontFamily: 'Roboto' }}>
                  {document.orientando}
                </Text>
              </CardItem>
              <CardItem footer bordered style={{ alignSelf: 'flex-end' }}>
                <Text style={{ fontWeight: 'bold', fontFamily: 'Roboto' }}>
                  {document.orientador}
                </Text>
              </CardItem>
            </Card>

            <Card>
              <CardItem>
                <Content padder>
                  <TouchableOpacity
                    style={{
                      width: '100%',
                      height: 50,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#000',
                      marginTop: 10
                    }}
                    onPress={this.loadInBrowser}
                  >
                    <Text
                      style={{
                        color: '#FFF',
                        fontFamily: 'Roboto',
                        fontSize: 15
                      }}
                    >
                      Baixar Trabalho
                    </Text>
                  </TouchableOpacity>
                </Content>
              </CardItem>
            </Card>
          </Content>
        </Container>
      </View>
    );
  }
}
