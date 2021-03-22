import React,{ useState }  from 'react'
import {View,Text,FlatList,SafeAreaView} from 'react-native';
import { List,SwipeAction,Button } from '@ant-design/react-native';
const Item = List.Item;

export default function Myrelease(){
    // 要删除的id
    const [itemid, setData] = useState("");
    const data=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
    const right = [
        {
          text: '删除',
          onPress: () =>alert(itemid),
          style: { backgroundColor: 'red', color: 'white' },
        },
      ];
    rederitem=({item})=>{
        return(
        <SwipeAction
        autoClose
        style={{ backgroundColor: 'transparent' }}
        right={right}
        onOpen={()=>setData(item)}
        onClose={()=>setData("")}
        >
            <Item  wrap>
                <View  style={{flexDirection:'row'}}>
                    <Text style={{flex:11}}>文字超长sdfsfsffsfsffsfsdfsfsf折行文字超长折行文字超长折行文字超长折行文字超长折行</Text>
                    <View style={{flex:2,flexDirection:'column'}}>
                        <Text style={{textAlign:'center'}}>点赞</Text>
                        <Text style={{textAlign:'center'}}>0</Text>
                        <Text style={{textAlign:'center'}}>评论</Text>
                        <Text style={{textAlign:'center'}}>0</Text>
                    </View>          
                </View>
            </Item>
        </SwipeAction>
        )

    }
 return(
    <View style={{flex:1}}>
        {/* 头部 */}
        <View style={{height:50,backgroundColor:'red'}}>
            <Text style={{lineHeight:50,paddingLeft:20}}>所有发布(左滑可进行删除)</Text>
        </View>
        {/* 列表数据 */}
        <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
            <FlatList
                data={data}
                renderItem={rederitem}
                keyExtractor={item => item.toString()}
            />
        </SafeAreaView>
        <View style={{height:50,backgroundColor:'red',flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{lineHeight:50,marginLeft:20}}>已选择0项</Text>
        <Button type="primary" style={{width:100,height:50,marginRight:10}}>删除</Button>
        </View>
    </View>
 )
}
