import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import globalStyles from "../../constants/globalStyles";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login = ({navigation}) => {

  const handleLogin = (values) => {
    // Dummy login values until you idiots connect the API....<3
    if (values.email === 'user@example.com' && values.password === 'password') {
      // Navigate to the Main Page if credentials are correct
      navigation.navigate('Main Page');
    } else {
      console.log('Invalid email or password');
      
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={(values) => {
        // Handle login logic here
        handleLogin(values);
        console.log('Login form submitted with values:', values);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <View style={styles.container}>
          <Text style={styles.headerText}>Welcome back</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
          />
          {errors.email && <Text style={styles.error}>{errors.email}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
          />
          {errors.password && <Text style={styles.error}>{errors.password}</Text>}

          <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <View style={styles.signupText}>
            <Text style={styles.signup}>New user? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={[styles.signup, styles.signupLink]}>Create a new account</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: globalStyles.colors.background,
        padding: 16,
    },
    headerText: {
        marginTop: 45,
        fontSize: 25,
        color: '#fff',
        //fontFamily: 'Poppins-ExtraLight', // Ensure this matches the name of the font file
        textAlign: 'left',
        marginHorizontal: 25,
        marginBottom: 30, // Adjust margin to push down the form
      },
      input: {
        height: 40,
        borderColor: '#ccc', // Softer border color
        borderWidth: 1,
        backgroundColor: '#fff', // White background for the input fields
        marginBottom: 35, // Increased margin between input fields
        padding: 10, // Padding inside the input fields
        borderRadius: 5, // Adding some border radius for softer corners
        marginHorizontal: 20,
      },
      form: {
        flex: 1,
        justifyContent: 'space-between', // Vertically center the form
      },
      error: {
        fontSize: 12,
        color: 'red',
        top: -30, 
         marginBottom: 10, // Adding some margin below the error text
         marginHorizontal: 20,
      },
      button: {
        backgroundColor: globalStyles.colors.primary,
        padding: 15,
        borderRadius: 5,
        marginHorizontal: 20,
        marginBottom: 5, // Add some space at the bottom
        alignItems: 'center',
      },
      buttonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
      },
      signupText: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
      },
      signup: {
        color: 'white',
      },
      signupLink: {
        color: globalStyles.colors.secondary,
        textDecorationLine: 'underline',
      },


})