import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BASE_API_URL} from '@env';
import React, {useEffect, useState} from 'react';
import {useApi} from '../../contexts/ApiProvider';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import CategoryFilter from '../../components/CategoryFilter';
import Navigations from '../../constants/Navigations';

const WIDTH = Dimensions.get('window').width;

export default function PostTab() {
  const navigation = useNavigation();
  const api = useApi();
  const isFocused = useIsFocused();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  const Item = ({image, title, description, onPress}) => (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Image
        source={{uri: `${BASE_API_URL}/image/${image}`}}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.cardBody}>
        <Text style={styles.title}>
          {title?.length > 0 ? title?.substring(0, 60) + '...' : title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderLoader = () => {
    return isLoading ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };

  const fecthPost = async () => {
    setIsLoading(true);
    const response = await api.get(
      `/api/posts/?page=${currentPage}&tags=${selectedCategory}&keyword=${keyword}`,
    );
    if (!response.error) {
      setPosts([...posts, ...response.posts]);
      setCurrentPage(response.page);
      setTotalPages(response.pages);
      setIsLoading(false);
    }
  };

  const onSelectCategory = async category => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setPosts([]);
  };

  const loadMoreItem = () => {
    if (currentPage < totalPages) {
      // Fetch data from an API or any other source
      // Increment the page number
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      const response = await api.get(`/api/categories/by_section/posts`);
      if (response) {
        setCategories([{name: 'Tous', _id: '-1'}, ...response]);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    if (isFocused) {
      (async () => {
        fecthPost();
      })();
    }
  }, [isFocused, selectedCategory]);

  return (
    <View style={styles.container}>
      {/* Categories */}
      <View style={{paddingHorizontal: 16}}>
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
        />
      </View>
      <FlatList
        // ListEmptyComponent={myListEmpty}
        data={posts}
        renderItem={({item, index}) => (
          <Item
            key={index}
            onPress={() => navigation.navigate(Navigations.POST_DETAILS, item)}
            image={item.imageUrl}
            title={item.title}
            price={item.description}
          />
        )}
        keyExtractor={item => item?._id}
        ListFooterComponent={renderLoader}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 60,
  },
  item: {
    width: WIDTH - 25,
    height: 300,
    backgroundColor: '#fff',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 20,
  },
  image: {
    width: WIDTH - 25,
    height: 220,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    opacity: 0.9,
  },
  cardBody: {
    paddingHorizontal: 12,
    flex: 1,
    justifyContent: 'center',
    gap: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  price: {
    color: 'red',
    fontSize: 14,
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: 'center',
  },
});
