import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  RefreshControl
} from 'react-native';
import Header from '../components/Header';
import { withNavigation } from 'react-navigation';
import commonStyles from '../../commonStyles.js';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import uuidv4 from 'uuid/v4';
import { Card, CardItem, Body } from 'native-base';
import Loading from '../components/Loading';
import { connect } from 'react-redux';

class ListOfPosts extends Component {
  state = {
    loading: false,
    posts: [],
    refreshing: false
  };

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.requestPosts().then(() => {
      this.setState({ refreshing: false });
    });
  };

  componentDidMount = async () => {
    this.setState({ loading: true });
    this.requestPosts();
    this.setState({ loading: false });
  };

  requestPosts = async () => {
    await axios
      .get(
        `https://stackovercampus.herokuapp.com/getPosts/${this.props.navigation.getParam(
          'id'
        )}`
      )
      .then(res => this.setState({ posts: res.data }))
      .catch(e => console.log(e));
  };

  render() {
    const name = this.props.navigation.getParam('id');
    return (
      <View style={{ flex: 1, backgroundColor: commonStyles.backgroundColor }}>
        <Header typeHeader={1} title='Tópicos' />
        <Loading status={this.state.loading} />
        <ScrollView
          style={{ flex: 9 }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#1abc9c', '#2980b9']}
            style={styles.linearStyle}
          >
            <View
              style={{
                justifyContent: 'center'
              }}
            >
              <Text style={styles.textTitleStyle}>{name}</Text>
            </View>
          </LinearGradient>

          {this.state.posts.map(post => {
            return (
              <TouchableOpacity
                style={styles.touchableCardStyle}
                key={uuidv4()}
                onPress={() =>
                  this.props.navigation.navigate('PostFull', { obj: post })
                }
              >
                <Card>
                  <CardItem header bordered style={{ alignSelf: 'center' }}>
                    <Text style={styles.titleCardStyle}>{post.title}</Text>
                  </CardItem>
                  <CardItem bordered>
                    <Body>
                      <Text style={styles.descriptionCardStyle}>
                        {post.description}
                      </Text>
                    </Body>
                  </CardItem>
                  <CardItem footer bordered style={{ alignSelf: 'flex-end' }}>
                    <Text style={styles.textUsernameStyle}>
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

const styles = StyleSheet.create({
  linearStyle: {
    width: '80%',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 10,
    paddingVertical: 10,
    marginBottom: 10
  },
  textTitleStyle: {
    fontSize: 16,
    fontFamily: commonStyles.fontFamily,
    color: '#FFF',
    textAlign: 'center'
  },
  touchableCardStyle: {
    marginHorizontal: 10,
    borderRadius: 5
  },
  titleCardStyle: {
    fontSize: 15,
    fontFamily: 'Roboto',
    color: '#000',
    fontWeight: 'bold'
  },
  descriptionCardStyle: { alignSelf: 'center', fontFamily: 'Roboto' },
  textUsernameStyle: { fontWeight: 'bold', fontFamily: 'Roboto' }
});

const mapStateToProps = state => ({
  userState: state.UserDataReducer.userState
});

export default withNavigation(connect(mapStateToProps, null)(ListOfPosts));
