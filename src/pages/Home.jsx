import React, { useState } from "react";
import HomeMap from "../components/map/HomeMap";
import HomeHeader from "../components/header/HomeHeader";
import RandomModal from "../components/modal/RandomModal";
import styled from "styled-components";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null); // 선택된 장소 상태 추가

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handlePlaceSelection = (placeData) => {
    setSelectedPlace(placeData); // RandomModal에서 선택된 장소 데이터 설정
    setIsModalOpen(false); // 모달 닫기
  };

  return (
    <Container>
      <HomeHeader />
      <HomeMap selectedPlace={selectedPlace} />
      <RandomModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        onPlaceSelect={handlePlaceSelection}
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
  background-color: #55abe5;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 18px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 2;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4b94d6;
  }
`;
