import React from 'react';
import { View, TextInput, Button, Text,StyleSheet } from 'react-native';
import type { RootState } from '../../app/store'
import { useSelector, useDispatch } from 'react-redux'
import { login, setUsername } from './userSlice';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { userLogin } from './userSlice';

interface FormData {
  username: string;
  password: string;
  // isUserLogin:boolean;
}


const LoginForm: React.FC = ()=> {
    const isUserLogin = useSelector((state: RootState) => state.user.isUserLogin);
    const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();


// control:register the input components and their values to the form,
// provides the value of the input components and triggers a re-render when the input values change.
// handleSubmit:called when the form is submitted
// formState: contains the errors and other information related to the form.
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
  
  const onSubmit = async(data: FormData) => {
    const userData = {
      username:data.username,
      password:data.password,
      isUserLogin:false
    }
    dispatch(userLogin(userData)).then(()=>{
      console.log("submit successful")
    })
  };

  return (
    <View>
      <Controller
        control={control}
        // validation rules for the input field.
        rules={{
          required: true,
        }}
        // field:property contains all the necessary properties and methods required to handle the input component's state
        // onChange  is triggered whenever the text in the TextInput component is changed, receives the updated value of the input field as its argument and updates the value property of the field object accordingly.
        // value is the current value of the input field
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Username"
            style={styles.input}
          />
        )}
        name="username"
        defaultValue=""
      />
      {errors.username && <Text>This is required.</Text>}

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
            placeholder="Password"
            secureTextEntry={true}
            style={styles.input}

          />
        )}
        name="password"
        defaultValue=""
      />
      {errors.password && <Text>This is required.</Text>}

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  input:{
    color:'black',
    borderWidth: 1,
    borderColor: 'gray',
    padding:10,
    marginBottom:10
  }
})

export default LoginForm;