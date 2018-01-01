import React, { Component } from 'react';
import {View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native'

export default class Header extends Component {
    render () {
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={this.props.onBack}>
                    <Image style={{width: 20, height: 20}} source={require('../assets/icons/return.png')} />
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingLeft: 15,
        paddingTop: 5,
        paddingBottom: 5
    }
})