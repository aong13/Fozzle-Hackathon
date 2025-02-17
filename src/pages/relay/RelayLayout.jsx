import React, { useState, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import RelayHeader from "../../components/relay/RelayHeader";
import styled from "styled-components";
import BottomBar from "../../components/relay/BottomBar";

const RelayLayout = () => {
  const [relayData, setRelayData] = useState(null);
  const { relayId, storyId } = useParams();

  useEffect(() => {
    const fetchRelayData = async () => {
      try {
        const response = await getTicklesData(storyId);
        setRelayData(response.data);
      } catch (error) {
        console.error("Error fetching relay data", error);
      }
    };

    if (storyId) {
      fetchRelayData();
    }
  }, [storyId]);

  return (
    <Container>
      <RelayHeader />
      <Outlet />
      <BottomBar />
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
