import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import backIcon from "../../assets/icons/back.png";

const RelayHeader = ({ title, description }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <HeaderContainer>
      <BackButton onClick={handleBack}>
        <img src={backIcon} alt="backIcon" />
      </BackButton>
      <Location>
        <p>센텀</p>
        <p>►</p>
        <p>음식점</p>
      </Location>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  padding: 30px 20px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  z-index: 100;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.15) 40%,
    rgba(0, 0, 0, 0) 100%
  );
`;

const BackButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  img {
    filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.5));
  }
`;

const Location = styled.div`
  flex: 1;
  padding: 0 60px;
  display: flex;
  justify-content: space-between;
  color: white;
`;
export default RelayHeader;
