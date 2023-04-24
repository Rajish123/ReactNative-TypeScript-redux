import React, { useState } from 'react'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import Counter from './src/features/counter/Counter';
import LoginForm from './src/features/counter/User';
import { useSelector } from 'react-redux';
import { View,Text } from 'react-native';
import MyTabs from './src/navigation/Navigation'

interface RootState {
  user:{
    isUserLogin:boolean;
  }
}

const App: React.FC = () => {
  const isUserLogin = useSelector((state: RootState) => state.user.isUserLogin);

  return (
    // <View>
    //   {isUserLogin ? (
    //     <Text>Welcome!</Text>
    //   ) : (
    //     <LoginForm />
    //     // <Counter />
    //   )}
    // </View>
    <NavigationContainer>
      <MyTabs isAuthenticated={isUserLogin} />
    </NavigationContainer>

  );
};

export default App;

