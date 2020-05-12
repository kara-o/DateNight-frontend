import React, { useState } from "react";
import { createUser } from "../services/api";
import {
  MyButton,
  MyLink,
  Form,
  LoginSignUpContainer,
  MyInput,
  Errors,
} from "../../elements";

const UserSignUp = (props) => {
  const [formData, setFormData] = useState({
    password: "",
    password_confirmation: "",
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
  });
  const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    setErrors(null);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    createUser(formData).then((json) => {
      if (!json.errors) {
        props.history.push("/login?account_confirmation_pending=true");
      } else {
        setErrors(json.errors.full_messages);
      }
    });
  };

  return (
    <LoginSignUpContainer
      title="Welcome"
      link={{ text: "Back", destination: "/login" }}
    >
      <Form>
        {errors ? <Errors errors={errors} /> : null}
        <MyInput
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <MyInput
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <MyInput
          type="password"
          name="password_confirmation"
          value={formData.password_confirmation}
          onChange={handleChange}
          placeholder="Confirm Password"
        />
        <MyInput
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="First Name"
        />
        <MyInput
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <MyInput
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
        />
        <MyButton type="button" onClick={handleSubmit}>
          Sign Up
        </MyButton>
      </Form>
    </LoginSignUpContainer>
  );
};

export default UserSignUp;
