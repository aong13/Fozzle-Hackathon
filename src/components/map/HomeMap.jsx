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
      window.kakao.maps.load(async () => {
        const mapOptions = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };

        const mapInstance = new window.kakao.maps.Map(
          mapContainer.current,
          mapOptions
        );
        setMap(mapInstance);

        const data = await fetchHomeData();

        setPlaces(data);
      });
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
        const markerPosition = new window.kakao.maps.LatLng(coord.y, coord.x);
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
      map.relayout();

      const path = places.map(
        (coord) => new window.kakao.maps.LatLng(coord.y, coord.x)
      );
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

  const handleNavigate = () => {
    if (selectedPlace) {
      navigate(`/relay/${selectedPlace.relayId}/story/1`);
      handleCloseModal();
    }
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
        onNavigate={handleNavigate}
      />
    </div>
  );
};

export default HomeMap;
