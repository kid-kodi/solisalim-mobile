import {StyleSheet} from 'react-native';
import Colors from '../constants/Colors';

export const globalStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
  },
  centerContainer: {
    flex: 1,
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginVertical: 40,
  },
  inputView: {
    width: '80%',
    marginBottom: 20,
    justifyContent: 'center',
  },
  inputText: {
    borderRadius: 5,
    borderWidth: 2,
    padding: 5,
    borderColor: '#777',
    color: '#777777',
    fontWeight: '800',
  },
  singUp: {
    color: '#39B54A',
    fontWeight: '500',
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#39B54A',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  loginText: {
    color: '#ffffff',
    fontWeight: '800',
  },
  signupBtn: {
    width: '80%',
    backgroundColor: '#eee',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  signupText: {
    color: '#39B54A',
    fontWeight: '800',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginVertical: 10,
  },
  logoView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 0,
  },
  button: {
    width: '80%',
    backgroundColor: Colors.gray,
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  buttonText: {
    color: Colors.primary,
    fontWeight: '800',
  },
});
