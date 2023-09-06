import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const SideNav_container = styled.div`
  flex: 0 0 200px;
  border-right: 1px solid ${Common.colors.bd100};
  .logo {
    display: flex;
    justify-content: center;
    margin: 50px 0;
  }
  .nav_list {
    > div {
      transition: all 0.2s ease;
      a {
        display: inline-block;
        width: 100%;
        padding: 30px 20px;
      }
      &:hover,
      &.active {
        a {
          color: ${Common.colors.white};
        }
        background: ${Common.colors.black};
        transform: translateY(-2px);
        box-shadow: 0px 0px 5px rgba(100, 100, 100, 0.2);
      }
    }
  }
`;
