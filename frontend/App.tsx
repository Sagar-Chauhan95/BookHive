import { Alert, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native-paper';
import "react-native-gesture-handler";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Home from './components/home';
import About from './components/about';
import { useEffect, useReducer } from 'react';
import reducer from './components/context/reducer';
import GlobalContext from './components/context/globalContext';
import serviceApis from './Apis/serviceApis';
import Login from './components/login.tsx/login';
import { LOCAL_STORAGE_KEY } from './components/constants/constants';


const { Navigator, Screen } = createBottomTabNavigator();

export default function App() {
  const [ state, dispatch ] = useReducer(reducer, {
    books: [],
    authors: [],
    publishers: [],
    catalogs: [],
    members: [],
    transactions: [],
    users: [],
    token: "",
    isLoading: true
  });

  useEffect(() => {
    async function getBooks() {
      try {
        const response = await serviceApis.getBooks();
        if (response.status === 200) {
          dispatch({ type: 'books', payload: response.data });
        } else {
          console.error('Books does not exist', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    }

    getBooks();
  }, [ dispatch ]);



  useEffect(() => {
    dispatch({ type: 'loading', payload: true });
    async function getDataFromAsyncStorage() {
      try {
        const dataLocalStorage = await AsyncStorage.getItem(LOCAL_STORAGE_KEY);
        if (dataLocalStorage) {
          const status = JSON.parse(dataLocalStorage);
          dispatch({ type: 'token', payload: status.token });

        }
      } catch (error) {
        Alert.alert("Unable to login in");
      }
      dispatch({ type: 'loading', payload: false });

    }
    getDataFromAsyncStorage();
  }, [ dispatch ]);

  useEffect(() => {
    async function getAuthors() {
      try {
        const response = await serviceApis.getAuthors();
        if (response.status === 200) {
          dispatch({ type: 'authors', payload: response.data });
        } else {
          console.error('Failed to fetch authors:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    }
    getAuthors();
  }, [ dispatch ]);


  useEffect(() => {
    async function getPublishers() {
      try {
        const response = await serviceApis.getPublishers();
        if (response.status === 200) {
          dispatch({ type: 'publishers', payload: response.data });
        } else {
          console.error('Failed to fetch publishers:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching publishers:', error);
      }
    }
    getPublishers();
  }, [ dispatch ]);

  useEffect(() => {
    async function getMembers() {
      try {
        const response = await serviceApis.getMembers();
        if (response.status === 200) {
          dispatch({ type: 'members', payload: response.data });
        } else {
          console.error('Failed to fetch authors:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    }
    getMembers();
  }, [ dispatch ]);


  useEffect(() => {
    async function getCatalogs() {
      try {
        const response = await serviceApis.getCatalogs();
        if (response.status === 200) {
          dispatch({ type: 'catalogs', payload: response.data });
        } else {
          Alert.alert("Catalogs do not exist ");
        }

      } catch (error) {
        console.log("Server error", error);
      }
    }
    getCatalogs();
  }, [ dispatch ]);

  useEffect(() => {
    async function getTransactions() {
      try {
        const response = await serviceApis.getTransactions();
        if (response.status === 200) {
          dispatch({ type: 'transactions', payload: response.data });
        } else {
          Alert.alert("Transactions do not exist ");
        }

      } catch (error) {
        console.log("Server Error", error);
      }
    }
    getTransactions();
  }, [ dispatch ]);

  if (state.isLoading) {
    return <ActivityIndicator size={ 'large' } />;
  }

  return (

    <GlobalContext.Provider value={ { ...state, dispatch } }>
      { state.token !== "" ? (
        <NavigationContainer>
          <Navigator initialRouteName='home'>
            <Screen name="home" component={ Home } options={ {
              title: "Home", headerShown: false,
              tabBarIcon: ({ color }) => <Entypo name="home" size={ 24 } color="brown" />
            } } />
            <Screen name='about' component={ About } options={ {
              title: "About",
              tabBarIcon: ({ color }) => <Entypo name="info-with-circle" size={ 24 } color="brown" />
            } } />
          </Navigator>
        </NavigationContainer>
      ) : (
        <Login />
      ) }
    </GlobalContext.Provider>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
