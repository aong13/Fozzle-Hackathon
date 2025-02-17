import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { calculateImgRatio } from "../utils/relayUtils";

const ImgWithBlur = ({ imageSrc }) => {
  const [fillBlur, setFillBlur] = useState(null);

  useEffect(() => {
    if (imageSrc) {
      calculateImgRatio(imageSrc, (ratio) => {
        setFillBlur(ratio <= 3 / 4); // 3:4보다 길면 blur
      });
    }
  }, [imageSrc]);

  if (fillBlur === null) {
    return <Thumbnail className="loading" />;
  }

  return (
    <>
      <Thumbnail src={imageSrc} alt="thumbnail" $fill={fillBlur} />
      {!fillBlur && <BlurBackground src={imageSrc} alt="blurred background" />}
    </>
  );
};

export default ImgWithBlur;

const BlurBackground = styled.img`
  position: absolute;
  width: 150%;
  height: 130%;
  object-fit: cover;
  filter: blur(12px) brightness(0.9);
  overflow: visible;
`;

const Thumbnail = styled.img`
  position: relative;
  width: 100%;
  object-fit: ${({ $fill }) => ($fill ? "cover" : "contain")};
  aspect-ratio: 9 / 16;
  z-index: 1;

  &.loading {
    background-color: #00000020;
  }
`;
