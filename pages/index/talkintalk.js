import React from 'react';
import {
    View,
    FlatList,
    Text,
    Image,TextInput,ToastAndroid,Keyboard,TouchableHighlight, Modal} from 'react-native';
import utime from '../transformtime'
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
const storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: false, 
  });

class Talkintalk extends React.Component{
    state={
        modalhide:false,
        textvalue:"",
        placeholder:"",
        talkintalkitem:{},
        kkk:{}
    }
    onChangeText=(value)=>{
        this.setState({
            textvalue:value
        })
    }
    reply=()=>{
        storage.load({key:"account"}).then(res=>{
        fetch("http://47.93.233.220:8099/inserttalkin?commentid="+this.props.route.params.zz.commentid
            +"&&talkid="+this.props.route.params.zz.talkid+"&&userid="+res.userid+"&&replyuserid="+this.state.talkintalkitem.userid
            +"&&replyusername="+this.state.talkintalkitem.username+"&&main="+this.state.textvalue).then(res=>{
                return res.json()
            }).then(res=>{
                if(res=="1")
                {
                    this.setState({
                        modalhide:false,
                        talkintalkitem:{},
                        placeholder:"",
                        textvalue:"",
                    })
                    this.props.route.params.refrush()
                    Keyboard.dismiss()
                    console.log(this.props.route.params.ll)
                    // this.props.navigation.setParams({
                    //     ll: this.props.route.params.ll.push({
                    //         // talkintalkid: this.props.route.params.ll[this.props.route.params.ll.length].talkintalkid+1,
                    //         // username:res.username
                    //         "commentid": 146,
                    //          "icon": "http://rnapp.test.upcdn.net/1.webp!icon",
                    //           "main": "。。。",
                    //            "replyuserid": 1,
                    //             "replyusername": "你还想让我代替谁",
                    //              "talkid": 161, 
                    //              "talkintalkid": 44,
                    //               "time": "2021-03-16T03:31:15.000Z",
                    //                "userid": 1,
                    //                 "username": "你还想让我代替谁"
                    //     })
                    // })
                    ToastAndroid.showWithGravityAndOffset('评论成功',ToastAndroid.SHORT,ToastAndroid.CENTER,0,0)
                }
                
            })

        }).catch(err=>{
            ToastAndroid.showWithGravityAndOffset('请先登录',ToastAndroid.SHORT,ToastAndroid.TOP,0,0)
        })

       
    }

    render(){
        const item=this.props.route.params.zz
        const talkintalkitem=({item})=>{
            return(
                <TouchableHighlight
                activeOpacity={1}
                underlayColor="#F0F0F0"
               onPress={()=>{
                //   alert("回复")
                this.setState({modalhide:true,placeholder:"回复："+item.username,talkintalkitem:item})
               }
                 }>
                    <View style={{paddingHorizontal:10,paddingVertical:2,borderBottomWidth:0.2,borderColor:'grey'}}>
                        <View style={{height:40,flexDirection:'row'}}>
                            {/* 头像 */}
                            <Image
                                    style={{height:40,width:40,borderRadius:20}}
                                    source={{uri:item.icon}}
                                />
                            {/* 昵称和时间 */}
                            <View style={{flex:1}}>
                                <Text style={{flex:1,paddingLeft:10}}>{item.username}</Text>
                                <Text style={{flex:1,paddingLeft:10,color:'grey',fontSize:12}}>
                                {utime(item.time)}
                            {/* {item.time} */}
                                </Text>
                            </View>
                        </View>
                        <Text  style={{paddingLeft:50,paddingRight:15,paddingVertical:10,fontSize:14}}>
                            {item.replyusername==null?"":(
                            <Text style={{color:'black'}}>回复
                                <Text style={{color:'#1A94E6'}}>
                                {item.replyusername}
                                </Text>：                            
                            </Text>)}
                            <Text style={{color:'black'}}>{item.main}</Text>
                        </Text>
                    </View>
                </TouchableHighlight>
            )
        }
        return(
            <View style={{flex:1}}>
                {/* 评论主要内容 */}
                <View style={{paddingHorizontal:10,paddingVertical:2,borderBottomWidth:0.1,borderColor:'grey',backgroundColor:'white'}}>
                    <View style={{height:40,flexDirection:'row'}}>
                        {/* 评论人的头像 */}
                        <Image
                                style={{height:40,width:40,borderRadius:20}}
                                source={{uri:item.icon}}
                            />
                        <View style={{flex:1}}>
                            <Text style={{flex:1,paddingLeft:10}}>{item.username}</Text>
                            <Text style={{flex:1,paddingLeft:10,color:'grey',fontSize:12}}>
                            {utime(item.time)}
                            </Text>
                        </View>
                    </View>
                    <Text style={{paddingLeft:50,paddingRight:15,paddingVertical:10,fontSize:14}}>{item.maintalk}</Text>
                </View>
                {/* 评论楼中楼内容 */}
                <View style={{flex:1,backgroundColor:'white',marginTop:15}}>               
                    <FlatList
                        data={this.props.route.params.ll}
                        renderItem={talkintalkitem}
                        keyExtractor={(item) => item.talkintalkid.toString()}
                    />
                </View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalhide}
                    onRequestClose={() => {
                    this.setState({modalhide:false})
                    }}
                >
                    <View style={{flex: 1,justifyContent: "center",alignItems: "center",}}>
                        <View style={{width:300,backgroundColor:'skyblue',borderRadius:20}}>
                            <TextInput
                                style={{ marginLeft:25,width:250,height: 90, borderColor: 'gray', borderWidth: 1,borderRadius:10,marginTop:25,backgroundColor:'white' }}
                                onChangeText={value => this.onChangeText(value)}
                                value={this.state.textvalue}
                                placeholder={this.state.placeholder}
                                multiline={true}
                                numberOfLines={5}
                                maxLength={150}
                            />
                            <View style={{marginTop:10,flexDirection:'row',height:40,borderBottomRightRadius:20,borderBottomLeftRadius:20}}>
                                {/* 返回 */}
                                <TouchableHighlight
                                    activeOpacity={0.6}
                                    underlayColor="#DDDDDD"
                                    onPress={
                                    () =>this.setState({modalhide:false})
                                    }
                                    style={{flex:1,borderBottomLeftRadius:20}}
                                    >             
                                    <View style={{flex:1,borderBottomLeftRadius:20}}>
                                        <Text style={{flex:1,textAlign:'center',lineHeight:40,borderBottomLeftRadius:20}}>返回</Text>
                                    </View>
                                </TouchableHighlight>
                                {/* 确定 */}
                                <TouchableHighlight
                                    activeOpacity={0.6}
                                    underlayColor="#DDDDDD"
                                    onPress={() =>this.reply()}
                                    style={{flex:1,borderBottomRightRadius:20}}
                                    >
                                    <View style={{flex:1,borderBottomRightRadius:20}}>
                                        <Text style={{flex:1,textAlign:'center',lineHeight:40,borderBottomRightRadius:20}}>确定</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>

                        </View>
                    </View>

                </Modal>
            </View>
        )    
    }

}

export default Talkintalk;