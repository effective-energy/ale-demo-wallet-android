import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, YellowBox, NetInfo } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Nointernet from './src/components/layouts/Nointernet';
YellowBox.ignoreWarnings(['Warning: ']);

import { Provider } from "mobx-react";
import stores from "./src/store";

import Login from './src/components/Login';
import RecoverAccount from './src/components/RecoverAccount';
import CreateAccount from './src/components/CreateAccount';
import Initial from './src/components/Initial';
import Wallets from './src/components/Wallets';
import History from './src/components/History';
import Notifications from './src/components/Notifications';
import Settings from './src/components/Settings';
import ReceiveMoney from './src/components/ReceiveMoney';
import SendMoney from './src/components/SendMoney';
import WalletDetails from './src/components/WalletDetails';
import NewWallet from './src/components/NewWallet';
import TwoFactorAuth from './src/components/TwoFactorAuth';
import SuccessPayment from './src/components/SuccessPayment';
import TwoFactorLogin from './src/components/TwoFactorLogin';
import ChangePassword from './src/components/ChangePassword';
import RestoreWallet from './src/components/RestoreWallet';
import Attention from './src/components/Attention';
import RecoveryPhrase from './src/components/RecoveryPhrase';
import ConfirmMnemonic from './src/components/ConfirmMnemonic';

const transitionConfig = () => {
    return {
        transitionSpec: {
            duration: 0
        }
    }
}

const RootStack = createStackNavigator({
    Login: { screen: Login },
    RecoverAccount: { screen: RecoverAccount },
    CreateAccount: { screen: CreateAccount },
    Initial: { screen: Initial },
    Wallets: { screen: Wallets },
    History: { screen: History },
    Notifications: { screen: Notifications },
    Settings: { screen: Settings },
    ReceiveMoney: { screen: ReceiveMoney },
    SendMoney: { screen: SendMoney },
    WalletDetails: { screen: WalletDetails },
    NewWallet: { screen: NewWallet },
    TwoFactorAuth: { screen: TwoFactorAuth },
    SuccessPayment: { screen: SuccessPayment },
    TwoFactorLogin: { screen: TwoFactorLogin },
    ChangePassword: { screen: ChangePassword },
    RestoreWallet: { screen: RestoreWallet },
    Attention: { screen: Attention },
    RecoveryPhrase: { screen: RecoveryPhrase },
    ConfirmMnemonic: { screen: ConfirmMnemonic },
}, {
    initialRouteName: 'Initial',
    transitionConfig,
});

export default class App extends Component {
    constructor(props: Object) {
        super(props);
        this.state = {
            isConnected: true,
        };
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }
    
    handleConnectivityChange = isConnected => {
        if (isConnected) {
            this.setState({ isConnected: true });
        } else {
            this.setState({ isConnected: false });
        }
    };

    render() {
        if (!this.state.isConnected) {
            return (
                <Nointernet />
            );
        }

        return (
            <Provider {...stores}>
                <RootStack />
            </Provider>
        );
    }
}