import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';
import LoginForm from '../features/counter/User';
import Counter from '../features/counter/Counter';
import Home from '../screens/home';
import Products from '../screens/products';
import Logout from '../screens/logout';
import { ParamListBase } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Image } from 'react-native';
import imagePath from '../assets/imagePath';


interface screenType extends ParamListBase {
  Home:undefined;
  Products:undefined;
  Counter:undefined;
  Logout:undefined;
  Login:undefined;
  [key: string]: undefined;
}

const Tab = createBottomTabNavigator<screenType>();

function AuthenticatedTabs() {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Products') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName as string} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'red',
          tabBarInactiveTintColor: 'black',
          tabBarShowLabel:false,
          tabBarStyle:{
            backgroundColor:'#C0C0C0',
            bottom:10,
            borderRadius:10
          }
        })}
      >
      <Tab.Screen name = "Home" component={Home} options={{
        tabBarIcon : ({focused}) => {
          return(
            <Image 
            style = {{tintColor:focused?'red':'black'}}
            source={imagePath.icHome} />
          )
        }
      }} />
      <Tab.Screen name = "Products" component={Products} options={{
        tabBarIcon : ({focused}) => {
          return(
            <Image 
            style = {{tintColor:focused?'red':'black'}}
            source={imagePath.icProduct} />
          )
        }
      }} />
      <Tab.Screen name = "Counter" component={Counter} options={{
        tabBarIcon : ({focused}) => {
          return(
            <Image 
            style = {{tintColor:focused?'red':'black'}}
            source={imagePath.icCounter} />
          )
        }
      }}/>
      <Tab.Screen name = "Logout" component={Logout} options={{
        tabBarIcon : ({focused}) => {
          return(
            <Image 
            style = {{tintColor:focused?'red':'black'}}
            source={imagePath.icLogout} />
          )
        }
      }}/>
    </Tab.Navigator>
  )
}

function UnauthenticatedTabs() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? 'ios-information-circle'
            : 'ios-information-circle-outline';
        } else if (route.name === 'Products') {
          iconName = focused ? 'ios-list' : 'ios-list-outline';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName as string} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'green',
      tabBarInactiveTintColor: 'black',
    })}>
      <Tab.Screen name = "Home" component={Home}  options={{
        tabBarIcon : ({focused}) => {
          return(
            <Image 
            style = {{tintColor:focused?'red':'black'}}
            source={imagePath.icHome} />
          )
        }
      }}/>
      <Tab.Screen name = "Login" component={LoginForm} options={{
        tabBarIcon : ({focused}) => {
          return(
            <Image 
            style = {{tintColor:focused?'red':'black'}}
            source={imagePath.icLogin} />
          )
        }
      }}/>
    </Tab.Navigator>
  )
}

// defining a React component called MyTabs that accepts a single prop called isAuthenticated of type boolean.
function MyTabs({isAuthenticated}:{isAuthenticated:boolean}) {

  return (
    isAuthenticated ? <AuthenticatedTabs/> : <UnauthenticatedTabs />
  );
}

export default MyTabs;