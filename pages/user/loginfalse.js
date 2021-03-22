import React from 'react'
import {View,Text,Image,TouchableHighlight} from 'react-native';


function Loginfalse(props){
    return (
        <View style={{height:60,flex:1,backgroundColor:'red',borderRadius:20,marginHorizontal:10,flexDirection:'row'}}>
            <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="#DDDDDD"
                onPress={
                    () =>props.navigation.navigate('登录')
                }
                style={{height:60,flex:1,lineHeight:60,backgroundColor:'skyblue',justifyContent:'center',alignItems:'center',borderRadius:15}}
            >
                <View style={{height:60,flex:1,justifyContent:'center',alignItems:'center',borderRadius:15}}>
                    <Text style={{fontSize:18,}}>点击去登陆</Text>
                </View>
            </TouchableHighlight>
        </View>
    )
}
export default Loginfalse