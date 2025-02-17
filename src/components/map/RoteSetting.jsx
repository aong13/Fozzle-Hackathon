import React, { useState, useEffect, useRef } from "react";
import KakaoMap from "../components/maps/KakaoMap";

const RouteSetting = () => {
  const start = { lat: 33.450701, lng: 126.570667 };
  const destination = { lat: 33.4509, lng: 126.571667 };

  return (
    <div>
      <h1>출발지/도착지 설정</h1>
      <KakaoMap start={start} destination={destination} />
    </div>
  );
};

export default RouteSetting;
