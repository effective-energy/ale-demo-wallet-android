import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, TextInput, Dimensions, TouchableOpacity, Alert, ScrollView } from 'react-native';
import ls from 'react-native-local-storage';
import { observer, inject } from "mobx-react";
import { when } from "mobx";
import Spinner from './layouts/Spinner';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth } = Dimensions.get('window');

export default @inject("userStore") @observer class ChangePassword extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            newPassword: '',
            newPasswordConfirm: '',
            isShowSpinner: false,
        };

        this.changePassowrd = this.changePassowrd.bind(this);
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Change password'
        };
    };

    watcher = when(() => this.props.userStore.isUpdatePassword === true, () => {
        this.setState({
            isShowSpinner: false,
        });
        this.props.navigation.push('Settings');
    });

    watcher = when(() => this.props.userStore.isIncorrectPassword === true, () => {
        this.setState({
            isShowSpinner: false,
        });
    });

    changePassowrd() {
        if (this.state.oldPassword === '') {
            return Alert.alert('Enter current password');
        }

        if (this.state.newPassword === '') {
            return Alert.alert('Enter new password');
        }

        if (this.state.newPasswordConfirm === '') {
            return Alert.alert('Confirm new password');
        }

        if (this.state.newPasswordConfirm !== this.state.newPassword) {
            return Alert.alert('New passwords do not match');
        }

        this.setState({
            isShowSpinner: true,
        });

        this.props.userStore.changePassword({
            old: this.state.oldPassword,
            new: this.state.newPassword
        });
    }

    render() {
        return (
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps='handled'
            >
                <StatusBar
                    barStyle='light-content'
                />
                { this.state.isShowSpinner === true && <Spinner />}
                <View>
                    <TextInput
                        secureTextEntry={true}
                        placeholder="Old password"
                        placeholderTextColor="#717e96"
                        style={styles.textInput}
                        onChangeText={(oldPassword) => this.setState({oldPassword})}
                        value={this.state.oldPassword}
                    />
                    <TextInput
                        secureTextEntry={true}
                        placeholder="New password"
                        placeholderTextColor="#717e96"
                        style={styles.textInput}
                        onChangeText={(newPassword) => this.setState({newPassword})}
                        value={this.state.newPassword}
                    />
                    <TextInput
                        secureTextEntry={true}
                        placeholder="Confirm new password"
                        placeholderTextColor="#717e96"
                        style={styles.textInput}
                        onChangeText={(newPasswordConfirm) => this.setState({newPasswordConfirm})}
                        value={this.state.newPasswordConfirm}
                    />
                    <TouchableOpacity
                        onPress={this.changePassowrd}
                        style={styles.buttonBlock}
                    >
                        <Text
                            style={styles.buttonBlock_text}
                        >
                            Change
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8ebee',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingBottom: 20,
    },
    textInput: {
        height: 40,
        width: wp(80),
        marginBottom: 20,
        padding: 6,
        color: '#34476F',
        borderBottomColor: '#445882',
        borderBottomWidth: 1,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        fontSize: 16
    },
    buttonBlock: {
        backgroundColor: '#D1D8DD',
        borderRadius: 5,
        padding: 10,
        width: wp(80),
        marginBottom: 20
    },
    buttonBlock_text: {
        color: "#091529",
        textAlign: 'center',
        fontSize: 16
    },
});