import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Products from '../screens/products';
import Details from '../screens/details';


const HomeStack = createNativeStackNavigator();

export function ProductStackScreen(){
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name = "Products" component={Products}/>
            <HomeStack.Screen name = "Details" component={Details}/>
        </HomeStack.Navigator>
    )
}