import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useUser} from '../contexts/UserProvider';
import {formatTimeAgo} from '../helpers/utility';
import Avatar from './Avatar';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const Comment = ({id, text, author, timestamp, handleRemoveComment}) => {
  const {user} = useUser();
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10,
        marginTop: 10,
        paddingHorizontal: 16,
      }}>
      <Avatar
        img={author?.profilePicture}
        width={30}
        height={30}
        roundedImage={true}
        placeholder={author?.firstName}
      />
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', gap: 2}}>
          <Text style={{fontSize: 12, color: '#777'}}>
            {author?.firstName + ' ' + author?.lastName}
          </Text>
          <Text style={{fontSize: 12, color: '#777'}}>
            {formatTimeAgo(timestamp)}
          </Text>
        </View>
        <Text>{text}</Text>
      </View>
      {user?._id === author._id && (
        <TouchableOpacity onPress={() => handleRemoveComment(id)}>
          <SimpleLineIcons name={'trash'} size={20} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Comment;
