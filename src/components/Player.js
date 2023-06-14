import TrackPlayer from 'react-native-track-player';

export const setupPlayer = async () => {
  await TrackPlayer.setupPlayer();
};

export const addTracks = async tracks => {
  await TrackPlayer.add(tracks);
};

export const playTrack = async trackId => {
  await TrackPlayer.skip(trackId);
  await TrackPlayer.play();
};

export const pauseTrack = async () => {
  await TrackPlayer.pause();
};

export const stopTrack = async () => {
  await TrackPlayer.stop();
};
