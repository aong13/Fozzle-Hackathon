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

export const postStory = async (tickleData) => {
  const formData = new FormData();
  const requestData = {
    spotId: tickleData.spotId,
    storyDescription: tickleData.storyDescription,
  };

  formData.append("request", JSON.stringify(requestData));

  if (tickleData.file) {
    formData.append("file", tickleData.file);
  }

  // Log each key-value pair in the FormData object
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  try {
    const response = await api.post("/api/stories/", formData);
    return response.data;
  } catch (error) {
    console.error("스토리 추가 실패:", error);
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
