import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { NickNameInput } from "../components/NicknameInput";
import useToastStore from "../stores/useToastStore";
import logoIcon from "../assets/icons/logo.png";
import duckIcon from "../assets/icons/duck.png";
import moneyIcon from "../assets/icons/money.png";

const Guest = () => {
  const navigate = useNavigate();
  const addToast = useToastStore((state) => state.addToast);

  const [money, setMoney] = useState("");

  const handleAgree = (isChecked) => {
    setIsAgreed(isChecked);
  };

  useEffect(() => {
    setMoney("");
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const putData = () => {
    if (isSubmitting) return;

    setIsSubmitting(true); // 요청 시작 시 비활성화

    setTimeout(() => {
      setIsSubmitting(false); // 1.5초 후 해제
    }, 1500);

    if (!money.trim()) {
      addToast("돈을 설정해주세요.");
      return;
    }
    sessionStorage.setItem("money", money);

    navigate("/home", { replace: true });
  };

  return (
    <Container>
      <Logo src={logoIcon} alt="logo" />
      <H1>시드머니 설정하기</H1>
      <NickNameInput onTextChange={setMoney} defaultValue={money} />
      <Button onClick={putData}>설정하기</Button>
      <Footer>
        <MoneySection>
          <img src={moneyIcon} alt="money" className="money-icon" />
        </MoneySection>
        <DuckSection>
          <img src={duckIcon} alt="duck" className="duck-icon" />
        </DuckSection>
      </Footer>
    </Container>
  );
};

export default Guest;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #71c6ff;
  height: 100vh; /* 부모 높이를 화면 크기와 맞추기 */
  padding-top: 100px;
  gap: 20px;
  position: relative;
  box-sizing: border-box;
`;

const Logo = styled.img`
  height: 100px;
`;

const H1 = styled.h1`
  color: white;
  font-size: 16px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  margin-top: 20px;
  display: flex;
  color: white;
  font-size: 14px;
  font-weight: 600;
  padding: 14px 40px;
  background-color: #ffffff50;
  border: 1px solid white;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.3s ease;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  gap: 20px;
  bottom: 0;
`;

const MoneySection = styled.div`
  .money-icon {
    width: 130px;
    height: auto;
  }
`;

const DuckSection = styled.div`
  .duck-icon {
    width: 100%;
    height: auto;
  }
`;
