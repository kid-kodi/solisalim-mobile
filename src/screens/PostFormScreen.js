import {
  Alert,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Input from '../components/Input';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import Button from '../components/Button';
import Toast from 'react-native-root-toast';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import ImageList from '../components/ImageList';
import CategoryFilter from '../components/CategoryFilter';
import {AndroidCameraPermission} from '../helpers/AndroidPermissions';
import ImagePicker from 'react-native-image-crop-picker';
import {useApi} from '../contexts/ApiProvider';
import Screen from '../components/Screen';
import Header from '../components/Header';

const PostSchema = Yup.object().shape({
  category: Yup.string().required('Selectionner une catégorie'),
  title: Yup.string().required('le titre est obligatoire'),
  content: Yup.string().required('Veuillez renseigner le prix'),
});

export default function PostFormScreen({navigation}) {
  const api = useApi();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelectCategory = categoryId => {
    setSelectedCategory(categoryId);
    formik.setFieldValue('category', categoryId);
  };

  useEffect(() => {
    (async () => {
      const response = await api.get(`/api/categories`);
      if (!response.error) {
        setCategories(response);
      }
    })();
  }, []);

  const formik = useFormik({
    initialValues: {
      images: [],
      title: '',
      content: '',
    },
    validationSchema: PostSchema,
    onSubmit: async values => {
      const response = await api.post(`/api/posts`, values);
      if (!response.error) {
        navigation.goBack();
      } else {
        Toast.show(response.error.message, {
          duration: Toast.durations.LONG,
        });
      }
    },
  });

  const pickImage = async () => {
    const permissionStatus = await AndroidCameraPermission();
    if (permissionStatus || Platform.OS == 'ios') {
      Alert.alert('Image de profile', 'Choisir une options', [
        {text: 'Camera', onPress: onCamera},
        {text: 'Gallerie', onPress: onGallery},
        {text: 'Annuler', onPress: () => {}},
      ]);
    }
  };

  const onCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  };

  const onGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log('selected Image', image);
      imageUpload(image.path);
    });
  };

  const imageUpload = async imagePath => {
    const imageData = new FormData();
    imageData.append('imageMsg', {
      uri: imagePath,
      name: 'image.png',
      fileName: 'image',
      type: 'image/png',
    });
    // console.log('form data', imageData);
    const response = await api.post(`/api/upload/upload-img`, imageData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (!response.error) {
      formik.setFieldValue('images', [...formik.values.images, response]);
    }
  };

  return (
    <Screen>
      <ScrollView style={{flex: 1, padding: 12}}>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 20,
            gap: 20,
          }}>
          <ImageList images={formik.values.images} />
          {formik.values.images.length < 3 && (
            <TouchableOpacity
              style={{
                backgroundColor: '#fff',
                width: 100,
                height: 120,
                flexDirection: 'row',
                alignPosts: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}
              onPress={pickImage}>
              <SimpleLineIcons name="camera" color="#000" size={40} />
            </TouchableOpacity>
          )}
        </View>
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />
        {formik.errors.category && (
          <Text
            style={{
              color: '#FF5A5F',
              marginTop: 5,
              fontSize: 12,
              marginBottom: 5,
            }}>
            {formik.errors.category}
          </Text>
        )}
        <Input
          label="Titre"
          placheHolder="Chaussure Nike,etc..."
          autoCapitalize="none"
          error={formik.errors.title}
          onBlur={formik.handleBlur('title')}
          onChangeText={formik.handleChange('title')}
        />
        <Input
          label="Price"
          placheHolder="Chaussure Nike,etc..."
          autoCapitalize="none"
          error={formik.errors.content}
          onBlur={formik.handleBlur('content')}
          onChangeText={formik.handleChange('content')}
        />
        <Input
          label="Description"
          placheHolder="Chaussure Nike,etc..."
          autoCapitalize="none"
          error={formik.errors.description}
          onBlur={formik.handleBlur('description')}
          onChangeText={formik.handleChange('description')}
        />
      </ScrollView>
      <View style={{flexDirection: 'column', padding: 12}}>
        <Button
          text="PUBLIER"
          customBtnStyle={{marginVertical: 10, backgroundColor: 'green'}}
          customTextStyle={{fontSize: 14}}
          isLoading={formik.isSubmitting}
          onPress={formik.handleSubmit}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
