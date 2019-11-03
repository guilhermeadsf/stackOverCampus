import React from 'react';
import { Image } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import addPost from '../assets/imgs/data-collection.png';
import Auth from './screens/Auth';
import ListOfPosts from './screens/ListOfPosts';
import AddPhoto from './screens/AddPost';
import home from '../assets/imgs/home.png';
import user from '../assets/imgs/user.png';
import books from '../assets/imgs/stackBooks.png';
import Menu from './screens/Menu';
import Loading from './screens/Loading';
import Profile from './screens/Profile';
import AddDocuments from './screens/AddDocuments';

const stackNavigator = createStackNavigator(
  {
    Home: {
      screen: Menu
    },
    ListOfPosts: {
      screen: ListOfPosts
    }
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none'
  }
);

const bottomNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: stackNavigator,
      navigationOptions: {
        tabBarIcon: () => (
          <Image source={home} style={{ width: 20, height: 20 }} />
        )
      }
    },
    Adicionar: {
      screen: AddPhoto,
      navigationOptions: {
        tabBarIcon: () => (
          <Image source={addPost} style={{ width: 20, height: 20 }} />
        )
      }
    },
    Trabalhos: {
      screen: AddDocuments,
      navigationOptions: {
        tabBarIcon: () => (
          <Image source={books} style={{ width: 20, height: 20 }} />
        ),
        title: 'Academico'
      }
    },
    Perfil: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: () => (
          <Image source={user} style={{ width: 20, height: 20 }} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: '#ecf0f1',
      inactiveTintColor: '#000',
      labelStyle: {
        fontSize: 12,
        textAlignVertical: 'center',
        fontFamily: 'Roboto',
        marginBottom: 5
      },
      style: {
        backgroundColor: '#1abc9c'
      }
    }
  }
);

const switchNavigator = createSwitchNavigator(
  {
    Loading: {
      screen: Loading
    },
    Auth: {
      screen: Auth
    },
    Home: {
      screen: bottomNavigator
    }
  },
  {
    initialRouteName: 'Loading'
  }
);

const AppContainer = createAppContainer(switchNavigator);

export default AppContainer;
