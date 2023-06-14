import React from 'react';
import {View, FlatList, Image, StyleSheet} from 'react-native';
import {BASE_API_URL} from '@env';

const ImageList = ({images}) => {
  return (
    <View style={styles.container}>
      {images.map((image, index) => (
        <Image
          key={index}
          source={{uri: `${BASE_API_URL}/image/${image}`}}
          style={styles.image}
          resizeMode="cover"
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 120,
    marginHorizontal: 10,
    borderRadius: 8,
  },
});

export default ImageList;
