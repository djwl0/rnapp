import { createStackNavigator } from '@react-navigation/stack';
import  React from 'react';
import Mainaccount from './mainaccount'
import Login from './login'
import Myrelease from './myrelease'

const SettingsStack = createStackNavigator();

function My() {
  
  return (
    <SettingsStack.Navigator>
      {/* 换顺序 */}
      <SettingsStack.Screen name="个人中心" component={Mainaccount}  initialParams={{ islogin: false }}/>
      <SettingsStack.Screen name="登录" component={Login} />
      <SettingsStack.Screen name="我的发布" component={Myrelease} />
    </SettingsStack.Navigator>
  );
}
export default My;