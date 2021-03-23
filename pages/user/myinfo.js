import React from 'react'
import {View,Text,Image,TouchableHighlight} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button,Toast } from '@ant-design/react-native';
import storage from '../Storage'


// test=()=>{

// }

function Item(props){
    return(
        <View style={{width:140,height:140,borderRadius:10,margin:5}}>
            <Button type="primary" style={{flex:1,backgroundColor:'skyblue',borderColor:'skyblue'}}
            onPress={props.press}
            >
                <MaterialCommunityIcons name={props.icon} color={'white'} size={50} style={{margin:5}}/>   
            </Button>
            <Text style={{position:'absolute',width:'100%',textAlign:'center',bottom:20}}>{props.name}</Text>
        </View>
    )
}

function Myinfo(props){
    test=()=>{
        Toast.info('待开发', 1, undefined, false);
    }
    getmycomment=()=>{
        storage.load({
            key:'account',
        }).then(ret=>{    
            fetch('http://47.93.233.220:8099/getmycomments?userid='+ret.userid).then(res=>{
                return res.json()
            }).then(res=>{
                // console.log(res)
                props.navigation.navigate('我的发布',{data:res})
            })
        }).catch(err=>{
            props.navigation.navigate('我的发布')
        })
        
    }
    return (
    <View style={{width:300,height:300,flexDirection:'row',flexWrap:'wrap',borderRadius:10}}>
       <Item icon={"comment"} name={'我的发表'} press={getmycomment}/>
       <Item icon={"comment-processing"} name={'我的评论'} press={test}/>
       <Item icon={"message-alert"} name={'我的消息'} press={test}/>
       <Item icon={"dots-horizontal-circle"} name={'更多'} press={test}/>
    </View>
    )
}
export default Myinfo