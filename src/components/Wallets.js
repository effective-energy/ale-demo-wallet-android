import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, ScrollView, RefreshControl } from 'react-native';

import BottomNavigator from './layouts/BottomNavigator';
import NewWalletBlock from './layouts/NewWalletBlock';
import WalletsSlider from './layouts/WalletsSlider';

type Props = {};
export default class Wallets extends Component<Props> {
    constructor(props: Object) {
        super(props);
        this.state = {};
    }

    static navigationOptions = ({navigation}) => {
        return {
            gesturesEnabled: false,
            title: 'Wallets',
            headerLeft: null,
            headerTitleStyle: {
                color: '#ffbb00',
            },
            headerStyle: {
                backgroundColor: '#08142F',
                borderBottomWidth: 0,
            },
            headerTintColor: '#ffbb00',
        };
    };

    changePage(e) {
        this.props.navigation.navigate(e);
    }

    requestMoney(e) {
        this.props.navigation.navigate('RequestMoney', { walletAddress: e });
    }

    sendMoney(e) {

    }

    openWalletDetailsScreen(walletData) {

    }

    createNewWallet() {

    }

    refreshWallets() {

    }

    render() {
        return (
            <View
                style={styles.container}
            >
                <StatusBar
                    barStyle='light-content'
                />
                <ScrollView
                    contentInset={{bottom: 80}}
                    automaticallyAdjustContentInsets={false}
                    refreshControl={
                        <RefreshControl
                            tintColor="#FFFFFF"
                            progressBackgroundColor="#EBEBEB"
                        />
                    }
                >
                    <WalletsSlider
                        openWalletDetailsScreen={this.openWalletDetailsScreen.bind(this)}
                        requestMoney={this.requestMoney.bind(this)}
                        sendMoney={this.sendMoney.bind(this)}
                    />
                    <NewWalletBlock
                        createNewWallet={this.createNewWallet.bind(this)}
                    />
                </ScrollView>
                <BottomNavigator
                    changePage={this.changePage.bind(this)}
                    activePage="Wallets"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#091430'
    }
});
