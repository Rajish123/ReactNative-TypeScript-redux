import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// RootStackParamList defines the types for the screens in the stack navigator
type RootStackParamList = {
    Products: undefined;
    // Details screen has a parameter object which includes the item details.
    Details: {
      id: string;
      title: string;
      description: string;
      price: number;
      discountPercentage: number;
      rating: number;
      stock: number;
      brand: string;
      category: string;
      thumbnail: string;
    };
  };

//   DetailScreenRouteProp and DetailScreenNavigationProp are types that we define using the RouteProp and StackNavigationProp
// These types are used to define the props for the Details screen component.
type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;
// StackNavigationProp is a type that represents the navigation object that is passed to the screens of a stack navigator. 
// rovides various methods and properties for navigating between screens, such as navigate, goBack, push, replace, addListener, removeListener, etc.
//  it expects a navigation prop that corresponds to the Details screen in the RootStackParamList.
type DetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;

// The Props type is used to define the type of the props that the Details component expects to receive. 
// expects to receive a route prop of type DetailScreenRouteProp and a navigation prop of type DetailScreenNavigationProp.
type Props = {
  route: DetailScreenRouteProp;
//   DetailScreenNavigationProp is defined as the type for the navigation prop passed to the Details component
  navigation: DetailScreenNavigationProp;
};

// By specifying the route and navigation props with their corresponding types, you can ensure that the props are passed correctly from the navigation stack
const  Details:React.FC<Props> = () => {
    const route = useRoute<DetailScreenRouteProp>();
    //  you can access the required parameters from the route prop, as shown in the code you provided
    const { id, title, description, price, discountPercentage, rating, stock, brand, category, thumbnail } = route.params;
  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
            <Image source={{ uri: thumbnail }} style={styles.image} />
        </View>
        <View style={styles.detailsContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.price}>Price: ${price}</Text>
            <Text style={styles.stock}>Stock: {stock}</Text>
            <Text style={styles.brand}>Brand: {brand}</Text>
            <Text style={styles.category}>Category: {category}</Text>
            <Text style={styles.discount}>Discount: {discountPercentage}% off</Text>
            <Text style={styles.rating}>Rating: {rating}/5</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      padding: 16,
    },
    imageContainer: {
      flex: 1,
    //   justifyContent: 'stretch',
      alignItems: 'stretch',
    },
    image: {
      width: '100%',
      height: 200,
    },
    detailsContainer: {
      flex: 2,
      marginLeft: 16,
    },
    title: {
        textAlign:'center',
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      marginTop:20,
      color:'black'
    },
    description: {
      fontSize: 16,
      marginBottom: 8,
      color:'black',
      fontWeight:'bold'
    },
    price: {
      fontSize: 16,
      marginBottom: 4,
      color:'black',
      fontWeight:'bold'
    },
    stock: {
      fontSize: 16,
      marginBottom: 4,
      color:'black',
      fontWeight:'bold'
    },
    brand: {
      fontSize: 16,
      marginBottom: 4,
      color:'black',
      fontWeight:'bold'
    },
    category: {
      fontSize: 16,
      marginBottom: 4,
      color:'black',
      fontWeight:'bold'
    },
    discount: {
      fontSize: 16,
      marginBottom: 4,
      color:'black',
      fontWeight:'bold'
    },
    rating: {
      fontSize: 16,
      marginBottom: 4,
      color:'black',
      fontWeight:'bold'
    },
  });

export default Details
