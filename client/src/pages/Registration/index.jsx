import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

import "./styles.css";
import { useNavigate } from "react-router-dom";

function Registration() {
  let navigate = useNavigate();
  const initialValues = {
    username: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    password: Yup.string().min(4).max(12).required(),
    username: Yup.string().min(4).max(12).required(),
  });
  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then(() => {
      console.log(data);
      navigate("/login")
    });
  };
  return (
    <div className="signUpPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="form">
          <label>Username</label>
          <ErrorMessage name="username" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="Type your username..."
          />
          <label>Password</label>
          <ErrorMessage name="password" component="span" />
          <Field
            type="password"
            autocomplete="off"
            id="inputCreatePost"
            name="password"
            placeholder="Type your password..."
          />
          <button type="submit" className="button">
            sign up
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;
