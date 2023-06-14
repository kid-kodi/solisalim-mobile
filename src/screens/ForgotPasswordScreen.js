import {Text, View, ScrollView, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {globalStyle} from '../styles/global';

import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useApi} from '../contexts/ApiProvider';
import Button from '../components/Button';
import Input from '../components/Input';
import Toast from 'react-native-root-toast';
import Navigations from '../constants/Navigations';
import Images from '../constants/Images';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('email invalide')
    .required("l'email est obligatoire"),
});

export default function ForgotPasswordScreen({navigation}) {
  const api = useApi();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async values => {
      const response = await api.post(`/api/auth/forgot-password`, values);
      if (!response.error) {
        navigation.navigate(Navigations.VERIFY_OTP);
      }
      if (response.error) {
        Toast.show(response.error.message, {
          duration: Toast.durations.LONG,
        });
      }
    },
  });

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
          <Text style={{fontSize: 25, fontWeight: 'bold'}}>
            Mot de passe oublier
          </Text>
        </View>

        <Input
          label="Entrez votre email adresse"
          placheHolder="Email adresse"
          autoCapitalize="none"
          autoCompleteType="email"
          keyboardType="email-address"
          error={formik.errors.email}
          onBlur={formik.handleBlur('email')}
          onChangeText={formik.handleChange('email')}
        />

        <Button
          text="ENVOYER CODE"
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
        </View>
      </View>
    </ScrollView>
  );
}
