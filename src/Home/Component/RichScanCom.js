import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    InteractionManager,
    Animated,
    Easing,
    Image,
    Alert,
    Vibration,
    Dimensions,
    Platform
} from 'react-native';
import {RNCamera} from 'react-native-camera';

export default class RichScanCom extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: navigation.state.params.name,
        headerTintColor: '#4e5d6f',
        headerTitleStyle:{
            flex:1,
            textAlign: 'center'
        },
        headerRight: <View />
    })

    constructor(props) {
        super(props);
        this.state = {
            show:true,
            language: {},
            animation: new Animated.Value(0),
        };
    }

    componentDidMount(){
        this.setState({
            language: this.props.navigation.state.params.language
        });
        InteractionManager.runAfterInteractions(()=>{
            this.startAnimation()
        });
    }
    startAnimation(){
        this.state.animation.setValue(0);
        Animated.timing(this.state.animation,{
            toValue:1,
            duration:1500,
            easing:Easing.linear,
        }).start(()=>this.startAnimation());
    }

    render() {
        let scanView = null;
        if (Platform.OS === 'ios') {
            scanView = (
                <RNCamera
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
                    flashMode={RNCamera.Constants.FlashMode.auto}
                    onBarCodeRead={(e) => this.barcodeReceived(e)}
                >
                    <View style = {{height: (height-264)/3, width:width, backgroundColor:'rgba(0,0,0,0.5)',}}>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <View style={styles.itemStyle}/>
                        <View style={styles.rectangle}>
                            <Image
                                style={[styles.rectangle, {position:'absolute', left: 0, top: 0}]}
                                source={require('../../Image/icon_scan_rect.png')}
                            />
                            <Animated.View style={[styles.animatedStyle, {
                                transform: [{
                                    translateY: this.state.animation.interpolate({
                                        inputRange: [0,1],
                                        outputRange: [0,200]
                                    })
                                }]
                            }]}>
                            </Animated.View>
                        </View>
                        <View style={styles.itemStyle}/>
                    </View>
                    <View style={{flex:1,backgroundColor:'rgba(0, 0, 0, 0.5)',width:width,alignItems:'center'}}>
                        {/*<Text style={styles.textStyle}>将二维码放入框内，即可自动扫描</Text>*/}
                    </View>
                </RNCamera>
            )
        } else {
            scanView = (
                <RNCamera
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    googleVisionBarcodeType={RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.QR_CODE}
                    flashMode={RNCamera.Constants.FlashMode.auto}
                    onBarCodeRead={(e) => this.barcodeReceived(e)}
                >
                    <View style = {{height: (height-244)/3, width:width, backgroundColor:'rgba(0,0,0,0.5)',}}>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <View style={styles.itemStyle}/>
                        <View style={styles.rectangle}>
                            <Image
                                style={[styles.rectangle, {position:'absolute', left: 0, top: 0}]}
                                source={require('../../Image/icon_scan_rect.png')}
                            />
                            <Animated.View style={[styles.animatedStyle, {
                                transform: [{
                                    translateY: this.state.animation.interpolate({
                                        inputRange: [0,1],
                                        outputRange: [0,200]
                                    })
                                }]
                            }]}>
                            </Animated.View>
                        </View>
                        <View style={styles.itemStyle}/>
                    </View>
                    <View style={{flex:1,backgroundColor:'rgba(0, 0, 0, 0.5)',width:width,alignItems:'center'}}>
                        {/*<Text style={styles.textStyle}>将二维码放入框内，即可自动扫描</Text>*/}
                    </View>
                </RNCamera>
            )
        }
        return (
            <View style={styles.container}>
                {scanView}
            </View>
        );
    }

    barcodeReceived(e) {
        if (this.state.show) {
            console.log(this.props.navigation.state.params.status)
            this.state.show = false;
            if (e) {
                Vibration.vibrate([0, 500], false);
                let result = e.data;
                if (result) {
                    if (Number(this.props.navigation.state.params.status) === 2) {
                        this.props.navigation.state.params.RecodeLoadData(result)
                        this.props.navigation.goBack();
                    } else  if (Number(this.props.navigation.state.params.status) === 1) {
                        this.props.navigation.navigate('Transfer', {name: '转账', address: result})
                        // this.props.navigation.goBack();
                    }

                }
            } else {
                Alert.alert(
                    '提示',
                    '扫描失败，请将手机对准二维码重新尝试',
                    [
                        {
                            text: '确定', onPress: () => {
                                this.setState({
                                    show: true
                                })
                            }
                        }
                    ],
                    {cancelable: false}
                )
            }
        }
    }
}

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    preview: {
        flex: 1,
    },
    itemStyle:{
        backgroundColor:'rgba(0,0,0,0.5)',
        width:(width-200)/2,
        height:200
    },
    textStyle:{
        color:'#fff',
        marginTop:20,
        fontWeight:'bold',
        fontSize:18
    },
    animatedStyle:{
        height:2,
        backgroundColor:'#00c050'
    },
    rectangle: {
        height: 200,
        width: 200,
    }
});

