import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, StatusBar, TouchableOpacity, Alert, TextInput, ScrollView } from 'react-native';
import { CachedImage } from "react-native-img-cache";

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}
const { width: viewportWidth } = Dimensions.get('window');

type Props = {};
export default class NewWalletScreen extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            newWalletName: ''
        };
    }

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;

        let isHideBackArrow = params.disableBackArrow === true ? null : undefined;
        return {
            title: 'Add new wallet',
            headerLeft: isHideBackArrow,
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

    restoreWallet() {
        this.props.navigation.navigate('RestoreWallet');
    }

    createNewWallet() {
        if (this.state.newWalletName === '') {
            return Alert.alert('Enter wallet name');
        } else {
            return this.props.navigation.navigate('Attention', {
                walletName: this.state.newWalletName
            });
        }
    }

    render() {
        return (
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps='handled'
            >
                <StatusBar barStyle='light-content' />
                <View>
                    <TextInput
                        placeholder="Wallet name"
                        placeholderTextColor="#455578"
                        style={styles.inputText}
                        onChangeText={(newWalletName) => this.setState({newWalletName})}
                        value={this.state.newWalletName}
                        returnKeyType={"go"}
                        onSubmitEditing={() => { this.createNewWallet() }}
                    />
                    <TouchableOpacity
                        onPress={this.createNewWallet.bind(this)}
                        style={styles.new_wallet_button}
                    >
                        <CachedImage
                            source={require('../assets/images/icons/new-wallet.png')}
                            style={styles.new_wallet_button_icon}
                            resizeMode='contain'
                        />
                        <Text
                            style={styles.new_wallet_button_text}
                        >
                            Create wallet
                        </Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity
                        onPress={this.restoreWallet.bind(this)}
                        style={styles.restore_wallet_block}
                    >
                        <CachedImage
                            source={require('../assets/images/icons/restore-wallet.png')}
                            style={styles.restore_wallet_block_icon}
                        />
                        <Text
                            style={styles.restore_wallet_block_text}
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
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingBottom: 20,
    },
    inputText: {
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
    new_wallet_button: {
        backgroundColor: '#16203a',
        width: wp(80),
        borderRadius: 10,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    new_wallet_button_icon: {
        width: wp(7),
        height: wp(7),
        marginRight: 10
    },
    new_wallet_button_text: {
        color: '#f0b721',
        fontSize: 18,
        textAlign: 'center'
    },
    restore_wallet_block: {
        backgroundColor: '#ffbb00',
        width: wp(80),
        padding: 10,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    restore_wallet_block_icon: {
        width: 20,
        height: 20,
        marginRight: 10
    },
    restore_wallet_block_text: {
        color: '#000000',
        fontSize: 18
    }
});