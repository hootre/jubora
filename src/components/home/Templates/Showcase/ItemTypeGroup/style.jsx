import styled from '@emotion/styled';
import Common from 'styles/Common';

const ItemTypeGroupContainer = styled.div`
  .from_item_btn {
    padding: 10px 40px;
    color: ${Common.colors.text300};
    background: ${Common.colors.white};
    border: 1px solid ${Common.colors.bd100};
    border-radius: 2px;
    transition: all 0.2s ease;
    cursor: pointer;
    &.active,
    &:hover {
      font-weight: bold;
      color: ${Common.colors.white};
      background: ${Common.colors.black};
    }
  }
`;
export default ItemTypeGroupContainer;
