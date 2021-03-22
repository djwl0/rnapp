import React from 'react'
import {View,Text} from 'react-native';
import storage from '../Storage'
import Logintrue from './logintrue'
import Loginfalse from './loginfalse'


class Mainaccount extends React.Component{

state={
   
}
refresh=()=>{
    const that=this
    storage.load({
        key:'account',
    }).then(ret=>{    
        that.props.navigation.setParams({
            islogin: true,
            user:ret
        })
    }).catch(err=>{
        that.props.navigation.setParams({
            islogin: false,
        })
    })

}
UNSAFE_componentWillMount=()=>{
    this.refresh()
}
render(){
    return(
        <View style={{flex:1}}>
            {this.props.route.params.islogin==true?
            <Logintrue 
            {...this.props}
            user={this.props.route.params.user}
            refresh={this.refresh.bind(this)}
            />:
            <Loginfalse {...this.props}/>}
        </View>   
    )
}
}

export default Mainaccount;