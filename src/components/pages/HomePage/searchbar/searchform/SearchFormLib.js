import React, { useState } from "react";
import { ErrorMessage, useField } from "formik";
import "./SearchFormLib.css";

export const TextField = ({ icon, label, ...otherprops }) => {
  const [field, meta] = useField(otherprops);

  return (
    <>
      <div className="searchinputformcontainer">

        <input
          className={`searchinputform ${meta.touched && meta.error && "is-invalid"}`}
          {...field}
          {...otherprops}
          autoComplete="off"
        />
      </div>
      <div className="errorcontainer">
        <ErrorMessage component="div" name={field.name} className="error" />
      </div>
    </>
  );
};
