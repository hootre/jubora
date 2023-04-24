import { createGlobalStyle } from 'styled-components';

const Color = createGlobalStyle`
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
`;

export default Color;
