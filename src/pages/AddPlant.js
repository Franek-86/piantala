import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const AddPlant = () => {
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., sending the data to a server)
    console.log({ longitude, latitude, image, message });
  };
  const handleFileChange = (e) => {
    setImage(e.target.files[0]); // Get the uploaded file
  };
  return (
    <div>
      <h1>add plant to map</h1>

      <Form onSubmit={handleSubmit}>
        {/* Longitude input */}
        <Form.Group className='mb-3' controlId='formLongitude'>
          <Form.Label>Longitude</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter longitude'
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </Form.Group>

        {/* Latitude input */}
        <Form.Group className='mb-3' controlId='formLatitude'>
          <Form.Label>Latitude</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter latitude'
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </Form.Group>

        {/* File input for uploading image */}
        <Form.Group className='mb-3' controlId='formImage'>
          <Form.Label>Upload a picture</Form.Label>
          <Form.Control
            type='file'
            accept='image/*'
            onChange={handleFileChange}
          />
        </Form.Group>

        {/* Text area for message */}
        <Form.Group className='mb-3' controlId='formMessage'>
          <Form.Label>Message</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            placeholder='Enter your message'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
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
