import React from 'react';
import {Text, View, StyleSheet, ScrollView, Image, TouchableOpacity, AsyncStorage, ToastAndroid} from 'react-native';
import Utils from './Utils';
import {Loading} from "./Loading";
export default class Banner extends React.Component {
    mounted = false;
    constructor(props) {
        super(props);
        // 设置初识值
        this.state = {
            currentPage: 0,
            list: [],
        }
    }
    // 时间器
    static defaultProps = {
        duration: 3000,
    }
    // 实现滚动
    componentWillUnmount() {
        this.mounted = false;
    }

    componentWillMount() {
        this.mounted = true;
        this.LoadData()
    }

    async LoadData () {
        try {
            let data = await Utils.LoadGet(Utils.size.url + '/api/projects/getBanner');
            console.log(data)
            if (Number(data.code === 0)) {
                if (this.mounted) {
                    this.setState({
                        list: data.result
                    })
                }
            } else {
                Loading.Toast(data.message);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    // 开启定时器
    AstateTimer () {
        // 拿到scrollView
        let scrollView = this.refs.scrollView;
        //  添加定时器
        let leng = this.state.list.length;
        let _this = this;
        this._timer = setInterval(function () {
            // 设置原点
            let activePage = 0;
            let imgLen = leng;
            if ((_this.state.currentPage + 1) >= imgLen) {
                activePage = 0;
            } else {
                activePage = _this.state.currentPage + 1;
            }
            // 更新状态
            _this.setState({
                currentPage: activePage
            });
            // 滚动
            let offsetX = activePage * Utils.size.width;
            scrollView.scrollResponderScrollTo({x: offsetX, y: 0, animated: true});
        }, this.props.duration)
    }
    render() {
        return (
            <View style={styles.headerBanner}>
                <ScrollView
                    ref="scrollView"
                    // 水平方向
                    horizontal={true}
                    // 弹动效果
                    automaticallyAdjustContentInsets={false}
                    // 隐藏水平滚动条
                    showsHorizontalScrollIndicator={false}
                    // 自动分页
                    pagingEnabled={true}
                    // 滚动动画结束时
                    onMomentumScrollEnd={(e) => this.onAnimationEnd(e)}
                    // 当用户开始拖动此视图时调用此函数。
                    onScrollBeginDrag={()=>this.onScrollBeginDrag()}
                    // 当用户停止拖动此视图时调用此函数。
                    onScrollEndDrag={()=>this.onScrollEndDrag()}
                >
                    {this.renderAllImage()}
                </ScrollView>
                {/*返回指示器 */}
                <View style={styles.pageView}>
                    {this.renderPageCircle()}
                </View>
            </View>
        );
    }
    // 当用户开始拖动此视图时调用此函数
    onScrollBeginDrag(){
        // 当手指按到scrollview时停止定时任务
        clearInterval(this._timer);
    }
    // 当用户停止拖动此视图时调用此函数
    onScrollEndDrag(){
        this.AstateTimer();
    }

    // 圆点
    renderPageCircle () {
        let allCircle = [];
        let style;
        let leng = this.state.list.length;
        for (let i = 0; i < leng; i++) {
            // 判断
            style = (i === this.state.currentPage) ? {backgroundColor: '#575857'} : {backgroundColor: '#D2D3D2'};
            allCircle.push(
                <View key={i} style={[styles.pageViewSize, style]}/>
            )
        }
        return allCircle;
    }
    // 图片
    renderAllImage () {
        let allChild = [];
        this.state.list.forEach((v, i) => {
            allChild.push(
                <View  style={styles.headerBanner} key={i}>
                    <Image source={{ uri: v.banner_url }} style={styles.headerBanner}/>
                </View>
            )
        });
        return allChild;
    }
    // 滚动动画结束时调用
    onAnimationEnd (e) {
        // 水平方向的偏移量
        let offsetX = e.nativeEvent.contentOffset.x;
        // 当前的页数
        let currentPage = Math.floor(offsetX / Utils.size.width);
        // 更新状态
        this.setState({
            currentPage: currentPage
        })
    }

}
const styles = StyleSheet.create({
    headerBanner: {
        width: Utils.size.width,
        height: 100
    },
    pageView: {
        position: 'absolute',
        bottom: 5,
        width: Utils.size.width,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    pageViewSize: {
        width: 5,
        height: 2,
        marginLeft: 3,
        backgroundColor: '#E3E4E3',
    }
});

