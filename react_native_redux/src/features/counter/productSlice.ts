import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Product {
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
    images:string []
}

interface productState {
    // array of Product objects
    products:Product[];
    total : number;
} 

const initialState:productState={
    products : [],
    total:0
};

// create thunk
export const fetchProducts = createAsyncThunk(
    'products/getAllProducts',async(limit:number,thunkAPI)=>{
        try{
            const response = await fetch(`https://dummyjson.com/products?limit=${limit}`,{
                method:'GET'
            });
            const data = await response.json();
            return data;
        }catch(error){
            console.error('fetchProduct thunk error',error)
            throw error;
        }
    }
)

export const addProduct = createAsyncThunk(
    'products/addProduct',async(product:Product,thunkAPI) =>{
        try{
            const response = await fetch('https://dummyjson.com/products/add',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(product)
            })
            const data = await response.json();
            return data;
        }
        catch(error){
            console.error("addProduct thunk error",error)
            throw error;
        }
    }
)

const productSlice = createSlice({
    name:'products',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchProducts.fulfilled,(state,action)=>{
            // console.log(action)
            state.products = action.payload.products;
            state.total = action.payload.total;
        });

        builder.addCase(addProduct.fulfilled,(state,action)=>{
            console.log("payload data",action.payload)
            state.products.push(action.payload)
        })
    }
})

export default productSlice.reducer