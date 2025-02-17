import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";

// 경로 그리기 컴포넌트
const KakaoMap = ({ start, destination, onFindRoute }) => {
  const [startCoords, setStartCoords] = useState(start);
  const [destCoords, setDestCoords] = useState(destination);
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  // 지도와 경로를 설정
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
        setMap(mapInstance); // 맵 인스턴스를 상태로 설정

        // 클릭 이벤트 처리 (출발지와 도착지 설정)
        window.kakao.maps.event.addListener(
          mapInstance,
          "click",
          (mouseEvent) => {
            const lat = mouseEvent.latLng.getLat();
            const lng = mouseEvent.latLng.getLng();

            // 출발지 설정
            if (!startCoords) {
              setStartCoords({ lat, lng });
            }
            // 도착지 설정
            else if (!destCoords) {
              setDestCoords({ lat, lng });
            }
          }
        );
      });
    };
    document.body.appendChild(script);
  }, [startCoords, destCoords]);

  // 경로 그리기 함수
  const handleFindRoute = () => {
    if (startCoords && destCoords && map) {
      const startLatLng = new window.kakao.maps.LatLng(
        startCoords.lat,
        startCoords.lng
      );
      const destLatLng = new window.kakao.maps.LatLng(
        destCoords.lat,
        destCoords.lng
      );

      const linePath = [startLatLng, destLatLng];
      const polyline = new window.kakao.maps.Polyline({
        path: linePath, // 경로
        strokeWeight: 5, // 선의 두께
        strokeColor: "#00F", // 선의 색
        strokeOpacity: 1, // 선의 불투명도
        strokeStyle: "solid", // 선 스타일
      });

      polyline.setMap(map); // 지도에 선을 그린다
    } else {
      alert("출발지와 도착지를 모두 설정해주세요.");
    }
  };

  return (
    <div>
      <Header />
      <div ref={mapContainer} style={{ width: "100%", height: "500px" }} />
      <div>
        <p>
          출발지:{" "}
          {startCoords
            ? `${startCoords.lat}, ${startCoords.lng}`
            : "설정되지 않음"}
        </p>
        <p>
          목적지:{" "}
          {destCoords
            ? `${destCoords.lat}, ${destCoords.lng}`
            : "설정되지 않음"}
        </p>
      </div>

      <button onClick={handleFindRoute}>경로 찾기</button>
    </div>
  );
};

export default KakaoMap;
