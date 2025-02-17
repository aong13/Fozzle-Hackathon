import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Modal = ({ isOpen, onClose, data }) => {
  const navigate = useNavigate();
  if (!isOpen) return null; // 모달이 열리지 않으면 렌더링하지 않음

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleNavigate = () => {
    if (data) {
      navigate(`/relay/${data.relayId}/story/1`); // 경로 이동
      onClose(); // 모달 닫기
    }
  };

  return (
    <ModalBg onClick={handleBackgroundClick}>
      <ModalContainer>
        {data && (
          <>
            <Thumbnail src={data.thumbnail} alt={data.name} />
            <Description>
              <h1>{data.name}</h1>
              <p>{data.address}</p>
              <p className="participant">☻ {data.participants}명 여행중</p>
              <GoBtn onClick={handleNavigate}>같이 여행하기</GoBtn>
            </Description>
          </>
        )}
      </ModalContainer>
    </ModalBg>
  );
};

export default Modal;

const ModalBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: white;
  display: flex;
  width: 98%;
  padding: 20px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
  justify-content: space-between;
  gap: 20px;
`;

const Description = styled.div`
  flex: 1;
  h1 {
    font-size: 18pt;
    margin-bottom: 16px;
  }
  p {
    font-size: 10pt;
    color: #929292;
    margin-bottom: 5px;
  }
  .participant {
    font-weight: bold;
    color: #539d35;
    margin-top: 8px;
  }
`;

const Thumbnail = styled.img`
  height: auto;
  border-radius: 10px;
  background-color: gray;
  aspect-ratio: 9 / 16;
  width: 90px;
`;

const GoBtn = styled.button`
  margin-top: 10px;
  justify-content: baseline;
  padding: 10px 20px;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    background-color: #aaaaaa;
  }
`;
