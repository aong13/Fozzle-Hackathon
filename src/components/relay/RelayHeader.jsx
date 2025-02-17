import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import backIcon from "../../assets/icons/back.png";

const RelayHeader = ({ title, description }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (location.state?.fromUpload) {
      navigate(-3);
    } else {
      navigate("/home");
    }
  };

  return (
    <HeaderContainer>
      <BackButton onClick={handleBack}>
        <img src={backIcon} alt="backIcon" />
      </BackButton>
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
    width: 20px;
    height: 20px;
    filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.5));
  }
`;

export default RelayHeader;
