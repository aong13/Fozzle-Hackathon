import React, { useEffect, useState, useRef } from "react";
import Modal from "../Modal";

const virtualCoordinates = [
  {
    id: 1,
    lat: 33.450701,
    lng: 126.570667,
    name: "목적지 1",
    address: "서울특별시",
    participants: 15,
    thumbnail: "https://via.placeholder.com/150", // 썸네일 예시
    relayId: 1,
  },
  {
    id: 2,
    lat: 33.4502,
    lng: 126.570567,
    name: "목적지 2",
    address: "부산광역시",
    participants: 20,
    thumbnail: "https://via.placeholder.com/150",
    relayId: 2,
  },
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
];

const HomeMap = () => {
  const [map, setMap] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [selectedPlace, setSelectedPlace] = useState(null); // 선택된 장소 정보
  const mapContainer = useRef(null);

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

          // 마커 클릭 시 모달 열기
          window.kakao.maps.event.addListener(marker, "click", () => {
            setSelectedPlace(coord); // 클릭된 장소 정보 저장
            setIsModalOpen(true); // 모달 열기
          });
        });
      });
    };
    document.body.appendChild(script);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  const handleNavigate = () => {
    if (selectedPlace) {
      navigate(`/relay/${selectedPlace.relayId}/story/1`); // 경로 이동
      handleCloseModal(); // 모달 닫기
    }
  };

  return (
    <div>
      <div ref={mapContainer} style={{ width: "100%", height: "500px" }} />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        data={selectedPlace}
      ></Modal>
    </div>
  );
};

export default HomeMap;
