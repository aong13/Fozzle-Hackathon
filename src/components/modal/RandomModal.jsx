import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import dice1 from "../../assets/dice/1.png";
import dice2 from "../../assets/dice/2.png";
import dice3 from "../../assets/dice/3.png";
import dice4 from "../../assets/dice/4.png";
import dice5 from "../../assets/dice/5.png";
import dice6 from "../../assets/dice/6.png";

const diceImages = [dice1, dice2, dice3, dice4, dice5, dice6];

const RandomModal = ({ isOpen, onClose, data }) => {
  const navigate = useNavigate();
  const [diceNumber, setDiceNumber] = useState(1);
  const [rolling, setRolling] = useState(false);

  useEffect(() => {
    if (isOpen) {
      rollDice();
    }
  }, [isOpen]);

  const rollDice = () => {
    setRolling(true);
    let count = 0;
    const interval = setInterval(() => {
      setDiceNumber(Math.floor(Math.random() * 6) + 1); // 1~6 사이 랜덤 숫자
      count++;
      if (count >= 10) {
        // 10번 변경 후 멈춤
        clearInterval(interval);
        setRolling(false);
      }
    }, 100); // 0.1초마다 숫자 변경
  };

  const handleNavigate = () => {
    if (data) {
      navigate(`/relay/${data.relayId}/story/1`);
      onClose();
    }
  };

  return (
    <ModalBg onClick={onClose}>
      <ModalContainer>
        <h1>부산여행마블</h1>
        <DiceImg
          src={diceImages[diceNumber - 1]}
          alt={`주사위 ${diceNumber}`}
        />
        <p>부릉부릉 님의</p>
        <p>다음 여행지는</p>
        <p>
          <BigNumber>{diceNumber}</BigNumber>번 입니다
        </p>
        <GoBtn onClick={rollDice} disabled={rolling}>
          {rolling ? "굴리는 중..." : "주사위 돌리기"}
        </GoBtn>
      </ModalContainer>
    </ModalBg>
  );
};

export default RandomModal;

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
  gap: 10px;
  background-color: #71c6ff;
  width: 80%;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  box-sizing: border-box;
  color: white;
`;

const DiceImg = styled.img`
  width: 80px;
  height: 80px;
  margin: 10px 0;
`;

const BigNumber = styled.span`
  font-size: 3rem;
  font-weight: bold;
  color: yellow;
`;

const GoBtn = styled.button`
  justify-content: center;
  padding: 10px 20px;
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
