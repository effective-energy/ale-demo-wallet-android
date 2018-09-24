import React, { Component } from 'react';
import { View, StyleSheet, Text, StatusBar, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { CachedImage } from "react-native-img-cache";

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth } = Dimensions.get('window');

type Props = {};
export default class Attention extends Component<Props> {
	constructor(props) {
        super(props);
	    this.state = {};
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Attention'
        };
    };

    openRecoveryPhrasePage() {
        this.props.navigation.navigate('RecoveryPhrase', {
            walletName: this.props.navigation.state.params.walletName
        });
    }

    render() {
    	return (
    		<View style={styles.container}>
                <StatusBar barStyle='light-content' />
                <ScrollView refreshing={false}>
                    <View style={styles.pageRow}>
                        <CachedImage
                            source={require('../assets/images/icons/lock.png')}
                            style={styles.lockIcon}
                            resizeMode='contain'
                        />
                        <Text style={styles.attention_text}>
                            On the following screen, you will see a set of 12 random words. This is your wallet backup phrase. It can be entered in any version of ALE application in order to back up or restore your wallet's funds and private key.
                        </Text>
                        <Text style={styles.attention_text}>
                            Make sure nobody looks into your screen unless you want them to have access to your funds.
                        </Text>
                        <TouchableOpacity
                            onPress={this.openRecoveryPhrasePage.bind(this)}
                            style={styles.buttonBlock}
                        >
                            <Text style={styles.buttonBlock_text}>
                                My data protected
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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
    pageRow: {
        width: wp(80),
        display: 'flex',
        alignItems: 'center',
        marginTop: 20
    },
    lockIcon: {
        width: 120,
        height: 120,
        marginBottom: 10,
    },
    buttonBlock: {
        backgroundColor: '#D1D8DD',
        width: wp(80),
        padding: 10,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonBlock_text: {
        color: '#091529',
        fontSize: 18
    },
    attention_text: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        color: '#091529',
    }
});