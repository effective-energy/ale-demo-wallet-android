// @flow
import { observable, action } from 'mobx';
import ls from 'react-native-local-storage';
import Config from '../config';
import { Alert } from 'react-native';

export default class TransactionsStore {
    @observable transactions = [];
    @observable isLoader = true;
    @observable wallets = [];
    @observable selectedWallet = null;
    @observable selectedWalletIndex = 0;
    @observable isRefreshLoader = false;

    @action async getTransactions (data: Object) {
    	try {
    		if (this.transactions.length !== 0 && this.selectedWallet === data.address) {
    			return false;
    		}
    		this.isLoader = true;
    		this.selectedWallet = data.address;
    		this.selectedWalletIndex = data.selectedWalletIndex

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

	        const response = await fetch(`${Config.SERVER_URL}/transactions/${this.selectedWallet}`, params);
	        if (!response) {
	            throw response
	        }

	        const responseJson = await response.json();

	        this.transactions = responseJson;
	        this.isLoader = false;
    	} catch (error) {
    		this.isLoader = false;
    		console.log(error);
    	}
    }

    @action async refreshTransactions () {
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

	        const response = await fetch(`${Config.SERVER_URL}/transactions/${this.selectedWallet}`, params);
	        if (!response) {
	            throw response
	        }

	        const responseJson = await response.json();

	        this.transactions = responseJson;
	        this.isRefreshLoader = false;
    	} catch (error) {
    		this.isRefreshLoader = false;
    		console.log(error);
    	}
    }
}