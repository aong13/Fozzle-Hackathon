import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import useToastStore from "../stores/useToastStore";

const Toast = ({ message, id }) => {
  const removeToast = useToastStore((state) => state.removeToast);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000); // 2초

    const hideTimer = setTimeout(() => {
      removeToast(id);
    }, 3500);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [id, removeToast]);

  return (
    <Container>
      <ToastContainer isVisible={isVisible}>{message}</ToastContainer>
    </Container>
  );
};

export default Toast;

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-50px);
  }
`;
const Container = styled.div`
  position: fixed;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 9999;
  max-width: 90%;
`;

const ToastContainer = styled.div`
  background-color: #0000006c;
  color: white;
  padding: 16px 32px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  animation: ${({ isVisible }) => (isVisible ? fadeIn : fadeOut)} 0.5s ease-out
    forwards;
  transition: opacity 0.5s ease-out;
  white-space: nowrap;
`;
