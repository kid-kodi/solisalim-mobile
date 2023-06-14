import React from 'react';
import {View} from 'react-native';
import Comment from './Comment';

const CommentList = ({comments, handleRemoveComment}) => {
  return (
    <View>
      {comments.map(comment => (
        <Comment
          key={comment?._id}
          id={comment?._id}
          text={comment?.text}
          author={comment?.postedBy}
          timestamp={comment?.created}
          handleRemoveComment={handleRemoveComment}
        />
      ))}
    </View>
  );
};

export default CommentList;
