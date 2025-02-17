import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'Pretendard';
  font-weight: 400; /* Regular */
  font-display: swap;
  src: local('Pretendard Regular'), 
       url('./Pretendard-Regular.woff') format('woff');
}

@font-face {
  font-family: 'Pretendard';
  font-weight: 600; /* SemiBold */
  font-display: swap;
  src: local('Pretendard SemiBold'), 
       url('./Pretendard-SemiBold.woff') format('woff');
}

body {
  font-family: 'Pretendard', sans-serif; /* 기본 폰트로 Pretendard 사용 */
}

strong, h1, h2 {
  font-weight: 600; /* SemiBold */
}
`;

export default GlobalStyle;
