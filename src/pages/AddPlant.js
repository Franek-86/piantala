import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const AddPlant = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm();
  const [submissionError, setSubmissionError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userId, setUserId] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate(); // For navigation
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id); // Extract user ID
        // console.log(userId);
      } catch (error) {
        console.error("Failed to decode token:", error);
        setSubmissionError("Invalid token.");
        return;
      }
    }
  }, [userId]);
  const token = localStorage.getItem("authToken");

  // Regex pattern for longitude and latitude format
  const latLongPattern = /^\d{1,2}\.\d+$/;

  const validateLongitude = (value) => {
    const lon = parseFloat(value);
    if (!latLongPattern.test(value)) {
      return "Longitude must be in the correct format (e.g. 16.87242750719347).";
    }
    if (lon < 16.8 || lon > 16.95) {
      return "Longitude must be between 16.800 and 16.950 (Bari area).";
    }
    return true;
  };

  const validateLatitude = (value) => {
    const lat = parseFloat(value);
    if (!latLongPattern.test(value)) {
      return "Latitude must be in the correct format (e.g. 41.1206046905597).";
    }
    if (lat < 41.075 || lat > 41.17) {
      return "Latitude must be between 41.075 and 41.170 (Bari area).";
    }
    return true;
  };

  const onSubmit = async (data) => {
    const { longitude, latitude, file } = data;

    if (!file || !file[0]) {
      setError("file", { type: "manual", message: "Image file is required." });
      return;
    }

    // To access the actual file, use file[0]
    const selectedFile = file[0];

    const formData = new FormData();
    formData.append("lat", latitude);
    formData.append("lang", longitude);
    formData.append("image", file[0]); // The selected file
    formData.append("user_id", userId); // Include user ID
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    try {
      // Make a POST request to the API
      const response = await axios.post(
        "http://localhost:3001/api/plant",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
            Authorization: `Bearer ${token}`, // Optional: Send the token if needed
          },
        }
      );
      if (response.status === 201) {
        setSuccessMessage("Plant added successfully!");
        reset(); // Reset the form fields
      }
    } catch (error) {
      console.error("Error adding plant:", error);
      setSubmissionError(
        error.response?.data?.message || "Failed to submit the form"
      );
    }
    // console.log("Form data:", {
    //   longitude,
    //   latitude,
    //   file: selectedFile, // Log the selected file
    //   userId: 11, // Assuming userId is static
    // });

    setSubmissionError("");
    setSuccessMessage("Form has been submitted successfully!");

    // Clear the form after submission
    reset();
    // if (fileInputRef.current) {
    //   fileInputRef.current.value = "";
    // }

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("");
      // navigate("/map"); // Uncomment when needed
    }, 3000);
  };

  return (
    <div>
      <h1>Add Plant to Map</h1>

      {/* Global error message */}
      {submissionError && <p className='text-danger'>{submissionError}</p>}

      {/* Success message */}
      {successMessage && <p className='text-success'>{successMessage}</p>}

      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* Longitude input */}
        <Form.Group className='mb-3' controlId='formLongitude'>
          <Form.Label>Longitude</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter longitude'
            {...register("longitude", {
              required: "Longitude is required",
              validate: validateLongitude,
            })}
          />
          {errors.longitude && (
            <small className='text-danger'>{errors.longitude.message}</small>
          )}
        </Form.Group>

        {/* Latitude input */}
        <Form.Group className='mb-3' controlId='formLatitude'>
          <Form.Label>Latitude</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter latitude'
            {...register("latitude", {
              required: "Latitude is required",
              validate: validateLatitude,
            })}
          />
          {errors.latitude && (
            <small className='text-danger'>{errors.latitude.message}</small>
          )}
        </Form.Group>

        {/* File input for uploading image */}
        <Form.Group className='mb-3' controlId='formImage'>
          <Form.Label>Upload a picture</Form.Label>
          <Form.Control
            type='file'
            // accept='image/*'
            {...register("file", { required: "Image file is required." })}
            // ref={fileInputRef}
            onChange={() => clearErrors("file")}
          />
          {errors.file && (
            <small className='text-danger'>{errors.file.message}</small>
          )}
        </Form.Group>

        {/* Submit Button */}
        <Button variant='primary' type='submit'>
          Submit
        </Button>

        {/* Link to the map */}
        <Button variant='link'>
          <Link to={`/map`}>Go to map</Link>
        </Button>
      </Form>
    </div>
  );
};

export default AddPlant;
