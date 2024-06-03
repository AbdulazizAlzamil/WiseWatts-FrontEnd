import React from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import globalStyles from "../../constants/globalStyles";

const Signup = () => {
    const SignupSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Passwrod is required'),
    });

    return (
        <View style={styles.container}>
          <Text style={styles.headerText}>Create your account:</Text>
          <Formik
            initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
            validationSchema={SignupSchema}
            onSubmit={values => {
              Alert.alert('Signup Successful', `Welcome, ${values.username}!`);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                />
                {touched.username && errors.username && <Text style={styles.error}>{errors.username}</Text>}
    
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  keyboardType="email-address"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
    
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}
    
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  secureTextEntry
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                />
                {touched.confirmPassword && errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}
    
                <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      );
};

export default Signup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: globalStyles.colors.background,
        padding: 16,
    },
    headerText: {
      marginTop: 45,
      fontSize: 25,
      color: globalStyles.colors.secondary,
      //fontFamily: 'Poppins-Bold', // Ensure this matches the name of the font file
      textAlign: 'left',
      marginHorizontal: 25,
      marginBottom: 30, // Adjust margin to push down the form
    },
    form: {
      flex: 1,
      justifyContent: 'space-between', // Vertically center the form
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
})