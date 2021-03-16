import React from 'react';
import {SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    Image,
    TouchableHighlight,
    RefreshControl,
    Modal,
    TextInput,ToastAndroid,Alert} from 'react-native';
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


class Commentlist extends React.Component{


state = {
    isRefreshing: false,
    DATA:[],
    modalhide:false,
    textvalue:'',
    hideadd:true,
    user:{},
    havelike:[]
}

// 获取点赞数据
getcommentlike=()=>{
  storage.load({
    key:"account"
  }).then(res=>{
    // console.log(res.userid)
      fetch("http://47.93.233.220:8099/getuserlike?userid="+res.userid).then((res)=>{
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

UNSAFE_componentWillMount=()=>{
  fetch("http://47.93.233.220:8099/getcomments").then((res)=>{
    return res.json()
  }).then((res)=>{
    // console.log(res)
    this.setState({
      DATA:res
    })
    this.getcommentlike()
  }).catch(err=>{
    ToastAndroid.showWithGravityAndOffset('发生错误，请联系管理员',ToastAndroid.SHORT,ToastAndroid.TOP,0,0)
  })
}

// 刷新数据
onRefresh = () => {
    this.setState({isRefreshing: true});
    fetch("http://47.93.233.220:8099/getcomments").then((res)=>{
    return res.json()
  }).then((res)=>{
    // console.log(res[15])
    this.setState({
      DATA:res,
      isRefreshing: false
    })
    this.getcommentlike()
  }).catch(error=>{
    ToastAndroid.showWithGravityAndOffset('发生错误，请联系管理员',ToastAndroid.SHORT,ToastAndroid.TOP,0,0)
  })
}
// 改变输入框的值
onChangeText=(value)=>{
this.setState({
  textvalue:value
})
console.log(value)
}


judgelike=(commentid)=>{
  const length=this.state.havelike.length
  let re=false
  for(let i=0;i<length;i++)
  {
    if(this.state.havelike[i].commentid==commentid)
    {
      re=true;
      break
    }
  }
  return re
}

// 点赞
ilike=(commentid)=>{
  
  storage.load({
    key:'account',
  }).then(res=>{
    if(this.judgelike(commentid)!=true)
    fetch("http://47.93.233.220:8099/commentlike?commentid="+commentid+"&&userid="+res.userid+"&&operate=sure").then(res=>{
      return res.json()
    }).then(res=>{
      if(res=="1")
      {
        this.getcommentlike()
      }
      else
      ToastAndroid.showWithGravityAndOffset('你已经点过赞了',ToastAndroid.SHORT,ToastAndroid.CENTER,0,-400)
    }).catch(err=>{
      // alert("发生错误")
    })
     // 取消点赞
    else
    {
      fetch("http://47.93.233.220:8099/commentlike?commentid="+commentid+"&&userid="+res.userid).then((res)=>{
        return res.json()
      }).then((res)=>{
        if(res=="1")
        {
          this.getcommentlike()
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


 
  // alert("取消点赞")

}

// 调用接口添加数据
submitcomment=()=>{
  
  // 判断是否登陆
  storage.load({
    key:'account',
}).then(res=>{
  // alert(res)
  this.setState({
    user:res
  })

  if(this.state.textvalue=="")
  ToastAndroid.showWithGravityAndOffset('请输入信息',ToastAndroid.SHORT,ToastAndroid.CENTER,0,-400)
  else
  fetch("http://47.93.233.220:8099/insertcomments?main="+this.state.textvalue+"&&userid="+this.state.user.userid).then(res=>{
				return res.json()
			}).then(res=>{
				// console.log(res)
				if(res=='1')
        {
          ToastAndroid.showWithGravityAndOffset('发表成功',ToastAndroid.SHORT,ToastAndroid.TOP,0,0)
          this.setState({
            textvalue:'',
            modalhide:false,
            hideadd:true
          })
          this.onRefresh()
        }
				if(res=='-1')
				ToastAndroid.showWithGravityAndOffset('发表失败',ToastAndroid.SHORT,ToastAndroid.TOP,0,0)
			}).catch(error=>{
        ToastAndroid.showWithGravityAndOffset('发生错误',ToastAndroid.SHORT,ToastAndroid.TOP,0,0)
			})
}).catch(err=>{
  ToastAndroid.showWithGravityAndOffset('请先登录',ToastAndroid.SHORT,ToastAndroid.CENTER,0,-400)
})
}


  render(){
    
  

      const renderItem = ({ item }) => {
        return (
              <View style={styles.item} >
                {/* 头像部分 */}
                <View style={{height:40,flexDirection:'row',margin:10}}>
                  <View style={{height:40,width:40,backgroundColor:'blue',borderRadius:20}}>
                  <Image
                      style={{height:40,width:40,borderRadius:20}}
                      source={{uri: item.icon}}
                    />
                  </View>
                  <View style={{flex:1}}>
                    <Text style={{flex:1,paddingLeft:10}}>{item.username}</Text>
                    <Text style={{flex:1,paddingLeft:10,color:'grey',fontSize:12}}>
                      {utime(item.time)}
                    </Text>
                  </View>
                </View>
                {/* 主要内容 */}
                <View style={{marginHorizontal:10}}>
                  <Text style={{flex:1}}>{item.main}</Text>
                </View>
                {/* 点赞评论 */}
                <View style={{flexDirection:'row',height:30,marginTop:10,borderBottomLeftRadius:20,borderBottomRightRadius:20}}>
                  {/* 点赞区域 */}
                  <TouchableHighlight
                        activeOpacity={0.6}
                        underlayColor="#DDDDDD"
                        onPress={
                          ()=>{
                            item.likecount=this.judgelike(item.commentid)?item.likecount-1:item.likecount+1
                            this.ilike(item.commentid)                      
                          }
                        }
                        style={{flex:1,borderBottomLeftRadius:20,alignItems:'center'}}
                      >
                    <View style={{flexDirection:'row'}}>
                      {/* 判断是否点赞 */}
                      {!this.judgelike(item.commentid)?
                      <MaterialCommunityIcons name="thumb-up-outline" color={'grey'} size={20} style={{margin:5}}/>:
                      <MaterialCommunityIcons name="thumb-up" color={'grey'} size={20} style={{margin:5}}/> }

                      <Text style={{lineHeight:30,color:'grey',fontSize:12}}>{item.likecount}</Text>             
                    </View>
                    </TouchableHighlight>

                    {/* 评论区域 */}
                    <TouchableHighlight
                        activeOpacity={0.6}
                        underlayColor="#DDDDDD"
                        onPress={
                          () => this.props.navigation.navigate('评论',item)
                        }
                        style={{flex:1,borderBottomRightRadius:20,alignItems:'center'}}
                      >
                      <View style={{flexDirection:'row'}}>
                        <MaterialCommunityIcons name="comment-multiple-outline" color={'grey'} size={20} style={{margin:5}}/>
                        <Text style={{lineHeight:30,color:'grey',fontSize:12}}>{item.talkcount}</Text>     
                      </View>
                    </TouchableHighlight>
                </View>
                  
              </View>
              );
      }


      return(
          <SafeAreaView style={styles.container}>
            {this.state.hideadd==true?
              <TouchableHighlight
                  activeOpacity={0.6}
                  underlayColor="#DDDDDD"
                  onPress={
                    () => this.setState({modalhide:true,hideadd:false})
                  }
                  style={{width:50,height:50,borderRadius:25,backgroundColor:'skyblue',position:'absolute',zIndex: 2,right:20,bottom:20}}
                >
              <View>
                <Text style={{width:50,height:50,textAlign:'center',lineHeight:50,fontSize:40}}>+</Text>
              </View>
              </TouchableHighlight>:
              null
            }
              
              <FlatList
                  data={this.state.DATA}
                  renderItem={renderItem}
                  keyExtractor={item => item.commentid.toString()}
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.isRefreshing}
                      onRefresh={this.onRefresh}
                      size={1}
                      colors={['#0000ff','#ff0000', '#00ff00', ]}
                    />
                  }

              />

              <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalhide}
            onRequestClose={() => {
              this.setState({modalhide:false,hideadd:true})
            }}
          >
      <View style={{flex: 1,
      justifyContent: "center",
      alignItems: "center",
      }}
      >
        <View style={{width:300,height:180,backgroundColor:'skyblue',borderRadius:20,alignItems:'center'}}>
          <Text style={{height:20,textAlign:"center",marginTop:10}}>发表言论</Text>
          <TextInput
            style={{ width:250,height: 90, borderColor: 'gray', borderWidth: 1,borderRadius:10,marginTop:10,backgroundColor:'white' }}
            onChangeText={value => this.onChangeText(value)}
            value={this.state.textvalue}
            placeholder={'请输入你想说的话'}
            multiline={true}
            numberOfLines={5}
            maxLength={250}
          />
          <View style={{width:300, flexDirection: 'row',marginTop:10,borderRadius:10}}>
          <TouchableHighlight
                        activeOpacity={0.6}
                        underlayColor="#DDDDDD"
                        onPress={
                          () => this.setState({modalhide:false,hideadd:true})
                        }
                        style={{width:150,height:40,borderRadius:10}}
                      >
          <View>
            <Text style={{textAlign:'center',lineHeight:40}}>取消</Text>
          </View>
          </TouchableHighlight>
          <TouchableHighlight
                        activeOpacity={0.6}
                        underlayColor="#DDDDDD"
                        onPress={
                          () => this.submitcomment()
                        }
                        style={{width:150,height:40,borderRadius:10}}
                      >
          <View style={{width:150,height:40,borderRadius:10}}>
            <Text style={{textAlign:'center',lineHeight:40}}>确定</Text>
          </View>
          </TouchableHighlight>


          </View>



        </View>

        
        
      </View>
    </Modal>

          </SafeAreaView>
          
      )
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:  0,
    },
    item: {
      backgroundColor: 'white',
      // padding: 10,
      marginVertical: 5,
      marginHorizontal: 10,
      borderRadius:20,
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity:  0.4,
      shadowRadius: 3,
      elevation: 5,
    },
   
  });

export default  Commentlist;