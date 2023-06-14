import {
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import CommentList from './CommentList';
import CommentInput from './CommentInput';
import {useApi} from '../contexts/ApiProvider';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function Comments({
  isVisible,
  setIsVisible,
  post,
  comments,
  setComments,
}) {
  const api = useApi();

  const handleAddComment = async comment => {
    // Api call
    const response = await api.put(`/api/posts/comment/${post?._id}`, {
      text: comment,
    });

    if (!response.error) {
      setComments(response.comments);
    }
  };

  const handleRemoveComment = async commentId => {
    const response = await api.put(`/api/posts/uncomment/${post?._id}`, {
      commentId: commentId,
    });

    if (!response.error) {
      setComments(response.comments);
    }
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="fade">
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 0,
        }}>
        <View
          style={{
            width: WIDTH,
            height: HEIGHT - 150,
            backgroundColor: '#fff',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            borderWidth: 1,
            borderColor: '#ddd',
          }}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderTitle}>Commentaires</Text>
            <TouchableOpacity
              style={styles.modalHeaderButton}
              onPress={() => setIsVisible(false)}>
              <SimpleLineIcons name={'close'} size={30} color="black" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalContent}>
            <CommentList
              handleRemoveComment={handleRemoveComment}
              comments={comments}
            />
          </ScrollView>
          <View style={styles.modalFooter}>
            <CommentInput handleAddComment={handleAddComment} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 500,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingHorizontal: 16,
  },
  modalHeaderTitle: {
    fontSize: 20,
  },
  modalContent: {
    flex: 1,
  },
  modalFooter: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 10,
  },
  reviewContent: {
    flexDirection: 'row',
    gap: 10,
  },
});
