import styled from '@emotion/styled';
import Common from 'styles/Common';

const SianUpdateListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  .btn_box {
    display: flex;
    justify-content: end;
    gap: 10px;
    margin-bottom: 10px;
    > button {
      padding: 10px 15px;
      border-radius: 5px;

      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        transform: translateY(-2px);
      }
    }
    .create_sian {
      color: ${Common.colors.white};
      background: ${Common.colors.primary100};
    }
    .delete_sian {
      color: ${Common.colors.white};
      background: ${Common.colors.red};
    }
  }
  .sian_item {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    > div {
      flex: 1;
    }
  }
`;
export default SianUpdateListContainer;
