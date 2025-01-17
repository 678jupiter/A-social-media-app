import React, {useState, useRef} from 'react';
import {View, FlatList, Image, useWindowDimensions, ViewabilityConfig,ViewToken} from 'react-native';
import colors from '../../theme/colors';
import DoublePressable from '../DoublePressable';
interface ICarousel {
    images: string[];
    onDoublePress?: () => void
}

const Carousel = ({images, onDoublePress=() => {}}: ICarousel) => {
  const {width} = useWindowDimensions();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 51,
  };
  const onViewableItemsChange = useRef(({viewableItems}: {viewableItems: Array<ViewToken>}) => {
    if (viewableItems.length > 0) {
      setActiveImageIndex(viewableItems[0].index || 0);
    }
  });
  return (
    <View>
      <FlatList
        data={images}
        renderItem={({item}) => (
          <DoublePressable onDoublePress={onDoublePress}>
            <Image source={{uri: item}} style={{width, aspectRatio: 1}} />
          </DoublePressable>
        )}
        horizontal
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChange.current}
        viewabilityConfig={viewabilityConfig}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}>
        {images.map((_, index) => (
          <View
            key={index}
            style={{
              width: 10,
              aspectRatio: 1,
              borderRadius: 5,
              backgroundColor:
                activeImageIndex === index ? colors.primary : colors.white,
              margin: 10,
              marginHorizontal: 4,
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default Carousel;
