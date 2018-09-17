// @flow
import { observable, action } from "mobx";
import ls from 'react-native-local-storage';
import { Alert } from 'react-native'

import Config from '../config';

export default class WalletsStore {
    @observable walletsList = [];
    @observable isLoaderPage = false;
    @observable isRefreshLoader = false;
    @observable isEmptyWallets = false;
    @observable mnemonicPhrase = [];
    @observable isSuccessDeletedWallet = false;
    @observable isSuccessCreateWallet = false;
    @observable isErrorCreateWallet = false;

    @action async initWallets () {
        try {
            this.isLoaderPage = true;
            this.isEmptyWallets = false;
            const userToken = await ls.get('userToken');
            if (!userToken) {
                throw userToken
            }

            const params = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': userToken
                }
            }

            const response = await fetch(`${Config.SERVER_URL}/users/user-wallets`, params);
            if (!response) {
                throw response
            }

            const responseJson = await response.json();

            if (responseJson.length === 0) {
                return this.isEmptyWallets = true;
            }

            this.walletsList = responseJson;
            this.isLoaderPage = false;
        } catch (error) {
            this.isLoaderPage = false;
            console.log(error);
        }
    }

    @action async createNewWallet(data: Object) {
        try {
            this.isSuccessCreateWallet = false;
            this.isErrorCreateWallet = false;
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
                    name: data.name,
                    seed: data.seed,
                }),
            }

            const response = await fetch(`${Config.SERVER_URL}/wallet/new`, params);
            if (!response) {
                throw response
            }

            const responseJson = await response.json();

            if (responseJson.message === 'New wallet success create!') {
                this.initWallets();
                this.isSuccessCreateWallet = true;
            } else {
                this.isErrorCreateWallet = true;
                return Alert.alert(responseJson.message);
            }

        } catch (error) {
            this.isErrorCreateWallet = true;
            console.log(error);
        }
    }

    @action async refreshWallets () {
        try {
            this.isRefreshLoader = true;

            const userToken = await ls.get('userToken');
            if (!userToken) {
                throw userToken
            }

            const params = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': userToken
                }
            }

            const response = await fetch(`${Config.SERVER_URL}/users/user-wallets`, params);
            if (!response) {
                throw response
            }

            const responseJson = await response.json();
            this.walletsList = responseJson;
            this.isRefreshLoader = false;
            
        } catch (error) {
            this.isRefreshLoader = false;
            console.log(error);
        }
    }

    @action async getMnemonic () {
        try {
            this.isLoaderPage = true;

            const userToken = await ls.get('userToken');
            if (!userToken) {
                throw userToken
            }

            const params = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': userToken
                }
            }

            const response = await fetch(`${Config.SERVER_URL}/wallet/seed`, params);
            if (!response) {
                throw response
            }

            const responseJson = await response.json();
            this.mnemonicPhrase = responseJson.seed;
            this.isLoaderPage = false;
        } catch (error) {
            this.isLoaderPage = false;
            console.log(error);
        }
    }

    @action async restoreWallet (phrase) {
        try {
            phrase = phrase.split(' ');
            if (phrase.length !== 12) {
                return Alert.alert('Enter a phrase mnemonics of 12 words');
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
                    seed: phrase
                }),
            }

            const response = await fetch(`${Config.SERVER_URL}/wallet/redemption-wallet`, params);
            if (!response) {
                throw response
            }
            const responseJson = await response.json();
            if (responseJson.walletInfo !== undefined) {
                Alert.alert('RESTORED!');
            } else {
                Alert.alert(responseJson.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    @action async deleteWallet (walletAddress) {
        try {
            this.isSuccessDeletedWallet = false;
            this.isEmptyWallets = false;

            const userToken = await ls.get('userToken');
            if (!userToken) {
                throw userToken
            }

            const params = {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': userToken
                },
            }

            const response = await fetch(`${Config.SERVER_URL}/wallet/${walletAddress}`, params);
            if (!response) {
                throw response
            }

            const responseJson = await response.json();
            if (responseJson.message === 'Wallet successfully disabled by this user') {
                if (this.walletsList.length !== 1) {
                    this.isSuccessDeletedWallet = true;
                } else {
                    this.isEmptyWallets = true;
                }
            } else {
                Alert.alert(responseJson.message);
            }
        } catch (error) {
            console.log(error)
        }
    }
}