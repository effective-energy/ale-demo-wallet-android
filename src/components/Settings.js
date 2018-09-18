import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, ScrollView, RefreshControl, Text, Dimensions, ListView, Alert, Switch, TouchableOpacity } from 'react-native';
import { CachedImage } from "react-native-img-cache";
import ls from 'react-native-local-storage';

import BottomNavigator from './layouts/BottomNavigator';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth } = Dimensions.get('window');

type Props = {};
export default class Settings extends Component<Props> {
    constructor(props: Object) {
        super(props);
        this.state = {
            isTwoAuthActive: false,
        };
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: "Settings",
            headerLeft: null,
            gesturesEnabled: false,
        };
    };

    changePage(e) {
        this.props.navigation.navigate(e);
    }

    logout() {
        ls.remove('userToken').then(() => {
            return this.props.navigation.navigate('Login');
        })
    }

    toggleSwitch() {
        this.setState({
           isTwoAuthActive: !this.state.isTwoAuthActive, 
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle='light-content' />
                 <ScrollView
                    contentInset={{bottom: 80}}
                >
                    <View
                        style={[styles.listView, {marginTop: 40}]}
                    >
                        <View
                            style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
                        >
                            <View
                                style={{width: 30, height: 30, backgroundColor: '#2196F3', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                            >
                                <CachedImage
                                    source={require('../assets/images/icons/twoauth.png')}
                                    style={{width: 20, height: 20}}
                                />
                            </View>
                            <Text
                                style={{fontSize: 18, color: '#34343e', marginLeft: 10}}
                            >
                                Two-factor auth
                            </Text>
                        </View>
                        <Switch
                            value={this.state.isTwoAuthActive}
                            trackColor="#cccccc"
                            onValueChange={this.toggleSwitch.bind(this)}
                        />
                    </View>

                    <View style={{ marginTop: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={this.logout.bind(this)}
                        >
                            <Text
                                style={{ color: "#34343e", textAlign: 'center', fontSize: wp(5) }}
                            >
                                Sign out
                            </Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
                <BottomNavigator
                    changePage={this.changePage.bind(this)}
                    activePage="Settings"
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
    },
    listView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        width: wp(100),
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 1,
        height: 50
    },
    buttonContainer: {
        backgroundColor: '#ffd24f',
        borderRadius: 4,
        padding: 10,
        width: wp(80),
        marginBottom: 20
    },
});
