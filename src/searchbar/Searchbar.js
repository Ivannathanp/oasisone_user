import React, {useState} from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {TextField } from "./searchform/SearchFormLib";

const SearchBar = (props) => {

  return (
    <View style={styles.searchcontainer}>
        
        {/* Input field */}
       <Formik  initialValues={{ email: "" }}>
       {({ errors, touched, isSubmitting }) => (
          <Form>
          <TextField
           placeholder="Search any products..."
           value={props.searchPhrase}
           onChange={props.setSearchPhrase}
           onfocus={()=>props.setClicked(true)}

                    name="search"
                    type="text"
                   
                  />
          </Form>
       )}
    </Formik>
       
      </View>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({

  searchcontainer: {
    width:'373px',
    height:'50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    boxSizing: 'border-box',
  },
  input: {
    width:'373px',
    height:'50px',
    margin: '10% 0 5% 0',
    paddingLeft: '12%',
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 100,
    alignItems: "center", 
    border:'none',
    borderStyle:'none',
    borderWidth:0,
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 400,
    fontStyle: 'italic',
    fontSize: '12px',
    lineHeight: '16px',
    color: '#C4C4C4',
    border: 'none',
  },

  inputactive: {
    width:'373px',
    height:'50px',
    margin: '10% 0 5% 0',
    paddingLeft: '12%',
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 100,
    alignItems: "center", 
    border:'none',
    borderStyle:'none',
    borderWidth:0,
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 400,
    fontStyle: 'italic',
    fontSize: '12px',
    lineHeight: '16px',
    color: '#424242',
    border: '0.5px solid #df3030',
    filter: 'drop-shadow(0px 0px 5px rgba(223, 48, 48, 0.25))',
  },
});