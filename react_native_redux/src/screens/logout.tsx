import React,{useState} from 'react'
import {StyleSheet,View,Text,TouchableOpacity } from 'react-native'
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/counter/userSlice';


const Logout:React.FC=()=> {
  const dispatch = useDispatch()
  const [loggedOut,setLoggedOut] = useState(false)
  const {handleSubmit} = useForm();

  const onSubmit = ()=>{
    dispatch(logout())
    setLoggedOut(true)
  }
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Logout</Text>
        <Text style = {styles.text}>Are you sure you want to logout?</Text>
        <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      {loggedOut && <Text style={styles.text}>You have been logged out.</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'black'
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
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export default Logout;
