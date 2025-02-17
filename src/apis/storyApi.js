import api from "./api";

export const getAllStory = async (spotId) => {
  try {
    const response = await api.get(`/api/spots/spots/${spotId}/story-list`); // 경로에 tickleId 포함
    return response.data;
  } catch (error) {
    console.error("스토리 전체 불러오기 실패:", error);
    throw error;
  }
};

export const getStoryData = async (storyId) => {
  try {
    const response = await api.get(`/api/stories/stories/${storyId}`);
    return response.data;
  } catch (error) {
    console.error("스토리 데이터 불러오기 실패 :", error);
    throw error;
  }
};

export const postLikes = async (tickleId) => {
  try {
    const response = await api.get(`/api/mvp/tickles/${tickleId}/like`);
    return response.data;
  } catch (error) {
    console.error("좋아요 추가 실패:", error);
    throw error;
  }
};
