import React from "react";
import { Formik } from "formik";
import { Input, Button, Tag } from "antd";
import "./AddStudentForm.css";

const EditStudentForm = ({ initialV, submitter }) => (
  <Formik
    initialValues={{
      firstName: initialV.firstName,
      lastName: initialV.lastName,
      email: initialV.email,
    }}
    validate={(values) => {
      const errors = {};

      if (!values.email) {
        errors.email = "Email Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (!values.firstName) {
        errors.firstName = "First Name Required";
      }
      if (!values.lastName) {
        errors.lastName = "Last Name Required";
      }

      return errors;
    }}
    onSubmit={(student, { setSubmitting }) => {
      console.log(student);
      submitter(student);
      setSubmitting(false);
    }}
  >
    {({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
      submitForm,
      isValid,
    }) => (
      <form onSubmit={handleSubmit}>
        <Input
          style={{ marginBottom: "5px" }}
          name="firstName"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.firstName}
          placeholder="First Name E.g Anna"
        />
        {errors.firstName && touched.firstName && (
          <Tag className="tag">{errors.firstName}</Tag>
        )}

        <Input
          style={{ marginBottom: "5px" }}
          name="lastName"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.lastName}
          placeholder="Last Name E.g Smith"
        />
        {errors.lastName && touched.lastName && (
          <Tag className="tag">{errors.lastName}</Tag>
        )}
        <Input
          style={{ marginBottom: "5px" }}
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          placeholder="Email E.g example@example.com"
        />
        {errors.email && touched.email && (
          <Tag className="tag">{errors.email}</Tag>
        )}

        <Button
          type="submit"
          onClick={() => submitForm()}
          disabled={isSubmitting | (touched && !isValid)}
        >
          Submit
        </Button>
      </form>
    )}
  </Formik>
);

export default EditStudentForm;
