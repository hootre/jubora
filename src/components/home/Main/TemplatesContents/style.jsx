import styled from '@emotion/styled';
import Common from 'styles/Common';

const TemplatesContentsContainer = styled.section`
  position: relative;
  margin: 100px auto;
  transition: all 0.2s;
  height: auto;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    > div {
      display: flex;
      h1 {
        font-size: 40px;
        font-weight: bold;
        margin-right: 10px;
        color: ${Common.colors.black};
      }
      span {
        font-size: 14px;
        display: flex;
        align-items: end;
        color: ${Common.colors.text200};
      }
    }
    > a {
      display: flex;
      align-items: end;
      color: ${Common.colors.text200};
      text-decoration: underline;
      font-size: 13px;
      cursor: pointer;
      &:hover {
        color: ${Common.colors.black};
      }
    }
  }
  .nav {
    display: flex;
    justify-content: center;
    align-items: end;
    padding-bottom: 20px;
    > li {
      cursor: pointer;
      padding: 15px;
      border-radius: 5px;
      transition: all 0.2s;
      color: ${Common.colors.text200};
      &.active {
        background: ${Common.colors.primary100};
        color: ${Common.colors.white};
        font-weight: bold;
      }
    }
  }
`;
export default TemplatesContentsContainer;
