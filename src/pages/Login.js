// src/components/AuthForm.js
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AuthForm = () => {
  const { register: registerContextUser, login } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isRegister, setIsRegister] = useState(true); // Toggle between register/login
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const onSubmit = async (data) => {
    const { email, password } = data;

    if (isRegister) {
      try {
        // API call for registering the user
        const response = await axios.post(
          "http://localhost:3001/api/register-user",
          {
            email,
            user_password: password, // Using 'user_password' to match backend
          }
        );

        if (response.status === 201) {
          // Save the token in localStorage
          const { token } = response.data; // Assuming your API sends the token in the response
          localStorage.setItem("authToken", token); // Store the received token

          // Optionally, update your AuthContext state to reflect that the user is authenticated
          // setAuthState({ token, isAuthenticated: true });

          // Redirect or show success message
          console.log("User registered successfully!", token);
        }

        // Optionally use registerContextUser from context
        // registerContextUser(email, password);

        // setSuccessMessage("Registration successful!");
        reset(); // Reset the form fields

        setTimeout(() => {
          setSuccessMessage("");
          navigate("/map");
        }, 3000); // Redirect after 3 seconds
      } catch (error) {
        setServerError(
          error.response?.data?.message || "Failed to register user"
        );
        setTimeout(() => {
          setServerError("");
        }, 3000); // Clear error message after 3 seconds
      }
    } else {
      const response = await axios.post("http://localhost:3001/api/login", {
        email,
        user_password: password, // Using 'user_password' to match backend
      });
      if (response.status === 200) {
        // Save the token in localStorage
        const { token } = response.data; // Assuming your API sends the token in the response
        localStorage.setItem("authToken", token); // Store the received token

        // Optionally, update your AuthContext state to reflect that the user is authenticated
        // setAuthState({ token, isAuthenticated: true });

        // Redirect or show success message
        console.log("User registered successfully!", token);
      }

      navigate("/map");
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* Server error message */}
      {serverError && <p className='text-danger'>{serverError}</p>}

      {/* Success message */}
      {successMessage && <p className='text-success'>{successMessage}</p>}

      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type='email'
          placeholder='Enter email'
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          })}
        />
        {errors.email && (
          <span className='text-danger'>{errors.email.message}</span>
        )}
      </Form.Group>

      <Form.Group className='mb-3' controlId='formBasicPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Password'
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
        />
        {errors.password && (
          <span className='text-danger'>{errors.password.message}</span>
        )}
      </Form.Group>

      <Button variant='primary' type='submit'>
        {isRegister ? "Register" : "Login"}
      </Button>

      <Form.Text className='text-muted'>
        {isRegister ? "Already have an account?" : "Don't have an account?"}
        <Button variant='link' onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "Login" : "Register"}
        </Button>
      </Form.Text>
    </Form>
  );
};

export default AuthForm;
