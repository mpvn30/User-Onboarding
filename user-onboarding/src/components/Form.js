import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({ values, errors, touched, status }) => {
  const [users, setUser] = useState([]);
  useEffect(() => {
    if (status) {
      setUser([...users, status]);
    }
  }, [status]);

  return (
    <div className="user-form">
      <Form>
        <Field type="text" name="name" placeholder="Name" />
        {touched.name && errors.name && (
          <p className="error">{errors.name}</p>
        )}

        <Field type="text" name="email" placeholder="email" />
        {touched.email && errors.email && <p className="error">{errors.email}</p>}

        <Field type="password" name="password" placeholder="password" />
        {touched.password && errors.password && <p className="error">{errors.password}</p>}

        <label>
          Terms of Service
          <Field className="checkbox"
            type="checkbox"
            name="terms"
            checked={values.terms}
          />
        </label>
        <button>Submit!</button>
      </Form>
      {users.map(user => (
        <div className="users">
        <ul key={user.id}>
          <li>Name: {user.name}</li>
          <li>Email: {user.email}</li>
          <li>Password: {user.password}</li>
        </ul>
        </div>
      ))}
    </div>
  );
};
const FormikUserForm = withFormik({
  mapPropsToValues({ name, email, password, terms}) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      terms: terms || false
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("This field is required"),
    email: Yup.string().required("This field is required"),
    password: Yup.string().required("Enter a password with 8 characters or more")
  }),
  handleSubmit(values, { setStatus }) {
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        setStatus(res.data);
      })
      .catch(err => console.log(err.res));
  }
})(UserForm);
console.log("This is the HOC", FormikUserForm);
export default FormikUserForm;
