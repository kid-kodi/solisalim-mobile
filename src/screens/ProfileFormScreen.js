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
import {useUser} from '../contexts/UserProvider';

const ProfileFormSchema = Yup.object().shape({
  firstName: Yup.string().required('Ce champ est obligatoire'),
  lastName: Yup.string().required('Ce champ est obligatoire'),
  telephone: Yup.string().required(
    'Veuillez renseigner le numero de telephone',
  ),
  email: Yup.string()
    .email('email invalide')
    .required("l'email est obligatoire"),
});

export default function ProfileFormScreen({navigation}) {
  const {user, update} = useUser();
  const api = useApi();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      telephone: user.telephone || '',
    },
    validationSchema: ProfileFormSchema,
    onSubmit: async values => {
      const response = await update(values);
      if (!response.error) {
        Toast.show('Votre profile a été modifié avec succèss', {
          duration: Toast.durations.LONG,
        });
        navigation.goBack();
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
        <View style={{marginBottom: 5}}>
          <Text style={{fontSize: 25, fontWeight: 'bold'}}>
            Modifiez votre profile
          </Text>
        </View>
        <Input
          label="Nom"
          placheHolder="Nom"
          error={formik.errors.firstName}
          onBlur={formik.handleBlur('firstName')}
          onChangeText={formik.handleChange('firstName')}
          value={formik.values.firstName}
        />
        <Input
          label="Prénoms"
          placheHolder="Prénoms"
          error={formik.errors.lastName}
          onBlur={formik.handleBlur('lastName')}
          onChangeText={formik.handleChange('lastName')}
          value={formik.values.lastName}
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
          value={formik.values.email}
        />

        <Input
          label="Téléphone"
          placheHolder="Téléphone"
          error={formik.errors.telephone}
          onBlur={formik.handleBlur('telephone')}
          onChangeText={formik.handleChange('telephone')}
          value={formik.values.telephone}
        />

        <Button
          text="S'ENREGISTRER"
          customBtnStyle={{marginVertical: 10, backgroundColor: 'green'}}
          customTextStyle={{fontSize: 14}}
          isLoading={formik.isSubmitting}
          onPress={formik.handleSubmit}
        />
      </View>
    </ScrollView>
  );
}
