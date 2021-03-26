import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Commentlist from './commentlist';
import Talk from './talk';
import Talkintalk from './talkintalk';

const HomeStack = createStackNavigator();

function Hot() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="热门" component={Commentlist} />
      <HomeStack.Screen name="评论" component={Talk} />
      <HomeStack.Screen name="所有回复" component={Talkintalk} />
    </HomeStack.Navigator>
  );
}

export default Hot;
