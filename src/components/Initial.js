import React, { Component } from 'react';
import ls from 'react-native-local-storage';
import Config from '../config';

import Pageloader from './layouts/Pageloader';

type Props = {};
export default class Initial extends Component<Props> {

    static navigationOptions = ({navigation}) => {
        return {
            gesturesEnabled: false,
            header: null,
        };
    };

    componentDidMount() {
        this.initialData();
    }

    async initialData () {
        const userToken = await ls.get('userToken');
        if (userToken === null) {
            return this.props.navigation.navigate('Login');
        } else {
            const params = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': userToken
                }
            }

            const response = await fetch(`${Config.SERVER_URL}/users/get-user-data`, params);
            if (!response) {
                throw response
            }

            const responseJson = await response.json();

            if (responseJson.message !== 'User is found') {
                ls.remove('userToken').then(() => {
                    return this.props.navigation.navigate('Login');
                })
            }
            return this.props.navigation.navigate('Wallets');
        }
    }

    render() {
        return(
            <Pageloader title="Loading application..." />
        );
    }
}