import styled from 'styled-components';

export const NoticeBox = styled.section`
  padding: 50px 0 50px;
  background: var(--bg-100);
  > div {
    padding: 0 70px;
    position: relative;
    .title {
      position: absolute;
      top: -68px;
      h1 {
        font-size: 20px;
        font-weight: 700;
        line-height: 1;
        font-stretch: normal;
        font-style: normal;
        letter-spacing: normal;
        color: var(--text-100);
        position: relative;
        display: inline-block;
        &:after {
          content: '';
          position: absolute;
          bottom: -12px;
          left: 0;
          width: 100%;
          height: 6px;
          background-color: var(--primary-300);
        }
      }
    }
  }
  .notice {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    ul {
      width: 360px;
      flex: 0 0 360px;
      background: var(--bg-300);
      box-shadow: 0 0 12px rgba(0, 0, 0, 0.15);
      border-radius: 4px;
      padding: 8px 30px;
      margin-right: 30px;
      li {
        border-bottom: 1px solid var(--bg-200);
        &:last-child {
          border-bottom: none;
        }
        padding: 14px 0 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        a {
          font-size: 14px;
          font-weight: 500;
          line-height: 24px;
          color: var(--text-200);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 260px;
        }
        svg {
          width: 24px;
          height: 24px;
          opacity: 0.2;
        }
      }
    }
    .bottomBanner {
      flex: 0 1 auto;
      width: 100%;
      img {
        position: relative;
        width: 100%;
        height: 236px;
        border-radius: 4px;
        overflow: hidden;
        object-fit: cover;
      }
    }
  }
`;
