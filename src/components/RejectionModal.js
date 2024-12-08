import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { PlantsContext } from "../context/PlantsContext";

const RejectionModal = (props) => {
  const { handleStatusChange } = useContext(PlantsContext);
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const { comment } = data;
    console.log(comment);
    console.log(props);
    handleStatusChange("rejected", props.plantId, comment);
  };
  // const test = () => {
  //   return props.onHide;
  // };
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Rejection</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          {/* <h4>Centered Modal</h4> */}
          <FloatingLabel
            controlId='floatingTextarea2'
            label='Lascia qui un commento'
          >
            <Form.Control
              {...register("comment", {
                required: "yes",
              })}
              as='textarea'
              placeholder='Leave a comment here'
              style={{ height: "100px" }}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button type='submit'>Reject</Button>
        </Modal.Footer>
      </Form>
      {/* <Button onClick={props.handleStatusChange}>Reject</Button> */}
    </Modal>
  );
};

export default RejectionModal;
