import React, {useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import data2 from '../data/data2';
import Feather from 'react-native-vector-icons/Feather';

const {width, height} = Dimensions.get('window');

export default function Slider() {
  const [isPress, setIsPress] = useState({
    left: false,
    right: false,
  });
  const [xIndex, setXIndex] = useState(0);

  const sliderRef = useRef(null);

  const touchprops = {
    activeOpacity: 1,
    underlayColor: '#115846',
  };

  const handlePress = (type) => {
    if (type === 'right') {
      if (xIndex + 1 > 2) {
        sliderRef.current.scrollToIndex({index: 2});
      } else {
        sliderRef.current.scrollToIndex({index: xIndex + 1});
      }
    } else {
      if (xIndex - 1 < 0) {
        sliderRef.current.scrollToIndex({index: 0});
      } else {
        sliderRef.current.scrollToIndex({index: xIndex - 1});
      }
    }
  };

  const ImageSlider = ({item}) => {
    return (
      <View
        style={{
          width,
          height: height / 3.5,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image source={item.image} style={styles.imageSlider} />
      </View>
    );
  };

  return (
    <>
      <View style={styles.sliderWrapper}>
        <View
          style={[
            styles.navigation,
            {
              left: 30,
            },
          ]}>
          <TouchableHighlight
            {...touchprops}
            onHideUnderlay={() => setIsPress({left: false})}
            onShowUnderlay={() => setIsPress({left: true})}
            onPress={() => handlePress('left')}
            style={[
              styles.navigationButton,
              {backgroundColor: isPress.left ? '#115846' : '#ededf1'},
            ]}>
            <Feather
              name="chevron-left"
              size={30}
              style={{color: isPress.left ? '#fff' : '#9e9e9f'}}
            />
          </TouchableHighlight>
        </View>
        <View>
          <FlatList
            ref={sliderRef}
            data={data2}
            renderItem={({item}, index) => (
              <ImageSlider item={item} index={index} />
            )}
            keyExtractor={(data2) => data2.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            scrollEventThrottle={16}
            snapToAlignment="center"
            getItemLayout={(data, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            onScroll={(e) => {
              let offset = e.nativeEvent.contentOffset.x;
              let index = parseInt(offset / width); // your cell height
              setXIndex(index);
            }}
            scrollEventThrottle={16}
          />
        </View>
        <View
          style={[
            styles.navigation,
            {
              right: 30,
            },
          ]}>
          <TouchableHighlight
            {...touchprops}
            onHideUnderlay={() => setIsPress({right: false})}
            onShowUnderlay={() => setIsPress({right: true})}
            onPress={() => handlePress('right')}
            style={[
              styles.navigationButton,
              {backgroundColor: isPress.right ? '#115846' : '#ededf1'},
            ]}>
            <Feather
              name="chevron-right"
              size={30}
              style={{color: '#9e9e9f'}}
              style={{color: isPress.right ? '#fff' : '#9e9e9f'}}
            />
          </TouchableHighlight>
        </View>
      </View>
      <View style={styles.dotsWrapper}>
        {data2.map((data2, index) => {
          return (
            <View
              key={index}
              style={[
                styles.dots,
                {
                  backgroundColor: index === xIndex ? '#1e6150' : '#cacacb',
                  width: index === xIndex ? 20 : 5,
                },
              ]}
            />
          );
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  imageSlider: {
    width: width * 0.75,
    height: width * 0.75,
    resizeMode: 'contain',
    flex: 1,
  },
  sliderWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navigation: {
    position: 'absolute',
    zIndex: 1,
  },
  navigationButton: {
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      height: 5,
      width: 0,
    },
    shadowRadius: 10,
    shadowOpacity: 0.05,
    // backgroundColor: '#ededf1',
  },
  dotsWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dots: {
    height: 5,
    borderRadius: 5,
    marginRight: 5,
  },
});
