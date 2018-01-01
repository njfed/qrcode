import React, { Component } from 'react';
import {View, Text, Button, StyleSheet, FlatList, Linking} from 'react-native'
import storage from '../storage'

class FavItem extends Component {
    removeFav () {
        const data = this.props.item
        storage.removeFav(data).then(() => {
            this.props.onRemove(data)
        })
    }

    openUrl () {
        Linking.openURL(this.props.item).catch(e => console.error(e))
    }

    isUrl () {
        return /https?:\/\/.+/.test(this.props.item)
    }

    render () {
        return (
            <View style={styles.item}>
                <Text style={styles.itemData}>{this.props.item}</Text>
                <View style={{alignItems: 'stretch'}}>
                    <View style={{
                        flexDirection: 'row', 
                        alignItems: 'center', 
                        justifyContent: 'flex-end',
                        marginTop: 8
                    }}>
                        <Button title='删除' onPress={this.removeFav.bind(this)}></Button>
                        {this.isUrl() ?
                        <View style={{marginLeft: 4}}>
                            <Button title='打开网址' onPress={this.openUrl.bind(this)}></Button>
                        </View> : null}
                    </View>
                </View>
            </View>
        )
    }
}

export default class Favorite extends Component {
    render () {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.favlist}
                    renderItem={({item}) => <FavItem item={item} onRemove={this.props.onRemove}/>}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    item: {
        alignItems: 'stretch',
        padding: 15,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderBottomColor: '#ddd'
    },
    itemData: {
        fontSize: 20,
        color: '#999'
    }
})