import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Screen from '../components/Screen';
import VideoPlayer from 'react-native-video-player';
import {formatTimeAgo} from '../helpers/utility';
import {BASE_API_URL} from '@env';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Comments from '../components/Comments';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function VideoDetailScreen({route, navigation}) {
  const video = route.params;
  const [isVisible, setIsVisible] = useState(false);
  return (
    <Screen>
      <VideoPlayer
        video={{
          uri: `${BASE_API_URL}/video/miatayni.mp4`,
        }}
        videoWidth={1600}
        videoHeight={900}
        thumbnail={{uri: `${BASE_API_URL}/video/${video.coverPicture}`}}
        autoplay={true}
        showDuration={true}
      />
      <View style={styles.row}>
        <Text style={styles.title}>{video.title}</Text>
      </View>
      <View style={styles.row}>
        <Text>
          {video?.views} {'vues '}
          {formatTimeAgo(video?.updatedAt)}
        </Text>
      </View>
      <View style={[styles.row, styles.actions]}>
        <TouchableOpacity style={styles.button}>
          <SimpleLineIcons name={'like'} size={25} color="black" />
          <Text style={styles.buttonText}>{video?.likes?.length}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <SimpleLineIcons name={'dislike'} size={25} color="black" />
          <Text style={styles.buttonText}>{video?.likes?.length}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <SimpleLineIcons name={'share'} size={25} color="black" />
          <Text style={styles.buttonText}>{video?.likes?.length}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <SimpleLineIcons name={'cloud-download'} size={25} color="black" />
          <Text style={styles.buttonText}>{video?.likes?.length}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <View style={styles.header}>
          <View style={[styles.row, styles.headerTitle]}>
            <Text>Commentaires </Text>
            <Text>22 </Text>
          </View>
          <View style={styles.headerButton}>
            <TouchableOpacity onPress={() => setIsVisible(true)}>
              <Text>Voir tous</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Last comment */}
      <View
        style={{
          flexDirection: 'row',
          width: WIDTH,
          paddingHorizontal: 16,
          gap: 10,
        }}>
        <Image
          style={styles.userAvatar}
          source={{uri: `${BASE_API_URL}/image/profile.png`}}
        />
        <View style={{width: WIDTH - 60}}>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            consectetur dolores quasi iure aliquam debitis perferendis itaque
            quos saepe ut.
          </Text>
        </View>
      </View>
      <ReviewList isVisible={isVisible} setIsVisible={setIsVisible} />
    </Screen>
  );
}

var styles = StyleSheet.create({
  backgroundVideo: {
    width: WIDTH,
    height: HEIGHT * 0.33,
    backgroundColor: 'black',
  },
  title: {fontWeight: 'bold', fontSize: 18},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  actions: {
    justifyContent: 'space-around',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#ddd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  reviewContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 50,
  },
});
