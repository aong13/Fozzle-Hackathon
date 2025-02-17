import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { handlePrevious, handleNext } from "../../utils/relayUtils";
import ImgWithBlur from "../../components/ImgBlur";

const Relay = () => {
  const [tickle, setTickle] = useState(null); // 초기값을 null로 설정
  const [allRelay, setAllRelay] = useState([]);
  const { relayId, tickleId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRelayData = async () => {
      try {
        setTickle(dummyTickleData);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    if (relayId && tickleId) {
      fetchRelayData();
    }
  }, [relayId, tickleId]);

  return (
    <Container>
      <ImageWrapper>
        <ImgWithBlur
          imageSrc={
            tickle?.tickleImage ||
            "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTrO5jJwdTvUX2227Qe6YvVlDG0ChlXCf8mtr6etpVBlxxEvjJWql3e09C5R_oa9Uu9KgrKcYAT2n972-J14af6Fw"
          }
        />
      </ImageWrapper>
      <NavButtons>
        <button
          onClick={() => handlePrevious(allRelay, tickleId, relayId, navigate)}
        ></button>
        <button
          onClick={() => handleNext(allRelay, tickleId, relayId, navigate)}
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

const LoadingMessage = styled.div`
  font-size: 20px;
  text-align: center;
  margin-top: 50px;
  color: #333;
`;
