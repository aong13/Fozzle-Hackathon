import React, { useState, useEffect } from "react";
import heartOn from "../../assets/icons/heart_on.svg";
import heartOff from "../../assets/icons/heart_off.svg";
import styled, { keyframes, css } from "styled-components";
// import { postLikes } from "../../apis/relayApi";

const HeartBtn = ({ likeCount, tickleId }) => {
  const [likes, setLikes] = useState(likeCount);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setLikes(likeCount);
  }, [tickleId]); //티클바뀌면 set

  const handleClick = async () => {
    if (!isAnimating) {
      setIsAnimating(true);
      try {
        // await postLikes(tickleId); api연동
        setLikes((prev) => prev + 1);
      } catch (error) {
        console.error("좋아요 추가 실패:", error);
      }
    }
  };

  const handleAnimationEnd = () => {
    setIsAnimating(false);
  };

  return (
    <Container onClick={handleClick}>
      <IconWrapper>
        <HeartOff src={heartOff} isHidden={isAnimating} />
        <HeartOn
          src={heartOn}
          isAnimating={isAnimating}
          onAnimationEnd={handleAnimationEnd}
        />
      </IconWrapper>
      <Text>{likes}</Text>
    </Container>
  );
};

const heartPop = keyframes`
  0% { transform: scale(1); opacity: 0; }
  50% { transform: scale(1.3); opacity: 1; }
  100% { transform: scale(1); opacity: 0.5; }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const IconWrapper = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
`;

const HeartOff = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: ${(props) => (props.isHidden ? 0.3 : 1)};
`;

const HeartOn = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  animation: ${(props) =>
    props.isAnimating
      ? css`
          ${heartPop} 0.4s ease-out
        `
      : "none"};
  visibility: ${(props) => (props.isAnimating ? "visible" : "hidden")};
`;

const Text = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
`;

export default HeartBtn;
