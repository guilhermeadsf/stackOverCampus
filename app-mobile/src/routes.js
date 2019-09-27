import React from 'react';
import { Image } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import addPost from '../assets/imgs/data-collection.png';
import Auth from './screens/Auth';
import ListOfPosts from './screens/ListOfPosts';
import home from '../assets/imgs/home.png';
import user from '../assets/imgs/user.png';
import books from '../assets/imgs/stackBooks.png';
import Menu from './screens/Menu';

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
      screen: Menu,
      navigationOptions: {
        tabBarIcon: () => (
          <Image source={addPost} style={{ width: 20, height: 20 }} />
        ),
        tabBarVisible: false
      }
    },
    Trabalhos: {
      screen: Menu,
      navigationOptions: {
        tabBarIcon: () => (
          <Image source={books} style={{ width: 20, height: 20 }} />
        ),
        title: 'Academico'
      }
    },
    Perfil: {
      screen: Menu,
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
    Auth: {
      screen: Auth
    },
    Home: {
      screen: bottomNavigator
    }
  },
  {
    initialRouteName: 'Auth'
  }
);

const AppContainer = createAppContainer(switchNavigator);

export default AppContainer;
