import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableHighlight, TouchableOpacity } from 'react-native';
import isIphoneX from '../../config/isIphoneX';
import Carousel from 'react-native-snap-carousel';
import { CachedImage } from "react-native-img-cache";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);
const itemWidth = slideWidth + itemHorizontalMargin * 2;

const sliderWidth = viewportWidth;

export default class WalletsSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{
                "_id": "1",
                "name": "Wallet 1",
                "balance": 1250,
                "address":"RBW0fAGrhgNbXXyOHZWdDLNtMNuPx0HrHjNqvryBwBwBqOD",
                "total_transactions": 13
            }, {
                "_id": "1",
                "name": "Wallet 2",
                "balance": 2250,
                "address":"RBW0fAGrhgNbXXyOHZWdDLNtMNuPx0HrHjNqvryBwBwBqO1",
                "total_transactions": 13
            }, {
                "_id": "1",
                "name": "Wallet 3",
                "balance": 3250,
                "address":"RBW0fAGrhgNbXXyOHZWdDLNtMNuPx0HrHjNqvryBwBwBqO2",
                "total_transactions": 13
            }, {
                "_id": "1",
                "name": "Wallet 4",
                "balance": 4250,
                "address":"RBW0fAGrhgNbXXyOHZWdDLNtMNuPx0HrHjNqvryBwBwBqO2",
                "total_transactions": 13
            }]
        };
    }

    _renderItem ({item}) {
        return (
            <View style={styles.walletsSlider_container}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ marginBottom: 20 }}>
                        <Text style={{ backgroundColor: 'transparent', color: '#091628', fontSize: 18, textAlign: 'left' }}>{ item.name }</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                            <Text style={{ color: '#091628', fontSize: 24 }}>{item.balance}</Text>
                            <CachedImage
                                source={require('../../assets/images/icons/alecoin.png')}
                                style={{width: wp(5), height: wp(5), paddingLeft: 5 }}
                            />
                        </View>
                    </View>
                    <View>
                        <TouchableHighlight
                            onPress={() => this.props.openWalletDetailsScreen(item)}
                        >
                            <CachedImage
                                style={{width: 25, height: 25}}
                                source={require('../../assets/images/icons/wallet-menu.png')}
                            />
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={{ maxWidth: wp(75), display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        style={{ backgroundColor: '#091628', borderRadius: 6, display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: 5, alignItems: 'center', width: wp(32) }}
                        onPress={e => this.props.sendMoney(item.address)}
                    >
                        <CachedImage
                            style={{width: 15, height: 15, marginRight: 5 }}
                            source={require('../../assets/images/icons/send.png')}
                        />
                        <Text style={{ color: '#ffffff', fontSize: 16 }}>Send</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ backgroundColor: '#FFBB00', borderRadius: 6, display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: 5, alignItems: 'center', width: wp(32) }}
                        onPress={e => this.props.requestMoney(item.address)}
                    >
                        <CachedImage
                             style={{width: 15, height: 15, marginRight: 5 }}
                            source={require('../../assets/images/icons/request.png')}
                        />
                        <Text style={{ color: '#000000', fontSize: 16 }}>Request</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View>
                <Carousel
                    ref={c => this._sliderRef = c}
                    layout={'default'}
                    loop={false}
                    layoutCardOffset={50}
                    hasParallaxImages={true}
                    containerCustomStyle={styles.walletsSlider_container_custom}
                    data={this.state.data}
                    renderItem={item => this._renderItem(item)}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    walletsSlider_container: {
        backgroundColor: '#e7ebee',
        padding: 20,
        borderRadius: 6,
    },
    walletsSlider_container_custom: {
        marginTop: isIphoneX === true ? 30 : 20,
        overflow: 'visible',
    },
});