'use client';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    // Colors
    :root {
        --primary-100:#0070C0;
        --primary-200:#004E86;
        --primary-300:#6EC3FF;
        --accent-100:#FFC000;
        --accent-200:#B38600;
        --text-100:#333333;
        --text-200:#737373;
        --text-300 : #c3c3c3;
        --bg-100:#F5F5F5;
        --bg-200:#E9E9E9;
        --bg-300:#FFFFFF;
        --bd-100:#e1e2e3;
        --base-black : #181823;
        --base-white : #fff;
        --base-red : #f03c32;
    
    }
    ${reset};
    *{
        box-sizing: border-box;
    }
    html{
        padding: 0;
        margin: 0;
        font-family: 'GmarketSans';
        list-style:none ;
        font-size:15px;
        box-sizing: border-box;
        overflow-x:hidden ;
    };
    button{
        border : none;
        background : none;
        outline: none;
    }
    body{
        position: relative;
    }
    a{
        text-decoration:none ;
        color : var(--base-white);

    }
    input {
        outline: none ;
    }
    /* custom */
    .container{
        width: 1200px;
        margin: 0 auto;
    }
    @font-face {
    font-family: 'GmarketSans';
    font-weight: 300;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansLight.eot');
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansLight.eot?#iefix') format('embedded-opentype'),
         url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansLight.woff2') format('woff2'),
         url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansLight.woff') format('woff'),
         url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansLight.ttf') format("truetype");
    font-display: swap;
} 
@font-face {
    font-family: 'GmarketSans';
    font-weight: 500;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansMedium.eot');
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansMedium.eot?#iefix') format('embedded-opentype'),
         url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansMedium.woff2') format('woff2'),
         url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansMedium.woff') format('woff'),
         url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansMedium.ttf') format("truetype");
    font-display: swap;
} 
@font-face {
    font-family: 'GmarketSans';
    font-weight: 700;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansBold.eot');
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansBold.eot?#iefix') format('embedded-opentype'),
         url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansBold.woff2') format('woff2'),
         url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansBold.woff') format('woff'),
         url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansBold.ttf') format("truetype");
    font-display: swap;
} 

`;

export default GlobalStyle;
