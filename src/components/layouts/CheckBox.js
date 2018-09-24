import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View, Dimensions } from 'react-native';
import { CachedImage } from "react-native-img-cache";

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth } = Dimensions.get('window');

export default class CheckBox extends React.Component {
	constructor(props) {
        super(props);
	    this.state = {};
    }

    render() {
        let isCheked = this.props.isCheked ? require('../../assets/images/icons/check.png') : null;
    	return (
    		<TouchableOpacity
                onPress={this.props.toggleCheckBox}
                style={styles.checkBoxContainer}
            >
                <View style={styles.checkBoxRow}>
                    {isCheked !== null && <CachedImage source={isCheked} style={{ width: 15, height: 15 }} resizeMode='contain' />}
                </View>
                <Text style={{ paddingLeft: 15, paddingRight: 15 }}>{this.props.value}</Text>
            </TouchableOpacity>
    	)
    }
}

const styles = StyleSheet.create({
    checkBoxContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    checkBoxRow: {
        width: 25,
        height: 25,
        backgroundColor: '#D1D8DD',
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
});