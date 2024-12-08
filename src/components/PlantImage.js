import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const PlantImage = ({ show, setShow, image_url }) => {
  console.log("show", show);
  console.log("setShow ", setShow);
  // const [show, setShow] = useState(false);

  return (
    <div>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName='modal-90w'
        aria-labelledby='example-custom-modal-styling-title'
      >
        <Modal.Header closeButton>
          <Modal.Title id='example-custom-modal-styling-title'>
            Custom Modal Styling
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            className='plant-image'
            src={`http://localhost:3001${image_url}`}
            alt='immagine piantina'
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PlantImage;

// function Example() {

//   return (
//     <>
//       <Button variant="primary" onClick={() => setShow(true)}>
//         Custom Width Modal
//       </Button>

//       <Modal
//         show={show}
//         onHide={() => setShow(false)}
//         dialogClassName="modal-90w"
//         aria-labelledby="example-custom-modal-styling-title"
//       >
//         <Modal.Header closeButton>
//           <Modal.Title id="example-custom-modal-styling-title">
//             Custom Modal Styling
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>
//             Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
//             commodi aspernatur enim, consectetur. Cumque deleniti temporibus
//             ipsam atque a dolores quisquam quisquam adipisci possimus
//             laboriosam. Quibusdam facilis doloribus debitis! Sit quasi quod
//             accusamus eos quod. Ab quos consequuntur eaque quo rem! Mollitia
//             reiciendis porro quo magni incidunt dolore amet atque facilis ipsum
//             deleniti rem!
//           </p>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// }

// export default Example;
