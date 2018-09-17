import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, ScrollView, RefreshControl, Text, Dimensions, ListView, Alert } from 'react-native';
import Markdown from 'react-native-simple-markdown';
import Moment from 'react-moment';
import { observer, inject } from 'mobx-react/native';
import { when } from "mobx";

import BottomNavigator from './layouts/BottomNavigator';
import Pageloader from './layouts/Pageloader';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth } = Dimensions.get('window');

function parseNotificationText (text) {
    return text.replace(/(<([^>]+)>)/ig,'');
}

class EmptyNotifications extends React.Component {
  render() {
    return (
        <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 18 }}>Notifications not found</Text>
        </View>
    );
  }
}

type Props = {};
export default @inject("notificationsStore") @observer class Notifications extends Component<Props> {
    constructor(props: Object) {
        super(props);
        this.state = {
            isLoaderPage: true,
            notificationsList: [],
            isRefreshShow: false
        };
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: "Notifications",
            headerLeft: null,
            gesturesEnabled: false,
        };
    };

    componentDidMount() {
        this.props.notificationsStore.getNotifications();
    }

    changePage(e) {
        this.props.navigation.navigate(e);
    }

    render() {
        if (this.props.notificationsStore.isLoader) {
            return (<Pageloader title="Loading notifications..." />);
        }

        let notifications = this.props.notificationsStore.notifications.map(function (el, i) {
            return (
                <View style={styles.row} key={i}>
                    <View style={styles.rowFront}>
                        <Markdown>
                            {parseNotificationText(el.title)}
                        </Markdown>
                         <Moment
                            element={Text}
                            format="DD MMM in HH:mm"
                            style={{marginTop: 10}}
                        >
                            {el.date}
                        </Moment>
                    </View>
                </View>
            )
        }, this);

        return (
            <View style={styles.container}>
                <StatusBar barStyle='light-content' />
                <ScrollView
                    contentInset={{bottom: 80}}
                    refreshControl={
                        <RefreshControl
                            onRefresh={() => this.props.notificationsStore.refreshNotifications()}
                            refreshing={this.props.notificationsStore.isRefreshLoader}
                            progressBackgroundColor="#EBEBEB"
                        />
                    }
                >
                    <View style={{ width: wp(100), display: 'flex', alignItems: 'center' }}>
                        {this.props.notificationsStore.notifications.length !== 0 ? notifications : <EmptyNotifications />}
                    </View>
                </ScrollView>
                <BottomNavigator
                    changePage={this.changePage.bind(this)}
                    activePage="Notifications"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    сontainer: {
        flex: 1,
        backgroundColor: '#e8ebee',
        alignItems: 'center',
        justifyContent: 'center'
    },
    row: {
        width: wp(80),
        marginTop: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowOpacity: 0.5,
        shadowRadius: 50,
        shadowColor: '#535968',
        shadowOffset: {
            height: 20,
            width: 20
        }
    },
    rowFront: {
        backgroundColor: '#E8EBEE',
        height: 'auto',
        padding: 15,
        borderRadius: 5,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#F44336',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 15,
        borderRadius: 5,
    },
    rowBack_text: {
        color: '#FFFFFF'
    },
});