import React, { useState, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import RelayHeader from "../../components/relay/RelayHeader";
import styled from "styled-components";
import BottomBar from "../../components/relay/BottomBar";
import { getStoryData } from "../../apis/storyApi";

const RelayLayout = () => {
  const [relayData, setRelayData] = useState(null);
  const { relayId, storyId } = useParams();

  useEffect(() => {
    const fetchStoryData = async () => {
      try {
        const response = await getStoryData(storyId);
        setRelayData(response);
      } catch (error) {
        console.error("Error fetching relay data", error);
      }
    };

    if (storyId) {
      fetchStoryData();
    }
  }, [storyId]);

  return (
    <Container>
      <RelayHeader />
      <Outlet />
      <BottomBar relayData={relayData} />
    </Container>
  );
};

export default RelayLayout;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
