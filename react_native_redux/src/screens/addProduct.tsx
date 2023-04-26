import React,{useState} from 'react'
import { Controller, useForm } from "react-hook-form";
import { ScrollView,View,TextInput,Text, Button,StyleSheet,TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import {addProduct} from '../features/counter/productSlice'
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import type { RootState } from '../app/store'
import {useNavigation} from '@react-navigation/native'

interface FormData {
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
    images:string[];

}

type Props = {
    navigation:any;
}

const AddProduct:React.FC<Props> = ({navigation}) => {
    const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();
    const {control,handleSubmit,formState:{errors},reset} = useForm<FormData>();
    const [submitSuccess,setSubmitSuccess] = useState(false)


    const onSubmit =(data:FormData) => {
        console.log("form data is ",data)
        dispatch(addProduct(data)).then(()=>{
            setSubmitSuccess(true)
            reset();
            navigation.navigate('Home');
        })
    }

  return (
    <ScrollView>
        <View style = {styles.container}>
            <Text style = {{color:'black',marginTop:10,fontWeight:'bold'}}>Title</Text>
            <Controller
                control={control}
                rules={{
                required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style = {styles.input}

            />
            )}
            name="title"
            defaultValue=""
            />
            {errors.title && <Text>This is required.</Text>}

            <Text style = {{color:'black',marginTop:10,fontWeight:'bold'}}>Description</Text>
            <Controller 
                control={control}
                rules = {{
                    required:true,
                }}
                render = {({field:{onChange,onBlur,value}})=>(
                    <TextInput 
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value = {value}
                        style = {styles.input}
                    />
                )}
                name = 'description'
                defaultValue=''
            />
            {errors.description && <Text>Required*</Text>}

            <Text style = {{color:'black',marginTop:10,fontWeight:'bold'}}>Price</Text>
            <Controller 
                control={control}
                rules = {{
                    required:true,
                }}
                render = {({field:{onChange,onBlur,value}})=>(
                    <TextInput 
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value = {value.toString()}
                        style = {styles.input}
                        keyboardType='numeric'
                    />
                )}
                name = 'price'
                defaultValue={0}
            />
            {errors.price && <Text>Required*</Text>}

            <Text style = {{color:'black',marginTop:10,fontWeight:'bold'}}>DiscountPercent</Text>
            <Controller 
                control={control}
                rules = {{
                    required:true,
                }}
                render = {({field:{onChange,onBlur,value}})=>(
                    <TextInput 
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value = {value.toString()}
                        style = {styles.input}
                        keyboardType='numeric'
                    />
                )}
                name = 'discountPercentage'
                defaultValue={0}
            />
            {errors.discountPercentage && <Text>Required*</Text>}

            <Text style = {{color:'black',marginTop:10,fontWeight:'bold'}}>Rating</Text>
            <Controller 
                control={control}
                rules = {{
                    required:true,
                }}
                render = {({field:{onChange,onBlur,value}})=>(
                    <TextInput 
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value = {value.toString()}
                        style = {styles.input}
                        keyboardType='numeric'
                    />
                )}
                name = 'rating'
                defaultValue={0}
            />
            {errors.rating && <Text>Required*</Text>}

            <Text style = {{color:'black',marginTop:10,fontWeight:'bold'}}>Stock</Text>
            <Controller 
                control={control}
                rules = {{
                    required:true,
                }}
                render = {({field:{onChange,onBlur,value}})=>(
                    <TextInput 
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value = {value.toString()}
                        style = {styles.input}
                        keyboardType='numeric'
                    />
                )}
                name = 'stock'
                defaultValue={0}
            />
            {errors.stock && <Text>Required*</Text>}

            <Text style = {{color:'black',marginTop:10,fontWeight:'bold'}}>Brand</Text>
            <Controller 
                control={control}
                rules = {{
                    required:true,
                }}
                render = {({field:{onChange,onBlur,value}})=>(
                    <TextInput 
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value = {value}
                        style = {styles.input}
                    />
                )}
                name = 'brand'
                defaultValue=''
            />
            {errors.brand && <Text>Required*</Text>}

            <Text style = {{color:'black',marginTop:10,fontWeight:'bold'}}>Category</Text>
            <Controller 
                control={control}
                rules = {{
                    required:true,
                }}
                render = {({field:{onChange,onBlur,value}})=>(
                    <TextInput 
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value = {value}
                        style = {styles.input}
                    />
                )}
                name = 'category'
                defaultValue=''
            />
            {errors.category && <Text>Required*</Text>}

            <Text style = {{color:'black',marginTop:10,fontWeight:'bold'}}>Thumbnail</Text>
            <Controller 
                control={control}
                rules = {{
                    required:true,
                }}
                render = {({field:{onChange,onBlur,value}})=>(
                    <TextInput 
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value = {value}
                        style = {styles.input}
                    />
                )}
                name = 'thumbnail'
                defaultValue=''
            />
            {errors.thumbnail && <Text>Required*</Text>}

            <Text style = {{color:'black',marginTop:10,fontWeight:'bold'}}>Images</Text>
            <Controller 
                control={control}
                rules = {{
                    required:true,
                }}
                render = {({field:{onChange,onBlur,value}})=>(
                    <TextInput 
                        onBlur={onBlur}
                        onChangeText={(text) => {
                            const imagesArray = text.split(',');
                            onChange(imagesArray);
                          }}
                        // checks if value is an array using Array.isArray(), and if it is, 
                        // it joins the array with commas using the join() method. Otherwise, 
                        // it just uses the original value.
                        value = {Array.isArray(value) ? value.join(',') : value}
                        placeholder='images(for multiple separate with comma'
                        placeholderTextColor='black'
                        style = {styles.input}
                    />
                )}
                name = 'images'
                defaultValue={[]}
            />
            {errors.images && <Text>Required*</Text>}
            <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit(onSubmit)}
            >
                <Text style={styles.buttonText}>Add product</Text>
            </TouchableOpacity>
            
        </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container:{
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',        
    },

    input:{
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginVertical: 5,
        color: 'black',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color:'black'
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        width:'50%',
        marginTop:10,
        marginBottom:10,
        marginHorizontal:80
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
  })

export default AddProduct
