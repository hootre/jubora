import styled from '@emotion/styled';
import Common from 'styles/Common';

const GetValueImageItemContainer = styled.div`
  position: relative;
  height: 100%;
  overflow: hidden;
  transition: all 0.2s ease;
  .purchase_box {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    transition: all 0.4s ease;
    background: rgba(0, 0, 0, 0.1);
    opacity: 0;
    .purchase {
      transition: all 0.2s ease;
      background: ${Common.colors.white};
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 15px 0;
      width: 80px;
      height: 15px;
      text-align: center;
      color: ${Common.colors.white};
      border: 1px solid ${Common.colors.white};
      border-radius: 5px;
      > button {
        color: ${Common.colors.primary100};
        font-weight: bold;
      }
      &:hover {
        background: ${Common.colors.white};
        transform: translateY(-2px);
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
      }
    }
  }
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px, rgba(0, 0, 0, 0.1) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.1) 0px -3px 0px inset;
    .purchase_box {
      opacity: 1;
    }
  }

  &.current_content {
    cursor: pointer;
    box-shadow: 0 0 4px ${Common.colors.primary100};
  }
  > img {
    cursor: pointer;
    width: 100%;
    object-fit: contain;
    transition: all 0.2s ease;
  }
`;
export default GetValueImageItemContainer;
