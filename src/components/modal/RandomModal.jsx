import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import dice1 from "../../assets/dice/1.png";
import dice2 from "../../assets/dice/2.png";
import dice3 from "../../assets/dice/3.png";
import dice4 from "../../assets/dice/4.png";
import dice5 from "../../assets/dice/5.png";
import dice6 from "../../assets/dice/6.png";
import questionDice from "../../assets/dice/question.png";

const diceImages = [dice1, dice2, dice3, dice4, dice5, dice6, questionDice];

const RandomModal = ({ isOpen, onClose, onPlaceSelect }) => {
  if (!isOpen) return null;
  const navigate = useNavigate();
  const [diceNumber, setDiceNumber] = useState(6);
  const [rolling, setRolling] = useState(false);
  const [rolled, setRolled] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setDiceNumber(6);
      setRolled(false);
    }
  }, [isOpen]);

  const rollDice = () => {
    setRolling(true);
    let count = 0;
    const interval = setInterval(() => {
      const newDice = Math.floor(Math.random() * 6);
      setDiceNumber(newDice);
      count++;
      if (count >= 10) {
        clearInterval(interval);
        setRolling(false);
        setRolled(true);
        setDiceNumber(0);
      }
    }, 100);
  };
  // 모달을 닫을 때 부모에게 선택된 숫자를 전달
  const handleClose = () => {
    onClose("모달이 닫혔습니다");
    onPlaceSelect(diceNumber + 1);
  };

  return (
    <ModalBg onClick={handleClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <h1>부산여행마블</h1>
        <DiceImg
          src={diceImages[diceNumber]}
          alt={`주사위 ${diceNumber === 6 ? "?" : diceNumber + 1}`}
        />
        {diceNumber === 6 ? (
          <p>다음 여행지는??</p>
        ) : (
          <>
            <p>
              <strong>부릉부릉</strong> 님의
            </p>
            <p>다음 여행지는</p>
            <p>
              <BigNumber>{diceNumber + 1}</BigNumber>번 입니다
            </p>
          </>
        )}
        <GoBtn onClick={rolled ? handleClose : rollDice} disabled={rolling}>
          {rolling ? "굴리는 중..." : rolled ? "모달닫기" : "주사위 돌리기"}
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
  gap: 15px;
  background-color: #71c6ff;
  width: 80%;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  box-sizing: border-box;
  color: white;
  border-radius: 20px;
`;

const DiceImg = styled.img`
  width: 80px;
  height: 80px;
  margin: 15px 0;
`;

const BigNumber = styled.span`
  font-size: 3rem;
  font-weight: bold;
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
