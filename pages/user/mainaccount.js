import React from 'react'
import {View,Text,Button,Image,TouchableHighlight} from 'react-native';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';


const storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: false, 
  });


class Mainaccount extends React.Component{

    state={
        islogin:false,
        user:{}
    }
    refresh=()=>{
        const that=this
        storage.load({
            key:'account',
        }).then(ret=>{
        
            that.setState({
                user:ret,
                islogin:true
            })
        }).catch(err=>{
            that.setState({
                islogin:false
            })
        })

    }
    UNSAFE_componentWillMount=()=>{
        this.refresh()
    }
   
    UNSAFE_componentWillUpdate=()=>{ 
        this.refresh()
    }


    render(){
        return(
            <View style={{flex:1,flexDirection:'row',paddingTop:30}}>
               {this.state.islogin==true?
                 <View style={{height:60,flex:1,borderRadius:20,flexDirection:'row'}}>
                    <View style={{height:60,width:60,backgroundColor:'white'}}>
                    <Image
                            style={{height:50,width:50,borderRadius:25,marginTop:5}}
                            source={{uri: this.state.user.icon}}
                        />
                    </View>
                    <Text style={{height:60,flex:5,lineHeight:60,paddingLeft:15,backgroundColor:'white'}}>
                        {this.state.user.name}
                    </Text>
                    <TouchableHighlight
                          activeOpacity={0.6}
                          underlayColor="#DDDDDD"
                          onPress={
                            () =>{
                                storage.remove({
                                    key: 'account',
                                  });
                                this.setState({islogin:false})   
                            } 
                          }
                          style={{height:60,flex:2,lineHeight:60,justifyContent:'center',alignItems:'center',backgroundColor:'white',borderLeftWidth:0.3}}
                        >
                    <View>
                        <Text style={{fontSize:18,}}>登出</Text>
                    </View>
                    </TouchableHighlight>
                </View>     
                :
                <View style={{height:60,flex:1,backgroundColor:'red',borderRadius:20,marginHorizontal:10,flexDirection:'row'}}>
                    <TouchableHighlight
                        activeOpacity={0.6}
                        underlayColor="#DDDDDD"
                        onPress={
                            () => this.props.navigation.navigate('登录')
                        }
                        style={{height:60,flex:1,lineHeight:60,backgroundColor:'skyblue',justifyContent:'center',alignItems:'center',borderRadius:15}}
                        >
                    <View style={{height:60,flex:1,justifyContent:'center',alignItems:'center',borderRadius:15}}>
                        <Text style={{fontSize:18,}}>点击去登陆</Text>
                    </View>
                    </TouchableHighlight>

                </View>
                }

            </View>
            
        )
    }

}

export default Mainaccount;