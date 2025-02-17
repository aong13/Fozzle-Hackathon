import React from "react";
import styled from "styled-components";

const StepIndicator = ({ steps, currentStep }) => {
  return (
    <StepContainer>
      {steps.map((step, index) => (
        <Step
          key={index}
          isActive={index === currentStep}
          isCompleted={index < currentStep}
        >
          <>
            <StepCircle
              isActive={index === currentStep}
              isCompleted={index < currentStep}
            />
          </>
          {index < steps.length - 1 && <StepLine />}
          <StepTitle isCompleted={index < currentStep}>{step}</StepTitle>
        </Step>
      ))}
    </StepContainer>
  );
};

export default StepIndicator;

const StepContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: 0 auto;
`;

const Step = styled.div`
  position: relative;
  justify-content: center;
  flex: 1;
`;

const StepCircle = styled.div`
  width: ${(props) => (props.isActive ? "24px" : "16px")}; /* 원 크기 조정 */
  height: ${(props) => (props.isActive ? "24px" : "16px")};
  border-radius: 50%;
  background-color: white;
  margin-bottom: 10px;
  transition: all 0.3s ease-in-out;
  position: relative;
  z-index: 1;
`;

const StepTitle = styled.div`
  font-size: 14px;
  color: #ffffff;
  font-weight: normal;
  margin-top: 8px;
`;

const StepLine = styled.div`
  position: absolute;
  top: 50%;
  width: 100%;
  height: 2px;
  background-color: #ccc; /* 선 색상 */
  z-index: 0;
  transition: width 0.3s ease-in-out;
`;
