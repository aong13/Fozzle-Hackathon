import React, { useEffect, useState } from "react";
import DescBottomSheet from "../modal/DescBottomSheet";
import markerIcon from "../../assets/icons/marker.png"; // 기본 마커 이미지
import selectedMarkerIcon from "../../assets/icons/marker_selected.png"; // 특별 마커 이미지
import { fetchHomeData } from "../../apis/homeApi";

const KakaoMap = ({ selectedNumber }) => {
  console.log(selectedNumber);
  const [places, setPlaces] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열기 상태
  const [selectedPlace, setSelectedPlace] = useState(null); // 선택된 장소 데이터
  const [mapCenter, setMapCenter] = useState({
    centerX: 35.160253016666665,
    centerY: 129.11391536666667,
  }); // 중심 좌표 상태

  // 모달 열기
  const handleOpenModal = (place) => {
    setSelectedPlace(place); // 선택된 장소 데이터 설정
    setIsModalOpen(true); // 모달 열기
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlace(null); // 모달을 닫을 때 선택된 장소 초기화
  };

  useEffect(() => {
    // 카카오맵 API 로드
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_MAP_KEY
    }&autoload=false`;
    document.head.appendChild(script);

    script.onload = async () => {
      // 카카오맵 API 로드 후 실행
      kakao.maps.load(async () => {
        const container = document.getElementById("map"); // 맵이 렌더링 될 DOM
        const options = {
          center: new kakao.maps.LatLng(mapCenter.centerX, mapCenter.centerY), // 동적으로 설정된 중심 좌표
          level: 5,
        };
        const map = new kakao.maps.Map(container, options);

        // 데이터 로드 (fetchHomeData는 외부 API 호출로 데이터를 가져오는 함수)
        const data = await fetchHomeData();
        console.log("로드된 데이터:", data.spots); // 데이터 확인
        setPlaces(data.spots);

        // 기본 마커 이미지 설정
        const markerImage = new kakao.maps.MarkerImage(
          markerIcon, // 기본 마커 이미지 경로
          new kakao.maps.Size(30, 40), // 마커 크기
          {
            alt: "marker", // 이미지에 대한 대체 텍스트
          }
        );

        // 특별 마커 이미지 설정
        const selectedMarkerImage = new kakao.maps.MarkerImage(
          selectedMarkerIcon, // 특별 마커 이미지 경로
          new kakao.maps.Size(60, 70), // 특별 마커 크기 (기본 마커 크기와 동일)
          {
            alt: "selected", // 특별 마커 대체 텍스트
          }
        );

        // 데이터 기반으로 마커 생성
        const positions = data.spots.map(
          (place) => new kakao.maps.LatLng(place.x, place.y)
        );

        // 마커 생성 및 클릭 이벤트 추가
        positions.forEach((position, index) => {
          const marker = new kakao.maps.Marker({
            position, // 마커 위치
            map, // 마커가 표시될 맵
            image: index === selectedNumber ? selectedMarkerImage : markerImage, // 선택된 마커는 특별 마커로 변경
          });

          // 마커 클릭 시 모달 열기
          kakao.maps.event.addListener(marker, "click", () => {
            handleOpenModal(data.spots[index]); // 클릭된 장소 데이터 전달
          });
        });

        // 선을 그릴 경로 생성
        const polyline = new kakao.maps.Polyline({
          path: positions, // 좌표 경로
          strokeWeight: 5, // 선 두께
          strokeColor: "#71C6FF", // 선 색상
          strokeOpacity: 1, // 선 투명도
          strokeStyle: "solid", // 선 스타일
        });

        polyline.setMap(map);
      });
    };
  }, [mapCenter, selectedNumber]); // `selectedNumber` 추가하여 변경 사항 반영

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "100vh" }}></div>

      <DescBottomSheet
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        data={selectedPlace}
      />
    </div>
  );
};

export default KakaoMap;
