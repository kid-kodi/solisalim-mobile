import {
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useApi} from '../contexts/ApiProvider';
import {BASE_API_URL} from '@env';
import {useIsFocused} from '@react-navigation/native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import Header from './Header';
import Input from './Input';
import DatePicker from 'react-native-datepicker';
import PaymentFilter from './PaymentFilter';
import Toast from 'react-native-root-toast';

const paymentSchema = Yup.object().shape({
  amount: Yup.string().required('Ce champ est obligatoire'),
});

export default function AddPayment({order, handleAddItem}) {
  const api = useApi();
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelectItem = id => {
    setSelectedItem(id);
    formik.setFieldValue('paymentMethod', id);
  };

  const formik = useFormik({
    initialValues: {
      amount: '',
      paymentMethod: '',
      paymentDate: '',
      notes: '',
      isEmailToSend: false,
    },
    validationSchema: paymentSchema,
    onSubmit: async values => {
      const response = await api.put(`/api/orders/${order._id}`, {
        totalPaid: order.totalPaid + values.amount,
        totalUnPaid: order.totalUnPaid - values.amount,
        isPaid: order.totalUnPaid - values.amount === 0 ? true : false,
        isPaidAt: order.totalUnPaid - values.amount === 0 ? new Date() : null,
        payments: values,
      });
      if (!response.error) {
        handleAddItem(response);
        setShowModal(false);
      } else {
        Toast.show(response.error.message, {
          duration: Toast.durations.LONG,
        });
      }
    },
  });

  useEffect(() => {
    if (isFocused) {
      (async () => {
        const response = await api.get(`/api/products`);
        if (!response.error) {
          setData(response);
        }
      })();
    }
  }, [isFocused]);

  return (
    <Fragment>
      <TouchableOpacity
        onPress={() => setShowModal(true)}
        style={styles.container}>
        <Text style={styles.label}>PAIEMENTS</Text>
        {order.totalUnPaid > 0 && (
          <SimpleLineIcons name="plus" color="#228b22" size={25} />
        )}
      </TouchableOpacity>
      <Modal visible={showModal}>
        <SafeAreaView style={{flex: 1}}>
          <View style={{flex: 1}}>
            <Header title="Effectuer un paimenent" />
            <View style={{}}>
              <Text>
                Paiement de la facture N. {order.invoiceNumber} de{' '}
                {order.customer.firstName + ' ' + order.customer.lastName} d'un
                montant de {order.totalAmount} reste à payer {order.totalUnPaid}
              </Text>
            </View>
            <Input
              label="Montant payé"
              placheHolder={order.totalUnPaid}
              autoCapitalize="none"
              error={formik.errors.amount}
              onBlur={formik.handleBlur('amount')}
              onChangeText={formik.handleChange('amount')}
            />
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Méthode de paiement</Text>
              <PaymentFilter
                data={[
                  {id: 1, name: 'paypal'},
                  {id: 2, name: 'orange money'},
                  {id: 3, name: 'Chèque'},
                  {id: 4, name: 'Espèce'},
                ]}
                selectedItem={selectedItem}
                onSelectItem={handleSelectItem}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Date due</Text>
              <DatePicker
                style={styles.inputText}
                customStyles={{
                  dateInput: {borderWidth: 0, textAlign: 'right', fontSize: 16},
                }}
                date={formik.values.paymentDate}
                mode="date"
                placeholder="A payer le"
                format="DD-MM-YYYY"
                confirmBtnText="Confirmer"
                cancelBtnText="Annuler"
                onDateChange={date => {
                  formik.setFieldValue('paymentDate', date);
                }}
              />
            </View>
            <Input
              label="Notes"
              placheHolder="Renseigner une note"
              autoCapitalize="none"
              error={formik.errors.notes}
              onBlur={formik.handleBlur('notes')}
              onChangeText={formik.handleChange('notes')}
            />
            <Button
              text="ENREGISTRER"
              customBtnStyle={{marginVertical: 10, backgroundColor: 'green'}}
              customTextStyle={{fontSize: 14}}
              isLoading={formik.isSubmitting}
              onPress={formik.handleSubmit}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </Fragment>
  );
}

const deviceWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    color: '#228b22',
    fontWeight: 'bold',
  },
  item: {
    width: deviceWidth,
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginVertical: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    opacity: 0.9,
  },
  cardBody: {
    paddingHorizontal: 12,
    flex: 1,
    justifyContent: 'center',
    gap: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  price: {
    color: 'red',
    fontSize: 14,
  },
});
