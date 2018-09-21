import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, StatusBar, TouchableOpacity, TextInput, Dimensions, Alert, ScrollView, Keyboard } from 'react-native';
import { CachedImage } from "react-native-img-cache";
import Spinner from './layouts/Spinner';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth } = Dimensions.get('window');
let screenWidth = wp(80);

function validateEmail(email) {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
}

type Props = {};
export default class RecoverAccount extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            recoverEmail: '',
            isShowSpinner: false,
        };
    }

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

    sendLink() {
        if (this.state.recoverEmail === '') {
            return Alert.alert('Enter your E-mail');
        }
        if (validateEmail(this.state.recoverEmail)) {
            Keyboard.dismiss();
            this.setState({
                isShowSpinner: true,
            });
            fetch('https://ale-demo-4550.nodechef.com/users/recovery', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.state.recoverEmail.toLowerCase()
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isShowSpinner: false,
                });
                Alert.alert(responseJson.message);
            })
            .catch((error) => {
                this.setState({
                    isShowSpinner: false,
                });
                Alert.alert(error);
            });
        } else {
            Alert.alert('Enter valid E-mail');
        }
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
                { this.state.isShowSpinner === true && <Spinner />}
                <View>
                    <TextInput
                        placeholder="Enter your email"
                        placeholderTextColor="#455578"
                        style={styles.textInput}
                        onChangeText={(recoverEmail) => this.setState({recoverEmail})}
                        value={this.state.recoverEmail}
                        returnKeyType={"go"}
                        onSubmitEditing={() => { this.sendLink() }}
                    />
                    <TouchableOpacity
                        style={styles.buttonBlock}
                        onPress={this.sendLink.bind(this)}
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
