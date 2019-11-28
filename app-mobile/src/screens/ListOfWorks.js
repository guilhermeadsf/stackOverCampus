import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  RefreshControl
} from 'react-native';
import Header from '../components/Header';
import axios from 'axios';
import uuidv4 from 'uuid';
import { Card, CardItem, Body } from 'native-base';
import Loading from '../components/Loading';
import MenuOptions from '../components/MenuOptions';

export default class ListOfWorks extends Component {
  state = {
    documents: [],
    loading: false,
    refreshing: false
  };

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.requestWorks().then(() => {
      this.setState({ refreshing: false });
    });
  };

  componentDidMount = async () => {
    this.setState({ loading: true });
    this.requestWorks();
    this.setState({ loading: false });
  };

  requestWorks = async () => {
    await axios
      .get('https://stackovercampus.herokuapp.com/getAcademicsWork')
      .then(res => this.setState({ documents: res.data }));
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header title='Home' />
        <View style={{ marginTop: 20 }}>
          <MenuOptions temaStatus={1} trabalhoStatus={0} />
          <Loading status={this.state.loading} />

          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
          >
            {this.state.documents.map(work => {
              return (
                <TouchableOpacity
                  style={styles.touchableCardStyle}
                  key={uuidv4()}
                  onPress={() =>
                    this.props.navigation.navigate('WorkFull', { obj: work })
                  }
                >
                  <Card>
                    <CardItem header bordered style={{ alignSelf: 'center' }}>
                      <Text style={styles.textTitleStyle}>{work.titulo}</Text>
                    </CardItem>
                    <CardItem bordered>
                      <Body>
                        <Text style={styles.textDescriptionStyle}>
                          {work.descricao}
                        </Text>
                      </Body>
                    </CardItem>
                    <CardItem footer bordered style={{ alignSelf: 'flex-end' }}>
                      <Text style={styles.textStyleNames}>
                        {work.orientando}
                      </Text>
                    </CardItem>
                    <CardItem footer bordered style={{ alignSelf: 'flex-end' }}>
                      <Text style={styles.textStyleNames}>
                        {work.orientador}
                      </Text>
                    </CardItem>
                  </Card>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textStyleNames: { fontWeight: 'bold', fontFamily: 'Roboto' },
  textTitleStyle: {
    fontSize: 15,
    fontFamily: 'Roboto',
    color: '#000',
    fontWeight: 'bold'
  },
  textDescriptionStyle: { alignSelf: 'center', fontFamily: 'Roboto' },
  touchableCardStyle: {
    marginHorizontal: 10,
    borderRadius: 5
  }
});
