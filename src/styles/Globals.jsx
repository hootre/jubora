import { Global, css } from '@emotion/react';
import { reset } from './reset';
import { Common } from './Common';

const style = css`
  ${reset};
  * {
    box-sizing: border-box;
  }
  /* 스크롤바 설정*/
  *::-webkit-scrollbar {
    width: 10px;
  }

  /* 스크롤바 막대 설정*/
  *::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.6);
    /* 스크롤바 둥글게 설정    */
    border-radius: 10px;
  }

  /* 스크롤바 뒷 배경 설정*/
  *::-webkit-scrollbar-track {
  }

  html {
    padding: 0;
    margin: 0;
    font-family: 'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui,
      Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic',
      'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
    list-style: none;
    font-size: 15px;
  }
  body {
    position: relative;
    min-height: 737px;
    overflow-x: hidden;
  }
  button {
    border: none;
    background: none;
    outline: none;
  }
  a {
    text-decoration: none;
    color: ${Common.colors.black};
  }
  input {
    outline: none;
  }
  /* custom */

  .confirm_box {
  }
  //react-hooks-form pointText

  // 로그인 조건 경고 텍스트
  .point_text {
    height: 0;
    display: flex;
    align-items: center;
    overflow: hidden;
    color: ${Common.colors.red};
    font-size: 12px;
    opacity: 0.2;
    transition: all 0.5s ease;
    &.active {
      height: 30px;
      opacity: 1;
      padding: 10px;
    }
  }
  /* animation: smoothAppear 0.5s; */
  @keyframes smoothAppear {
    from {
      opacity: 0;
      transform: translateY(-5%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .react-confirm-alert-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .C_container {
    width: ${Common.size.container_width};
    margin: 0 auto;
  }
  .C_ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .C_basic_flex {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .C_basic_input {
    padding: 5px;
    padding: 8.5px 14px;
    border-radius: 3px;
    border: 1px solid rgba(0, 0, 0, 0.23);
    &::placeholder {
      color: ${Common.colors.text300};
    }
    &:hover {
      border-color: ${Common.colors.black};
    }
  }
  .C_basic_button {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    min-width: 50px;
    cursor: pointer;
    padding: 10px;
    border-radius: 5px;
    transition: all 0.2s ease;
    background: ${Common.colors.primary100};
    color: ${Common.colors.white};
    font-weight: bold;
    &:hover {
      background: ${Common.colors.primary300};
      transform: translateY(-2px);
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    }
    &:active {
      transform: translateY(0px);
    }
    > a {
      color: ${Common.colors.white};
    }
    &.inactive {
      background: ${Common.colors.bd100};
      color: ${Common.colors.text200};
    }
  }

  @font-face {
    font-family: 'GmarketSans';
    font-weight: 300;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansLight.eot');
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansLight.eot?#iefix')
        format('embedded-opentype'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansLight.woff2') format('woff2'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansLight.woff') format('woff'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansLight.ttf')
        format('truetype');
    font-display: swap;
  }
  @font-face {
    font-family: 'GmarketSans';
    font-weight: 500;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansMedium.eot');
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansMedium.eot?#iefix')
        format('embedded-opentype'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansMedium.woff2')
        format('woff2'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansMedium.woff') format('woff'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansMedium.ttf')
        format('truetype');
    font-display: swap;
  }
  @font-face {
    font-family: 'GmarketSans';
    font-weight: 700;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansBold.eot');
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansBold.eot?#iefix')
        format('embedded-opentype'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansBold.woff2') format('woff2'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansBold.woff') format('woff'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansBold.ttf') format('truetype');
    font-display: swap;
  }
`;
const GlobalStyle = () => {
  return <Global styles={style} />;
};
export default GlobalStyle;
