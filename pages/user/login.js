import React from 'react';
import {
  View,
  Text,
  TextInput,
  ToastAndroid,
  TouchableHighlight,
} from 'react-native';
import storage from '../Storage';

class Login extends React.Component {
  state = {
    id: '',
    password: '',
  };
  onChangeid = (value) => {
    this.setState({
      id: value,
    });
  };
  onChangepassword = (value) => {
    this.setState({
      password: value,
    });
  };

  login = () => {
    if (this.state.id != '' && this.state.password != '') {
      fetch(
        'http://47.93.233.220:8099/login?account=' +
          this.state.id +
          '&&pwd=' +
          this.state.password,
      )
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res != '') {
            const re = res[0];
            storage
              .save({
                key: 'account',
                data: {
                  userid: re.userid,
                  username: re.username,
                  account: re.useraccount,
                  pwd: re.userpwd,
                  icon: re.icon,
                },
              })
              .catch((err) => {
                console.log(error);
              });
            // this.props.login("哈哈")
            ToastAndroid.showWithGravityAndOffset(
              '登录成功',
              ToastAndroid.SHORT,
              ToastAndroid.TOP,
              0,
              0,
            );
            this.props.navigation.navigate('个人中心', {
              islogin: true,
              user: re,
            });
          } else alert('账号或密码错误');
        });
    } else alert('请输入账号密码');
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Text
          style={{
            height: 100,
            color: 'black',
            fontSize: 20,
            lineHeight: 100,
            paddingLeft: 30,
          }}>
          账号登录
        </Text>
        <View
          style={{
            marginHorizontal: 30,
            height: 120,
            backgroundColor: 'yellow',
            borderRadius: 5,
          }}>
          <TextInput
            style={{height: 60, paddingLeft: 20}}
            onChangeText={(value) => this.onChangeid(value)}
            value={this.state.id}
            keyboardType="numeric"
            maxLength={10}
            placeholder="请输入账号"
          />

          <TextInput
            style={{
              height: 60,
              borderColor: 'gray',
              borderTopWidth: 1,
              paddingLeft: 20,
            }}
            onChangeText={(value) => this.onChangepassword(value)}
            value={this.state.password}
            maxLength={10}
            placeholder="请输入密码"
          />
        </View>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={() => this.login()}
          style={{
            marginHorizontal: 30,
            height: 60,
            backgroundColor: 'yellow',
            marginTop: 20,
            borderRadius: 5,
          }}>
          <View>
            <Text
              style={{
                fontSize: 20,
                lineHeight: 60,
                textAlign: 'center',
                color: 'black',
              }}>
              登录
            </Text>
          </View>
        </TouchableHighlight>
        <View
          style={{
            marginHorizontal: 30,
            height: 20,
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{flex: 1, textAlign: 'center'}}
            onPress={() => alert('待开发')}>
            账号注册
          </Text>
          <Text
            style={{flex: 1, textAlign: 'center'}}
            onPress={() => alert('待开发')}>
            忘记密码
          </Text>
        </View>
      </View>
    );
  }
}

export default Login;
