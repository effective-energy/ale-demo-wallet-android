import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

type Props = {};
export default class Nointernet extends Component<Props> {
	constructor(props) {
        super(props);
	    this.state = {};
    }

    render() {
    	return (
    		<View style={styles.container}>
                <Text style={styles.text}>No Internet Connection</Text>
            </View>
    	);
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#07132f',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    text: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    }
});