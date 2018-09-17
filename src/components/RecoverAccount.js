import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, StatusBar, TouchableOpacity, TextInput, Dimensions, Alert, ScrollView } from 'react-native';
import { CachedImage } from "react-native-img-cache";

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth } = Dimensions.get('window');
let screenWidth = wp(80);

type Props = {};
export default class RecoverAccount extends Component<Props> {

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Recover account',
            headerTitleStyle: {
                color: '#ffbb00'
            },
            headerStyle: {
                backgroundColor: '#07132f',
                borderBottomWidth: 0,
            },
            headerTintColor: '#ffbb00',
        };
    };

    loginToAccount() {
        this.props.navigation.navigate('Login');
    }

    render() {
        return (
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps='handled'
            >
                <StatusBar
                    barStyle='light-content'
                />
                <View>
                    <TextInput
                        placeholder="Enter your email"
                        placeholderTextColor="#455578"
                        style={styles.textInput}
                    />
                    <TouchableOpacity
                        style={styles.buttonBlock}
                    >
                        <CachedImage
                            source={require('../assets/images/icons/mail.png')}
                            style={styles.buttonBlock_icon}
                        />
                        <Text style={styles.buttonBlock_text}>Send link to recover</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.buttonBlock}
                    onPress={this.loginToAccount.bind(this)}
                >
                    <CachedImage
                        source={require('../assets/images/icons/login.png')}
                        style={styles.buttonBlock_icon}
                    />
                    <Text style={styles.buttonBlock_text}>Log in to account</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#08142F',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingBottom: 20,
    },
    textInput: {
        height: 40,
        borderWidth: 1,
        width: wp(80),
        marginBottom: 20,
        padding: 6,
        color: '#455578',
        borderBottomColor: '#455578',
        borderBottomWidth: 1,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        fontSize: 16
    },
    buttonBlock: {
        backgroundColor: '#152038',
        width: wp(80),
        padding: 10,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'   
    },
    buttonBlock_text: {
        color: '#ffbb00',
        textAlign: 'center',
        fontSize: 16
    },
    buttonBlock_icon: {
        width: 20,
        height: 20,
        marginRight: 10
    }
});
