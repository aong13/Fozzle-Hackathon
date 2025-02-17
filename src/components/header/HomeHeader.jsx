import React, { useState } from "react";
import styled from "styled-components";
import SelectBottomSheet from "../modal/SelectBottomSheet";

const HomeHeader = ({ onSelect }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <>
      <HeaderContainer onClick={() => setIsModalOpen(true)}>
        <Text isSelected={selectedRegion !== null}>
          {selectedRegion || "지역"}
        </Text>
        <p>▶︎</p>
        <Text isSelected={selectedCategory !== null}>
          {selectedCategory || "카테고리"}
        </Text>
      </HeaderContainer>

      <SelectBottomSheet
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={(region, category) => {
          setSelectedRegion(region);
          setSelectedCategory(category);
          onSelect(region, category); // 부모에게 값 전달
        }}
      />
    </>
  );
};

const HeaderContainer = styled.header`
  position: fixed;
  width: 100%;
  max-width: 480px;
  padding: 24px 100px;
  background-color: white;
  color: #71c6ff;
  font-weight: 600;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
  cursor: pointer;
`;

const Text = styled.p`
  color: ${(props) => (props.isSelected ? "#71c6ff" : "#868E94")};
  font-weight: 600;
`;

export default HomeHeader;
