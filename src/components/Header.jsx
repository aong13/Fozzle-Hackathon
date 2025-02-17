import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Header = ({ title, onBtnClick, buttonText, disabled }) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <HeaderContainer>
      <p>지역</p>
      <p>▶︎</p>
      <p>카테고리</p>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  position: fixed;
  width: 100%;
  max-width: 480px;
  padding: 16px 100px;
  background-color: white;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
`;

export default Header;
