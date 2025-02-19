import api from "./api";

export const fetchHomeData = async () => {
  try {
    // 현재 위치를 가져오는 코드 추가
    const getCurrentLocation = () => {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve({
                nowX: position.coords.longitude,
                nowY: position.coords.latitude,
              });
            },
            (error) => {
              reject(error);
            }
          );
        } else {
          reject(new Error("Geolocation is not supported by this browser."));
        }
      });
    };

    const { nowX, nowY } = await getCurrentLocation();

    const response = await api.get(`/api/spots/recommend/around`, {
      params: {
        nowX,
        nowY,
        type: "ALL",
      },
    });
    return response.data;
  } catch (error) {
    console.error("홈 화면 데이터 불러오기 실패:", error);
    throw error;
  }
};

export const fetchDistrictData = async ({ district, type }) => {
  try {
    const response = await api.get(`/api/spots/recommend/district`, {
      params: {
        city: "부산광역시",
        district: district,
        type: type,
      },
    });
    console.log("지역", response);
    return response.data;
  } catch (error) {
    console.error("지역 데이터 :", error);
    throw error;
  }
};
