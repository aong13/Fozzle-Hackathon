import AppRouter from "./router.jsx";
import styled from "styled-components";
import "./reset.css";
import GlobalStyle from "./styles/globalStyles";
import Toast from "./components/Toast.jsx";
import useToastStore from "./stores/useToastStore.js";

function App() {
  const toasts = useToastStore((state) => state.toasts);
  return (
    <AppContainer>
      <GlobalStyle />
      <AppRouter />
      {toasts.map((toast) => (
        <Toast key={toast.id} id={toast.id} message={toast.message} />
      ))}
    </AppContainer>
  );
}

const AppContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  max-width: 480px; /* 최대 크기 */
  margin: 0 auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export default App;
