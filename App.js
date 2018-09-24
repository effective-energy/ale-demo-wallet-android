import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, YellowBox } from 'react-native';
import { createStackNavigator } from 'react-navigation';
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
}, {
    initialRouteName: 'Initial',
    transitionConfig,
});

export default class App extends Component {
    render() {
        return (
            <Provider {...stores}>
                <RootStack />
            </Provider>
        );
    }
}