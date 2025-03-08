import React from 'react';
import {StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import AddScreen from './src/screens/AddScreen';
import { AuthProvider } from './src/components/AuthContext';

const Stack = createNativeStackNavigator();

const screenDefaultConfig = {
  headerShown: false
};

const App = () => {
  return (
    <>
    <StatusBar barStyle={'dark-content'} backgroundColor={'#fafafa'}/>
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={screenDefaultConfig}/>
            <Stack.Screen name="Home" component={HomeScreen} options={screenDefaultConfig}/>
            <Stack.Screen name="Add" component={AddScreen} options={screenDefaultConfig}/>
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
    </>
  );
};

export default App;