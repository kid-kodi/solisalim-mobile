import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {BASE_API_URL} from '@env';
import {useUser} from '../contexts/UserProvider';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import Button from '../components/Button';
import Input from '../components/Input';
import Toast from 'react-native-root-toast';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('email invalide')
    .required("l'email est obligatoire"),
  password: Yup.string().required('Mot de passe est obligatoire'),
});

export default function CategoryDetailScreen({route, navigation}) {
  const [imageActive, setImageActive] = useState(0);
  const item = route.params;
  const {user} = useUser();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async values => {
      const response = await login(values);
      if (response.error) {
        Toast.show(response.error.message, {
          duration: Toast.durations.LONG,
        });
      }
    },
  });

  const onChange = nativeEvent => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide != imageActive) {
        setImageActive(slide);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.actionBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SimpleLineIcons name="arrow-left" color="#333" size={25} />
        </TouchableOpacity>
      </View>
      <View style={styles.wrap}>
        {item.image && (
          <Image
            source={{uri: `${BASE_API_URL}/image/${item.image}`}}
            resizeMode="stretch"
            style={styles.wrap}
          />
        )}
      </View>
      <View style={styles.item}>
        <View style={styles.cardBody}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const WIDTH = Math.round(Dimensions.get('window').width);
const HEIGHT = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  actionBar: {
    width: WIDTH - 25,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 10,
  },
  item: {
    width: WIDTH - 25,
    height: 300,
    backgroundColor: '#fff',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 20,
  },
  image: {
    width: WIDTH - 25,
    height: 220,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    opacity: 0.9,
  },
  cardBody: {
    paddingHorizontal: 12,
    flex: 1,
    justifyContent: 'center',
    gap: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  price: {
    color: 'red',
    fontSize: 14,
  },
  userCard: {
    width: WIDTH - 25,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#eee',
  },
  messageInput: {
    width: WIDTH - 25,
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: 20,
    marginVertical: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  inputText: {
    width: '100%',
  },
  wrap: {
    width: WIDTH,
    height: HEIGHT * 0.35,
  },
  wrapDot: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dotActive: {
    margin: 3,
    color: 'black',
  },
  dot: {
    margin: 3,
    color: '#fff',
  },
});
