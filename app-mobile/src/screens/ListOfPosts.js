import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import Header from '../components/Header';
import { withNavigation } from 'react-navigation';
import commonStyles from '../../commonStyles.js';
import axios from 'axios';
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
          <View
            style={{
              width: '80%',
              height: 60,
              alignSelf: 'center',
              backgroundColor: '#000',
              borderRadius: 10,
              marginTop: 10,
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

          {this.state.posts.map(post => {
            return (
              <CardHeaderFooterExample
                postname={post.title}
                description={post.description}
                key={post._id}
                obj={post}
              />
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
