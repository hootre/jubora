import { Global, css } from '@emotion/react';
import { reset } from './reset';
import { Common } from './Common';

const style = css`
  ${reset};
  * {
    box-sizing: border-box;
  }
  html {
    padding: 0;
    margin: 0;
    font-family: 'GmarketSans';
    list-style: none;
    font-size: 15px;
    box-sizing: border-box;
  }
  body {
    position: relative;
    min-height: 737px;
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
  .container {
    width: ${Common.size.container_width};
    margin: 0 auto;
  }
  .basic_flex {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .basic_input {
    padding: 5px;
  }
  .basic_button {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    min-width: 50px;
    cursor: pointer;
    padding: 5px;
    border-radius: 5px;
    transition: all 0.2s;
    background: ${Common.colors.primary100};
    color: ${Common.colors.white};
    font-weight: bold;
    &:hover {
      background: ${Common.colors.primary300};
      transform: translateY(-2px);
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
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
