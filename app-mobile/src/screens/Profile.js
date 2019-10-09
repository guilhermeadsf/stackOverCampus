import React, { Component } from 'react';
import H from '../components/Header';
import commonStyles from '../../commonStyles.js';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    StatusBar,
    Image,
    ScrollView
} from 'react-native';

import { ListItem, Separator, Button } from 'native-base';

export default class screens extends Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: commonStyles.backgroundColor }}>
                <H typeHeader={1} title='Perfil' />
                <ScrollView>
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

                    <View style={styles.cardsProfile}>
                        <Separator bordered style={styles.separatorHeaderStyle}>
                            <Text style={styles.separatorItemStyle}>Nome</Text>
                        </Separator>
                        <ListItem style={styles.separatorListItemStyle}>
                            <Text style={styles.textSeparatorStyle}>Lucas Vieira Urquiza</Text>
                        </ListItem>
                        <Separator bordered style={styles.separatorHeaderStyle}>
                            <Text style={styles.separatorItemStyle}>Faculdade</Text>
                        </Separator>
                        <ListItem style={styles.separatorListItemStyle}>
                            <Text style={styles.textSeparatorStyle}>IFG - Campus Inhumas</Text>
                        </ListItem>
                        <Separator bordered style={styles.separatorHeaderStyle}>
                            <Text style={styles.separatorItemStyle}>E-mail</Text>
                        </Separator>
                        <ListItem style={styles.separatorListItemStyle}>
                            <Text style={styles.textSeparatorStyle}>urquizaxd@gmail.com</Text>
                        </ListItem>
                        <Separator bordered style={styles.separatorHeaderStyle}>
                            <Text style={styles.separatorItemStyle}>Assuntos</Text>
                        </Separator>
                        <ListItem style={styles.separatorListItemStyle}>
                            <Text style={styles.textSeparatorStyle}>Python, JavaScript, NodeJS</Text>
                        </ListItem>
                    </View>

                    <View style={styles.container}>
                        <TouchableOpacity>
                            <Text style={styles.text}>
                                Esqueceu Sua Senha?
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.container}>
                        <TouchableOpacity>
                            <Text style={styles.text}>
                                Alterar Dados
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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

    cardsProfile: {
        backgroundColor: '#FFF',
        margin: 20,
        borderRadius: 10
    },

    namePersonaProfile: {
        textAlign: "center",
        fontFamily: "Roboto",
        color: '#34495e',
        fontSize: 18,
        paddingVertical: 10
    },

    separatorHeaderStyle: {
        backgroundColor: '#34495e',
        borderRadius: 5
    },

    separatorItemStyle: {
        fontFamily: 'Roboto',
        color: '#ecf0f1'
    },

    separatorListItemStyle: {
        borderRadius: 10
    },

    textSeparatorStyle: {
        fontFamily: "Roboto",
        color: '#34495e'
    },

    container: {
        alignItems: 'center',
        padding: 10
    },

    text: {
        fontFamily: "Roboto",
        color: '#34495e',
        fontSize: 18
    }
});
