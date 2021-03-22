import  React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {  Provider } from '@ant-design/react-native';
import My from './user/My'
import Hot from './index/hot'
// import Index from './index/test'


const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <Provider>
    <NavigationContainer>
      {/* 隐藏导航栏 */}
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"/>

        {/* 两个底部导航页 */}
      <Tab.Navigator
        tabBarOptions={{
          // 激活时的颜色
          activeTintColor: 'skyblue',
          // 没有激活的颜色
          inactiveTintColor: 'gray',
          keyboardHidesTabBar:true
        }}
      >
        <Tab.Screen name="主页" component={Hot} 
        options={{
          tabBarLabel: '主页',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
        />

        <Tab.Screen name="我的" component={My} 
        options={{
          tabBarLabel: '我的',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          // tabBarBadge: 3,  通知信息
        }}
        />
      </Tab.Navigator>
    </NavigationContainer>
    </Provider>
  );
}