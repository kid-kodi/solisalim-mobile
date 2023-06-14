import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Screen from '../components/Screen';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {BASE_API_URL} from '@env';
import HTMLView from 'react-native-htmlview';
import {useApi} from '../contexts/ApiProvider';
import {useUser} from '../contexts/UserProvider';
import Navigations from '../constants/Navigations';
import Comments from '../components/Comments';
import {formatTimeAgo} from '../helpers/utility';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function PostDetailScreen({route, navigation}) {
  const {user} = useUser();
  const api = useApi();
  const item = route.params;
  const [post, setPost] = useState();
  const [like, setLike] = useState(false);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);

  const checkLike = likes => {
    let match = likes.indexOf(user?._id) !== -1;
    return match;
  };

  const handleLike = async () => {
    if (user) {
      const response = await api.put(`/api/posts/like/${post?._id}`);
      if (!response.error) {
        setLike(true);
      }
    } else {
      setIsVisible(true);
    }
  };
  const handleUnlike = async () => {
    if (user) {
      const response = await api.put(`/api/posts/unlike/${post?._id}`);
      if (!response.error) {
        setLike(false);
      }
    } else {
      setIsVisible(true);
    }
  };

  const handleComment = () => {
    if (user) {
      setCommentOpen(true);
    } else {
      setIsVisible(true);
    }
  };

  const handleAuth = () => {
    navigation.navigate(Navigations.AUTH_STACK, {
      screen: Navigations.LOGIN,
    });
    setIsVisible(false);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await api.get(`/api/posts/slug/${item.slug}`);
      if (!response.error) {
        setPost(response);
        setLikes(response.likes);
        setLike(checkLike(response.likes));
        setComments(response.comments);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Screen>
      {/* <Header isBack={true} /> */}
      {loading ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <>
          <ScrollView style={styles.container}>
            <Image
              source={{
                uri: `${BASE_API_URL}/image/${post?.imageUrl}`,
              }}
              style={styles.image}
              resizeMode="cover"
            />
            <View>
              <Text style={styles.title}>{post?.title}</Text>
              <Text style={styles.info}>
                {post?.views} {' vues '}
                {formatTimeAgo(post?.updatedAt)}
              </Text>
              <Text style={styles.description}>{post?.description}</Text>
            </View>
            <View style={styles.content}>
              <HTMLView value={post?.content} />
            </View>
          </ScrollView>
          <View style={styles.bottomView}>
            {like ? (
              <TouchableOpacity
                style={styles.bottomViewButton}
                onPress={() => handleUnlike()}>
                <SimpleLineIcons name="like" color="green" size={25} />
                <Text style={{color: 'green'}}>{likes.length}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.bottomViewButton}
                onPress={() => handleLike()}>
                <SimpleLineIcons name="like" color="black" size={25} />
                <Text>{likes.length}</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.bottomViewButton}
              onPress={() => handleComment()}>
              <SimpleLineIcons name="bubbles" color="black" size={25} />
              <Text>{comments.length}</Text>
            </TouchableOpacity>
          </View>

          <Modal transparent={true} visible={isVisible}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 300,
                  minHeight: 100,
                  backgroundColor: '#fff',
                  padding: 12,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#ddd',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    style={{alignItems: 'flex-end'}}
                    onPress={() => setIsVisible(false)}>
                    <SimpleLineIcons name="close" color="black" size={25} />
                  </TouchableOpacity>
                </View>
                <Text style={{fontSize: 18, paddingVertical: 16}}>
                  Vous voulez interagir avec ce contenu ?
                </Text>
                <TouchableOpacity
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    backgroundColor: 'blue',
                    padding: 10,
                    borderRadius: 5,
                  }}
                  onPress={() => handleAuth()}>
                  <Text style={{color: '#fff'}}>Connectez vous</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Comments
            isVisible={commentOpen}
            setIsVisible={setCommentOpen}
            comments={comments}
            setComments={setComments}
            post={post}
          />
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  image: {width: WIDTH, height: HEIGHT * 0.33},
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    paddingHorizontal: 16,
  },
  info: {
    paddingHorizontal: 16,
  },
  description: {
    fontSize: 18,
    fontWeight: '500',
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  content: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  bottomView: {
    position: 'absolute',
    bottom: 25,
    minWidth: 50,
    minHeight: 50,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 12,
    gap: 20,
  },
  bottomViewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});
