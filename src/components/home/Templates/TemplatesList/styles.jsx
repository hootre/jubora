import styled from '@emotion/styled';
import Common from 'styles/Common';

const TemplatesListContainer = styled.div`
  .mainImgContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
    .img_box {
      width: ${Common.size.containerWidth};
      height: 150px;
      border: 1px solid #000;
    }
  }

  .templatsContainer {
    position: relative;
    background: #fff;
    min-height: calc(100vh - 249px);
    > main {
      width: ${Common.size.containerWidth};
    }
  }
`;
export default TemplatesListContainer;
