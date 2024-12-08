import React from "react";
import { MdBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const Contacts = () => {
  const navigate = useNavigate();
  const backToMap = () => {
    navigate("/map");
  };
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
        <section className='section-page section-background'>
          <div className='section-center'>
            <h2 className='section-title'>I nostri contatti</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum
              tenetur eius, aperiam dolorem eaque nostrum illo hic. Eum
              voluptate quam in rem sit quia eveniet? Quam, voluptas. Nostrum
              soluta tenetur dolor, quibusdam dolorem veniam magni minus optio
              quis neque officia quo laborum rerum tempore illo obcaecati ipsa
              cumque error. Nobis?
            </p>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Contacts;
