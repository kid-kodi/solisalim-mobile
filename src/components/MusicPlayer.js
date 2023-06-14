import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SlideModal from './SlideModal';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export default function MusicPlayer({
  currentTrack,
  modalVisible,
  setModalVisible,
}) {
  return (
    <SlideModal modalVisible={modalVisible} setModalVisible={setModalVisible}>
      <View style={styles.musicPlayer}>
        <View style={styles.musicPlayerInfo}>
          <Text style={styles.musicPlayerInfoTitle} numberOfLines={1}>
            {currentTrack?.title}
          </Text>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
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
    </SlideModal>
  );
}

const styles = StyleSheet.create({});
