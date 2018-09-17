// @flow
import { observable, action } from "mobx";
import ls from 'react-native-local-storage';
import Config from '../config';
import { Alert } from 'react-native';

export default class NotificationsStore {
    @observable notifications = [];
    @observable isLoader = false;
    @observable isRefreshLoader = false;

    @action async getNotifications() {
    	try {
    		if (this.notifications.length !== 0) {
    			return false;
    		}
    		this.isLoader = true;
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

	        const response = await fetch(`${Config.SERVER_URL}/notifications`, params);
	        if (!response) {
	            throw response
	        }

	        const responseJson = await response.json();
	        this.notifications = responseJson.reverse();
	        this.isLoader = false;
    	} catch (error) {
    		console.log(error);
    		this.isLoader = false;
    	}
    }

    @action async refreshNotifications() {
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

	        const response = await fetch(`${Config.SERVER_URL}/notifications`, params);
	        if (!response) {
	            throw response
	        }

	        const responseJson = await response.json();
	        this.notifications = responseJson.reverse();
	        this.isRefreshLoader = false;
    	} catch (error) {
    		console.log(error);
    		this.isRefreshLoader = false;
    	}
    }

    @action async removeNotification(data: Object) {
    	try {
    		const userToken = await ls.get('userToken');
	        if (!userToken) {
	            throw userToken
	        }

	        let notifications = [];
	        notifications.push(data.id);

	        const params = {
	            method: 'DELETE',
	            headers: {
	                'Accept': 'application/json',
	                'Content-Type': 'application/json',
	                'Authorization': userToken
	            },
	            body: JSON.stringify({
	                list: notifications
	            })
	        }

	        const response = await fetch(`${Config.SERVER_URL}/notifications/list`, params);
	        if (!response) {
	            throw response
	        }

	        const responseJson = await response.json();

	        Alert.alert(responseJson.message);
	        
	        let notificationsList = [...this.notifications];
	        notificationsList.splice(data.index, 1);
	        this.notifications = notificationsList;
    	} catch (error) {
    		console.log(error)
    	}
    }
}