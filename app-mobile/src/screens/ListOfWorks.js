import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import axios from 'axios';
import uuidv4 from 'uuid';
import { Card, CardItem, Body } from 'native-base';
import Loading from '../components/Loading';
import MenuOptions from '../components/MenuOptions';

export default class ListOfWorks extends Component {
  state = {
    documents: [],
    loading: false
  };

  componentDidMount = async () => {
    this.setState({ loading: true });
    await axios
      .get('https://stackovercampus.herokuapp.com/getAcademicsWork')
      .then(res => this.setState({ documents: res.data }));
    this.setState({ loading: false });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header title="Home" />
        <View style={{ marginTop: 20 }}>
          <MenuOptions temaStatus={1} trabalhoStatus={0} />
          {console.log(this.state.documents)}
          <Loading status={this.state.loading} />
          {this.state.documents.map(work => {
            return (
              <TouchableOpacity
                style={{
                  marginHorizontal: 10,
                  borderRadius: 5
                }}
                key={uuidv4()}
                onPress={() =>
                  this.props.navigation.navigate('WorkFull', { obj: work })
                }
              >
                <Card>
                  <CardItem header bordered style={{ alignSelf: 'center' }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: 'Roboto',
                        color: '#000',
                        fontWeight: 'bold'
                      }}
                    >
                      {work.titulo}
                    </Text>
                  </CardItem>
                  <CardItem bordered>
                    <Body>
                      <Text
                        style={{ alignSelf: 'center', fontFamily: 'Roboto' }}
                      >
                        {work.descricao}
                      </Text>
                    </Body>
                  </CardItem>
                  <CardItem footer bordered style={{ alignSelf: 'flex-end' }}>
                    <Text style={{ fontWeight: 'bold', fontFamily: 'Roboto' }}>
                      {work.orientando}
                    </Text>
                  </CardItem>
                  <CardItem footer bordered style={{ alignSelf: 'flex-end' }}>
                    <Text style={{ fontWeight: 'bold', fontFamily: 'Roboto' }}>
                      {work.orientador}
                    </Text>
                  </CardItem>
                </Card>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }
}
