import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const AuthForm = () => {
  const {
    login,
    setUserRole,
    setIsRegister,
    isRegister,
    loginOrRegister,
    setIsAuthenticated,
  } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await loginOrRegister(data);
      console.log(response);
      if (response.status === 201 || response.status === 200) {
        console.log("sta1");
        if (isRegister) {
          console.log("sta1-2");
          setSuccessMessage(
            "Controlla la tua mailbox per completare la registrazione."
          );
          reset();
          setIsRegister(false);
          setTimeout(() => {
            setSuccessMessage("");
          }, 3000);
        } else {
          setIsAuthenticated(true);
          navigate("/map");
          console.log("sta1-3");

          const { token, user } = response.data;
          let userRole = user.role;
          setUserRole(userRole);
          localStorage.setItem("userToken", token);
        }
      }
    } catch (error) {
      console.log("sta2");
      setServerError(error.response?.data?.message || "Failed to authenticate");
      setTimeout(() => {
        setServerError("");
      }, 3000); // Clear error message after 3 seconds
    }
  };

  return (
    <Container className='vh-100 align-content-center'>
      <Row className='d-flex justify-content-center'>
        <Col className='col-xs-8 col-sm-7'>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* Server error message */}
            {serverError && <p className='text-danger'>{serverError}</p>}
            {successMessage && <p className='text-success'>{successMessage}</p>}

            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <FloatingLabel
                controlId='floatingInput'
                label='Email address'
                className='mb-3'
              >
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
              </FloatingLabel>

              {errors.email && (
                <span className='text-danger'>{errors.email.message}</span>
              )}
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <FloatingLabel controlId='floatingPassword' label='Password'>
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
              </FloatingLabel>
              {errors.password && (
                <span className='text-danger'>{errors.password.message}</span>
              )}
            </Form.Group>

            <Button variant='primary' type='submit'>
              {isRegister ? "Register" : "Login"}
            </Button>

            <Form.Text className='text-muted ms-3'>
              {isRegister
                ? "Already have an account?"
                : "Don't have an account?"}
              <Button
                className='pt-1'
                variant='link'
                onClick={() => setIsRegister(!isRegister)}
              >
                {isRegister ? "Login" : "Register"}
              </Button>
            </Form.Text>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthForm;
