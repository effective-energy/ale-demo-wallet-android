import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform, StatusBar, Clipboard, Alert, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth } = Dimensions.get('window');
let screenWidth = wp(80);

export default class RequestMoney extends Component {
    constructor(props) {
        super(props);
        this.state = {
            receiverAddress: this.props.navigation.state.params.walletAddress,
        };
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Request money',
            headerTitleStyle: {
                color: '#000000'
            },
            headerStyle: {
                backgroundColor: '#FFFFFF'
            },
            headerTintColor: '#ffbb00',
        };
    };

    copyToClipboard = async () => {
        await Clipboard.setString(this.state.receiverAddress);
        return Alert.alert('Copied to clipboard');
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle='light-content' />
                <View style={styles.qrCodeContainer}>
                    <View style={{ marginBottom: 20, display: 'flex', alignItems: 'center' }}>
                        <QRCode
                            value={this.state.receiverAddress}
                            size={wp(60)}
                        />
                    </View>
                    <View>
                        <Text style={{ fontSize: wp(6), marginBottom: 10, textAlign: 'center' }}>RECEIVER ADDRESS:</Text>
                        <Text style={{ textAlign: 'center' }}>{this.state.receiverAddress}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={this.copyToClipboard}
                        style={{ backgroundColor: '#d1d8dd', width: wp(70), padding: 10, borderRadius: 5, marginTop: 20 }}
                    >
                        <Text style={{ textAlign: 'center', color: '#000000', fontSize: 18 }}>Copy to clipboard</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8ebee',
        alignItems: 'center',
        paddingTop: 20
    },
    qrCodeContainer: {
        width: wp(80),
        backgroundColor: '#ffffff',
        padding: wp(5),
        borderRadius: 6,
        marginTop: 15
    }
});
