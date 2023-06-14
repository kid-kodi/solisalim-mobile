import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useApi} from '../contexts/ApiProvider';
import {BASE_API_URL} from '@env';
import {useNavigation} from '@react-navigation/native';
import Navigations from '../constants/Navigations';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function ImageSlider() {
  const navigation = useNavigation();
  const api = useApi();
  const [slides, setSlides] = useState();
  const [imageActive, setActiveImage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = nativeEvent => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide != imageActive) {
        setActiveImage(slide);
      }
    }
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await api.get(`/api/posts`);
      if (!response.error) {
        setSlides(response.posts.slice(0, 5));
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <View style={[styles.wrap, styles.imageSlider]}>
      {isLoading ? (
        <View style={[styles.wrap, styles.center]}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <>
          <ScrollView
            onScroll={({nativeEvent}) => onChange(nativeEvent)}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal
            style={styles.wrap}>
            {slides?.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate(Navigations.POST_STACK, {
                    screen: Navigations.POST_DETAILS,
                    params: item,
                  })
                }>
                <Image
                  resizeMode="stretch"
                  style={styles.wrap}
                  source={{uri: `${BASE_API_URL}/image/${item.imageUrl}`}}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.wrapDot}>
            {slides?.map((e, index) => (
              <Text
                key={index}
                style={imageActive === index ? styles.doActive : styles.dot}>
                ●
              </Text>
            ))}
          </View>
        </>
      )}
      {/*  */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', marginBottom: 60},
  center: {justifyContent: 'center', alignItems: 'center'},
  imageSlider: {
    marginBottom: 20,
  },
  wrap: {width: WIDTH, height: HEIGHT * 0.33},
  wrapDot: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  doActive: {
    margin: 3,
    color: 'black',
  },
  dot: {margin: 3, color: 'white'},
  section: {
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontWeight: '800',
    fontSize: 20,
    color: '#777',
    paddingHorizontal: 12,
  },
  headerButton: {
    paddingHorizontal: 12,
  },
  headerButtonText: {
    fontWeight: '500',
    fontSize: 16,
  },
  item: {
    margin: 10,
  },
  itemPhoto: {
    width: 200,
    height: 200,
  },
  itemText: {
    color: 'black',
    marginTop: 5,
  },
});
