import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';

const CategoryFilter = ({categories, selectedCategory, onSelectCategory}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item?._id?.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[
              styles.categoryItem,
              item?.name === selectedCategory && styles.selectedCategoryItem,
            ]}
            onPress={e => onSelectCategory(item.name)}>
            <Text
              style={[
                styles.categoryTitle,
                item?.name === selectedCategory && styles.selectedCategoryItem,
              ]}>
              {item.name ? item.name : item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingVertical: 10,
  },
  categoryItem: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCategoryItem: {
    backgroundColor: 'black',
    color: '#fff',
  },
  categoryTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default CategoryFilter;
