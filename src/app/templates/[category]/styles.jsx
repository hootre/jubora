import styled from '@emotion/styled';

export const Templates_category_container = styled.div`
  .main_img_container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
    .img_box {
      width: 1400px;
      height: 150px;
      border: 1px solid #000;
    }
  }

  .templats_container {
    display: flex;
    justify-content: center;
    min-height: calc(100vh - 249px);
    > main {
      width: 1400px;
    }
  }
`;
