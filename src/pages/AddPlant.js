import React, { useState, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const AddPlant = () => {
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  // const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({
    longitude: "",
    latitude: "",
    file: "",
  });
  const [submissionError, setSubmissionError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fileInputRef = useRef(null);
  // Regex pattern for longitude and latitude format
  const latLongPattern = /^\d{1,2}\.\d+$/;
  const validateLongitude = (value) => {
    const lon = parseFloat(value);

    // Check if the format matches the regex pattern
    if (!latLongPattern.test(value)) {
      return "Longitude must be in the correct format (e.g. 16.87242750719347).";
    }

    // Check if longitude is within Bari's boundaries
    if (lon < 16.8 || lon > 16.95) {
      return "Longitude must be between 16.800 and 16.950 (Bari area).";
    }

    return "";
  };

  const validateLatitude = (value) => {
    const lat = parseFloat(value);

    // Check if the format matches the regex pattern
    if (!latLongPattern.test(value)) {
      return "Latitude must be in the correct format (e.g. 41.1206046905597).";
    }

    // Check if latitude is within Bari's boundaries
    if (lat < 41.075 || lat > 41.17) {
      return "Latitude must be between 41.075 and 41.170 (Bari area).";
    }

    return "";
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      setErrors((prev) => ({ ...prev, file: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        file: "Please upload a valid image file.",
      }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Final validation before submission
    const longitudeError = validateLongitude(longitude);
    const latitudeError = validateLatitude(latitude);

    if (!file) {
      setErrors((prev) => ({ ...prev, file: "Image file is required." }));
    }

    // Update the state with errors
    setErrors((prev) => ({
      ...prev,
      longitude: longitudeError,
      latitude: latitudeError,
    }));

    // Check if there are any errors
    const hasErrors = longitudeError || latitudeError || !file;

    if (hasErrors) {
      setSuccessMessage(""); // Clear any previous success message
      setSubmissionError("Please fill in all the required fields correctly.");
      setTimeout(() => {
        setSubmissionError("");
      }, 3000);

      return;
    }

    // Clear any previous submission errors
    setSubmissionError("");
    // Show success message
    setSuccessMessage("Form has been submitted successfully!");

    // Clear form fields
    setLongitude("");
    setLatitude("");
    setFile(null);

    // Clear validation errors
    setErrors({
      longitude: "",
      latitude: "",
      file: "",
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // Clear the success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

    // Submit the form (e.g., make an API call)
    console.log("Form submitted:", { longitude, latitude, file });
  };

  const isFormValid =
    !errors.longitude && !errors.latitude && file && longitude && latitude;

  return (
    <div>
      <h1>add plant to map</h1>
      {/* Global error message */}
      {submissionError && <p className='text-danger'>{submissionError}</p>}

      {/* Success message */}
      {successMessage && <p className='text-success'>{successMessage}</p>}

      <Form onSubmit={handleSubmit}>
        {/* Longitude input */}
        <Form.Group className='mb-3' controlId='formLongitude'>
          <Form.Label>Longitude</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter longitude'
            value={longitude}
            onChange={(e) => {
              setLongitude(e.target.value);
              setErrors((prev) => ({
                ...prev,
                longitude: validateLongitude(e.target.value),
              }));
            }}
          />
          {errors.longitude && (
            <small className='text-danger'>{errors.longitude}</small>
          )}
        </Form.Group>

        {/* Latitude input */}
        <Form.Group className='mb-3' controlId='formLatitude'>
          <Form.Label>Latitude</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter latitude'
            value={latitude}
            onChange={(e) => {
              setLatitude(e.target.value);
              setErrors((prev) => ({
                ...prev,
                latitude: validateLatitude(e.target.value),
              }));
            }}
          />
          {errors.latitude && (
            <small className='text-danger'>{errors.latitude}</small>
          )}
        </Form.Group>

        {/* File input for uploading image */}
        <Form.Group className='mb-3' controlId='formImage'>
          <Form.Label>Upload a picture</Form.Label>
          <Form.Control
            type='file'
            accept='image/*'
            onChange={handleFileChange}
            ref={fileInputRef}
          />
          {errors.file && <small className='text-danger'>{errors.file}</small>}
        </Form.Group>

        {/* Text area for message */}
        {/* <Form.Group className='mb-3' controlId='formMessage'>
          <Form.Label>Message</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            placeholder='Enter your message'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form.Group> */}

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
