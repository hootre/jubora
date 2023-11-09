'use client';

import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import Common from 'styles/Common';

const NotFoundContainer = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    .logo {
      margin-bottom: 50px;
    }
    .textBox {
      text-align: center;
      h1 {
        font-size: 50px;

        > span {
          color: ${Common.colors.primary100};
          font-weight: bold;
        }
      }
    }
    .subText {
      font-size: 15px;
      color: ${Common.colors.text200};
      margin-bottom: 50px;
    }
    .btnBox {
      display: flex;
      gap: 10px;
      > button {
        padding: 10px 15px;
        border-radius: 5px;
        border: 1px solid ${Common.colors.bd100};
        cursor: pointer;
        transition: all 0.2s ease;
        &:hover {
          transform: translateY(-2px);
        }
      }
    }
  }
`;

export default function NotFound() {
  const router = useRouter();
  return (
    <NotFoundContainer>
      <div>
        <div className="logo">
          <img src="/image/logo.png" alt="" />
        </div>
        <div className="textBox">
          <h1>서비스이용에</h1>
          <h1>
            <span>불편을 드려서</span> 죄송합니다
          </h1>
        </div>
        <div className="subText">
          <h2>찾으시려는 페이지가 존재하지않거나, 현재 사용할 수 없는 페이지입니다</h2>
        </div>
        <div className="btnBox">
          <button type="button" onClick={() => router.back()}>
            이전 화면
          </button>
          <button type="button" onClick={() => router.push('/')}>
            메인으로 가기
          </button>
        </div>
      </div>
    </NotFoundContainer>
  );
}
