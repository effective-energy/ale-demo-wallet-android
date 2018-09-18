import React from 'react';
import { Text, View, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';

export default class Pageloader extends React.Component {
	constructor(props) {
        super(props);
	    this.state = {};
    }

    render() {
    	return (
    		<View
                style={[styles.loading, this.props.isDark && styles.darkLoading]}
            >
                <StatusBar
                    barStyle={'light-content'}
                />
                <ActivityIndicator
                    size="large"
                    color="#CCCCCC" 
                    style={styles.spinner}
                />
                <Text
                    style={[styles.loadingTitle, this.props.isDark && styles.whiteTitle]}
                >
                    {this.props.title}
                </Text>
            </View>
    	)
    }
}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        flex: 1,
        zIndex: 2,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    darkLoading: {
        backgroundColor: '#08142F',
    },
    loadingTitle: {
        fontSize: 18
    },
    whiteTitle: {
        color: '#FFFFFF',
    },
    spinner: {
        marginBottom: 20
    }
});