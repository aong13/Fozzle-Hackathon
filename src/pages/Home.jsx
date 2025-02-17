import React, { useState } from "react";
import HomeMap from "../components/map/HomeMap";
import HomeHeader from "../components/header/HomeHeader";
import RandomModal from "../components/modal/RandomModal";
import styled from "styled-components";
import { fetchDistrictData } from "../apis/homeApi";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [districtData, setDistrictData] = useState(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleNumberSelection = (selectedNumberData) => {
    setSelectedNumber(selectedNumberData - 1);
    setIsModalOpen(false);
  };

  const categoryMap = {
    모두: "ALL",
    음식점: "RESTAURANT",
    카페: "CAFE",
    관광지: "VIEW_POINT",
    축제: "FESTIVAL",
  };

  const handleSelect = async (region, category) => {
    setSelectedRegion(region);
    setSelectedCategory(category);

    const englishCategory = categoryMap[category];

    try {
      const data = await fetchDistrictData({
        district: region,
        type: englishCategory,
      });
      setDistrictData(data);
      console.log(data);
    } catch (error) {
      console.error("데이터 가져오기 실패", error);
    }
  };

  return (
    <Container>
      <HomeHeader onSelect={handleSelect} />
      <HomeMap selectedNumber={selectedNumber} data={districtData} />
      <RandomModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        onPlaceSelect={handleNumberSelection}
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
`;
