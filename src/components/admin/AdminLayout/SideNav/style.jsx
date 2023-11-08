import styled from '@emotion/styled';
import Common from 'styles/Common';

const SideNavContainer = styled.div`
  flex: 0 0 200px;
  border-right: 1px solid ${Common.colors.bd100};
  .nav_list {
    .community {
      padding: 40px 25px;
      display: flex;
      flex-direction: column;
      gap: 15px;
      > h1 {
        font-size: 16px;
        color: ${Common.colors.text100};
        margin-bottom: 10px;
      }
      .community_item {
        display: flex;
        align-items: center;
        justify-content: start;
        gap: 15px;
        > a {
          font-size: 15px;
          color: ${Common.colors.text100};
        }
        .icon {
          &.member {
            color: ${Common.colors.primary300};
          }
          &.dashboard {
            color: ${Common.colors.red};
          }
        }
      }
      .item {
        display: flex;
        align-items: center;
        justify-content: start;
        gap: 15px;
        > a {
          font-size: 15px;
          color: ${Common.colors.text300};
        }
        .icon {
          color: ${Common.colors.text300};
        }
        transition: all 0.4s ease;
        &.active,
        &:hover {
          > a {
            font-weight: bold;
            color: ${Common.colors.black};
          }
          .icon {
            &.orderSetting {
              color: ${Common.colors.awaitText};
            }
            &.templates {
              color: ${Common.colors.accent100};
            }
            &.main {
              color: ${Common.colors.successText};
            }
            &.board {
              color: ${Common.colors.primary100};
            }
          }
        }
      }
    }
  }
`;
export default SideNavContainer;
