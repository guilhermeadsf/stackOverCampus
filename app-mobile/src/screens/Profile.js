import React, { Component } from 'react';
import Header from '../components/Header';
import commonStyles from '../../commonStyles.js';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    StatusBar,
    Image
} from 'react-native'

export default class screens extends Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: commonStyles.backgroundColor }}>
                <Header typeHeader={1} title='Perfil' />
                <View style={styles.cardsProfile}>
                    <View style={styles.viewLogoName}>
                        <Text style={styles.avatarName}>
                            L
                        </Text>
                    </View>
                    <Text style={styles.namePersona}>
                        Lucas Vieira Urquiza
                    </Text>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    avatarName: {
        fontFamily: 'Roboto',
        fontSize: 100,
        textAlign: "center",
        color: '#ecf0f1'
    },

    viewLogoName: {
        backgroundColor: '#34495e',
        width: 120,
        height: 120,
        borderRadius: 100,
        marginTop: 30,
        alignSelf: "center"
    },

    namePersona: {
        textAlign: "center",
        fontFamily: "Roboto",
        color: '#34495e',
        fontSize: 30,
        paddingVertical: 10
    },
    
    cardsProfile:{
        backgroundColor: '#FFF',
        margin: 20,
        borderRadius: 10
    }
});
