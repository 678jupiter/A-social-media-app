import React, {useRef, useState} from 'react';
import {FlatList, View, ViewabilityConfig, ViewToken} from 'react-native';
import FeedPost from '../../components/FeedPost';
import posts from '../../assets/data/posts.json';

const HomeScreen = () => {
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 51,
  };
  const onViewableItemsChange = useRef(
    ({viewableItems}: {viewableItems: Array<ViewToken>}) => {
      if (viewableItems.length > 0) {
        setActivePostId(viewableItems[0].item.id);
      }
    },
  );
  return (
    <View>
      <FlatList
        data={posts}
        renderItem={({item}) => (
          <FeedPost post={item} isVisible={activePostId === item.id} />
        )}
        keyExtractor={item => {
          return `post-${item.createdAt}`;
        }}
        showsVerticalScrollIndicator={false}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChange.current}
      />
    </View>
  );
};

export default HomeScreen;
