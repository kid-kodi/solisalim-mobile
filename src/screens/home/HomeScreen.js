import {View, Text} from 'react-native';
import React, {useState} from 'react';
import Screen from '../../components/Screen';
import Header from '../../components/Header';
import Images from '../../constants/Images';
import {BASE_API_URL} from '@env';
import BottomTab from '../../components/BottomTab';
import HomeTab from './HomeTab';
import PostTab from './PostTab';
import VideoTab from './VideoTab';
import AudioTab from './AudioTab';
import ProfileTab from './ProfileTab';
import {useApi} from '../../contexts/ApiProvider';

export default function HomeScreen() {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <Screen>
      <Header
        isBack={true}
        leftIcon={{
          uri: `${BASE_API_URL}/static/media/logo.1de7d7e6757ec9c56dab.jpeg`,
        }}
        rightIcon={require('../../assets/images/notification.png')}
        title={'Solisalim'}
      />
      {selectedTab === 0 ? (
        <HomeTab setSelectedTab={setSelectedTab} />
      ) : selectedTab === 1 ? (
        <PostTab />
      ) : selectedTab === 2 ? (
        <VideoTab />
      ) : selectedTab === 3 ? (
        <AudioTab />
      ) : selectedTab === 4 ? (
        <ProfileTab />
      ) : null}
      <BottomTab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
    </Screen>
  );
}
