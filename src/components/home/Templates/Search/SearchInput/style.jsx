import styled from '@emotion/styled';
import Common from 'styles/Common';

const SearchInputContainer = styled.div`
  height: 100%;
  width: 400px;
  .search_input {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
    .icon {
      position: absolute;
      cursor: pointer;
      left: 20px;
      top: 15px;
      color: ${Common.colors.text200};
      width: 20px;
      height: 20px;
    }

    input {
      color: ${Common.colors.black};
      font-size: 14px;
      width: inherit;
      border: solid 1px #dcdcdc;
      padding: 12px 18px 12px 60px;
      height: 50px;
      line-height: 50px;
      flex: 1 1 0px;
    }
    .submit {
      height: 50px;
      flex: 0 0 60px;
      padding: 10px;
      background: ${Common.colors.black};
      color: #fff;
      border-radius: 0 5px 5px 0;
      cursor: pointer;
    }
  }
`;
export default SearchInputContainer;
