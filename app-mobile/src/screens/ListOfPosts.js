import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import Header from '../components/Header';
import posts from '../mock';
import commonStyles from '../../commonStyles.js';
import CardHeaderFooterExample from '../components/CardPost';
import { connect } from 'react-redux';

class ListOfPosts extends Component {
  render() {
    const name = this.props.navigation.getParam('id');
    return (
      <View style={{ flex: 1, backgroundColor: commonStyles.backgroundColor }}>
        <Header typeHeader={1} />
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
              {name + this.props.userState}
            </Text>
          </View>

          {posts.mock.map(e => {
            if (e.theme == name) {
              return (
                <CardHeaderFooterExample
                  postname={e.description}
                  username={e.user}
                />
              );
            }
          })}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userState: state.UserDataReducer.userState
});

export default connect(
  mapStateToProps,
  null
)(ListOfPosts);
