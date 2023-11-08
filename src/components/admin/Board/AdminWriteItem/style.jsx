import styled from '@emotion/styled';
import Common from 'styles/Common';

const AdminWritePulbicContainer = styled.form`
  &.box {
    &.title {
      width: 400px;
    }
    h1 {
      color: ${Common.colors.text200};
      font-size: 15px;
      padding: 5px;
    }
  }
  > .top_box {
    display: flex;
    align-items: end;
    width: 100%;
    gap: 10px;
    .direct_board {
      text-decoration: underline;
      color: ${Common.colors.text200};
    }
  }
  > .btn_box {
    width: 100%;
    display: flex;
    > div {
      flex: 1;
    }
  }
`;
export default AdminWritePulbicContainer;
