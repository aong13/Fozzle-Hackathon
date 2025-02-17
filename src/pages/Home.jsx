import React, { useState } from "react";
import HomeMap from "../components/map/HomeMap";
import HomeHeader from "../components/header/HomeHeader";
import RandomModal from "../components/modal/RandomModal";
import styled from "styled-components";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Container>
      <HomeHeader />
      <HomeMap />
      <RandomModal isOpen={isModalOpen} onClose={toggleModal} />

      <FloatingButton onClick={toggleModal}>여행 시작하기</FloatingButton>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  width: 100%;
  position: relative;
`;

const FloatingButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  padding: 15px 30px;
  background-color: #55abe5;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 18px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4b94d6;
  }
`;
