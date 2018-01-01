import React, { Component } from 'react';
import {
    Alert,
    View, 
    Text, 
    Button,
    Image,
    StyleSheet, 
    StatusBar,
    Linking,
    TouchableHighlight
} from 'react-native'

import Camera from 'react-native-camera'
import Header from '../components/Header'
import storage from '../storage'

export default class Main extends Component {
    constructor (props) {
        super(props)
        // this.state = {scanning: true, result: ''}
        this.state = {
            scanning: true, // is scanning
            result: '', // scan result
            fav: false // is added to favorite
        }
    }

    updateFav () {
        storage.containsFav(this.state.result).then(bHas => {
            this.setState({fav: bHas})
        })
    }

    onBarCodeRead (res) {
        // this.refs.camera.stopPreview()
        storage.containsFav(res.data).then(bHas => {
            this.setState({scanning: false, result: res.data, fav: bHas})
        })
    }

    toggleFav () {
        const newVal = !this.state.fav
        const result = this.state.result

        if (newVal) {
            storage.saveFav(result)
        } else {
            storage.removeFav(result)
        }

        this.setState({fav: newVal})
        this.props.onDataChange && this.props.onDataChange()
    }

    isUrl () {
        return /https?:\/\/.+/.test(this.state.result)
    }

    openUrl () {
        Linking.openURL(this.state.result).catch(e => console.error(e))
    }

    retry () {
        this.setState({scanning: true, result: ''})
    }

    render () {
        return (
            <View style={styles.container}>
            {
                this.state.scanning ?
                <Camera
                    ref='camera'
                    onBarCodeRead={this.onBarCodeRead.bind(this)}
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fit}>
                </Camera>
                :
                <View style={styles.result}>
                    <Header onBack={this.retry.bind(this)}></Header>
                    <View style={styles.scanResult}>
                        <Text style={this.isUrl() ? styles.link : styles.plainText}>{this.state.result}</Text>
                        <View style={{
                            flexDirection: 'row', 
                            alignItems: 'center', 
                            justifyContent: 'flex-end',
                            marginTop: 20
                        }}>
                            <TouchableHighlight onPress={this.toggleFav.bind(this)}>
                                <Image style={{width: 24, height: 24}} source={this.state.fav ? require('../assets/icons/like_fill.png') : require('../assets/icons/like.png')} />
                            </TouchableHighlight>
                            {this.isUrl() ?
                            <View style={{marginLeft: 10}}>
                                <Button title='打开网址' onPress={this.openUrl.bind(this)}></Button>
                            </View> : null}
                        </View>
                    </View>
                </View>
            }
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
    preview: {
        // width: 300,
        // marginTop: 100,
        // marginBottom: 100,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#333'
    },
    plainText: {
        fontSize: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        borderStyle: 'solid',
        padding: 8
    },
    link: {
        color: 'deepskyblue',
        fontSize: 20,
        lineHeight: 24,
        borderWidth: 1,
        borderColor: '#ddd',
        borderStyle: 'solid',
        padding: 8
    },
    result: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    scanResult: {
        flex: 1,
        padding: 15,
        alignItems: 'stretch',
        marginTop: 50
    }
})
