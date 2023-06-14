import {View, ScrollView} from 'react-native';
import React from 'react';

import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useApi} from '../contexts/ApiProvider';
import Input from '../components/Input';
import Toast from 'react-native-root-toast';
import Navigations from '../constants/Navigations';
import Screen from '../components/Screen';
import Header from '../components/Header';

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
});

export default function UserFormScreen({route, navigation}) {
  const {user} = route.params;
  const api = useApi();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      role: 'admin',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      telephone: user?.telephone || '',
      email: user?.email || '',
      password: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async values => {
      let response;
      if (user) {
        response = await api.put(`/api/users/${user._id}`, values);
      } else {
        response = await api.post(`/api/users`, values);
      }

      if (!response.error) {
        Toast.show('Enregistrement effectué avec succèss', {
          duration: Toast.durations.LONG,
        });
        navigation.navigate(Navigations.USER_LIST);
      } else {
        Toast.show(response.error.message, {
          duration: Toast.durations.LONG,
        });
      }
    },
  });

  return (
    <Screen>
      <Header
        title="Nouvel Administrateur"
        isBack={true}
        leftText={'Annuler'}
        rightText={'Enregistrer'}
        onPress={() => formik.handleSubmit()}
      />
      <ScrollView style={{flex: 1}}>
        <Input
          label="Nom"
          placheHolder="Nom"
          error={formik.errors.firstName}
          onBlur={formik.handleBlur('firstName')}
          onChangeText={formik.handleChange('firstName')}
          value={formik.values.firstName}
          containerStyle={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
            padding: 12,
          }}
          customTextStyle={{flex: 1}}
          customInputStyle={{flex: 2}}
        />
        <Input
          label="Prénoms"
          placheHolder="Prénoms"
          error={formik.errors.lastName}
          onBlur={formik.handleBlur('lastName')}
          onChangeText={formik.handleChange('lastName')}
          value={formik.values.lastName}
          containerStyle={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
            padding: 12,
          }}
          customTextStyle={{flex: 1}}
          customInputStyle={{flex: 2}}
        />
        <Input
          label="Téléphone"
          placheHolder="Téléphone"
          error={formik.errors.telephone}
          onBlur={formik.handleBlur('telephone')}
          onChangeText={formik.handleChange('telephone')}
          value={formik.values.telephone}
          containerStyle={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
            padding: 12,
          }}
          customTextStyle={{flex: 1}}
          customInputStyle={{flex: 2}}
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
          containerStyle={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
            padding: 12,
          }}
          customTextStyle={{flex: 1}}
          customInputStyle={{flex: 2}}
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
          containerStyle={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
            padding: 12,
          }}
          customTextStyle={{flex: 1}}
          customInputStyle={{flex: 2}}
        />
      </ScrollView>
      {/* <View style={{padding: 12}}>
        <Button
          text="S'ENREGISTRER"
          customBtnStyle={{marginVertical: 10, backgroundColor: 'green'}}
          customTextStyle={{fontSize: 14}}
          isLoading={formik.isSubmitting}
          onPress={formik.handleSubmit}
        />
      </View> */}
    </Screen>
  );
}
