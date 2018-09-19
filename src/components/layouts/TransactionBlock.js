import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import Moment from 'react-moment';
import 'moment-timezone';
import { CachedImage } from "react-native-img-cache";

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}
const { width: viewportWidth } = Dimensions.get('window');

export default class TransactionBlock extends Component {
	constructor(props) {
        super(props);
	    this.state = {};
    }

    render() {
        let transactions = this.props.data.map(function (el, i) {
            let transactionType = this.props.activeWalletAddress === el.walletAddress ? 'SENT' : 'RECIEVED';
            let transactionTypeBlockColor = this.props.activeWalletAddress === el.walletAddress ? '#091629' : '#FFBB00';
            let transactionTypeBlockImage = this.props.activeWalletAddress === el.walletAddress ? require('../../assets/images/icons/history-send.png') : require('../../assets/images/icons/history-request.png');
            let transactionTypeMoneySymbol = this.props.activeWalletAddress === el.walletAddress ? '-' : '+';
            return (
                <View style={styles.transactionBlockContainer} key={i}>
                    <View style={styles.transactionBlockRow}>
                        <View style={[styles.transactionBlockType, {backgroundColor: transactionTypeBlockColor}]}>
                            <CachedImage
                                source={transactionTypeBlockImage}
                                style={styles.transactionBlockIcon}
                                resizeMode='contain'
                            />
                        </View>
                        <View style={styles.transactionBlockInfo}>
                            <Text>{transactionType}</Text>
                            <Moment
                                element={Text}
                                format="DD MMM in HH:mm"
                            >
                                {el.timestamp}
                            </Moment>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.transactionBlockAmount}>{transactionTypeMoneySymbol}{el.count} ALE</Text>
                    </View>
                </View>
            )
        }, this);

        if (this.props.data.length === 0) {
            return (
                <View style={styles.notFoundBlock}>
                    <Text style={styles.notFoundBlock_text}>Transactions not found</Text>
                </View>
            );
        }

        return (
            <View style={styles.transactionBlock}>
                {transactions}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    notFoundBlock: {
        marginTop: 20
    },
    notFoundBlock_text: {
        fontSize: 18
    },
    transactionBlock: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 20
    },
    transactionBlockContainer: {
        padding: 10,
        backgroundColor: '#FFFFFF',
        width: wp(80),
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 1,
        marginBottom: 20,
        shadowOpacity: 0.5,
        shadowRadius: 50,
        shadowColor: '#535968',
        shadowOffset: {
            height: 20,
            width: 20
        },
    },
    transactionBlockRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    transactionBlockIcon: {
        width: 20,
        height: 20
    },
    transactionBlockType: {
        width: 40,
        height: 40,
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    transactionBlockInfo: {
        marginLeft: 10
    },
    transactionBlockAmount: {
        textAlign: 'right',
        fontSize: 16
    },
    transactionBlockDescription: {
        textAlign: 'right'
    }
});