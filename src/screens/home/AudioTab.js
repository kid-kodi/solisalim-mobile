import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';
import {MUSICS} from '../../data/dummy';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export default function AudioTab() {
  const playbackState = usePlaybackState();
  const [currentTrack, setCurrentTrack] = useState();

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
    await TrackPlayer.add(MUSICS);
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

  return (
    <View style={styles.container}>
      <FlatList
        style={{flex: 1}}
        data={MUSICS}
        renderItem={({item, index}) => (
          <View style={styles.item} key={item.id}>
            <Image style={styles.itemImage} source={{uri: item.artwork}} />
            <View style={styles.itemPrimary}>
              <View>
                <Text numberOfLines={2} style={styles.itemTitle}>
                  {item.title}
                </Text>
                <Text style={styles.itemDuration}>{item.duration}</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => playByIndex(index)}
              style={styles.itemSecondary}>
              <SimpleLineIcons
                name={'control-play'}
                size={25}
                color={'black'}
              />
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.musicPlayer}>
        <View style={styles.musicPlayerInfo}>
          <Text style={styles.musicPlayerInfoTitle} numberOfLines={1}>
            {currentTrack?.title}
          </Text>
          <Text numberOfLines={1}>{currentTrack?.duration}</Text>
        </View>
        <View style={styles.musicPlayerControls}>
          <TouchableOpacity
            style={styles.musicPlayerControlsButton}
            onPress={() => playPrev()}>
            <SimpleLineIcons name={'control-start'} size={25} color={'black'} />
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
    bottom: 65,
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  musicPlayerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 10,
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
});
