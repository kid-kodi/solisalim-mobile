import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
  Event,
} from 'react-native-track-player';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {BASE_API_URL} from '@env';
import CategoryFilter from '../components/CategoryFilter';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useApi} from '../contexts/ApiProvider';
import queryString from 'query-string';
import SlideModal from '../components/SlideModal';
// import MusicPlayer from '../components/MusicPlayer';

function Playlist() {
  const [queue, setQueue] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(0);

  async function loadPlaylist() {
    const queue = await TrackPlayer.getQueue();
    setQueue(queue);
  }

  useEffect(() => {
    loadPlaylist();
  }, []);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], event => {
    if (event.state == State.nextTrack) {
      TrackPlayer.getCurrentTrack().then(index => setCurrentTrack(index));
    }
  });

  function PlaylistItem({index, title, isCurrent}) {
    function handleItemPress() {
      TrackPlayer.skip(index);
    }

    async function handleRemoveItem() {
      await TrackPlayer.remove(index);
    }

    return (
      <TouchableOpacity onPress={handleItemPress}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            gap: 5,
          }}>
          <Text
            style={{
              ...styles.playlistItem,
              ...{backgroundColor: isCurrent ? '#eee' : 'transparent'},
            }}>
            {title}
          </Text>
          <SimpleLineIcons
            onPress={handleRemoveItem}
            name={'trash'}
            size={30}
            color={'#777'}
          />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.playlist}>
      <FlatList
        data={queue}
        renderItem={({item, index}) => (
          <PlaylistItem
            index={index}
            title={item.title}
            isCurrent={currentTrack == index}
          />
        )}
      />
    </View>
  );
}

function TrackProgress() {
  const {position, duration} = useProgress(200);

  function format(seconds) {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }

  return (
    <View>
      <Text style={styles.trackProgress}>
        {format(position)} / {format(duration)}
      </Text>
    </View>
  );
}

function Header() {
  const [info, setInfo] = useState({});
  useEffect(() => {
    setTrackInfo();
  }, []);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], event => {
    if (event.state == State.nextTrack) {
      setTrackInfo();
    }
  });

  async function setTrackInfo() {
    const track = await TrackPlayer.getCurrentTrack();
    const info = await TrackPlayer.getTrack(track);
    setInfo(info);
  }

  return (
    <View>
      <Text style={styles.songTitle}>{info.title}</Text>
      <Text style={styles.artistName}>{info.artist}</Text>
    </View>
  );
}

