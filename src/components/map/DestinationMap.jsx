import React, { useEffect, useState } from "react";
import markerYellow from "../../assets/icons/marker_yellow.png";

const DestinationMap = ({ targetLocation }) => {
  const [mapCenter, setMapCenter] = useState({
    centerX: targetLocation?.x ? targetLocation.x + 0.005 : 35.16, // 목표 좌표보다 0.005 위로 설정
    centerY: targetLocation?.y || 129.1177134, // 기본 경도
  });

  useEffect(() => {
    // 카카오맵 API 로드
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_MAP_KEY
    }&autoload=false`;
    document.head.appendChild(script);

    script.onload = async () => {
      // 카카오맵 API 로드 후 실행
      kakao.maps.load(() => {
        const container = document.getElementById("map"); // 맵이 렌더링 될 DOM
        const options = {
          center: new kakao.maps.LatLng(mapCenter.centerX, mapCenter.centerY), // 동적으로 설정된 중심 좌표
          level: 3,
        };
        const map = new kakao.maps.Map(container, options);

        // 목표지점 (targetLocation) 마커 설정

        // 데이터가 없을 때 기본값으로 설정
        const destinationPosition = new kakao.maps.LatLng(
          targetLocation?.x || 35.16, // 위도
          targetLocation?.y || 129.1177134 // 경도
        );

        // 커스텀 마커 이미지
        const destinationMarkerImage = new kakao.maps.MarkerImage(
          markerYellow, // 커스텀 마커 이미지 경로
          new kakao.maps.Size(40, 50), // 마커 크기
          {
            alt: "destination", // 대체 텍스트
          }
        );

        // 목적지 마커 생성
        const destinationMarker = new kakao.maps.Marker({
          position: destinationPosition, // 목표지점 좌표
          map: map, // 마커가 표시될 맵
          image: destinationMarkerImage, // 커스텀 마커 이미지
        });

        // 목표 마커 클릭 시 동작 추가
        kakao.maps.event.addListener(destinationMarker, "click", () => {
          alert("목표지점 클릭됨!");
          // 원하는 동작 추가 (예: 모달 열기 등)
        });

        // 필요 시 지도에 선이나 경로를 추가하는 등의 작업
        // 예: 출발점에서 목적지까지 경로 표시
      });
    };
  }, [targetLocation, mapCenter]);

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "100vh" }}></div>
    </div>
  );
};

export default DestinationMap;
