import React, { useEffect, useState, useRef } from "react";

// 경로 그리기 컴포넌트
const KakaoMap = ({ start, destination }) => {
  const [startCoords, setStartCoords] = useState(start);
  const [destCoords, setDestCoords] = useState(destination);
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
        const map = new window.kakao.maps.Map(mapContainer.current, mapOptions);

        // 클릭 이벤트 처리 (출발지와 도착지 설정)
        window.kakao.maps.event.addListener(map, "click", (mouseEvent) => {
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
        });

        // 출발지와 도착지가 설정되었을 때 경로 그리기
        if (startCoords && destCoords) {
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

          polyline.setMap(map);
        }
      });
    };
    document.body.appendChild(script);
  }, [startCoords, destCoords]);

  return (
    <div>
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
    </div>
  );
};

export default KakaoMap;
