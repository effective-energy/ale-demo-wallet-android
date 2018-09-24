import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, Text, Dimensions, TextInput, Alert, ScrollView } from 'react-native';
import { observer, inject } from "mobx-react";
import CheckBox from './layouts/CheckBox';
import Config from '../config';
import { when } from "mobx";
import Spinner from './layouts/Spinner';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth } = Dimensions.get('window');

type Props = {};
export default @inject("walletsStore") @observer class ConfirmMnemonic extends Component<Props> {
    constructor(props) {
        super(props);
	    this.state = {
            currentMnemonicWordIndex: 0,
            selecredWordsForConfirm: [],
            confirmMnemonicWords: [],
            isConfirmDeviceOnly: false,
            isConfirmBackup: false,
            firstWord: '',
            secondWord: '',
            thirdWord: '',
            isShowSpinner: false
        };
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Confirm the key',
        };
    };

    watcher = when(() => this.props.walletsStore.isSuccessCreateWallet === true, () => {
        Alert.alert('Wallet successfully create');
        this.setState({
            isShowSpinner: false,
        });
        this.props.navigation.navigate('Wallets');
    });

    watcher = when(() => this.props.walletsStore.isErrorCreateWallet === true, () => {
        this.setState({
            isShowSpinner: false,
        });
    });

    componentDidMount () {
        this.generateConfirmWords();
    }

    generateConfirmWords () {
        let array = [1,2,3,4,5,6,7,8,9,10,11,12];
        let shuffled = array.map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]);
        shuffled = shuffled.splice(0, 3);
        this.setState({
            confirmMnemonicWords: shuffled
        });
    }

    confirmDevice (value) {
        this.setState({
            isConfirmDeviceOnly: value
        });
    }

    confirmBackup (value) {
        this.setState({
            isConfirmBackup: value
        });
    }

    confirmMnemonic () {
        let first_word = this.state.firstWord.toLowerCase();
        let second_word = this.state.secondWord.toLowerCase();
        let third_word = this.state.thirdWord.toLowerCase();

        if (this.props.navigation.state.params.mnemonicPhrase[Number(this.state.confirmMnemonicWords[0]-1)] !== first_word) {
            return Alert.alert(`Incorrect ${this.state.confirmMnemonicWords[0]}th word`)
        }

        if (this.props.navigation.state.params.mnemonicPhrase[Number(this.state.confirmMnemonicWords[1]-1)] !== second_word) {
            return Alert.alert(`Incorrect ${this.state.confirmMnemonicWords[1]}th word`)
        }

        if (this.props.navigation.state.params.mnemonicPhrase[Number(this.state.confirmMnemonicWords[2]-1)] !== third_word) {
            return Alert.alert(`Incorrect ${this.state.confirmMnemonicWords[2]}th word`)
        }

        if (!this.state.isConfirmDeviceOnly || !this.state.isConfirmBackup) {
            return Alert.alert('Agree with all conditions');
        }

        this.setState({
            isShowSpinner: true,
        });

        this.props.walletsStore.createNewWallet({
            name: this.props.navigation.state.params.walletName,
            seed: this.props.navigation.state.params.mnemonicPhrase
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle='light-content' />
                { this.state.isShowSpinner === true && <Spinner />}
                <ScrollView refreshing={false}>
                    <View style={{marginTop: 20, width: wp(100), alignItems: 'center', marginBottom: 20}}>
                        <Text
                            style={{textAlign: 'center', color: '#091529', fontSize: 16}}
                        >
                            Type random word in the correct order to verify your recover phrase
                        </Text>
                        <View style={{marginTop: 20, marginBottom: 10}}>
                            <TextInput
                                placeholder={this.state.confirmMnemonicWords[0]+'th word'}
                                placeholderTextColor="#ABB8C6"
                                style={styles.textInput}
                                onChangeText={(firstWord) => this.setState({firstWord})}
                                value={this.state.firstWord}
                            />
                            <TextInput
                                placeholder={this.state.confirmMnemonicWords[1]+'th word'}
                                placeholderTextColor="#ABB8C6"
                                style={styles.textInput}
                                onChangeText={(secondWord) => this.setState({secondWord})}
                                value={this.state.secondWord}
                            />
                            <TextInput
                                placeholder={this.state.confirmMnemonicWords[2]+'th word'}
                                placeholderTextColor="#ABB8C6"
                                style={styles.textInput}
                                onChangeText={(thirdWord) => this.setState({thirdWord})}
                                value={this.state.thirdWord}
                            />
                        </View>
                        <View style={{width: wp(80)}}>
                            <CheckBox
                                toggleCheckBox={() => this.confirmDevice(!this.state.isConfirmDeviceOnly)}
                                isCheked={this.state.isConfirmDeviceOnly}
                                value='I understand that my money are held securely on this device only, not on the company servers'
                            />
                            <CheckBox
                                toggleCheckBox={() => this.confirmBackup(!this.state.isConfirmBackup)}
                                isCheked={this.state.isConfirmBackup}
                                value='I understand that if this application is moved to another device or deleted, my money can be only recovered with the backup phrase which were written down in a secure place'
                            />
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={this.confirmMnemonic.bind(this)}
                                style={{backgroundColor: '#D1D8DD', width: wp(80), padding: 10, borderRadius: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10}}
                            >
                                <Text style={{color: '#091529', fontSize: 18}}>
                                    Continue
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8ebee',
        alignItems: 'center',
        width: wp(100)
    },
    textInput: {
        height: 40,
        width: wp(80),
        marginBottom: 20,
        padding: 6,
        color: '#ABB8C6',
        borderBottomColor: '#ABB8C6',
        borderBottomWidth: 1,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        fontSize: 16,
        textAlign: 'center'
    }
});