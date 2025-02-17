import React from "react";
import { useLocation } from "react-router-dom"; // location을 가져오기 위한 훅
import DestinationMap from "../components/map/DestinationMap";
import DestinationModal from "../components/modal/DestinationModal";

const Destination = () => {
  const location = useLocation();
  const relayData = location.state?.data; // 전달된 데이터를 state로 받음
  return (
    <div>
      <DestinationMap data={relayData} />
      <DestinationModal data={relayData} />
    </div>
  );
};

export default Destination;
