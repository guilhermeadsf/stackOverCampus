import React, { Component } from 'react';
import Header from '../components/Header';
import {
  Image,
  View,
  TouchableOpacity,
  Linking,
  StyleSheet
} from 'react-native';
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
        <Header title='Postagem' typeHeader={1} />
        <Loading status={this.state.loading} />
        <Container style={styles.containerStyle}>
          <Content padder>
            <Card style={{ flex: 0 }}>
              <CardItem header bordered style={{ alignSelf: 'center' }}>
                <Text style={styles.textTitleAndSubtitleStyle}>
                  {document.titulo}
                </Text>
              </CardItem>
              <CardItem header bordered style={{ alignSelf: 'center' }}>
                <Text style={styles.textTitleAndSubtitleStyle}>
                  {document.descricao}
                </Text>
              </CardItem>
              <CardItem footer bordered style={{ alignSelf: 'flex-end' }}>
                <Text style={styles.textNameStyle}>{document.orientando}</Text>
              </CardItem>
              <CardItem footer bordered style={{ alignSelf: 'flex-end' }}>
                <Text style={styles.textNameStyle}>{document.orientador}</Text>
              </CardItem>
            </Card>

            <Card>
              <CardItem>
                <Content padder>
                  <TouchableOpacity
                    style={styles.touchableDownloadWork}
                    onPress={this.loadInBrowser}
                  >
                    <Text style={styles.textDownloadWork}>Baixar Trabalho</Text>
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

const styles = StyleSheet.create({
  textDownloadWork: {
    color: '#FFF',
    fontFamily: 'Roboto',
    fontSize: 15
  },
  touchableDownloadWork: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    marginTop: 10
  },
  textNameStyle: { fontWeight: 'bold', fontFamily: 'Roboto' },
  textTitleAndSubtitleStyle: { fontSize: 20, fontFamily: 'Roboto' },
  containerStyle: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 10
  }
});
