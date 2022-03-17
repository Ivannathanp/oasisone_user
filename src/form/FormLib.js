import React, { useState } from "react";
import { ErrorMessage, useField } from "formik";
import "./FormLib.css";

export const TextField = ({ icon, label, ...otherprops }) => {
  const [field, meta] = useField(otherprops);

  return (
    <>
      <div className="inputformcontainer">
        <label htmlFor={field.name} className="label">{label}</label>

        <input
          className={`inputform ${meta.touched && meta.error && "is-invalid"}`}
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
