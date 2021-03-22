import React from 'react'
import {View,Text,Image,TouchableHighlight} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button,Toast } from '@ant-design/react-native';

getmycomment=(props)=>{
    // 根据账号获取已经发布的，并携带参数跳转到详情
    alert("hello")
    // props.navigation.navigate('热门')
    
}
// test=()=>{

// }

function Item(props){
    return(
        <View style={{width:140,height:140,borderRadius:10,margin:5}}>
            <Button type="primary" style={{flex:1,backgroundColor:'skyblue',borderColor:'skyblue'}}
            onPress={props.press}
            >
                <MaterialCommunityIcons name={props.icon} color={'blue'} size={50} style={{margin:5}}/>   
            </Button>
            <Text style={{position:'absolute',width:'100%',textAlign:'center',bottom:20}}>{props.name}</Text>
        </View>
    )
}

function Myinfo(props){
    return (
    <View style={{width:300,height:300,flexDirection:'row',flexWrap:'wrap',borderRadius:10}}>
       <Item icon={"comment"} name={'我的发表'} press={getmycomment}/>
       <Item icon={"comment-processing"} name={'我的评论'}/>
       <Item icon={"message-alert"} name={'我的消息'}/>
       <Item icon={"dots-horizontal-circle"} name={'更多'}/>
    </View>
    )
}
export default Myinfo