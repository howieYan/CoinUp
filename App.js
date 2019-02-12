import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  View,
  BackHandler
} from 'react-native';
import configAppNavigator from './AppNavigator';
// import SplashScreen from "react-native-splash-screen";
import Utils from "./src/Component/Utils";
import store from "./src/store/store";
import {Provider} from "react-redux";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      pmId: null,
      language: {},
      isSwiper: false,
      isLoggedIn: false,
      checkedLogin: false
    }
  }
  componentDidMount() {
    // AsyncStorage.clear();
    this.LoadData()
  }
  // async LoadLanguage () {
  //   try {
  //     // let lang = await AsyncStorage.getItem('lang');
  //     // if (!lang) {
  //     //   AsyncStorage.setItem('lang', 'tw');
  //     // }
  //     // let rest = await AsyncStorage.getItem('lang');
  //     let formData = new FormData();
  //     formData.append("lang", rest);
  //     let data = await Utils.postJSON(Utils.size.url + '/api/account/getLang', formData);
  //     if (Number(data.code) === 0) {
  //       this.setState({
  //         language: data.result,
  //       });
  //       this.LoadData(data.result)
  //       AsyncStorage.setItem('language', JSON.stringify(data.result));
  //     }
  //   }
  //   catch (e) {
  //     console.log(e)
  //   }
  // }
  async LoadData (record) {
    try {
      let Uid = await AsyncStorage.getItem('Uid');
      // if (record instanceof Array) {
      //   this.LoadLanguage()
      // } else {
        // SplashScreen.hide()
        if (Uid  === null) {
          this.setState({isLoggedIn: true})
        } else if (Uid  !== null) {
          this.setState({isLoggedIn: false})
        }

      // }
    }
    catch (e) {
      console.log(e)
    }
  }

  render() {
    // const { dispatch, nav } = this.props;
    // const navigation = addNavigationHelpers({
    //     dispatch,
    //     state: nav,
    // });

    const AppNavigator = configAppNavigator(this.state.isLoggedIn, this.state.isSwiper, this.state.language);
    return (
        <Provider store={store}>
          <AppNavigator/>
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;
