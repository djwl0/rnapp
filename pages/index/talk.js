import  React from 'react';
import {SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    Image,TextInput,ToastAndroid,Keyboard,TouchableHighlight
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import utime from '../transformtime'
const storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: false, 
  });

class Talk extends React.Component{

state={
    alltalk:[],
    maintalk:"",
    user:{},
    havelike:[],
    placeholder:"请输入你想说的话",
    talkintalk:[],
    istalkin:false,
    talkintalkitem:{}
}
talkchange=(value)=>{
    this.setState({
        maintalk:value
    })
}
gettalklike=()=>{
    storage.load({
        key:"account"
      }).then(res=>{
        // console.log(res.userid)
          fetch("http://47.93.233.220:8099/getuserlike?userid="+res.userid+"&&type=talk").then((res)=>{
            return res.json()
          }).then((res)=>{
            this.setState({
                havelike:res
            })
          })
    }).catch(err=>{
        this.setState({
            havelike:[]
          })
    })
}
gettalkintalk=(commentid)=>{
    fetch("http://47.93.233.220:8099/gettalkintalk?commentid="+commentid).then(res=>{
        return res.json()
    }).then(res=>{
        this.setState({
            talkintalk:res
        })

    })
}
judgelike=(talkid)=>{
    const length=this.state.havelike.length
    let re=false
    for(let i=0;i<length;i++)
    {
      if(this.state.havelike[i].talkid==talkid)
      {
        re=true;
        break
      }
    }
    return re
  }
//   点赞功能
liketalk=(talkid)=>{
    storage.load({
        key:'account',
      }).then(res=>{
        if(this.judgelike(talkid)!=true)
        fetch("http://47.93.233.220:8099/talklike?talkid="+talkid+"&&userid="+res.userid+"&&operate=sure").then(res=>{
          return res.json()
        }).then(res=>{
          if(res=="1")
          {
            this.gettalklike()
            // alert("点赞成功")
          }
          else
          ToastAndroid.showWithGravityAndOffset('你已经点过赞了',ToastAndroid.SHORT,ToastAndroid.CENTER,0,-400)
        }).catch(err=>{
          // alert("发生错误")
        })
        //  取消点赞
        else
        {
          fetch("http://47.93.233.220:8099/talklike?talkid="+talkid+"&&userid="+res.userid).then((res)=>{
            return res.json()
          }).then((res)=>{
            if(res=="1")
            {
              this.gettalklike()
            }
            else
            {
              ToastAndroid.showWithGravityAndOffset('取消点赞失败',ToastAndroid.SHORT,ToastAndroid.CENTER,0,-400)
            }
          })
        }
    
      }).catch(err=>{
        ToastAndroid.showWithGravityAndOffset('请先登录',ToastAndroid.SHORT,ToastAndroid.CENTER,0,-400)
      })   
}
loadingtalk=()=>{
    storage.load({
        key:'account',
    }).then(res=>{
        this.setState({
            user:res
        })
    }).catch(err=>{
        this.setState({
            user:{icon:"https://iknow-pic.cdn.bcebos.com/bd3eb13533fa828b84b228d6f31f4134970a5a75?x-bce-process=image/resize,m_lfit,w_600,h_800,limit_1/quality,q_85"}
        })
    })
    fetch("http://47.93.233.220:8099/gettalk?commentid="+this.props.route.params.commentid).then(res=>{
        return res.json()
    }).then(res=>{
        // console.log(res)
        this.setState({
            alltalk:res
        })
    })
}
inserttalk=()=>{
    // 判断是否登陆
    storage.load({
        key:'account',
    }).then(res=>{
    //  alert(this.state.maintalk)
     if(this.state.maintalk!="")
     {
        if(this.state.istalkin==false)
        {
            Keyboard.dismiss();
            fetch("http://47.93.233.220:8099/inserttalk?commentid="
            +this.props.route.params.commentid+
            "&&userid="+res.userid+"&&maintalk="+this.state.maintalk).then(res=>{
                return res.json()
            }).then(res=>{
            //  console.log(res)
                if(res=="1")
                {
                ToastAndroid.showWithGravityAndOffset('评论成功',ToastAndroid.SHORT,ToastAndroid.CENTER,0,0)
                this.loadingtalk()
                this.setState({
                    maintalk:""
                })
                }
                else
                alert("失败")
            })
        }
        else
        {
            let item=this.state.talkintalkitem
            fetch("http://47.93.233.220:8099/inserttalkin?commentid="+this.props.route.params.commentid
            +"&&talkid="+item.talkid+"&&userid="+res.userid+"&&replyuserid="
            +"&&replyusername="+"&&main="+this.state.maintalk).then(res=>{
                return res.json()
            }).then(res=>{
                if(res=="1")
                {
                    this.setState({
                        istalkin:false,
                        talkintalkitem:{},
                        placeholder:"请输入你想说的话",
                        maintalk:"",
                    })
                    Keyboard.dismiss()
                    this.gettalkintalk(this.props.route.params.commentid)
                }
                
            })
           
        }
        
     }
     else
     ToastAndroid.showWithGravityAndOffset('输入内容为空',ToastAndroid.SHORT,ToastAndroid.CENTER,0,0)


    }).catch(err=> ToastAndroid.showWithGravityAndOffset('请先登录',ToastAndroid.SHORT,ToastAndroid.CENTER,0,0))
}


UNSAFE_componentWillMount=()=>{ 
    this.loadingtalk()
    this.gettalklike()
    this.gettalkintalk(this.props.route.params.commentid)
    // alert(this.props.route.params.id)
}
focus=(item)=>{
    this.input.focus()
    this.setState({
        placeholder:"回复:"+item.username,
        istalkin:true,
        talkintalkitem:item
    })
}
listfilter=(item,talkid)=>{
 if(item.talkid==talkid)
 return true
 else
 return false
}
checkbeing=(talkid)=>{
    let last=false
    let length=this.state.talkintalk.length
    for(let i=0;i<length;i++ )
    {
        if(this.state.talkintalk[i].talkid==talkid)
        {
            last=true;
            break
        }
    }
    return last

}

render(){
    const ddd=this.props.route.params
    const talkintalkitem=({item})=>{
        return(
            <View>
                <Text style={{color:'#1A94E6',fontSize:13}}>
                    {item.username}
                     {item.replyusername==null?"":(
                    <Text style={{color:'black'}}>:回复
                        <Text style={{color:'#1A94E6'}}>
                        {item.replyusername}
                        </Text>                            
                    </Text>)}
                    <Text style={{color:'black'}}>:{item.main}</Text>
                </Text>
            </View>
        )
    }

    const talkitem=({item})=>{
        return(
            <View style={{paddingHorizontal:10,paddingVertical:2,borderBottomWidth:0.2,borderColor:'grey'}}>
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
                    {/* 点赞区域 */}
                    <TouchableHighlight
                        activeOpacity={0.6}
                        underlayColor="#DDDDDD"
                        onPress={
                          ()=>{
                            //   this.gettalklike()
                            // alert("点赞")    
                            item.likecount=this.judgelike(item.talkid)?item.likecount-1:item.likecount+1
                            this.liketalk(item.talkid)                
                          }
                        }
                    >
                    <View style={{flexDirection:'row'}}>
                    {!this.judgelike(item.talkid)?
                        <MaterialCommunityIcons name="thumb-up-outline" color={'grey'} size={20} style={{marginLeft:5,marginTop:10,marginRight:3}}/>
                        :<MaterialCommunityIcons name="thumb-up" color={'grey'} size={20} style={{marginLeft:5,marginTop:10,marginRight:3}}/>}
                        <Text style={{lineHeight:40,color:'grey',fontSize:12,marginRight:5}}>{item.likecount}</Text>
                    </View>
                    </TouchableHighlight>
                </View>
                <TouchableHighlight
                  activeOpacity={1}
                  underlayColor="#F0F0F0"
                 onPress={()=>{
                    this.focus(item)
                 }
                   }>
                    <View>
                        
                        <Text style={{paddingLeft:50,paddingRight:15,paddingVertical:10,fontSize:14}}>{item.maintalk}</Text>
                        {/* 评论楼中楼 */}
                        {this.checkbeing(item.talkid)?
                        (<TouchableHighlight
                            activeOpacity={1}
                            underlayColor="#F0F0F0"
                            onPress={
                                ()=>{
                                this.props.navigation.navigate('所有回复',
                                {zz:item,ll:this.state.talkintalk.filter(zzz=>this.listfilter(zzz,item.talkid)).reverse(),refrush:()=>this.gettalkintalk(ddd.commentid)})            
                                }
                            } 
                            style={{marginHorizontal:50,backgroundColor:'#F0F0F0',paddingHorizontal:10,paddingBottom:5,paddingTop:5}}  
                        >
                            <View>
                                <FlatList
                                    data={this.state.talkintalk.filter(zzz=>this.listfilter(zzz,item.talkid)).slice(-2).reverse()}
                                    renderItem={talkintalkitem}
                                    keyExtractor={(item) => item.talkintalkid.toString()}
                                />
                                {this.state.talkintalk.filter(zzz=>this.listfilter(zzz,item.talkid)).length>=3?
                                <View style={{marginTop:5}}>
                                    <Text style={{color:'#1A94E6',fontSize:13}}>共{this.state.talkintalk.filter(zzz=>this.listfilter(zzz,item.talkid)).length}条回复</Text>
                                </View>:null}
                            </View>
                        </TouchableHighlight>)
                        :null}
                    </View>
                </TouchableHighlight>
            </View>
        )

    }


    return(
        <View style={{flex:1}}>
        <View style={styles.item} >
            <View style={{height:40,flexDirection:'row'}}>
                <View style={{height:40,width:40,backgroundColor:'blue',borderRadius:20}}>
                    <Image
                        style={{height:40,width:40,borderRadius:20}}
                        source={{uri: ddd.icon}}
                    />
                </View>
                <View style={{flex:1}}>
                    <Text style={{flex:1,paddingLeft:10}}>{ddd.username}</Text>
                    <Text style={{flex:1,paddingLeft:10,color:'grey',fontSize:12}}>
                      {utime(ddd.time)}
                    </Text>
                </View>
            </View>
            <View style={{marginTop:10,marginBottom:30}}>
                <Text style={{fontSize:16}}>{ddd.main}</Text>
            </View>
        </View>
             

                <View style={{flex:7}}>
                <SafeAreaView style={{flex:1,marginBottom:50,backgroundColor:'white'}}>
                    <FlatList
                        data={this.state.alltalk}
                        renderItem={talkitem}
                        keyExtractor={(item) => item.talkid.toString()}
                    />
                </SafeAreaView>
                </View>
               
                    <View style={{width:'100%',height:50,position:'absolute',bottom:0,flexDirection:"row",borderTopColor:'grey',borderTopWidth:0.5,elevation:6}}>
                    <View style={{width:50,height:50,backgroundColor:'white'}}>
                    <Image
                        style={{width:40,height:40,borderRadius:20,marginTop:5}}
                        source={{
                        uri: this.state.user.icon,
                        }}
                    />
                    </View>
                    <TextInput
                        style={{ flex:3,paddingLeft:10,backgroundColor:'white' }}
                        onChangeText={value =>this.talkchange(value)}
                        value={this.state.maintalk}
                        placeholder={this.state.placeholder}
                        blurOnSubmit={true}
                        // autoFocus={true}
                        ref={input=>this.input=input}
                        onSubmitEditing={this.inserttalk}
                        />
                    <View style={{flex:1,height:50,backgroundColor:'white'}}>
                    <Text style={{textAlign:'center',height:50,lineHeight:50}}
                    onPress={()=>this.inserttalk()}
                    >发送</Text>
                    </View>

                    </View>
              
               

        </View>

    )
}

}

const styles = StyleSheet.create({
    item: {
      backgroundColor: 'white',
      padding: 10,
      marginVertical: 5,
      marginHorizontal: 10,
      borderRadius:20,
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity:  0.4,
      shadowRadius: 3,
      elevation: 5,
      position:'relative',
    }
  });



export default Talk;