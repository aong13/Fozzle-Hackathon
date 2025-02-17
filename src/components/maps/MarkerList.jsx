import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const virtualCoordinates = [
  {
    id: 1,
    lat: 33.450701,
    lng: 126.570667,
    name: "목적지 1",
    relayId: 1,
  },
  { id: 2, lat: 33.4502, lng: 126.570567, name: "목적지 2", relayId: 2 },
  { id: 3, lat: 33.4509, lng: 126.571667, name: "목적지 3", relayId: 3 },
];

const MarkerList = () => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_MAP_KEY
    }&autoload=false`;
    script.onload = () => {
      window.kakao.maps.load(() => {
        const mapOptions = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };
        const mapInstance = new window.kakao.maps.Map(
          mapContainer.current,
          mapOptions
        );
        setMap(mapInstance);

        // 가상의 좌표들에 마커 추가
        virtualCoordinates.forEach((coord) => {
          const markerPosition = new window.kakao.maps.LatLng(
            coord.lat,
            coord.lng
          );
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });
          marker.setMap(mapInstance);

          // 마커 클릭 시 페이지 이동
          window.kakao.maps.event.addListener(marker, "click", () => {
            navigate(`/relay/${coord.relayId}/story/1`); // relayId와 storyId 사용
          });
        });
      });
    };
    document.body.appendChild(script);
  }, [navigate]);

  return (
    <div>
      <div ref={mapContainer} style={{ width: "100%", height: "500px" }} />
    </div>
  );
};

export default MarkerList;
