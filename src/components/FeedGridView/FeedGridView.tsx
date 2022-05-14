import {Image, FlatList} from 'react-native';
import React from 'react';
import user from '../../assets/data/user.json';
import ProfileHeader from '../../screens/ProfileScreen/ProfileHeader';
import FeedGridItem from './FeedGridItem';

interface IFeedGreedView {
  data: Ipost[];
  ListHeaderComponent?:
    | React.ComponentType<any>
    | React.ReactElement
    | null
    | undefined;
}

const FeedGridView = ({data, ListHeaderComponent}: IFeedGreedView) => {
  return (
    <FlatList
      data={data}
      numColumns={3}
      renderItem={({item}) => <FeedGridItem post={item} />}
      keyExtractor={item => {
        return `post-${item.createdAt}`;
      }}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={ListHeaderComponent}
      style={{marginHorizontal: -1}}
    />
  );
};

export default FeedGridView;
