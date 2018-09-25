// @flow
import { observable, action } from "mobx";
import ls from 'react-native-local-storage';
import { Alert } from 'react-native';

import Config from '../config';

export default class UserStore {
    @observable name = '';
	@observable email = '';
    @observable avatar = '';
    @observable isLoader = false;
    @observable isLogin = false;
    @observable isUpdatePassword = false;
    @observable isTwoFactor = false;
    @observable isIncorrectPassword = false;
    @observable isSuccessCreateAccount = false;

    @action async login(data: Object) {
    	try {
    		this.isLoader = true;
    		this.isLogin = false;
            this.isTwoFactor = false

            const params = {
                method: 'POST',
	    		headers: {
	    			'Accept': 'application/json',
	    			'Content-Type': 'application/json',
	    		},
	    		body: JSON.stringify({
	    			email: data.email.toLowerCase(),
	    			password: data.password
	    		})
            };

            const response = await fetch(`${Config.SERVER_URL}/users/login`, params);
            if (!response) {
                throw response
            }

            const responseJson = await response.json();

            if (responseJson.message === 'Auth success') {
            	ls.save('userToken', responseJson.user_token).then(() => {
            		this.isLoader = false;
    				this.isLogin = true;
            	})
            } else if (responseJson.message === 'Authorization was successful. Enter the two-factor code.') {
                this.isLoader = false;
                this.isTwoFactor = true;
            } else {
            	this.isLoader = false;
            	Alert.alert(responseJson.message)
            }
    	} catch (error) {
    		this.isLoader = false;
    		console.log(error);
    	}
    }

    @action async createAccount(data: Object) {
        try {
            this.isSuccessCreateAccount = false;
            this.isLoader = true;
            const params = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: data.email,
                    name: data.fullName,
                    password: data.password
                }),
            };

            const response = await fetch(`${Config.SERVER_URL}/users/new`, params);
            if (!response) {
                throw response
            }

            const responseJson = await response.json();

            if (responseJson.message !== 'User already exist!') {
                Alert.alert(responseJson.message);
                this.isLoader = false;
                this.isSuccessCreateAccount = true;
                return this.isSuccessCreateAccount = false;
            } else {
                this.isLoader = false;
                Alert.alert(responseJson.message);
            }
        } catch (error) {
            this.isLoader = false;
            console.log(error);
        }
    }

    @action async recoverAccount() {
    	try {

    	} catch(error) {
            console.log(error);
    	}
    }

    @action async logout() {
        try {

        } catch (error) {
            console.log(error);
        }
    }

    @action async uploadAvatar(data: Object) {
        try {

        } catch (error) {
            console.log(error);
        }
    }

    @action async changePassword(data: Object) {
        try {
            this.isUpdatePassword = false;
            this.isIncorrectPassword = false;
            const userToken = await ls.get('userToken');
            if (!userToken) {
                throw userToken
            }
            
            const params = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': userToken,
                },
                body: JSON.stringify({
                    old: data.old,
                    new: data.new
                }),
            };

            const response = await fetch(`${Config.SERVER_URL}/users/change-password`, params);
            if (!response) {
                throw response
            }

            const responseJson = await response.json();

            if (responseJson.message === 'Password update') {
                Alert.alert(responseJson.message);
                this.isUpdatePassword = true;
            } else {
                this.isIncorrectPassword = true;
                this.isUpdatePassword = false;
                Alert.alert(responseJson.message);
            }
        } catch (error) {
            this.isUpdatePassword = false;
            console.log(error);
        }
    }
}