import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, TouchableOpacity } from 'react-native';
import { CachedImage } from "react-native-img-cache";

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth } = Dimensions.get('window');
let screenWidth = wp(80);

type Props = {};
export default class SuccessPayment extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Congratulations!',
            headerLeft: null,
        };
    };

    backToWalletsList() {
        this.props.navigation.push('Wallets');
    }

    render() {
        return (
            <View style={styles.pageContainer}>
                <StatusBar barStyle='light-content' />
                <View style={styles.pageRow}>
                    <Text style={{ fontSize: 20, textAlign: 'center' }}>
                        Your payment{'\n'}was successfully sent
                    </Text>
                    <CachedImage
                        source={require('../assets/images/icons/success-payment.png')}
                        style={styles.paymentIcon}
                        resizeMode='contain'
                    />
                </View>
                <TouchableOpacity
                    onPress={this.backToWalletsList.bind(this)}
                    style={styles.buttonBlock}
                >
                    <Text style={styles.buttonBlock_text}>
                        Back to wallets
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: '#e8ebee',
        alignItems: 'center',
    },
    pageRow: {
        marginTop: 50,
        width: screenWidth,
        display: 'flex',
        alignItems: 'center',
    },
    paymentIcon: {
        width: wp(80),
        height: wp(70),
        marginTop: 20,
    },
    buttonBlock: {
        backgroundColor: '#D1D8DD',
        borderRadius: 5,
        padding: 10,
        width: wp(80),
        marginTop: 20
    },
    buttonBlock_text: {
        color: "#091529",
        textAlign: 'center',
        fontSize: 16
    },
});