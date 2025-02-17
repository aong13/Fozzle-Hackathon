import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import backIcon from "../../assets/icons/back.png";

const RelayHeader = ({ data }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = ["Step 1", "Step 2", "Step 3", "Step 4"];

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/home");
  };

  return (
    <HeaderContainer>
      <Row>
        <BackButton onClick={handleBack}>
          <img src={backIcon} alt="backIcon" />
        </BackButton>
        <Location>
          <p>{data?.region || "수영구"}</p>
          <p>►</p>
          <p>{data?.spotName}</p>
        </Location>
      </Row>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  padding: 30px 20px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.2) 50%,
    rgba(0, 0, 0, 0) 100%
  );
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
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
  padding: 0 64px;
  display: flex;
  justify-content: space-between;
  color: white;
  text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
`;

export default RelayHeader;
