import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();
  const initialValues = {
    title: "",
    postText: "",
    username: "",
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    postText: Yup.string().max(256).required(),
    username: Yup.string().min(4).max(12).required(),
  });
  const onSubmit = (data) => {
    axios.post("http://localhost:3001/posts", data).then((response) => {
    //   setListOfPosts(response.data);
    navigate("/");
    });
    console.log(data);
  };
  return (
    <div className="containerCreatePost">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="form">
          <label>Title</label>
          <ErrorMessage name="title" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="title"
            placeholder="Type your title post"
          />
          <label>Description</label>
          <ErrorMessage name="postText" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="postText"
            placeholder="Type your description post"
          />
          <label>Username</label>
          <ErrorMessage name="username" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="Type your username"
          />
          <button type="submit" className="button">
            Create post
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreatePost;
