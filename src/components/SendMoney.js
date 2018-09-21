import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, TextInput, Alert, TouchableOpacity, TouchableHighlight, Keyboard } from 'react-native';
import ls from 'react-native-local-storage';
import { CachedImage } from "react-native-img-cache";
import Spinner from './layouts/Spinner';

import Config from '../config';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth } = Dimensions.get('window');
let screenWidth = wp(80);

type Props = {};
export default class SendMoney extends Component<Props> {
    constructor(props: Object) {
        super(props);
        this.state = {
            amount: '',
            destinationAddress: '',
            senderAddress: this.props.navigation.state.params.walletAddress,
            isShowSpinner: false,
        };
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Send money',
            headerTitleStyle: {
                color: '#ffbb00'
            },
            headerStyle: {
                backgroundColor: '#08142F',
                borderBottomWidth: 0,
            },
            headerTintColor: '#ffbb00',
        };
    };

    componentDidMount() {
        this.resetState();
    }

    resetState () {
        this.setState({
            amount: '',
            destinationAddress: ''
        });
    }

    sendMoney() {
        Keyboard.dismiss();
        
        if (this.state.amount === '' || Number(this.state.amount) === 0) {
            return Alert.alert('Enter amount');
        }

        if (isNaN(this.state.amount)) {
            return Alert.alert('Enter number amount');
        }

        if (this.state.destinationAddress === '') {
            return Alert.alert('Enter destination address');
        }

        if (this.state.senderAddress === this.state.destinationAddress) {
            return Alert.alert('You can not send money to yourself');
        }

        this.setState({
            isShowSpinner: true,
        });

        ls.get('userToken').then((data) => {
            return fetch(`${Config.SERVER_URL}/transactions/send`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': data
                },
                body: JSON.stringify({
                    count: Number(this.state.amount),
                    walletAddress: this.state.senderAddress,
                    walletDestination: this.state.destinationAddress
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isShowSpinner: false,
                });
                if (responseJson.message === 'Success send') {
                    return this.props.navigation.navigate('SuccessPayment');
                } else {
                    return Alert.alert(responseJson.message);
                }
            })
            .catch((error) => {
                this.setState({
                    isShowSpinner: false,
                });
                console.error(error);
            });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle='light-content' />
                { this.state.isShowSpinner === true && <Spinner />}
                <View>
                    <View>
                        <TextInput
                            placeholder="Amount"
                            placeholderTextColor="#455578"
                            style={styles.text_input}
                            onChangeText={(amount) => this.setState({amount})}
                            value={this.state.amount}
                            keyboardType = 'numeric'
                            returnKeyType = { "next" }
                            onSubmitEditing={() => { this.addressTextInput.focus(); }}
                        />
                        <TextInput
                            ref={(input) => { this.addressTextInput = input; }}
                            placeholder="Address destination"
                            placeholderTextColor="#455578"
                            style={styles.text_input}
                            onChangeText={(destinationAddress) => this.setState({destinationAddress})}
                            value={this.state.destinationAddress}
                            returnKeyType={"go"}
                            onSubmitEditing={() => { this.sendMoney() }}
                        />
                    </View>

                    <TouchableOpacity
                        onPress={this.sendMoney.bind(this)}
                        style={{ backgroundColor: '#16203a', width: screenWidth, padding: 10, borderRadius: 10, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <CachedImage
                            source={require('../assets/images/icons/send-money.png')}
                            style={{width: 20, height: 20, marginRight: 10}}
                            resizeMode='contain'
                        />
                        <Text
                            style={{ color: '#f0b721', textAlign: 'center', fontSize: 18 }}
                        >
                            Send
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#08142F',
        alignItems: 'center',
        paddingTop: 20
    },
    text_input: {
        height: 40,
        width: screenWidth,
        marginBottom: 20,
        padding: 6,
        color: '#455578',
        borderBottomColor: '#455578',
        borderBottomWidth: 1,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent'
    }
});
