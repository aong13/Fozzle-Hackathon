import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const DestinationModal = ({ isOpen, onClose, onPlaceSelect, data }) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/upload", { state: { data } });
  };
  const handleClose = () => {
    onClose("모달이 닫혔습니다");
    onPlaceSelect(diceNumber + 1);
  };

  return (
    <ModalBg onClick={handleClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <p>
          <strong>부릉부릉</strong> 님의
        </p>
        <p>여행지에 도착했습니다.</p>
        <GoBtn onClick={onClick}>사진 기록하기 </GoBtn>
      </ModalContainer>
    </ModalBg>
  );
};

export default DestinationModal;

const ModalBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  max-width: 480px;
  margin: auto;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  background-color: #71c6ff;
  width: 80%;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  box-sizing: border-box;
  color: white;
  border-radius: 20px;
`;

const GoBtn = styled.button`
  justify-content: center;
  padding: 12px 25px;
  border: #55abe5 1px solid;
  color: #55abe5;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: #fff;
  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;
