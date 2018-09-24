import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, Text, Dimensions } from 'react-native';
import { observer, inject } from "mobx-react";

import Pageloader from './layouts/Pageloader';
import MnemonicSlider from './layouts/MnemonicSlider';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth } = Dimensions.get('window');

type Props = {};
export default @inject("walletsStore") @observer class RecoveryPhrase extends Component<Props> {
    constructor(props: Object) {
        super(props);
        this.state = {
            currentMnemonicWordIndex: 0
        };
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Recovery Phrase'
        };
    };

    componentDidMount() {
        this.props.walletsStore.getMnemonic();
    }

    prevMnemonicWord () {
        if (this.state.currentMnemonicWordIndex === 0) {
            return false;
        }
        this.setState({
            currentMnemonicWordIndex: Number(this.state.currentMnemonicWordIndex-1)
        });
    }

    nextMnemonicWord () {
        if (this.state.currentMnemonicWordIndex >= 11) {
            return false;
        }
        this.setState({
            currentMnemonicWordIndex: Number(this.state.currentMnemonicWordIndex+1)
        });
    }

    openConfirmKeyPage () {
        this.props.navigation.navigate('ConfirmMnemonic', {
            walletName: this.props.navigation.state.params.walletName,
            mnemonicPhrase: this.props.walletsStore.mnemonicPhrase
        });
    }

    render() {
        if (this.props.walletsStore.isLoaderPage || this.props.walletsStore.mnemonicPhrase.length === 0) {
            return (<Pageloader title="Generate mnemonic phrase..." />);
        }
        return (
            <View style={styles.container}>
                <StatusBar barStyle='light-content' />
                <View style={{width: wp(80), height: 150, marginTop: 50, display: 'flex', flexDirection: 'column'}}>
                    <Text style={{textAlign: 'center', marginBottom: 50, color: '#556B98', fontSize: 18}}>Word {this.state.currentMnemonicWordIndex+1} of 12</Text>
                    <MnemonicSlider
                        currentWord={this.state.currentMnemonicWordIndex}
                        mnemonicPhrase={this.props.walletsStore.mnemonicPhrase}
                        prevMnemonicWord={this.prevMnemonicWord.bind(this)}
                        nextMnemonicWord={this.nextMnemonicWord.bind(this)}
                    />
                    <TouchableOpacity
                        onPress={this.openConfirmKeyPage.bind(this)}
                        style={{backgroundColor: '#D1D8DD', width: wp(80), padding: 10, borderRadius: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 50}}
                    >
                        <Text style={{color: '#091529', fontSize: 18}}>
                            Continue
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
        backgroundColor: '#e8ebee',
        alignItems: 'center',
    },
});