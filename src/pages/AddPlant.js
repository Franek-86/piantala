import React, { useRef, useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
import axios from "axios";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { MdBackspace } from "react-icons/md";
import { PlantsContext } from "../context/PlantsContext";
import { AuthContext } from "../context/AuthContext";

const AddPlant = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset,
    setValue,
  } = useForm();
  const { userId } = useContext(AuthContext);
  const {
    getAllPlants,
    // userId,
    langMatch,
    latMatch,
    setLatMatch,
    setLangMatch,
    addPlant,
  } = useContext(PlantsContext);

  const [submissionError, setSubmissionError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fileInputRef = useRef(null);
  const navigate = useNavigate(); // For navigation

  const token = localStorage.getItem("authToken");

  // Regex pattern for longitude and latitude format
  const latLongPattern = /^\d{1,2}\.\d+$/;
  const resetLatLang = () => {
    setLatMatch(null);
    setLangMatch(null);
  };
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
  console.log("aaab", userId);
  const onSubmit = async (data) => {
    const { longitude, latitude, file } = data;

    if (!file || !file[0]) {
      setError("file", { type: "manual", message: "Image file is required." });
      return;
    }

    // // To access the actual file, use file[0]
    // const selectedFile = file[0];

    const formData = new FormData();
    formData.append("lat", latitude);
    formData.append("lang", longitude);
    formData.append("image", file[0]);
    formData.append("user_id", userId);

    try {
      const response = addPlant(formData);
      if (response.status === 201) {
        setSuccessMessage("Plant added successfully!");
        reset();
      }
    } catch (error) {
      console.error("Error adding plant:", error);
      setSubmissionError(
        error.response?.data?.message || "Failed to submit the form"
      );
    }

    setSubmissionError("");
    setSuccessMessage("Form has been submitted successfully!");
    reset();

    setTimeout(() => {
      setSuccessMessage("");
      getAllPlants();
    }, 3000);
  };
  const backToMap = () => {
    resetLatLang();
    navigate("/map");
  };
  const handlePaste = (event) => {
    const pastedValue = event.clipboardData.getData("Text").trim(); // Get the pasted text
    event.preventDefault(); // Prevent default pasting behavior to handle it manually

    // Regular expression to match coordinates in "lat, long" format
    const coordsMatch = pastedValue.match(
      /^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)/
    );

    // If coordinates are found in the correct format (lat, long)
    if (coordsMatch) {
      const latitude = coordsMatch[1]; // Latitude
      const longitude = coordsMatch[3]; // Longitude

      // Set values in React Hook Form
      setValue("latitude", latitude);
      setValue("longitude", longitude);
    }
  };

  useEffect(() => {
    if (latMatch) {
      setValue("latitude", latMatch);
    }

    // If langMatch is found, set longitude value in React Hook Form
    if (langMatch) {
      setValue("longitude", langMatch);
    }
  });

  return (
    <section className='section-background section-full-page'>
      <div className='section-center'>
        <div className='back-btn'>
          <MdBackspace
            onClick={() => {
              backToMap();
            }}
          />
        </div>
        <h1 className='section-title'>Segnalaci buca</h1>
        {/* Global error message */}
        {submissionError && <p className='text-danger'>{submissionError}</p>}
        {/* Success message */}
        {successMessage && <p className='text-success'>{successMessage}</p>}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className='mb-3' controlId='formLongitude'>
            {/* <FloatingLabel controlId='tutte' label='tutte' className='mb-3'> */}
            <Form.Control
              type='text'
              placeholder='Incolla qui longitutine e latitudine'
              onPaste={handlePaste} // Handle paste event
            />
            {/* {errors.longitude && (
                <small className='text-danger'>
                  {errors.longitude.message}
                </small>
              )} */}
            {/* </FloatingLabel> */}
          </Form.Group>
          {/* Longitude input */}

          {/* Latitude input */}
          <Form.Group className='mb-3' controlId='formLatitude'>
            <FloatingLabel
              controlId='formLatitude'
              label='Inserisci latitudine'
              className='mb-3'
            >
              <Form.Control
                type='text'
                placeholder='Inserisci latitudine'
                {...register("latitude", {
                  required: "Latitude is required",
                  validate: validateLatitude,
                })}
              />
              {errors.latitude && (
                <small className='text-danger'>{errors.latitude.message}</small>
              )}
            </FloatingLabel>
          </Form.Group>
          <Form.Group className='mb-3' controlId='formLongitude'>
            <FloatingLabel
              controlId='formLongitude'
              label='Inserisci longitudine'
              className='mb-3'
            >
              <Form.Control
                type='text'
                placeholder='Enter longitude'
                {...register("longitude", {
                  required: "Longitude is required",
                  validate: validateLongitude,
                })}
              />
              {errors.longitude && (
                <small className='text-danger'>
                  {errors.longitude.message}
                </small>
              )}
            </FloatingLabel>
          </Form.Group>

          {/* File input for uploading image */}
          <Form.Group className='mb-3' controlId='formImage'>
            <Form.Label>Carica immagine</Form.Label>
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
          <div className='text-center mt-5'>
            <Button variant='primary' type='submit'>
              Invia segnalazione
            </Button>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default AddPlant;
