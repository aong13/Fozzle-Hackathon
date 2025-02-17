import React, { useState, useEffect } from "react";
import styled from "styled-components";
import xIcon from "../assets/icons/x_grey.svg";

export const NickNameInput = ({ onTextChange, defaultValue }) => {
  const [text, setText] = useState(defaultValue);
  const handleTextChange = (event) => {
    const newText = event.target.value;
    setText(newText);
    onTextChange(newText);
  };

  const handleDelete = () => {
    setText("");
    onTextChange("");
  };

  const handleFocus = () => {
    setText("");
    onTextChange("");
  };

  useEffect(() => {
    setText(defaultValue || "");
  }, [defaultValue]);

  return (
    <Container>
      <InputContainer>
        <StyledInput
          type="text"
          value={text}
          onChange={handleTextChange}
          onFocus={handleFocus}
          maxLength={20}
        />
        <DeleteBtn onClick={handleDelete}>
          <img src={xIcon} alt="deleteIcon" />
        </DeleteBtn>
      </InputContainer>
      <CharCount>({text.length}/20)</CharCount>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: end;
`;

const InputContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #ffffff;
  gap: 8px;
  align-items: center;
  padding-bottom: 6px;
`;

const StyledInput = styled.input`
  border: none;
  background-color: transparent;
  padding: 8px;
  font-size: 16px;
  width: 100%;
  max-width: 250px;
  border: none;
  outline: none;
  color: white;
  font-weight: 600;
`;

const CharCount = styled.div`
  font-size: 12px;
  margin-top: 5px;
  color: white;
`;

const DeleteBtn = styled.button`
  min-width: 24px;
  height: 24px;
  background-color: #c8d8ff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 12px;
    height: 12px;
  }
`;
