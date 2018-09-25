import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, StatusBar, TouchableOpacity, TextInput, Dimensions, Alert, ScrollView } from 'react-native';
import { CachedImage } from "react-native-img-cache";
import Spinner from './layouts/Spinner';
import { observer, inject } from "mobx-react";
import { when } from "mobx";

import Config from '../config';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth } = Dimensions.get('window');
let screenWidth = wp(80);

function validateEmail(email)  {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
}

type Props = {};
export default @inject("userStore") @observer class CreateAccount extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            email: '',
            password: '',
            repeatPassword: '',
        };
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Create account',
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

    componentDidMount() {
        this.setState({
            fullName: '',
            email: '',
            password: '',
            repeatPassword: '',
        });
    }

    backToLoginPage() {
        this.props.navigation.navigate('Login');
    }

    watcher = when(() => this.props.userStore.isSuccessCreateAccount === true, () => {
        this.props.navigation.navigate('Login');
    });

    async createAccount() {
        try {
            if (this.state.fullName === '') {
                return Alert.alert('Enter your name');
            }
            if (this.state.email === '' || !validateEmail(this.state.email)) {
                return Alert.alert('Enter valid E-mail');
            }
            if (this.state.password.length < 8) {
                return Alert.alert('Minimum password length is 8 characters');
            }
            if (this.state.repeatPassword !== this.state.password) {
                return Alert.alert('Passwords do not match');
            }

            this.props.userStore.createAccount({
                email: this.state.email.toLowerCase(),
                name: this.state.fullName,
                password: this.state.password
            });
        } catch (error) {
            Alert.alert(error)
        }
    }

    render() {
        return (
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps='handled'
            >
                <StatusBar barStyle='light-content' />
                { this.props.userStore.isLoader === true && <Spinner />}
                <View>
                    <TextInput
                        placeholder="Full name"
                        placeholderTextColor="#455578"
                        style={styles.textInput}
                        onChangeText={(fullName) => this.setState({fullName})}
                        value={this.state.fullName}
                        returnKeyType={"next"}
                        onSubmitEditing={() => { this.emailTextInput.focus(); }}
                    />
                    <TextInput
                        placeholder="E-mail"
                        placeholderTextColor="#455578"
                        style={styles.textInput}
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email}
                        ref={(input) => { this.emailTextInput = input; }}
                        returnKeyType={"next"}
                        onSubmitEditing={() => { this.passwordTextInput.focus(); }}
                    />
                    <TextInput
                        secureTextEntry={true}
                        placeholder="Password"
                        placeholderTextColor="#455578"
                        style={styles.textInput}
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                        ref={(input) => { this.passwordTextInput = input; }}
                        returnKeyType={"next"}
                        onSubmitEditing={() => { this.confirmPasswordTextInput.focus(); }}
                    />
                    <TextInput
                        secureTextEntry={true}
                        placeholder="Repeat password"
                        placeholderTextColor="#455578"
                        style={styles.textInput}
                        onChangeText={(repeatPassword) => this.setState({repeatPassword})}
                        value={this.state.repeatPassword}
                        ref={(input) => { this.confirmPasswordTextInput = input; }}
                        returnKeyType={"go"}
                        onSubmitEditing={() => { this.createAccount() }}
                    />
                    <TouchableOpacity
                        onPress={this.createAccount.bind(this)}
                        style={styles.buttonBlock}
                    >
                        <CachedImage
                            source={require('../assets/images/icons/plus.png')}
                            style={{width: 20, height: 20, marginRight: 10}}
                        />
                        <Text
                            style={styles.buttonBlock_text}
                        >
                            Create account
                        </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.buttonBlock}
                    onPress={this.backToLoginPage.bind(this)}
                >
                    <CachedImage
                        source={require('../assets/images/icons/login.png')}
                        style={styles.buttonBlock_icon}
                        resizeMode='contain'
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
