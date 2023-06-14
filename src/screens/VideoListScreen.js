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
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import CategoryFilter from '../components/CategoryFilter';
import Navigations from '../constants/Navigations';
import {useApi} from '../contexts/ApiProvider';
import queryString from 'query-string';

const WIDTH = Dimensions.get('window').width;

export default function VideoListScreen() {
  const navigation = useNavigation();
  const api = useApi();
  const isFocused = useIsFocused();
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  const [queryParams, setQueryParams] = useState({
    page: '1',
    tags: '',
    keyword: '',
  });

  // Function to update the object value by key
  const updateObjectValueByKey = (key, value) => {
    setQueryParams(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const Item = ({image, title, description, onPress}) => (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Image
        source={{uri: `${image}`}}
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

  const fecthPost = async query => {
    setIsLoading(true);
    const response = await api.get(`/api/videos?${query}`);
    console.log(response);
    if (!response.error) {
      if (queryParams.page === 1) {
        setVideos(response.videos);
      } else {
        setVideos([...videos, ...response.videos]);
      }
      setCurrentPage(response.page);
      setTotalPages(response.pages);
      setIsLoading(false);
    }
  };

  const onSelectCategory = async category => {
    updateObjectValueByKey('tags', category);
    updateObjectValueByKey('page', 1);
    setSelectedCategory(category);
  };

  const loadMoreItem = () => {
    if (currentPage < totalPages) {
      // Fetch data from an API or any other source
      // Increment the page number
      updateObjectValueByKey('page', currentPage + 1);
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      const response = await api.get(`/api/categories/by_section/videos`);
      if (response) {
        setCategories([{title: 'Tous', name: '', _id: '-1'}, ...response]);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    // Convert the object into a query string
    const query = queryString.stringify(queryParams);
    fecthPost(query);
  }, [isFocused, queryParams]);

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
        data={videos}
        renderItem={({item, index}) => (
          <Item
            key={index}
            onPress={() => navigation.navigate(Navigations.VIDEO_DETAILS, item)}
            image={item.coverPicture}
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
