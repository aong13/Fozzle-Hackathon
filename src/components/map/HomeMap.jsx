import React, { useEffect, useState, useRef } from "react";
import DescBottomSheet from "../modal/DescBottomSheet";
import { useNavigate } from "react-router-dom";
import marker from "../../assets/icons/marker.png";
import { fetchHomeData } from "../../apis/homeApi";

const HomeMap = () => {
  const [places, setPlaces] = useState([]);
  const [map, setMap] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const mapContainer = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_MAP_KEY
    }&autoload=false`;

    script.onload = async () => {
      try {
        window.kakao.maps.load(async () => {
          const mapOptions = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
          };

          // 지도 초기화 후 mapInstance를 확인
          const mapInstance = new window.kakao.maps.Map(
            mapContainer.current,
            mapOptions
          );
          console.log("지도 로드 성공:", mapInstance); // 지도 인스턴스 확인
          setMap(mapInstance);

          const data = await fetchHomeData();
          console.log("로드된 데이터:", data); // 데이터 확인
          setPlaces(data);
        });
      } catch (error) {
        console.error("카카오맵 로딩 중 오류 발생:", error);
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (places.length > 0 && map) {
      console.log("📌 마커 및 지도 경계 설정 중...");
      const markers = [];
      const markerImageSrc = marker;
      const markerSize = new window.kakao.maps.Size(32, 40);
      const bounds = new window.kakao.maps.LatLngBounds();

      places.forEach((coord) => {
        // 좌표 값 확인
        console.log("마커 위치 확인:", coord.y, coord.x);

        const markerPosition = new window.kakao.maps.LatLng(coord.y, coord.x);
        console.log(markerPosition); // LatLng 객체 확인

        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: new window.kakao.maps.MarkerImage(markerImageSrc, markerSize),
        });
        marker.setMap(map);
        markers.push(marker);

        window.kakao.maps.event.addListener(marker, "click", () => {
          setSelectedPlace(coord);
          setIsModalOpen(true);
        });

        bounds.extend(markerPosition);
      });

      map.setBounds(bounds);
      console.log("지도 경계 설정 후", map.getBounds());
      map.relayout();

      const path = places.map(
        (coord) => new window.kakao.maps.LatLng(coord.y, coord.x)
      );
      console.log("polyline 경로:", path); // 경로 확인

      const polyline = new window.kakao.maps.Polyline({
        path: path,
        strokeWeight: 3,
        strokeColor: "#54A9FF",
        strokeOpacity: 0.8,
        strokeStyle: "shortdash",
      });
      polyline.setMap(map);
    }
  }, [places, map]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div
        ref={mapContainer}
        style={{
          width: "100%",
          height: "100vh",
        }}
      />
      <DescBottomSheet
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        data={selectedPlace}
      />
    </div>
  );
};

export default HomeMap;
