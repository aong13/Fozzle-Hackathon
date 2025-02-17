import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import HeartBtn from "./HeartBtn";

const BottomBar = ({ relayData }) => {
  const navigate = useNavigate();

  const handlePlusClick = () => {
    navigate(`/upload`);
  };

  console.log(relayData);
  return (
    <Container>
      <Description>
        <div>
          <ProfileCircle image={relayData?.authorProfileImage || ""} />
          <h1>{relayData?.authorName || "양두영"}</h1>
        </div>
        <p>{relayData?.storyDescription || "하이하이"}</p>
      </Description>
      <BottomContainer>
        <HeartBtn
          likeCount={relayData?.tickleLikes || 100}
          tickleId={relayData?.storyId}
        />
        <PlusBtn onClick={handlePlusClick}>목표지로 설정하기</PlusBtn>
      </BottomContainer>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  z-index: 100;
  padding: 50px 20px 30px;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.15) 60%,
    rgba(0, 0, 0, 0) 100%
  );
`;
const BottomContainer = styled.div`
  padding-top: 10px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Description = styled.div`
  div {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
  }
  h1 {
    color: white;
    margin-bottom: 10px;
    text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
  }
  p {
    color: white;
    margin-bottom: 10px;
    text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
    margin: 10px 100px 10px 10px;
    line-height: 1.2;
  }
`;

const PlusBtn = styled.button`
  background: #ffffff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  width: 80%;
  padding: 17px;
  border-radius: 50px;
  margin: 0 20px;
  font-weight: 600;
`;

const ProfileCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  border: 2px solid #fff;
`;

export default BottomBar;
