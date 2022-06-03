import React, {useState} from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {TextField } from "./searchform/SearchFormLib";

const SearchBar = (props) => {

  return (
<>
        {/* Input field */}
       <Formik>
       {({ errors, touched, isSubmitting }) => (
          <Form>
          <TextField
           placeholder="Search any products..."
           value={props.searchPhrase}
           onChange={props.setSearchPhrase}
           onFocus={()=>props.setClicked(true)}

                    name="search"
                    type="text"
                   
                  />
          </Form>
       )}
    </Formik>
     </>  

  );
};
export default SearchBar;