import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Screen from '../components/Screen';
import {useApi} from '../contexts/ApiProvider';

export default function MyPostsScreen() {
  const api = useApi();
  const [posts, setPosts] = useState();

  return (
    <Screen>
      <Text>MyPostsScreen</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({});
