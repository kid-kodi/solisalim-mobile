import {Text, View, ScrollView, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {globalStyle} from '../styles/global';

import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useApi} from '../contexts/ApiProvider';
import Button from '../components/Button';
import Input from '../components/Input';
import Toast from 'react-native-root-toast';
import Images from '../constants/Images';
import Navigations from '../constants/Navigations';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required('Ce champ est obligatoire'),
  lastName: Yup.string().required('Ce champ est obligatoire'),
  telephone: Yup.string().required(
    'Veuillez renseigner le numero de telephone',
  ),
  email: Yup.string()
    .email('email invalide')
    .required("l'email est obligatoire"),
  password: Yup.string()
    .required('Mot de passe est obligatoire')
    .min(4, 'Mot de passe doit être plus grand que 8 caractères'),
  confirmPassword: Yup.string()
    .required('Confirmation de mot de passe est obligatoire')
    .oneOf(
      [Yup.ref('password'), null],
      'Le mot de passe de confirmation ne correspond pas',
    ),
});

export default function RegisterScreen({navigation}) {
  const api = useApi();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async values => {
      const response = await api.post(`/api/auth/register`, values);
      if (!response.error) {
        Toast.show('Enregistrement effectué avec succèss', {
          duration: Toast.durations.LONG,
        });
        navigation.navigate(Navigations.LOGIN);
      } else {
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
            Enregistrez-vous
          </Text>
        </View>
        <Input
          label="Nom"
          placheHolder="Nom"
          error={formik.errors.firstName}
          onBlur={formik.handleBlur('firstName')}
          onChangeText={formik.handleChange('firstName')}
        />
        <Input
          label="Prénoms"
          placheHolder="Prénoms"
          error={formik.errors.lastName}
          onBlur={formik.handleBlur('lastName')}
          onChangeText={formik.handleChange('lastName')}
        />
        <Input
          label="Téléphone"
          placheHolder="Téléphone"
          error={formik.errors.telephone}
          onBlur={formik.handleBlur('telephone')}
          onChangeText={formik.handleChange('telephone')}
        />
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
        <Input
          label="Confirmer votre mot de passe"
          placeholder="Confirmer votre mot de passe"
          secureTextEntry
          autoCompleteType="password"
          autoCapitalize="none"
          error={formik.errors.confirmPassword}
          onBlur={formik.handleBlur('confirmPassword')}
          onChangeText={formik.handleChange('confirmPassword')}
        />

        <Button
          text="S'ENREGISTRER"
          customBtnStyle={{marginVertical: 10, backgroundColor: 'green'}}
          customTextStyle={{fontSize: 14}}
          isLoading={formik.isSubmitting}
          onPress={formik.handleSubmit}
        />

        <View style={{padding: 0, marginVertical: 25}}>
          <Button
            text="DEJA UN COMPTE ? CONNECTEZ-VOUS"
            customBtnStyle={{backgroundColor: '#ddd'}}
            customTextStyle={{color: 'green', fontSize: 14}}
            onPress={() => navigation.navigate(Navigations.LOGIN)}
          />
        </View>
      </View>
    </ScrollView>
  );
}
