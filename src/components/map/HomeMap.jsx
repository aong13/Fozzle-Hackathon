import React, { useEffect, useState, useRef } from "react";
import Modal from "../modal/Modal";
import { useNavigate } from "react-router-dom"; // navigate import
import marker from "../../assets/icons/marker.png";
const virtualCoordinates = [
  {
    id: 3,
    lat: 33.4509,
    lng: 126.571667,
    name: "목적지 3",
    address: "대구광역시",
    participants: 10,
    thumbnail: "https://via.placeholder.com/150",
    relayId: 3,
  },
  {
    id: 4,
    lat: 33.451,
    lng: 126.572,
    name: "목적지 4",
    address: "인천광역시",
    participants: 25,
    thumbnail: "https://via.placeholder.com/150",
    relayId: 4,
  },
  {
    id: 5,
    lat: 33.452,
    lng: 126.573,
    name: "목적지 5",
    address: "광주광역시",
    participants: 30,
    thumbnail: "https://via.placeholder.com/150",
    relayId: 5,
  },
  {
    id: 6,
    lat: 33.453,
    lng: 126.574,
    name: "목적지 6",
    address: "대전광역시",
    participants: 12,
    thumbnail: "https://via.placeholder.com/150",
    relayId: 6,
  },
  {
    id: 7,
    lat: 33.454,
    lng: 126.575,
    name: "목적지 7",
    address: "울산광역시",
    participants: 18,
    thumbnail: "https://via.placeholder.com/150",
    relayId: 7,
  },
  {
    id: 8,
    lat: 33.455,
    lng: 126.576,
    name: "목적지 8",
    address: "경기도",
    participants: 22,
    thumbnail: "https://via.placeholder.com/150",
    relayId: 8,
  },
  {
    id: 9,
    lat: 33.456,
    lng: 126.577,
    name: "목적지 9",
    address: "강원도",
    participants: 14,
    thumbnail: "https://via.placeholder.com/150",
    relayId: 9,
  },
  {
    id: 10,
    lat: 33.457,
    lng: 126.578,
    name: "목적지 10",
    address: "세종특별자치시",
    participants: 17,
    thumbnail: "https://via.placeholder.com/150",
    relayId: 10,
  },
  {
    id: 11,
    lat: 33.459,
    lng: 126.579,
    name: "목적지 11",
    address: "제주특별자치도",
    participants: 19,
    thumbnail: "https://via.placeholder.com/150",
    relayId: 11,
  },
  {
    id: 12,
    lat: 33.46,
    lng: 126.58,
    name: "목적지 12",
    address: "전라북도",
    participants: 16,
    thumbnail: "https://via.placeholder.com/150",
    relayId: 12,
  },
  {
    id: 13,
    lat: 33.461,
    lng: 126.581,
    name: "목적지 13",
    address: "경상남도",
    participants: 23,
    thumbnail: "https://via.placeholder.com/150",
    relayId: 13,
  },
];

const HomeMap = () => {
  const [map, setMap] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const mapContainer = useRef(null);
  const navigate = useNavigate(); // navigate hook 사용

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

        // 마커들 배열
        const markers = [];
        // 마커 이미지 설정
        const markerImageSrc = marker; // 마커 이미지 경로
        const markerSize = new window.kakao.maps.Size(32, 40); // 마커 크기

        virtualCoordinates.forEach((coord) => {
          const markerPosition = new window.kakao.maps.LatLng(
            coord.lat,
            coord.lng
          );
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
            image: new window.kakao.maps.MarkerImage(
              markerImageSrc,
              markerSize
            ),
          });
          marker.setMap(mapInstance);
          markers.push(marker);

          // 마커 클릭 시 모달 열기
          window.kakao.maps.event.addListener(marker, "click", () => {
            setSelectedPlace(coord);
            setIsModalOpen(true);
          });
        });

        // 마커들을 연결하는 선 그리기
        const path = virtualCoordinates.map(
          (coord) => new window.kakao.maps.LatLng(coord.lat, coord.lng)
        );
        const polyline = new window.kakao.maps.Polyline({
          path: path,
          strokeWeight: 3,
          strokeColor: "#54A9FF",
          strokeOpacity: 0.8,
          strokeStyle: "shortdash",
        });
        polyline.setMap(mapInstance);
      });
    };
    document.body.appendChild(script);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNavigate = () => {
    if (selectedPlace) {
      navigate(`/relay/${selectedPlace.relayId}/story/1`);
      handleCloseModal();
    }
  };

  return (
    <div>
      <div ref={mapContainer} style={{ width: "100%", height: "100vh" }} />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        data={selectedPlace}
        onNavigate={handleNavigate}
      />
    </div>
  );
};

export default HomeMap;