export default function AudioListScreen() {
  const playbackState = usePlaybackState();
  const [isOpen, setIsOpen] = useState(false);
  const [currentTrack, setCurrentTrack] = useState();
  const navigation = useNavigation();
  const api = useApi();
  const isFocused = useIsFocused();
  const [musics, setMusics] = useState([]);
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

  const getCurrentTrackInfo = async () => {
    const state = await TrackPlayer.getState();
    if (state === State.Playing) {
      console.log('The player is playing');
    }

    let trackIndex = await TrackPlayer.getCurrentTrack();
    let trackObject = await TrackPlayer.getTrack(trackIndex);
    console.log(`Title: ${trackObject.title}`);

    const position = await TrackPlayer.getPosition();
    const duration = await TrackPlayer.getDuration();
    console.log(`${duration - position} seconds left.`);
    setCurrentTrack({title: trackObject.title, duration: duration});
  };

  const setupPlayer = async () => {
    await TrackPlayer.setupPlayer();
  };

  const togglePlayback = async playBackstate => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack !== null) {
      if (playBackstate.state === State.Ready) {
        await TrackPlayer.play();
      } else if (playBackstate.state === State.Paused) {
        await TrackPlayer.play();
      } else if (playBackstate.state === State.Playing) {
        await TrackPlayer.pause();
      }
    }
    getCurrentTrackInfo();
  };

  const playSelected = async music => {
    try {
      const queue = await TrackPlayer.getQueue();
      const isTrackInPlaylist = queue.some(track => track.id === music._id);
      if (!isTrackInPlaylist) {
        await TrackPlayer.add({
          id: music._id,
          url: `${BASE_API_URL}/audio/${music.url}`, // Load media from the network
          title: music.title,
          artist: 'deadmau5',
          album: 'while(1<2)',
          genre: music.genre,
          date: music.createdAt, // RFC 3339
          artwork: `${BASE_API_URL}/image/${music.img}`, // Load artwork from the network
          duration: '402', // Duration in seconds
        });
      }
      setIsOpen(true);
      if (currentTrack !== null) {
        await TrackPlayer.play();
        getCurrentTrackInfo();
      }
      console.log('Music added to the playlist successfully');
    } catch (error) {
      console.error('Error adding music to the playlist:', error);
    }
  };
  const addToPlaylist = async music => {
    try {
      const queue = await TrackPlayer.getQueue();
      const isTrackInPlaylist = queue.some(track => track.id === music._id);
      if (!isTrackInPlaylist) {
        await TrackPlayer.add({
          id: music._id,
          url: `${BASE_API_URL}/audio/${music.url}`, // Load media from the network
          title: music.title,
          artist: 'deadmau5',
          album: 'while(1<2)',
          genre: music.genre,
          date: music.createdAt, // RFC 3339
          artwork: `${BASE_API_URL}/image/${music.img}`, // Load artwork from the network
          duration: '402', // Duration in seconds
        });
      }
      setIsOpen(true);
      console.log('Music added to the playlist successfully');
    } catch (error) {
      console.error('Error adding music to the playlist:', error);
    }
  };

  const removeFromPlaylist = async music => {
    try {
      await TrackPlayer.remove({
        id: music._id,
        url: `${BASE_API_URL}/audio/${music.url}`, // Load media from the network
        title: music.title,
        artist: 'deadmau5',
        album: 'while(1<2)',
        genre: music.genre,
        date: music.createdAt, // RFC 3339
        artwork: `${BASE_API_URL}/audio/${music.img}`, // Load artwork from the network
        duration: '402', // Duration in seconds
      });
      setIsOpen(true);
      console.log('Music added to the playlist successfully');
    } catch (error) {
      console.error('Error adding music to the playlist:', error);
    }
  };

  const playByIndex = async index => {
    await TrackPlayer.skip(index);
    getCurrentTrackInfo();
  };

  const playNext = async () => {
    await TrackPlayer.skipToNext();
    getCurrentTrackInfo();
  };

  const playPrev = async () => {
    await TrackPlayer.skipToPrevious();
    getCurrentTrackInfo();
  };

  useEffect(() => {
    setupPlayer();
  }, []);

  // Function to update the object value by key
  const updateObjectValueByKey = (key, value) => {
    setQueryParams(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const onSelectCategory = async category => {
    updateObjectValueByKey('tags', category);
    updateObjectValueByKey('page', 1);
    setSelectedCategory(category);
  };

  const fecthAudio = async query => {
    setIsLoading(true);
    const response = await api.get(`/api/musics?${query}`);
    console.log(response.musics);
    if (!response.error) {
      if (queryParams.page === 1) {
        setMusics(response.musics);
        // await TrackPlayer.add(response.musics);
      } else {
        setMusics([...musics, ...response.musics]);
        // await TrackPlayer.add([...musics, ...response.musics]);
      }
      setCurrentPage(response.page);
      setTotalPages(response.pages);
      setIsLoading(false);
      // await TrackPlayer.add(musics);
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      const response = await api.get(`/api/categories/by_section/audios`);
      if (response) {
        setCategories([{title: 'Tous', name: '', _id: '-1'}, ...response]);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    // Convert the object into a query string
    const query = queryString.stringify(queryParams);
    fecthAudio(query);
  }, [isFocused, queryParams]);

  return (
    <View style={{flex: 1}}>
      <View style={{paddingHorizontal: 16}}>
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
        />
      </View>
      <FlatList
        style={{flex: 1}}
        data={musics}
        renderItem={({item, index}) => (
          <View style={styles.item} key={item._id}>
            <Image
              style={styles.itemImage}
              source={{uri: `${BASE_API_URL}/image/${item.img}`}}
            />
            <View style={styles.itemPrimary}>
              <View>
                <Text numberOfLines={2} style={styles.itemTitle}>
                  {item.title}
                </Text>
                <Text style={styles.itemDuration}>{item.duration}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', gap: 5}}>
              <TouchableOpacity
                onPress={() => addToPlaylist(item)}
                style={styles.itemSecondary}>
                <SimpleLineIcons name={'plus'} size={25} color={'black'} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => playSelected(item)}
                style={styles.itemSecondary}>
                <SimpleLineIcons
                  name={'control-play'}
                  size={25}
                  color={'black'}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      {/* <MusicPlayer
        modalVisible={isOpen}
        setModalVisible={setIsOpen}
        currentTrack={currentTrack}
      /> */}
      <SlideModal modalVisible={isOpen} setModalVisible={setIsOpen}>
        <View style={styles.musicPlayer}>
          <View style={styles.musicPlayerInfo}>
            <Text style={styles.musicPlayerInfoTitle} numberOfLines={1}>
              {currentTrack?.title}
            </Text>
            <TouchableOpacity onPress={() => setIsOpen(false)}>
              <SimpleLineIcons name={'close'} color={'black'} size={25} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Header />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TrackProgress />
          </View>
          <Playlist />
          <View style={styles.musicPlayerControls}>
            <TouchableOpacity
              style={styles.musicPlayerControlsButton}
              onPress={() => playPrev()}>
              <SimpleLineIcons
                name={'control-start'}
                size={25}
                color={'black'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.musicPlayerControlsButton}
              onPress={() => togglePlayback(playbackState)}>
              {playbackState.state === State.Playing ? (
                <SimpleLineIcons
                  name={'control-pause'}
                  size={25}
                  color={'black'}
                />
              ) : (
                <SimpleLineIcons
                  name={'control-play'}
                  size={25}
                  color={'black'}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.musicPlayerControlsButton}
              onPress={() => playNext()}>
              <SimpleLineIcons name={'control-end'} size={25} color={'black'} />
            </TouchableOpacity>
          </View>
        </View>
      </SlideModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    margin: 5,
    backgroundColor: '#fff',
  },
  itemPrimary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  itemDuration: {fontSize: 14},
  itemImage: {
    width: 50,
    height: 50,
  },
  itemSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  musicPlayer: {
    position: 'absolute',
    bottom: 1,
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  musicPlayerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  musicPlayerControlsButton: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  musicPlayerInfo: {
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  musicPlayerInfoTitle: {
    fontWeight: 'bold',
  },
  playlist: {
    marginTop: 20,
    marginBottom: 20,
  },
  playlistItem: {
    flex: 1,
    fontSize: 16,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 4,
  },
  trackProgress: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    color: '#eee',
  },
  songTitle: {
    fontSize: 25,
    marginTop: 10,
    color: '#ccc',
    textAlign: 'center',
  },
  artistName: {
    textAlign: 'center',
    fontSize: 20,
    color: '#888',
  },
});
