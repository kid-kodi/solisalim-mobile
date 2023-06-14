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
import {useApi} from '../contexts/ApiProvider';
import {BASE_API_URL} from '@env';
import {useNavigation} from '@react-navigation/native';
import Navigations from '../constants/Navigations';
import fonts from '../styles/fonts';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const ListItem = ({item}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(Navigations.POST_STACK, {
          screen: Navigations.POST_DETAILS,
          params: item,
        })
      }
      style={styles.item}>
      <Image
        source={{
          uri: `${BASE_API_URL}/image/${item.imageUrl}`,
        }}
        style={styles.itemPhoto}
        resizeMode="cover"
      />
      <Text style={[styles.itemText, fonts.bold]}>
        {item?.title?.length > 0
          ? item?.title?.substring(0, 25) + '...'
          : item?.title}
      </Text>
    </TouchableOpacity>
  );
};

export default function RecentsPost({id, title, apiUrl}) {
  const navigation = useNavigation();
  const api = useApi();
  const [recents, setRecents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await api.get(apiUrl);
      if (!response.error) {
        setRecents(response);
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <>
      {isLoading ? (
        <View style={[styles.wrap, styles.center]}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={styles.section}>
          <View style={styles.header}>
            <Text style={[styles.headerTitle]}>{title}</Text>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => navigation.navigate(Navigations.POST_STACK)}>
              <Text style={styles.headerButtonText}>Voir Plus</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            data={recents}
            renderItem={({item}) => <ListItem item={item} />}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', marginBottom: 60},
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
    fontFamily: fonts.bold,
  },
  headerButton: {
    paddingHorizontal: 12,
  },
  headerButtonText: {
    fontWeight: '400',
    fontSize: 14,
    fontFamily: fonts.regular,
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
    fontFamily: fonts.regular,
  },
});
