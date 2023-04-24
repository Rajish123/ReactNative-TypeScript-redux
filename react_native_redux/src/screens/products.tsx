import React, { useEffect, useState } from 'react'
import { View,Text,Image,StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native';

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
  const [page,setPage] = useState(1)
  const [totalPages,setTotalPages] = useState(null)

  useEffect(()=>{
    fetchData();
  },[page]);

  const fetchData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await fetch("https://dummyjson.com/products");
      const jsonData = await response.json()
      // console.log("jsonData is",jsonData.products);
      console.log("total data is ",jsonData.total)
      setData((prevData) => [...prevData,...jsonData.products])
      console.log("Data is:",data)
      setTotalPages(jsonData.total)
      // setData(jsonData.products);
      // console.log("data is ",data);
    }catch(error){
      console.error(error)
    }
    setLoading(false);
  };

  const handleLoadMore = () => {
    if (totalPages !== null && page < totalPages) {
      setPage((prevPage) => prevPage + 1)
    }
  };

  // render each item in the data array. 
  const renderItem = ({item}:{item:products})=>{
    console.log("item is: ",item.title)
    return (
      <View style = {styles.itemContainer}>
        <Image source = {{uri:item.thumbnail}} style = {styles.itemImage} />
        <View style = {styles.itemDetails}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
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
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00f',
  },
});

export default Products;
