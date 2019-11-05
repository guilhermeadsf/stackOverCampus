import React, { Component } from 'react';
import Header from '../components/Header';
import { Image, View, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Loading from '../components/Loading';
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Textarea,
  Form
} from 'native-base';

export default class PostFull extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: '',
      textAreaComment: '',
      loading: false
    };
  }

  componentDidMount = () => {
    this.setState({ post: this.props.navigation.getParam('obj') });
  };

  addComment = async () => {
    this.setState({ loading: true });
    await axios
      .post('https://stackovercampus.herokuapp.com/addComment', {
        _id: this.state.post._id,
        comment: {
          username: this.state.post.username,
          comment: this.state.textAreaComment
        }
      })
      .then(res => {
        this.setState({ post: res.data, textAreaComment: '' });
      })
      .catch(err => console.log(err));
    this.setState({ loading: false });
  };

  render() {
    const { post } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Header title="Postagem" />
        <Loading status={this.state.loading} />
        <Container style={{ flex: 1, marginTop: 10, marginHorizontal: 10 }}>
          <Content padder>
            <Card style={{ flex: 0 }}>
              <CardItem header bordered style={{ alignSelf: 'center' }}>
                <Text style={{ fontSize: 20, fontFamily: 'Roboto' }}>
                  {post.title}
                </Text>
              </CardItem>
              <CardItem>
                <Body style={{ alignItems: 'center' }}>
                  <Image
                    source={{ uri: post.imageUrl }}
                    style={{
                      height: 400,
                      width: '90%',
                      flex: 1,
                      resizeMode: 'contain'
                    }}
                  />
                  <Text style={{ marginTop: 10 }}>{post.description}</Text>
                </Body>
              </CardItem>
              {post.comments && post.comments.length > 0 ? (
                post.comments.map(comment => {
                  return (
                    <CardItem footer bordered>
                      <Text>{comment.username}: </Text>
                      <Body>
                        <Text>{comment.comment}</Text>
                      </Body>
                    </CardItem>
                  );
                })
              ) : (
                <CardItem footer bordered>
                  <Text>Postagem sem comentários</Text>
                </CardItem>
              )}
            </Card>

            <Card>
              <CardItem header bordered style={{ alignSelf: 'center' }}>
                <Text style={{ fontSize: 15, fontFamily: 'Roboto' }}>
                  Adicionar Comentário
                </Text>
              </CardItem>
              <CardItem>
                <Content padder>
                  <Form>
                    <Textarea
                      rowSpan={5}
                      bordered
                      onChangeText={text =>
                        this.setState({ textAreaComment: text })
                      }
                      value={this.state.textAreaComment}
                    />
                  </Form>
                  <TouchableOpacity
                    style={{
                      width: '100%',
                      height: 50,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#000',
                      marginTop: 10
                    }}
                    onPress={this.addComment}
                  >
                    <Text
                      style={{
                        color: '#FFF',
                        fontFamily: 'Roboto',
                        fontSize: 15
                      }}
                    >
                      Comentar
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
