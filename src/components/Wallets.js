import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, ScrollView, RefreshControl } from 'react-native';
import { observer, inject } from 'mobx-react/native';
import { when } from "mobx";

import BottomNavigator from './layouts/BottomNavigator';
import NewWalletBlock from './layouts/NewWalletBlock';
import WalletsSlider from './layouts/WalletsSlider';
import Pageloader from './layouts/Pageloader';

type Props = {};
export default @inject("walletsStore") @observer class Wallets extends Component<Props> {
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

    componentDidMount() {
        this.props.walletsStore.initWallets();
    }

    watcher = when(() => this.props.walletsStore.isEmptyWallets === true, () => {
        this.props.navigation.push('NewWallet', {
            disableBackArrow: true
        });
    });

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
        this.props.walletsStore.refreshWallets();
    }

    render() {
        if (this.props.walletsStore.isLoaderPage) {
            return (
                <Pageloader
                    title="Loading wallets..."
                    isDark={true}
                />);
        }
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
                            onRefresh={this.refreshWallets.bind(this)}
                            refreshing={this.props.walletsStore.isRefreshLoader}
                            tintColor="#FFFFFF"
                            progressBackgroundColor="#EBEBEB"
                        />
                    }
                >
                    <WalletsSlider
                        openWalletDetailsScreen={this.openWalletDetailsScreen.bind(this)}
                        walletsList={this.props.walletsStore.walletsList}
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
