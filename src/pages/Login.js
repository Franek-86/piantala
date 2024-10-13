import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthForm = () => {
  const { login } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isRegister, setIsRegister] = useState(true); // Toggle between register/login
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  // const onSubmit = async (data) => {
  //   const { email, password } = data;

  //   try {
  //     const endpoint = isRegister
  //       ? "http://localhost:3001/api/register-user"
  //       : "http://localhost:3001/api/login";

  //     const response = await axios.post(endpoint, {
  //       email,
  //       user_password: password,
  //     });

  //     // Check for success status
  //     if (response.status === (isRegister ? 201 : 200)) {
  //       const { token } = response.data; // This should be present in a 200/201 response
  //       localStorage.setItem("userToken", token); // Store the token
  //       login(token); // Update context state

  //       reset(); // Reset form fields
  //       navigate("/map"); // Redirect to the map page
  //     }
  //   } catch (error) {
  //     console.error(error); // Log the full error for debugging
  //     setServerError(error.response?.data?.message || "Failed to authenticate");
  //     setTimeout(() => {
  //       setServerError("");
  //     }, 3000); // Clear error message after 3 seconds
  //   }
  // };
  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      const endpoint = isRegister
        ? "http://localhost:3001/api/auth/register-user"
        : "http://localhost:3001/api/auth/login";

      const response = await axios.post(endpoint, {
        email,
        user_password: password,
      });

      if (response.status === (isRegister ? 201 : 200)) {
        if (isRegister) {
          // Registration was successful
          setSuccessMessage("Registration successful! Please log in.");
          reset(); // Reset form fields
          setIsRegister(false); // Switch to login mode

          // Clear success message after 5 seconds
          setTimeout(() => {
            setSuccessMessage("");
          }, 3000); // Adjust the duration as needed
        } else {
          // Login was successful
          const { token } = response.data;
          localStorage.setItem("userToken", token); // Store the token
          login(token); // Update context state
          navigate("/map"); // Redirect to the map page
        }
      }
    } catch (error) {
      setServerError(error.response?.data?.message || "Failed to authenticate");
      setTimeout(() => {
        setServerError("");
      }, 3000); // Clear error message after 3 seconds
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* Server error message */}
      {serverError && <p className='text-danger'>{serverError}</p>}
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
