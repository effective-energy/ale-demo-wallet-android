import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { CachedImage } from "react-native-img-cache";

export default class BottomNavigator extends React.Component {
	constructor(props) {
        super(props);
	    this.state = {
            tabs: [
                {
                    icon: require('../../assets/images/navigation/bottom/wallet.png'),
                    activeIcon: require('../../assets/images/navigation/bottom/wallet-active.png'),
                    pageName: 'Wallets',
                }, {
                    icon: require('../../assets/images/navigation/bottom/history.png'),
                    activeIcon: require('../../assets/images/navigation/bottom/history-active.png'),
                    pageName: 'History',
                }, {
                    icon: require('../../assets/images/navigation/bottom/notifications.png'),
                    activeIcon: require('../../assets/images/navigation/bottom/notifications-active.png'),
                    pageName: 'Notifications',
                }, {
                    icon: require('../../assets/images/navigation/bottom/settings.png'),
                    activeIcon: require('../../assets/images/navigation/bottom/settings-active.png'),
                    pageName: 'Settings',
                }
            ]
        };
    }

    render() {
        let navigations = this.state.tabs.map(function (el, i) {
            let icon = this.props.activePage === el.pageName ? el.activeIcon : el.icon;
            return (
                <TouchableOpacity
                    activeOpacity={0.9}
                    key={i}
                    style={[styles.navigationItem]}
                    onPress={e => this.props.changePage(el.pageName)}
                >
                    <CachedImage
                        style={styles.itemImage}
                        source={icon}
                    />
                    <Text style={[styles.itemTitle, this.props.activePage === el.pageName ? styles.itemTitleActive : styles.itemTitleDefault]}>
                        {el.pageName}
                    </Text>
                </TouchableOpacity>
            )
        }, this);

    	return (
    		<View style={styles.navigationContainer}>
                {navigations}
            </View>
    	)
    }
}

const styles = StyleSheet.create({
    navigationContainer: {
        width: '100%',
        height: 60,
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        flex: 1,
        borderTopColor: '#e8ebee',
        borderTopWidth: 2,
        backgroundColor: '#ffffff',
    },
    navigationItem: {
        width: '25%',
        height: 60,
        flex: 1,
        flexDirection: 'column',
        maxHeight: 60,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#ffffff',
    },
    itemImage: {
        width: 25,
        height: 25
    },
    itemTitle: {
        textAlign: 'center',
        position: 'relative',
        bottom: 2,
        fontSize: 12
    },
    itemTitleActive: {
        color: '#FFBB00'
    },
    itemTitleDefault: {
        color: '#000000'
    }
});