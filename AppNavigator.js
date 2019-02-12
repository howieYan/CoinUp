/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {createAppContainer, createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import TabBarItem from './src/Component/TabBarItem'; // 底部公共组建
import Login from './src/Component/Login'; // 登录
import UserAgreement from './src/Component/UserAgreement'; // 登录-用户使用协议
import VerificationCode from './src/Component/VerificationCode'; // 登录-验证码
import LoginPassWord from './src/Component/LoginPassWord'; // 登录-输入登录密码
import Home from './src/Home/Home'; //首页
import Transfer from './src/Home/Component/Transfer'; //首页-转账
import CurrencyTransfer from './src/Home/Component/CurrencyTransfer'; //首页-转账-币种
import RichScanCom from './src/Home/Component/RichScanCom'; //首页-扫一扫
import RichScanComTransfer from './src/Home/Component/RichScanComTransfer'; //首页-扫一扫-转币
import TransferRecord from './src/Home/Component/TransferRecord/TransferRecord'; //首页-转账-转账记录
import Price from './src/Home/Component/Price'; //首页-行情
import TheTradingFloor from './src/Home/Component/TabBar/TheTradingFloor'; //首页-场外交易-交易大厅
import Details from './src/Home/Component/TabBar/Component/Details'; //首页-场外交易-交易大厅-items详情
import MyOrder from './src/Home/Component/TabBar/MyOrder/MyOrder'; //首页-场外交易-我的订单
import OrderDetails from './src/Home/Component/TabBar/MyOrder/Component/OrderDetails'; //首页-场外交易-我的订单详情
import IRelease from './src/Home/Component/TabBar/IRelease'; //首页-场外交易-我的发布
import ReleaseCancelled from './src/Home/Component/TabBar/ReleaseCancelled'; //首页-场外交易-我的发布-创建
import TermsOfPayment from './src/Home/Component/TabBar/TermsOfPayment'; //首页-场外交易-我的发布-创建-付款方式
import LeaveMessage from './src/Home/Component/TabBar/LeaveMessage'; //首页-场外交易-我的发布-创建-留言
import Chat from './src/Chat/Chat'; //聊天
import ChatDetails from './src/Chat/ChatDetails'; //聊天详情
// import Find from './src/Find/Find'; //发现
import My from './src/My/My'; //我的
import ModifyTheData from './src/My/Component/ModifyTheData'; //我的-修改资料
import Currency from './src/My/Component/Currency'; // 我的-本地货币
import RealName from './src/My/Component/RealName'; // 我的-实名认证
import IdentityCardReg from './src/My/Component/IdentityCardReg'; // 我的-实名认证-身份证登记
import SetupThe from './src/My/Component/SetupThe'; // 我的-设置
import TheLoginPass from './src/My/Component/TheLoginPass'; // 我的-设置-登录密码
import PayThePass from './src/My/Component/PayThePass'; // 我的-设置-支付密码
import MobilePhoneNo from './src/My/Component/MobilePhoneNo'; // 我的-设置-手机号
import TheNextStep from './src/My/Component/TheNextStep'; // 我的-设置-手机号-验证码
import MyAssets from './src/My/Component/MyAssets'; // 我的-我的资产
import BillList from './src/My/Component/BillList'; // 我的-我的资产-账单
import MyQrCode from './src/My/Component/MyQrCode'; // 我的-我的二维码
import MyCoinRing from './src/My/Component/MyCoinRing'; // 我的-我的币圈


export default function configAppNavigator(isLoggedIn, isSwiper) {
    // 底部tabBar
    const TabBar = createBottomTabNavigator(
        {
            HomeItem: {
                screen: Home,
                navigationOptions: ({navigation}) => ({
                    tabBarLabel: '首页',
                    tabBarIcon:({focused, tintColor}) => (
                        <TabBarItem
                            normalImage={require('./src/Image/TabBar/Home.png')}
                            selectedImage={require('./src/Image/TabBar/HomeActiver.png')}
                            focused={focused}
                            tintColor={tintColor}
                        />
                    ),
                })
            },
            ChatItem: {
                screen: Chat,
                navigationOptions: ({navigation}) => ({
                    tabBarLabel: '聊天',
                    tabBarIcon:({focused, tintColor}) => (
                        <TabBarItem
                            normalImage={require('./src/Image/TabBar/Chat.png')}
                            selectedImage={require('./src/Image/TabBar/ChatActiver.png')}
                            focused={focused}
                            tintColor={tintColor}
                        />
                    ),
                })
            },
            MyItem: {
                screen: My,
                navigationOptions: ({navigation}) => ({
                    tabBarLabel: '我的',
                    tabBarIcon:({focused, tintColor}) => (
                        <TabBarItem
                            normalImage={require('./src/Image/TabBar/My.png')}
                            selectedImage={require('./src/Image/TabBar/MyActiver.png')}
                            focused={focused}
                            tintColor={tintColor}
                        />
                    ),
                })
            }
        },
        {
            navigationOptions: {
                // gesturesEnabled: false
            },
            backBehavior: 'HomeItem',
            tabBarPosition: 'bottom',
            lazy: true,
            animationEnabled: false,
            swipeEnabled: false,
            tabBarOptions: {
                activeTintColor: '#575857',
                inactiveTintColor: '#D2D3D2',
                style: {backgroundColor: '#fff'}
            }
        }
    )
    const OtcTabBar = createBottomTabNavigator(
        {
            TheTradingFloor: {
               screen: TheTradingFloor,
               navigationOptions: ({navigation}) => ({
                   tabBarLabel: '交易大厅',
                   tabBarIcon:({focused, tintColor}) => (
                       <TabBarItem
                           normalImage={require('./src/Image/Home/TabBar/TheTradingFloorIcon.png')}
                           selectedImage={require('./src/Image/Home/TabBar/TheTradingFloorIconActiver.png')}
                           focused={focused}
                           tintColor={tintColor}
                       />
                   ),
               })
            },
            MyOrder: {
               screen: MyOrder,
               navigationOptions: ({navigation}) => ({
                   tabBarLabel: '我的订单',
                   tabBarIcon:({focused, tintColor}) => (
                       <TabBarItem
                           normalImage={require('./src/Image/Home/TabBar/MyOrderIcon.png')}
                           selectedImage={require('./src/Image/Home/TabBar/MyOrderIconActiver.png')}
                           focused={focused}
                           tintColor={tintColor}
                       />
                   ),
               })
            },
            IRelease: {
                screen: IRelease,
                navigationOptions: ({navigation}) => ({
                   tabBarLabel: '我的发布',
                   tabBarIcon:({focused, tintColor}) => (
                       <TabBarItem
                           normalImage={require('./src/Image/Home/TabBar/IReleaseIcon.png')}
                           selectedImage={require('./src/Image/Home/TabBar/IReleaseIconActiver.png')}
                           focused={focused}
                           tintColor={tintColor}
                       />
                   ),
                })
            }
        },
        {
            navigationOptions: {
                // gesturesEnabled: false
            },
            backBehavior: 'TheTradingFloor',
            tabBarPosition: 'bottom',
            lazy: true,
            animationEnabled: false,
            swipeEnabled: false,
            tabBarOptions: {
                activeTintColor: '#3E62D4',
                inactiveTintColor: '#A8AAAA',
                style: {backgroundColor: '#fff'}
            }
        }
    )
    const AppNavigator = createStackNavigator(
        {
            Login: {
                screen: Login,
                navigationOptions: {
                    header: null,
                    headerBackTitle: null,
                }
            },
            // 底部导航
            TabBar:{
                screen: TabBar,
                navigationOptions: {
                    header: null,
                    headerBackTitle: null,
                }
            },
            // 本地货币
            Currency: {
                screen: Currency,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            // 我的-实名认证
            RealName: {
                screen: RealName,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            // 我的-实名认证-身份证登记
            IdentityCardReg: {
                screen: IdentityCardReg,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            // 设置
            SetupThe: {
                screen: SetupThe,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            // 设置-登录密码
            TheLoginPass: {
                screen: TheLoginPass,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            // 设置-支付密码
            PayThePass: {
                screen: PayThePass,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            // 设置-手机号
            MobilePhoneNo: {
                screen: MobilePhoneNo,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            // 设置-手机号-验证码
            TheNextStep: {
                screen: TheNextStep,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            //我的-修改资料
            ModifyTheData: {
                screen: ModifyTheData,
                navigationOptions: {
                    header: null,
                    headerBackTitle: null,
                }
            },
            // 我的-我的资产
            MyAssets: {
                screen: MyAssets,
                navigationOptions: {
                    header: null,
                    headerBackTitle: null,
                }
            },
            // 我的-我的资产-账单
            BillList : {
                screen: BillList,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            // 我的-我的二维码
            MyQrCode: {
                screen: MyQrCode,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            // 我的-我的币圈
            MyCoinRing: {
                screen: MyCoinRing,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            // 登录-用户使用协议
            UserAgreement: {
                screen: UserAgreement,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            // 登录-验证码
            VerificationCode: {
                screen: VerificationCode,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            // 登录-输入登录密码
            LoginPassWord: {
                screen: LoginPassWord,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            //首页-扫一扫
            RichScanCom: {
                screen: RichScanCom,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            //首页-扫一扫-转币
            RichScanComTransfer: {
                screen: RichScanComTransfer,
                navigationOptions: {
                    header: null,
                    headerBackTitle: null,
                }
            },
            //首页-转账
            Transfer: {
                screen: Transfer,
                navigationOptions: {
                    header: null,
                    headerBackTitle: null,
                }
            },
            //首页-转账-币种
            CurrencyTransfer: {
                screen: CurrencyTransfer,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            //首页-转账-转账记录
            TransferRecord: {
                screen: TransferRecord,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            //首页-场外交易
            OtcTabBar: {
                screen: OtcTabBar,
                navigationOptions: {
                    header: null,
                    headerBackTitle: null,
                }
            },
            //首页-行情
            Price: {
                screen: Price,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            //首页-场外交易-我的发布-创建
            ReleaseCancelled: {
                screen: ReleaseCancelled,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            //首页-场外交易-我的发布-创建-付款方式
            TermsOfPayment: {
                screen: TermsOfPayment,
                navigationOptions: {
                    headerBackTitle: null,
                }
            },
            //首页-场外交易-我的发布-创建-留言
            LeaveMessage: {
                screen: LeaveMessage,
                navigationOptions: {
                    header: null,
                    headerBackTitle: null,
                }
            },
            //首页-场外交易-交易大厅-items详情
            Details: {
                screen: Details,
                navigationOptions: {
                    header: null,
                    headerBackTitle: null,
                }
            },
            //聊天详情
            ChatDetails: {
                screen: ChatDetails,
                navigationOptions: {
                    header: null,
                    headerBackTitle: null,
                }
            },
            //首页-场外交易-我的订单详情
            OrderDetails: {
                screen: OrderDetails,
                navigationOptions: {
                    header: null,
                    headerBackTitle: null,
                }
            }
        },
        {
            initialRouteName: isLoggedIn ? 'Login' :'TabBar',
            // initialRouteName: 'LoginPassWord',
            navigationOptions: {
                headerTintColor: '#333333',
                showIcon: true,
                gesturesEnabled: false,
            },
        }
    )
    return createAppContainer(AppNavigator);
}
