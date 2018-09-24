import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, StatusBar, TouchableOpacity, Alert, TextInput, ScrollView } from 'react-native';
import { CachedImage } from "react-native-img-cache";
import ls from 'react-native-local-storage';

import Config from '../config';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}
const { width: viewportWidth } = Dimensions.get('window');

type Props = {};
export default class RestoreWallet extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            mnemonicPhrase: ''
        };
    }

    static navigationOptions = {
        title: 'Restore wallet',
        headerTitleStyle: {
            color: '#ffbb00'
        },
        headerStyle: {
            backgroundColor: '#08142F',
            borderBottomWidth: 0,
        },
        headerTintColor: '#ffbb00',
    };

    async restoreWallet() {
        let mnemonicPhrase = this.state.mnemonicPhrase.split(' ');
        if (mnemonicPhrase.length !== 12) {
            return Alert.alert('Enter 12 words');
        }

        const userToken = await ls.get('userToken');
        if (!userToken) {
            throw userToken
        }

        const params = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': userToken
            },
            body: JSON.stringify({
                seed: mnemonicPhrase
            }),
        };

        const response = await fetch(`${Config.SERVER_URL}/wallet/redemption-wallet`, params);
        if (!response) {
            throw response
        }

        const responseJson = await response.json();

        if (responseJson.message === 'Incorrect mnemonic!') {
            return Alert.alert('Wallet not found');
        } else {
            Alert.alert('Wallet successfully restored!');
            return this.props.navigation.navigate('Wallets');
        }
    }

    render() {
        return (
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps='handled'
            >
                <StatusBar barStyle='light-content' />
                <View style={{ marginTop: 30 }}>
                    <TextInput
                        placeholder="Enter your mnemonic phrase"
                        placeholderTextColor="#455578"
                        style={styles.inputText}
                        onChangeText={(mnemonicPhrase) => this.setState({mnemonicPhrase})}
                        value={this.state.mnemonicPhrase}
                        
                    />
                    <TouchableOpacity
                        onPress={this.restoreWallet.bind(this)}
                        style={styles.buttonBlock}
                    >
                        <CachedImage
                            source={require('../assets/images/icons/restore-wallet.png')}
                            style={styles.buttonBlock_icon}
                        />
                        <Text
                            style={styles.buttonBlock_text}
                        >
                            Restore wallet
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
        backgroundColor: '#08142F',
        alignItems: 'center'
    },
    inputText: {
        height: 40,
        borderBottomColor: '#455578',
        borderBottomWidth: 1,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        width: wp(80),
        marginBottom: 20,
        borderRadius: 2,
        color: '#455578',
        fontSize: 18
    },
    buttonBlock: {
        backgroundColor: '#ffbb00',
        width: wp(80),
        padding: 10,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonBlock_icon: {
        width: 20,
        height: 20,
        marginRight: 10
    },
    buttonBlock_text: {
        color: '#000000',
        fontSize: 18
    }
});