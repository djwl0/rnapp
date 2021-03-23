import React from 'react'
import {View,Text,Image,TouchableHighlight} from 'react-native';


function Loginfalse(props){
    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="#DDDDDD"
                onPress={
                    () =>props.navigation.navigate('登录')
                }
                style={{width:290,height:35,backgroundColor:'skyblue',borderRadius:5}}
            >
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:18,}}>点击去登陆</Text>
                </View>
            </TouchableHighlight>
        </View>
    )
}
export default Loginfalse