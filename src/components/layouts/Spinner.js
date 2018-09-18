import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

export default class Spinner extends React.Component {
	constructor(props) {
        super(props);
	    this.state = {};
    }

    render() {
        let borderStyle = this.props.isBorder === true ? {borderWidth: 1, borderColor: '#CCCCCC'} : null;
    	return (
            <View style={styles.spinnerContainer}>
                <View style={[styles.spinnerRow, borderStyle]}>
                    <ActivityIndicator
                        size="large"
                        color="#000000"
                        style={styles.spinnerLoader}
                    />
                </View>
            </View>
    	)
    }
}

const styles = StyleSheet.create({
    spinnerContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    spinnerRow: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 5,
    },
    spinnerLoader: {
        marginTop: 2,
        marginLeft: 2
    }
});