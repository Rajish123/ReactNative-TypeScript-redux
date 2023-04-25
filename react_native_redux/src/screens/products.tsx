import React, { useEffect, useState } from 'react'
import { View,Text,Image,StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import {fetchProducts} from '../features/counter/productSlice'
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import type { RootState } from '../app/store'

// defines the shape of each product object we expect to receive from the API, including properties
interface products {
  id:number;
  title:string;
  description:string;
  price:number;
  discountPercentage:number;
  rating:number;
  stock:number;
  brand:string;
  category:string;
  thumbnail:string;
}

const Products:React.FC=()=> {
  //  array of products that will be displayed in the FlatList
  const [data,setData] = useState<products[]>([]);
  const [loading,setLoading] = useState<boolean>(false);
  const [limit,setLimit] = useState<number>(30)

  const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();
  const allproduct = useSelector((state: RootState) => state.products.products);
  const totalProduct = useSelector((state: RootState) => state.products.total);
  
  useEffect(()=>{
    dispatch(fetchProducts(limit))
  },[dispatch,limit]);

  useEffect(() => {
    if (allproduct !== null) {
      setData([...allproduct]);
      console.log("here data gets ",data)
    }
    console.log("updated data:",data)
  }, [allproduct]);


  const handleLoadMore = () => {
    console.log("loading more items")
    setLoading(true)
    if (data !== null && data.length < totalProduct) {
      setLimit(limit + 30)
    }
  };

  // render each item in the data array. 
  const renderItem = ({item}:{item:products})=>{
    console.log("item is: ",item.id)
    console.log("tit is: ",item.title)
    console.log("des is: ",item.description)

    return (
      <View style = {styles.itemContainer}>
        <Image source = {{uri:item.thumbnail}} style = {styles.itemImage} />
        <Text>{item.title}</Text>
        <View style = {styles.itemDetails}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          {/* <Text style={styles.itemDescription}>{item.description}</Text> */}
          <Text style={styles.itemPrice}>{item.price}</Text><Text>Products</Text>
          <Text>{item.title}</Text>
        </View>
      </View>
    );
  };
  // item represents each individual product of the data array. 
  // extracts the id property from each product object and returns it as a string.
  const keyExtractor = (item: products) => {
    if (item.id) {
      return item.id.toString();
    }
    return '';
  };

  return (
    <FlatList 
    // data is the array of products that we want to display
      data = {data}
      // returns the individual UI components for each item in the data array. 
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      // A function that will be called when the end of the list is reached
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={() => {
        return loading ? <ActivityIndicator /> : null;
      }}
    />
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    // marginRight: 10,
  },
  itemDetails: {
    flex: 1,
    justifyContent:'center',
    alignItems:'stretch'
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color:'black'
  },
  itemDescription: {
    fontSize: 14,
    marginBottom: 5,
    color:'black'
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'black'

  },
});

export default Products;
