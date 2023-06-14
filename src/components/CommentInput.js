import React, {useState} from 'react';
import {View, TextInput, Button} from 'react-native';

const CommentInput = ({handleAddComment}) => {
  const [comment, setComment] = useState('');

  const handleCommentChange = text => {
    setComment(text);
  };

  const handleCommentSubmit = () => {
    if (comment) {
      handleAddComment(comment);
      setComment('');
    }
  };

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{flex: 1}}>
        <TextInput
          value={comment}
          onChangeText={handleCommentChange}
          placeholder="Enter your comment"
        />
      </View>
      <Button title="Submit" onPress={handleCommentSubmit} />
    </View>
  );
};

export default CommentInput;
