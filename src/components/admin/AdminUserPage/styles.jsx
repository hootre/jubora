import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const AdminUserPage_container = styled.div`
  flex: 1;
  padding: 50px;
  .top_box {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .title {
      padding: 20px;
      font-size: 20px;
    }
    .search_box {
      width: 300px;
      display: flex;

      .search_term {
        width: 100%;
        border: 3px solid ${Common.colors.primary100};
        border-right: none;
        padding: 5px;
        height: 36px;
        line-height: 36px;
        border-radius: 5px 0 0 5px;
        outline: none;
        color: #9dbfaf;
      }

      .search_term:focus {
        color: ${Common.colors.primary100};
      }

      .search_button {
        width: 40px;
        height: 36px;
        border: 1px solid ${Common.colors.primary100};
        background: ${Common.colors.primary100};
        text-align: center;
        color: #fff;
        border-radius: 0 5px 5px 0;
        cursor: pointer;
        font-size: 20px;
      }
    }
  }
  .grid-table {
    display: grid;
    margin: 0 auto;
    box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.2);
    align-items: top;
    background: rgba(#fafafa, 0.9);
    border-radius: 0.5rem;
    @media (max-width: 800px) {
      background: transparent;
      grid-row-gap: 2rem;
      box-shadow: none;
    }

    &-row {
      display: grid;
      grid-template-columns: 50px 400px repeat(6, 1fr);

      @media (max-width: 800px) {
        grid-template-columns: 3fr 1fr 3fr;
        background: rgba(#fafafa, 0.9);
        box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.2);
        border-radius: 0.5rem;
      }

      @media (max-width: 400px) {
        grid-template-columns: 1fr 1fr;
      }

      &:not(:last-child) {
        border-bottom: 1px solid #ddd;
      }
      &:first-of-type {
        border-radius: 0.5rem 0.5rem 0 0;
        background: rgba(#ccc, 0.5);
        font-weight: bold;
        text-shadow: 0 2px 1px #fff;

        @media (max-width: 800px) {
          display: none;
        }
      }
    }

    &-cell {
      padding: 1rem;
      @media (max-width: 800px) {
        padding: 0 0 1rem 0;
        text-align: center;
      }
      &:not(:last-child) {
        border-right: 1px solid #ddd;
      }
      @media (max-width: 800px) {
        &:before {
          content: attr(data-title);
          font-weight: bold;
          display: block;
          background: rgba(#ddd, 0.8);
          padding: 0.75rem;
          margin-bottom: 0.75rem;
          font-size: 1rem;
        }
        &:first-of-type {
          grid-column-start: 1;
          grid-column-end: 5;
          border-bottom: 1px solid #ddd;
          &:before {
            border-radius: 0.5rem 0.5rem 0 0;
          }
        }
      }

      @media (max-width: 400px) {
        &:last-child {
          grid-column-start: 1;
          grid-column-end: 5;
        }
      }
    }
  }
`;
