import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, Dimensions, TextInput, StatusBar, TouchableOpacity, ActivityIndicator, ScrollView, Keyboard } from 'react-native';
import { CachedImage } from "react-native-img-cache";

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth } = Dimensions.get('window');
let screenWidth = wp(80);

type Props = {};
export default class Login extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            isPageLoader: false,
            userEmail: '',
            userPassword: '',
        };
    }

    static navigationOptions = ({navigation}) => {
        return {
            header: null,
        };
    };

    createAccount() {
        this.props.navigation.navigate('CreateAccount');
    }

    recoverAccount() {
        this.props.navigation.navigate('RecoverAccount');
    }

    login() {
        return this.props.navigation.navigate('Wallets');
        if (this.state.userEmail.length === 0) {
            return Alert.alert('Enter your E-mail');
        }

        if (!validateEmail(this.state.userEmail)) {
            return Alert.alert('Enter valid E-mail');
        }

        if (this.state.userPassword.length === 0) {
            return Alert.alert('Enter your password');
        }

        this.props.userStore.login({
            email: this.state.userEmail,
            password: this.state.userPassword
        });
    }

    render() {
        return (
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps='handled'
            >
                <StatusBar barStyle='light-content' />
                <View>
                    <CachedImage
                        resizeMode='contain'
                        source={require('../assets/images/logo/ale.png')}
                        style={styles.logo}
                    />
                </View>
                <View>
                    <View>
                        <TextInput
                            placeholder="Your E-mail"
                            placeholderTextColor="#455578"
                            style={styles.emailInput}
                            onChangeText={(userEmail) => this.setState({userEmail})}
                            value={this.state.userEmail}
                            returnKeyType={"next"}
                            onSubmitEditing={() => { this.passwordTextInput.focus(); }}
                        />
                        <TextInput
                            ref={(input) => { this.passwordTextInput = input; }}
                            secureTextEntry={true}
                            placeholder="Your password"
                            placeholderTextColor="#455578"
                            style={styles.passwordInput}
                            onChangeText={(userPassword) => this.setState({userPassword})}
                            value={this.state.userPassword}
                            returnKeyType={"go"}
                            onSubmitEditing={() => { this.loginToWallet() }}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={this.login.bind(this)}
                        style={styles.loginButton}
                    >
                        <CachedImage
                            source={require('../assets/images/icons/login.png')}
                            style={styles.loginIcon}
                        />
                        <Text style={styles.loginText}>Login to wallet</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottomInfo}>
                    <TouchableOpacity
                        onPress={this.createAccount.bind(this)}
                        style={[styles.loginButton, {marginBottom: 10}]}
                    >
                        <CachedImage
                            source={require('../assets/images/icons/plus.png')}
                            style={{width: 20, height: 20, marginRight: 10}}
                        />
                        <Text
                            style={{color: '#ffbb00', textAlign: 'center', fontSize: 18}}
                        >Create account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.recoverAccount.bind(this)}
                        style={styles.loginButton}
                    >
                        <CachedImage
                            source={require('../assets/images/icons/recover.png')}
                            style={{width: 20, height: 20, marginRight: 10}}
                        />
                        <Text
                            style={{color: '#ffbb00', textAlign: 'center', fontSize: 18}}
                        >
                            Recover account
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#07132f',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    logo: {
        width: 235,
        height: 106,
        maxWidth: '50%',
    },
    buttonContainer: {
        backgroundColor: '#ffd24f',
        borderRadius: 4,
        padding: 10,
        width: 300,
        marginBottom: 20
    },
    emailInput: {
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
    passwordInput: {
        height: 40,
        borderWidth: 1,
        width: wp(80),
        marginBottom: 25,
        padding: 6,
        color: '#455578',
        borderBottomColor: '#455578',
        borderBottomWidth: 1,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        fontSize: 16
    },
    loginButton: {
        backgroundColor: '#152038',
        width: wp(80),
        padding: 10,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginIcon: {
        width: 20,
        height: 20,
        marginRight: 10
    },
    loginText: {
        color: '#ffbb00',
        textAlign: 'center',
        fontSize: 18
    },
    bottomInfo: {
        width: wp(80)
    },
    bottomInfo_recover: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    bottomInfo_recover_text: {
        color: '#34476f'
    },
    bottomInfo_recover_link: {
        marginLeft: 10
    },
    bottomInfo_recover_link_text: {
        color: '#ffbb00'
    },
    bottomInfo_register: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10
    },
    bottomInfo_register_text: {
        color: '#34476f'
    },
    bottomInfo_register_link: {
        marginLeft: 10
    },
    bottomInfo_register_link_text: {
        color: '#ffbb00'
    }
});
