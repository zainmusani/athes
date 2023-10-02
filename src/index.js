// @flow
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {AppRegistry, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {MessageBar} from './components';
import configureStore from './store';
import AppNavigator from './navigator';
import applyConfigSettings from './config';
import AppStyles from './theme/AppStyles';
import RNBootSplash from 'react-native-bootsplash';
import DataHandler from './services/DataHandler';

const reducers = require('./reducers').default;

applyConfigSettings();

export default class App extends Component {
  state = {
    isLoading: true,
    store: configureStore(reducers, () => {
      this._loadingCompleted();
      this.setState({isLoading: false});
    }),
  };

  _loadingCompleted() {
    DataHandler.setStore(this.state.store);
  }

  componentDidMount() {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      setTimeout(() => {
        RNBootSplash.hide();
      }, 800);
    });
  }

  render() {
    if (this.state.isLoading) {
      return null;
    }
    return (
      <View style={AppStyles.flex}>
        <Provider store={this.state.store}>
          <SafeAreaProvider>
            <AppNavigator />
          </SafeAreaProvider>
        </Provider>
        <MessageBar />
      </View>
    );
  }
}

AppRegistry.registerComponent('AutoConnect', () => App);
console.disableYellowBox = true;
