import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import { withNavigation } from 'react-navigation';
import commonStyles from '../../commonStyles.js';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import uuidv4 from 'uuid/v4';
import { Container, Content, Card, CardItem, Body } from 'native-base';
import CardHeaderFooterExample from '../components/CardPost';
import Loading from '../components/Loading';
import { connect } from 'react-redux';

class ListOfPosts extends Component {
  state = {
    loading: false,
    posts: []
  };

  componentDidMount = async () => {
    this.setState({ loading: true });
    await axios
      .get(
        `https://stackovercampus.herokuapp.com/getPosts/${this.props.navigation.getParam(
          'id'
        )}`
      )
      .then(res => this.setState({ posts: res.data }))
      .catch(e => console.log(e));
    console.log(this.state.posts);
    this.setState({ loading: false });
  };

  render() {
    const name = this.props.navigation.getParam('id');
    return (
      <View style={{ flex: 1, backgroundColor: commonStyles.backgroundColor }}>
        <Header typeHeader={1} title="Tópicos" />
        <Loading status={this.state.loading} />
        <ScrollView style={{ flex: 9 }}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#1abc9c', '#2980b9']}
            style={{
              width: '80%',
              borderRadius: 10,
              alignSelf: 'center',
              marginTop: 10,
              paddingVertical: 10,
              marginBottom: 10
            }}
          >
            <View
              style={{
                justifyContent: 'center'
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: commonStyles.fontFamily,
                  color: '#FFF',
                  textAlign: 'center'
                }}
              >
                {name}
              </Text>
            </View>
          </LinearGradient>

          {this.state.posts.map(post => {
            return (
              <TouchableOpacity
                style={{
                  marginHorizontal: 10,
                  borderRadius: 5
                }}
                key={uuidv4()}
                onPress={() =>
                  this.props.navigation.navigate('PostFull', { obj: post })
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
                      {post.title}
                    </Text>
                  </CardItem>
                  <CardItem bordered>
                    <Body>
                      <Text
                        style={{ alignSelf: 'center', fontFamily: 'Roboto' }}
                      >
                        {post.description}
                      </Text>
                    </Body>
                  </CardItem>
                  <CardItem footer bordered style={{ alignSelf: 'flex-end' }}>
                    <Text style={{ fontWeight: 'bold', fontFamily: 'Roboto' }}>
                      {post.username}
                    </Text>
                  </CardItem>
                </Card>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userState: state.UserDataReducer.userState
});

export default withNavigation(
  connect(
    mapStateToProps,
    null
  )(ListOfPosts)
);
