import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { CachedImage } from "react-native-img-cache";

export default class MnemonicSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.sliderContainer}>
                <TouchableOpacity onPress={() => this.props.prevMnemonicWord()}>
                    <CachedImage
                        source={require('../../assets/images/icons/arrow-back.png')}
                        style={styles.sliderIcon}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
                <Text style={styles.slideCurrentWord}>{this.props.mnemonicPhrase[this.props.currentWord]}</Text>
                <TouchableOpacity onPress={() => this.props.nextMnemonicWord()}>
                    <CachedImage
                        source={require('../../assets/images/icons/arrow-next.png')}
                        style={styles.sliderIcon}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    sliderContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
    },
    sliderIcon: {
       width: 20,
       height: 20 
    },
    slideCurrentWord: {
        color: '#091529',
        fontSize: 16
    }
});