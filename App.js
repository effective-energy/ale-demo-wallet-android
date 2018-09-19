import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

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
import RequestMoney from './src/components/RequestMoney';
import SendMoney from './src/components/SendMoney';
import WalletDetails from './src/components/WalletDetails';

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
    RequestMoney: { screen: RequestMoney },
    SendMoney: { screen: SendMoney },
    WalletDetails: { screen: WalletDetails },
}, {
    initialRouteName: 'Initial',
    transitionConfig,
});

type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <Provider {...stores}>
                <RootStack/>
            </Provider>
        );
    }
}