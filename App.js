/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import MainPage from './views/Main'
import Favorite from './views/Favorite'
import storage from './storage'

export default class App extends Component<{}> {
  constructor (props) {
    super(props)
    this.state = {selectedTab: '扫码', favlist: []}
  }

  onDataChange () {
    this.updateFavList()
  }

  updateFavList () {
    storage.getFavList().then((data=[]) => {
        this.setState({favlist: data})
        this.refs.main.updateFav()
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TabNavigator>
          <TabNavigator.Item
            selected={this.state.selectedTab === '扫码'}
            title='扫码'
            renderIcon={() => <Image source={require('./assets/icons/homepage.png')} style={styles.tabIcon}/>}
            onPress={() => this.setState({selectedTab: '扫码'})}
          >
            <MainPage ref='main' onDataChange={this.onDataChange.bind(this)} />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === '收藏'}
            title='收藏'
            renderIcon={() => <Image source={require('./assets/icons/like.png')} style={styles.tabIcon}/>}
            onPress={() => this.setState({selectedTab: '收藏'})}
          >
            <Favorite favlist={this.state.favlist} onRemove={this.updateFavList.bind(this)}/>
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    );
  }

  componentDidMount () {
    this.updateFavList()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  tabIcon: {
    width: 20,
    height: 20
  }
});
