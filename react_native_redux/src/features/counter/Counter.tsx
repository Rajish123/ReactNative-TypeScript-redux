import React, { useEffect } from 'react'
import type { RootState } from '../../app/store'
import { useSelector, useDispatch } from 'react-redux'


import { decrement, increment, changestateValue } from './counterSlice'
import { View,Text,TouchableOpacity,TextInput } from 'react-native'

const Counter:React.FC=()=> {
  const count = useSelector((state: RootState) => state.counter)
  const dispatch = useDispatch()

    const decrementValue = ()=>{
      dispatch(decrement());
    }

    const incrementValue = ()=>{
      dispatch(increment());
    }

  return (
    <View style = {{flex:1, justifyContent:'center', alignItems:'center'}}>
      <View style = {{marginBottom:20}}>
        <Text style = {{fontSize:40, fontWeight:'bold',color:'black'}}>{count.count}</Text>
      </View>
      <View style = {{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        width:'70%'
        }}>
        <TouchableOpacity style = {{backgroundColor:'grey', padding:10, margin:20}} onPress={()=>decrementValue()}>
            <Text style={{fontSize:20, color:'whitesmoke'}}>Decrement</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {{backgroundColor:'grey', padding:10, margin:20}} onPress={()=>incrementValue()}>
            <Text style={{fontSize:20,color:'whitesmoke'}}>Increment</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection:'row'}}>
        <TextInput value={count.changeValue} style={{borderWidth:1,width:'80%',color:'black'}} 
          onChangeText={text => dispatch(changestateValue({ changeValue: text }))}/>
      </View>

    </View>
  )
}

export default Counter;
