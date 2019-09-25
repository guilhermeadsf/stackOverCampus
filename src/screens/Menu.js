import React from 'react';
import { Text, View, FlatList } from 'react-native';
import Theme from '../components/theme';
import Header from '../components/Header';
import { connect } from 'react-redux';
import { userLogout } from '../redux/actions/userDataActions';

const dados = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Python'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'React Native'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'React JS'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Vue JS'
  },
  {
    id: '5',
    title: 'Java'
  },
  {
    id: '58729d72',
    title: 'Angular'
  },
  {
    id: '545571e29d72',
    title: 'Spring Boot'
  },
  {
    id: '529d72',
    title: 'C'
  },
  {
    id: '586972',
    title: 'C++'
  },
  {
    id: '5bd96-145571e29d72',
    title: 'Flutter'
  },
  {
    id: '596-145571e29d72',
    title: 'GraphQL'
  }
];

class App extends React.Component {
  async componentDidMount() {
    const { userLogoutAction } = this.props;
    await userLogoutAction(true);
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#ecf0f1' }}>
        <Header />
        <View style={{ flex: 9, marginTop: 20 }}>
          <FlatList
            data={dados} // Vai vim da API!
            renderItem={({ item }) => <Theme themeName={item.title} />}
            keyExtractor={item => item.id}
            numColumns={2}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userState: state.UserDataReducer.userState
});

const mapDispatchToProps = {
  userLogoutAction: userLogout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
