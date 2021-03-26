import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, SafeAreaView} from 'react-native';
import {
  List,
  SwipeAction,
  Button,
  Modal,
  Toast,
} from '@ant-design/react-native';
const Item = List.Item;

export default function Myrelease(props) {
  // 要删除的id
  const [itemid, setData] = useState('');
  // 删除操作
  deletecomment = () => {
    fetch('http://47.93.233.220:8099/deletemycomment?commentid=' + itemid)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res == '1') {
          let list = props.route.params.data;
          // console.log(list)
          for (let i = 0, len = list.length; i < len; i++) {
            if (list[i].commentid == itemid) {
              list.splice(i, 1);
              break;
            }
          }
          Toast.info('删除成功', 1, undefined, false);
          setData('');
        }
      })
      .catch((err) => {
        console.log(err);
        Toast.info('失败！', 1, undefined, false);
        setData('');
      });
  };
  // 右滑操作菜单
  const right = [
    {
      text: '删除',
      onPress: () => {
        Modal.alert('提示', '确定要删除这条发布吗？', [
          {
            text: '取消',
            onPress: () => console.log('cancel'),
            style: 'cancel',
          },
          {text: '确定', onPress: () => deletecomment()},
        ]);
      },
      style: {backgroundColor: 'red', color: 'white'},
    },
  ];

  rederitem = ({item}) => {
    return (
      <SwipeAction
        autoClose
        style={{backgroundColor: 'transparent'}}
        right={right}
        onOpen={() => setData(item.commentid)}>
        <Item wrap>
          <View style={{flexDirection: 'row'}}>
            <Text style={{flex: 11}}>{item.main}</Text>
            <View style={{flex: 2, flexDirection: 'column'}}>
              <Text style={{textAlign: 'center'}}>点赞</Text>
              <Text style={{textAlign: 'center'}}>{item.likecount}</Text>
              <Text style={{textAlign: 'center'}}>评论</Text>
              <Text style={{textAlign: 'center'}}>{item.talkcount}</Text>
            </View>
          </View>
        </Item>
      </SwipeAction>
    );
  };
  return (
    <View style={{flex: 1}}>
      {/* 头部 */}
      <View style={{height: 50, backgroundColor: 'skyblue'}}>
        <Text style={{lineHeight: 50, paddingLeft: 20}}>
          所有发布(左滑可进行删除)
        </Text>
      </View>
      {/* 列表数据 */}
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <FlatList
          data={props.route.params.data}
          renderItem={rederitem}
          keyExtractor={(item) => item.commentid.toString()}
        />
      </SafeAreaView>
      {/* <View style={{height:50,backgroundColor:'red',flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{lineHeight:50,marginLeft:20}}>已选择0项</Text>
        <Button type="primary" style={{width:100,height:50,marginRight:10}}>删除</Button>
        </View> */}
    </View>
  );
}
