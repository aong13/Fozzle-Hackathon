import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UploadHeader from "../components/header/UploadHeader";
import styled from "styled-components";
import cameraIcon from "../assets/icons/camera.svg";
import deleteIcon from "../assets/icons/x_icon.svg";
import ImgWithBlur from "../components/ImgBlur";
import useToastStore from "../stores/useToastStore";
import { postStory } from "../apis/storyApi";

const Upload = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { relayId, title } = location.state || {}; // Destructure relayId from state
  const fileInputRef = useRef(null);
  const addToast = useToastStore((state) => state.addToast);

  // 상태 추가
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return; // 중복 클릭 방지

    setIsSubmitting(true);
    if (!image) {
      addToast("사진을 필수로 업로드해주세요!");
      setTimeout(() => setIsSubmitting(false), 1500);
      return;
    }

    try {
      const tickleData = {
        storyDescription: content,
        spotId: relayId,
        file: image,
      };

      const response = await postStory(tickleData);
      navigate(`/relay/${response.spotId}/story/${response.storyId}`, {
        state: { fromUpload: true },
      });
    } catch (error) {
      console.error("데이터 전송 실패:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <UploadHeader
        title="스토리 더하기"
        buttonText="생성"
        onBtnClick={handleSubmit}
        disabled={isSubmitting}
      />
      <FormContainer>
        <TitleInputWrapper>
          <Input type="text" value={title} readOnly />
          <label htmlFor="fileUpload">
            <CameraBtn src={cameraIcon} alt="카메라 버튼" />
          </label>
          <HiddenFileInput
            ref={fileInputRef}
            id="fileUpload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </TitleInputWrapper>
        <ContentContainer>
          <CharCount>({content.length}/30)</CharCount>
          <TextArea
            value={content}
            placeholder="비하인드 스토리 사진을 공유해보세요!"
            onChange={(e) => {
              if (e.target.value.length <= 30) {
                setContent(e.target.value);
              }
            }}
          />
          {image && (
            <ImageWrapper>
              <ImgWithBlur imageSrc={URL.createObjectURL(image)} />
              <RemoveButton
                src={deleteIcon}
                alt="delete"
                onClick={handleRemoveImage}
              />
            </ImageWrapper>
          )}
        </ContentContainer>
      </FormContainer>
    </Container>
  );
};

// 스타일 컴포넌트 수정
const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 80px;
`;

const Input = styled.input`
  margin-left: 20px;
  padding: 10px;
  font-size: 16px;
  border: none;
  outline: none;
  flex: 1;
  font-weight: 600;
`;

const TextArea = styled.textarea`
  min-height: 50px;
  font-size: 16px;
  font-family: Pretendard;
  border: none;
  outline: none;
  resize: none;
`;

const TitleInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;

const CameraBtn = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
  border-radius: 50%;
  object-fit: cover;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const ContentContainer = styled.div`
  padding: 0 20px;
  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.div`
  margin: 10px;
  position: relative;
  display: inline-block;
  width: 40%;
  aspect-ratio: 9 / 16;
  overflow: hidden;
`;

const RemoveButton = styled.img`
  z-index: 5;
  position: absolute;
  top: 0px;
  right: 0px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  background: #ffffff80;
`;

const CharCount = styled.p`
  font-size: 12px;
  color: #333;
  text-align: right;
  margin: 0 0 10px;
`;

export default Upload;
