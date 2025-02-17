import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import camera_on from "../../assets/icons/camera_on.svg";
import cameraoff from "../../assets/icons/camera_off.svg";

const DescBottomSheet = ({ isOpen, onClose, data }) => {
  const navigate = useNavigate();
  if (!isOpen) return null;

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleNavigate = () => {
    if (data) {
      navigate(`/relay/${data.relayId}/story/1`);
      onClose();
    }
  };

  const handleCameraClick = () => {
    console.log("미정!");
  };

  return (
    <ModalBg onClick={handleBackgroundClick}>
      <ModalContainer>
        {data && (
          <>
            <span>● 해당 가게 쿠폰 보유</span>
            <Row>
              <Thumbnail src={data.thumbnail} alt={data.name} />
              <Description>
                <h1>{data.name}</h1>
                <p>{data.address}</p>
                <p className="participant">●{data.storyCount}명 여행중</p>
                <ButtonRow>
                  <CameraBtn onClick={handleCameraClick}>
                    <img src={camera_on} alt="camera" />
                  </CameraBtn>
                  <GoBtn onClick={handleNavigate}>리뷰 보기</GoBtn>
                </ButtonRow>
              </Description>
            </Row>
          </>
        )}
      </ModalContainer>
    </ModalBg>
  );
};

export default DescBottomSheet;

const ModalBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  border-top: 10px solid #88cbff;
  background-color: white;
  width: 100%;
  max-width: 480px;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  box-sizing: border-box;
  span {
    color: #609cdf;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 30px;
  margin-top: 20px;
`;

const Description = styled.div`
  flex: 1;

  margin: auto;
  h1 {
    font-size: 18pt;
    margin-bottom: 10px;
  }
  p {
    font-size: 12pt;
    color: #929292;
    margin-bottom: 10px;
  }
  .participant {
    font-size: 9pt;
    /* font-weight: bold; */
    color: #3189c4;
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
  justify-content: center;
  padding: 10px 20px;
  border: #55abe5 1px solid;
  color: #55abe5;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: #fff;
`;

const ButtonRow = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CameraBtn = styled.button`
  width: 40px;
  height: 40px;
  background-color: transparent;
  border: none;
  border-radius: 50%;
  padding: 8px;
  cursor: pointer;
  background-color: #e1efff;
  img {
    width: 20px;
    height: 20px;
  }
`;
