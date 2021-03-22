import React from 'react'
import {View,Text,Image,TouchableHighlight} from 'react-native';
import storage from '../Storage'
import Myinfo from './myinfo'


function Logintrue(props){
    return (   
       <View style={{flex:1,alignItems:'center'}}>
           {/* 头像 */}
            <Image
                    style={{height:60,width:60,borderRadius:30,marginTop:30}}
                    source={{uri: props.user.icon}}
            />
            {/* 昵称 */}
            <Text style={{height:60,lineHeight:60}}>
                {props.user.username}
            </Text>
            {/* 功能卡片 */}
            <Myinfo {...props}/>
            {/* 退出登录 */}
            <TouchableHighlight
                    activeOpacity={0.6}
                    underlayColor="#DDDDDD"
                    onPress={
                    () =>{
                        storage.remove({
                            key: 'account',
                            });
                        props.refresh()
                    }}
                    style={{backgroundColor:'white',position:'relative',top:10,width:290,height:35,borderRadius:5}}
                >
                <View>
                    <Text style={{fontSize:18,textAlign:'center',lineHeight:35}}>退出登录</Text>
                </View>
            </TouchableHighlight>
        </View>     
   )
}
export default Logintrue