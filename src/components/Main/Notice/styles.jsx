import styled from 'styled-components';

export const NoticeBox = styled.section`
  padding: 50px 0 50px;
  background: #f4f5f5;
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
        color: #262630;
        position: relative;
        display: inline-block;
        &:after {
          content: '';
          position: absolute;
          bottom: -12px;
          left: 0;
          width: 100%;
          height: 6px;
          background-color: #ffb838;
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
      background: #ffffff;
      box-shadow: 0 0 12px #0000001a;
      border-radius: 4px;
      padding: 8px 30px;
      margin-right: 30px;
      li {
        border-bottom: 1px solid #dcdcdc;
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
          color: #262630;
          color: #555;
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