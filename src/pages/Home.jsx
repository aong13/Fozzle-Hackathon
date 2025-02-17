import React, { useState } from "react";
import HomeMap from "../components/map/HomeMap";
import HomeHeader from "../components/header/HomeHeader";
import RandomModal from "../components/modal/RandomModal";
import styled from "styled-components";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleNumberSelection = (selectedNumberData) => {
    setSelectedNumber(selectedNumberData - 1);
    setIsModalOpen(false);
  };

  return (
    <Container>
      <HomeHeader />
      <HomeMap selectedNumber={selectedNumber} />
      <RandomModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        onPlaceSelect={handleNumberSelection} // 함수명 수정
      />
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
  background-color: white;
  color: #53a9e3;
  border: none;
  border-radius: 50px;
  font-size: 18px;
  cursor: pointer;
  z-index: 2;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4b94d6;
  }
`;
