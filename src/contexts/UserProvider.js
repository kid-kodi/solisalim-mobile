import {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useApi} from './ApiProvider';
import axios from 'axios';

const UserContext = createContext();

export default function UserProvider({children}) {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const api = useApi();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      let _token = await AsyncStorage.getItem('user');
      setToken(_token);
      if (_token) {
        const me = await api.get('/api/auth/me');
        console.log(me);
        if (!me.error) {
          setUser(me);
        } else {
          setUser(null);
        }
        setIsLoading(false);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    })();
  }, [api]);

  const login = async auth_map => {
    const login_response = await api.post('/api/auth/login', auth_map);
    if (!login_response.error) {
      AsyncStorage.setItem('user', login_response.token);
      const me = await api.get('/api/auth/me');
      if (!me.error) {
        setUser(me);
      } else {
        setUser(null);
      }
    }
    return login_response;
  };

  const logout = async () => {
    const response = await api.post('/api/auth/logout', null);
    if (!response.error) {
      AsyncStorage.removeItem('user');
      setUser(null);
    }
  };

  const update = async user_map => {
    const response = await api.put(`/api/auth/me`, user_map, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.error) {
      setUser(response);
    }
    return response;
  };

  return (
    <UserContext.Provider
      value={{user, isLoading, setUser, login, logout, update}}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
