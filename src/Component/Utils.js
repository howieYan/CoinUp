import React, {Component} from 'react';
import {Platform, Dimensions, PixelRatio} from 'react-native';
import axios from 'axios';
import moment from 'moment';
//  1、feach
//  2、获取屏幕的高度
//  3、获取最小线宽
export default  {
    size: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        os: Platform.OS,
        // url: 'http://control.omo.services'
        url: 'https://www.trade.omo.news'
    },
    formatTs (ts, format = 'YYYY-MM-DD HH:mm') {
        let time = moment.unix(ts);
        let retVal = time.format(format);
        // debug && console.debug(`${ts} => ${retVal}(${time.format()})`)
        return retVal;
    },
    formatTime (str, format = 'YYYY-MM-DD HH:mm:ss') {
      let retVal = ''
      if (str) {
        let time = moment(str)
        // retVal = time.format(format)
        retVal = time.unix(Number)
      }
      // debug && console.debug(`${str} => ${retVal}(${time.format()})`)
      return retVal
    },
    pixel: 1 / PixelRatio.get(),
    fontScale: PixelRatio.getFontScale(),
    setSpText(size) {
        let scale = Math.min(this.size.height / this.size.height,  this.size.width / this.size.width);
        size = Math.round((size * scale + 0.5) * PixelRatio.get() / PixelRatio.getFontScale());
        return size / PixelRatio.get();
    },
    LoadPost (url, params, callback) {
        return new Promise((resolve, reject) => {
            try {
                const config = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type':'application/json',
                        // 'Content-Type':'multipart/form-data'
                    },
                    body: params,
                }
                fetch(url, config)
                    .then((response) => {
                        resolve(response.json());
                    })
                    .then((responseData) => {
                        resolve(responseData);
                    })
                    .catch((error) => {
                        return reject(error);
                    });
            }
            catch (e) {
                console.error(`Exception: ${e}`);
                reject(e);
            }
        });
    },
    LoadGet(url) {
        return fetch(url)//默认是GET
        .then((response) => {
            if (response.ok) {
              return response.json()
            } else {
              alert('服务器繁忙，请稍后再试；\r\nCode:' + response.status)
            }
        })
        .then((result) => {
            return result
        })

    }
}
