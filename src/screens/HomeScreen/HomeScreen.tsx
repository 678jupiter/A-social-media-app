import React from 'react';
import {FlatList, View} from 'react-native';
import FeedPost from '../../components/FeedPost';
import posts from '../../assets/data/posts.json';

const HomeScreen = () => {
  return (
    <View>
      <FlatList
        data={posts}
        renderItem={({item}) => <FeedPost post={item} />}
        keyExtractor={item => {
          return `post-${item.createdAt}`;
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;
