import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, Text, Dimensions, Alert } from 'react-native';
import ls from 'react-native-local-storage';
import { observer, inject } from "mobx-react";
import { when } from "mobx";
import { CachedImage } from "react-native-img-cache";
import Spinner from './layouts/Spinner';
import AlertAndroid from 'react-native-prompt-android'

import BottomNavigator from './layouts/BottomNavigator';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth } = Dimensions.get('window');

type Props = {};
export default @inject("walletsStore") @observer class WalletDetails extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            walletName: '',
            isShowSpinner: false
        };

        this.changePage = this.changePage.bind(this);
        this.receiveMoney = this.receiveMoney.bind(this);
        this.editWalletName = this.editWalletName.bind(this);
        this.deleteWallet = this.deleteWallet.bind(this);
    }

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
            title: params.walletData.name,
            headerTitleStyle: {
                color: '#000000'
            },
            headerTintColor: '#ffbb00',
        };
    };

    watcher = when(() => this.props.walletsStore.isSuccessDeletedWallet === true, () => {
        this.setState({
            isShowSpinner: false,
        });
        Alert.alert('Wallet successfully deleted');
        this.props.navigation.push('Wallets');
    });

    watcher = when(() => this.props.walletsStore.isEmptyWallets === true, () => {
        this.setState({
            isShowSpinner: false,
        });
        Alert.alert('Wallet successfully deleted. You need to create a new wallet');
        this.props.navigation.push('NewWallet', {
            disableBackArrow: true
        });
    });

    componentDidMount() {
        const { params } = this.props.navigation.state;
        this.setState({
            walletName: params.walletData.name
        });
    }

    changePage(e) {
        this.props.navigation.navigate(e);
    }

    receiveMoney(address) {
        this.props.navigation.navigate('ReceiveMoney', { walletAddress: address });
    }

    editWalletName() {
        AlertAndroid(
            'Change wallet name',
            'Enter new name for wallet',
            [{
                text: 'Cancel',
                style: 'cancel',
            }, {
                text: 'OK',
                onPress: (newWalletName) => this.renameWallet(newWalletName),
            }],
            {
                type: 'plain-text',
                defaultValue: this.state.walletName,
            }
        );
    }

    renameWallet(newWalletName) {
        if (newWalletName === this.state.walletName) {
            return Alert.alert('Write a new name for your wallet');
        }
        this.setState({
            isShowSpinner: true,
        });
        const { params } = this.props.navigation.state;
        ls.get('userToken').then((data) => {
            return fetch('https://ale-demo-4550.nodechef.com/wallet/rename', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': data
                },
                body: JSON.stringify({
                    walletAddress: params.walletData.address,
                    newWalletName: newWalletName
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isShowSpinner: false,
                });
                this.props.navigation.setParams({
                    walletData: {
                        name: newWalletName,
                        address: params.walletData.params,
                        balance: params.walletData.balance
                    }
                });
                return Alert.alert(responseJson.message);
            })
            .catch((error) => {
                console.error(error);
            });
        });
    }

    deleteWallet() {
        AlertAndroid(
            'Delete wallet',
            'Type wallet name to confirm deletion',
            [{
                text: 'Cancel',
                style: 'cancel',
            }, {
                text: 'Confirm',
                onPress: walletName => this.confirmDeleteWallet(walletName)
            }],
          {
            type: 'plain-text'
          }
        );
    }

    confirmDeleteWallet(walletName) {
        const { params } = this.props.navigation.state;

        if (walletName !== params.walletData.name) {
            return Alert.alert('Incorrect wallet name');
        }
        this.setState({
            isShowSpinner: true,
        });
        return this.props.walletsStore.deleteWallet(params.walletData.address);
    }

    render() {
        const { params } = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <StatusBar barStyle='light-content' />
                { this.state.isShowSpinner === true && <Spinner />}
                <View style={styles.walletInfoBlock}>
                    <View style={styles.walletInfoBlock_row}>
                        <Text style={styles.walletInfoBlock_row_balance_text}>
                            Balance
                        </Text>
                        <View style={styles.walletInfoBlock_balanceBlock}>
                            <Text style={styles.walletInfoBlock_balanceBlock_amount}>
                                {params.walletData.balance}
                            </Text>
                            <CachedImage
                                source={require('../assets/images/icons/alecoin.png')}
                                style={styles.walletInfoBlock_balanceBlock_amount_icon}
                                resizeMode='contain'
                            />
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => this.receiveMoney(params.walletData.address)}
                    >
                        <CachedImage
                            source={require('../assets/images/icons/plus-balance.png')}
                            style={styles.walletInfoBlock_receive_icon}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.walletActionBlock}>
                    <TouchableOpacity
                        onPress={this.editWalletName}
                        style={[styles.walletInfoBlock_button, styles.walletInfoBlock_button_edit]}
                    >
                        <CachedImage
                            source={require('../assets/images/icons/wallet-edit.png')}
                            style={styles.walletActionBlock_icon}
                            resizeMode='contain'
                        />
                        <Text style={styles.walletActionBlock_text}>
                            Edit
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={this.deleteWallet}
                        style={[styles.walletInfoBlock_button, styles.walletInfoBlock_button_delete]}
                    >
                        <CachedImage
                            source={require('../assets/images/icons/wallet-delete.png')}
                            style={styles.walletActionBlock_icon}
                            resizeMode='contain'
                        />
                        <Text style={styles.walletActionBlock_text}>
                            Delete
                        </Text>
                    </TouchableOpacity>
                </View>

                <BottomNavigator
                    changePage={this.changePage}
                    activePage="Wallets"
                />
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
    walletInfoBlock: {
        width: wp(80),
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    walletInfoBlock_row: {
        display: 'flex',
        flexDirection: 'column',
    },
    walletInfoBlock_balanceBlock: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    walletInfoBlock_balanceBlock_amount: {
        fontSize: 24,
    },
    walletInfoBlock_balanceBlock_amount_icon: {
        width: 20,
        height: 20,
        paddingLeft: 5,
    },
    walletInfoBlock_row_balance_text: {
        fontSize: 18,
    },
    walletInfoBlock_receive_icon: {
        width: 25,
        height: 25,
    },
    walletActionBlock: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30,
        width: wp(80),
    },
    walletInfoBlock_button: {
        padding: 10,
        backgroundColor: '#0a1627',
        width: wp(38),
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    walletInfoBlock_button_edit: {
        backgroundColor: '#0a1627',
    },
    walletInfoBlock_button_delete: {
        backgroundColor: '#F44336',
    },
    walletActionBlock_icon: {
        width: 20,
        height: 20,
    },
    walletActionBlock_text: {
        color: '#FFFFFF',
        fontSize: 18,
        textAlign: 'center',
        paddingLeft: 5,
    }
});