import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { handlePrevious, handleNext } from "../../utils/relayUtils";
import ImgWithBlur from "../../components/ImgBlur";
import { getAllStory, getStoryData } from "../../apis/storyApi";

const Relay = () => {
  const [story, setStory] = useState(null); // 초기값을 null로 설정
  const [allRelay, setAllRelay] = useState([]);
  const { relayId, storyId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRelayData = async () => {
      try {
        const response = await getStoryData(storyId);
        const allRelayData = await getAllStory(relayId);
        setStory(response);
        setAllRelay(allRelayData);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    if (relayId && storyId) {
      fetchRelayData();
    }
  }, [relayId, storyId]);

  return (
    <Container>
      <ImageWrapper>
        <ImgWithBlur imageSrc={story?.storyThumbnail} />
      </ImageWrapper>
      <NavButtons>
        <button
          onClick={() => handlePrevious(allRelay, storyId, relayId, navigate)}
        ></button>
        <button
          onClick={() => handleNext(allRelay, storyId, relayId, navigate)}
        ></button>
      </NavButtons>
    </Container>
  );
};

export default Relay;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavButtons = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;

  button {
    background-color: transparent;
    border: none;
    width: 50%;
    cursor: pointer;
    z-index: 2;
    user-select: none;
  }
`;
