import styled from '@emotion/styled';

const QuickBarContainer = styled.aside`
  position: ${(props) => (props.ScrollActive ? 'fixed' : 'absolute')};
  top: ${(props) => (props.ScrollActive ? '80px' : '24%')};
  left: 50%;
  width: 150px;
  margin-left: 687px;
  z-index: 98;
  > div {
    width: 150px;
    height: 552px;
    border: 1px solid #ddd;
    background: #fff;
    padding: 4px 10px;
    box-sizing: border-box;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.09);
    ul {
      li {
        display: block;
        font-size: 13px;
        font-weight: 700;
        line-height: 37px;
        border-bottom: 1px solid #eee;
        text-align: center;
        letter-spacing: -0.06rem;
        color: #000;
        box-sizing: border-box;
        cursor: pointer;
      }
    }
    .img_box {
      > img {
        width: 100%;
        object-fit: cover;
      }
    }
  }
`;
export default QuickBarContainer;
