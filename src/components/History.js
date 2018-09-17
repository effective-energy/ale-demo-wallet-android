import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, ScrollView, RefreshControl, Text, Dimensions, ListView, Alert } from 'react-native';

import BottomNavigator from './layouts/BottomNavigator';

type Props = {};
export default class History extends Component<Props> {
    constructor(props: Object) {
        super(props);
        this.state = {};
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: "Operations history",
            headerLeft: null,
            gesturesEnabled: false,
        };
    };

    changePage(e) {
        this.props.navigation.navigate(e);
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle='dark-content' />
                <ScrollView
                    contentInset={{bottom: 80}}
                    refreshControl={
                        <RefreshControl
                            tintColor="#FFFFFF"
                            progressBackgroundColor="#EBEBEB"
                        />
                    }
                >

                </ScrollView>
                <BottomNavigator
                    changePage={this.changePage.bind(this)}
                    activePage="History"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8ebee',
        alignItems: 'center',
    }
});
