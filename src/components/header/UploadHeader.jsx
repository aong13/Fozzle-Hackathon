import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import backIcon from "../../assets/icons/arrow_back_black.png";
const UploadHeader = ({ title, onBtnClick, buttonText, disabled }) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <HeaderContainer>
      <BackButton onClick={handleBack}>
        <img src={backIcon} alt="뒤로가기" />
      </BackButton>
      <Title>{title}</Title>
      {buttonText && (
        <HeaderBtn
          onClick={onBtnClick}
          buttonType={buttonText}
          disabled={disabled}
        >
          {buttonText}
        </HeaderBtn>
      )}
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  position: fixed;
  width: 100%;
  max-width: 480px;
  padding: 16px 20px;
  background-color: white;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  align-self: center;
  z-index: 1000;
`;

const BackButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin-right: 36px;
`;

const Title = styled.h1`
  flex: 1;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`;

const HeaderBtn = styled.button`
  background-color: ${({ buttonType, disabled }) =>
    disabled ? "#BDBDBD" : buttonType === "생성" ? "#7fa3ff" : "#6E6E6E"};
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: "pointer";

  &:hover {
    background-color: ${({ buttonType, disabled }) =>
      disabled ? "#BDBDBD" : buttonType === "생성" ? "#5d87d8" : "#494949"};
  }

  &:active {
    transform: ${({ disabled }) => (disabled ? "none" : "scale(0.98)")};
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0px 0px 4px rgba(0, 0, 0, 0.2)"};
  }
`;

export default UploadHeader;
