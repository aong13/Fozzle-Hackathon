import React, { useState, useEffect } from "react";
import styled from "styled-components";

const SelectBottomSheet = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const regions = [
    "강서구",
    "금정구",
    "남구",
    "동구",
    "동래구",
    "부산진구",
    "북구",
    "사상구",
    "사하구",
    "서구",
    "수영구",
    "연제구",
    "영도구",
    "중구",
    "해운대구",
  ];
  const categories = [
    "모두",
    "음식점",
    "카페",
    "관광지",
    "쇼핑",
    "문화",
    "자연",
  ];

  // 두 개 다 선택되었을 때 자동으로 onSelect 실행 후 바텀시트 닫기
  useEffect(() => {
    if (selectedRegion && selectedCategory) {
      onSelect(selectedRegion, selectedCategory);
      onClose();
    }
  }, [selectedRegion, selectedCategory, onSelect, onClose]);

  return (
    <ModalBg onClick={onClose}>
      <div style={{ backgroundColor: "#E8EFF3", height: "10px" }} />
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <SelectionWrapper isRegion={true}>
          <SelectionList>
            {regions.map((region) => (
              <OptionButton
                key={region}
                isSelected={selectedRegion === region}
                onClick={() => setSelectedRegion(region)}
              >
                {region}
              </OptionButton>
            ))}
          </SelectionList>
        </SelectionWrapper>

        <SelectionWrapper isRegion={false}>
          <SelectionList>
            {categories.map((category) => (
              <OptionButton
                key={category}
                isSelected={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </OptionButton>
            ))}
          </SelectionList>
        </SelectionWrapper>
      </ModalContainer>
    </ModalBg>
  );
};

const ModalBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  border-top: 10px solid #88cbff;
  background-color: white;
  width: 100%;
  max-width: 480px;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const SelectionWrapper = styled.div`
  padding: 20px;
  width: ${(props) => (props.isRegion ? "33%" : "66%")};
  text-align: center;
  background-color: ${(props) => (props.isRegion ? "#F5F5F5" : "transparent")};
`;

const SelectionList = styled.div`
  max-height: 200px;
  overflow-y: auto;
  padding: 5px;
`;

const OptionButton = styled.button`
  width: 100%;
  padding: 8px;
  margin: 2px 0;
  border: none;
  background: ${(props) => (props.isSelected ? "#D3E8F5" : "transparent")};
  color: black;
  cursor: pointer;

  &:hover {
    background: ${(props) => (props.isSelected ? "#D3E8F5" : "transparent")};
  }
`;

const ButtonContainer = styled.div`
  width: 98%;
  max-width: 480px;
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 10px 0;
`;

export default SelectBottomSheet;
