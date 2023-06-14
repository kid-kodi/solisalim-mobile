import {Text, View, ScrollView, Image} from 'react-native';
import React, {useEffect} from 'react';
import {globalStyle} from '../styles/global';

import {useFormik} from 'formik';
import * as Yup from 'yup';
import Button from '../components/Button';
import Input from '../components/Input';
import Toast from 'react-native-root-toast';
import {useUser} from '../contexts/UserProvider';
import Images from '../constants/Images';
import Navigations from '../constants/Navigations';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('email invalide')
    .required("l'email est obligatoire"),
  password: Yup.string().required('Mot de passe est obligatoire'),
});

export default function LoginScreen({navigation}) {
  const {user, login} = useUser();

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

  useEffect(() => {
    if (user) {
      navigation.navigate(Navigations.APP_STACK);
    }
  }, [user]);

  return (
    <ScrollView>
      <View style={globalStyle.container}>
        <View style={globalStyle.logoView}>
          <Image
            source={Images.logo}
            resizeMode="contain"
            style={globalStyle.logo}
          />
        </View>

        <View style={{marginBottom: 5}}>
          <Text style={{fontSize: 25, fontWeight: 'bold'}}>Connectez-vous</Text>
        </View>

        <Input
          label="Email adresse"
          placheHolder="Email adresse"
          autoCapitalize="none"
          autoCompleteType="email"
          keyboardType="email-address"
          error={formik.errors.email}
          onBlur={formik.handleBlur('email')}
          onChangeText={formik.handleChange('email')}
        />
        <Input
          label="Mot de passe"
          placeholder="Mot de passe"
          secureTextEntry
          autoCompleteType="password"
          autoCapitalize="none"
          error={formik.errors.password}
          onBlur={formik.handleBlur('password')}
          onChangeText={formik.handleChange('password')}
        />

        <Button
          text="SE CONNECTER"
          customBtnStyle={{marginVertical: 10, backgroundColor: 'green'}}
          customTextStyle={{fontSize: 14}}
          isLoading={formik.isSubmitting}
          onPress={formik.handleSubmit}
        />

        <View style={{flexDirection: 'column', padding: 0, marginVertical: 25}}>
          <Button
            text="ENREGISTREZ-VOUS"
            customBtnStyle={{backgroundColor: '#ddd', marginBottom: 10}}
            customTextStyle={{color: 'green', fontSize: 14}}
            onPress={() => navigation.navigate(Navigations.REGISTER)}
          />
          <Button
            text="MOT DE PASSE OUBLIER ?"
            customBtnStyle={{backgroundColor: '#eee'}}
            customTextStyle={{color: 'green', fontSize: 14}}
            onPress={() => navigation.navigate(Navigations.FORGOT_PASSWORD)}
          />
        </View>
      </View>
    </ScrollView>
  );
}
